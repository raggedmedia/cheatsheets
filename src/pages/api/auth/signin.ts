export const prerender = false;
import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
    const formData = await request.formData();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
        return new Response(
            JSON.stringify({ error: "Email and password are required" }),
            {
                status: 400,
                headers: { "Content-Type": "application/json" }
            }
        );
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            {
                status: 400,
                headers: { "Content-Type": "application/json" }
            }
        );
    }

    const { access_token, refresh_token } = data.session;
    cookies.set("sb-access-token", access_token, {
        path: "/",
    });
    cookies.set("sb-refresh-token", refresh_token, {
        path: "/",
    });

    // For fetch requests, return success JSON
    if (request.headers.get("Accept")?.includes("application/json")) {
        return new Response(
            JSON.stringify({ success: true, redirectUrl: "/dashboard" }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" }
            }
        );
    }

    // For traditional form submissions, redirect
    return redirect("/dashboard");
};
