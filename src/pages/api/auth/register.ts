export const prerender = false;
import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, redirect }) => {
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

    const { error } = await supabase.auth.signUp({
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

    // For fetch requests, return success JSON
    if (request.headers.get("Accept")?.includes("application/json")) {
        return new Response(
            JSON.stringify({
                success: true,
                redirectUrl: "/auth/signin",
                message: "Account created successfully! Please sign in."
            }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" }
            }
        );
    }

    // For traditional form submissions, redirect
    return redirect("/auth/signin");
};
