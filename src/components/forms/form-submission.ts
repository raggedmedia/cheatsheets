/**
 * Enhanced form submission with error handling and loading states
 * Automatically handles forms with data-submit-handler attribute
 */

interface SubmissionConfig {
    formId: string;
    buttonId: string;
    messageId: string;
    endpoint?: string;
    successRedirect?: string;
    successMessage?: string;
    successTimeout?: number;
}

function createFormSubmissionHandler(config: SubmissionConfig) {
    const {
        formId,
        buttonId,
        messageId,
        endpoint,
        successRedirect,
        successMessage,
        successTimeout,
    } = config;

    const form = document.getElementById(formId) as HTMLFormElement;
    const button = document.getElementById(buttonId) as HTMLButtonElement;
    const buttonText = button?.querySelector(".button-text") as HTMLElement;
    const buttonLoading = button?.querySelector(".button-loading") as HTMLElement;

    // Get the FormMessage component
    const message = (window as any)[`formMessage_${messageId}`];

    if (!form || !button || !message) {
        console.warn(`FormSubmission: Could not find required elements for form "${formId}"`);
        return;
    }

    function setLoading(loading: boolean) {
        button.disabled = loading;
        if (buttonText) buttonText.style.display = loading ? "none" : "inline";
        if (buttonLoading) buttonLoading.style.display = loading ? "inline" : "none";
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        message.hide();
        setLoading(true);

        try {
            const formData = new FormData(form);
            const submitEndpoint = endpoint || form.action;

            const response = await fetch(submitEndpoint, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                },
                body: formData,
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Submission failed");
            }

            // Success handling
            if (successMessage) {
                message.showSuccess(
                    result.message || successMessage,
                    { timeout: successTimeout || 2000 },
                );

                if (successRedirect) {
                    setTimeout(() => {
                        window.location.href = result.redirectUrl || successRedirect;
                    }, successTimeout || 2000);
                } else if (result.redirectUrl) {
                    setTimeout(() => {
                        window.location.href = result.redirectUrl;
                    }, successTimeout || 2000);
                }
            } else {
                // Immediate redirect for sign-in type forms
                window.location.href = result.redirectUrl || successRedirect || "/dashboard";
            }
        } catch (error) {
            setLoading(false);
            message.showError(
                error instanceof Error
                    ? error.message
                    : "An unexpected error occurred",
            );
        }
    });
}

// Auto-initialize forms with data-submit-handler attribute
document.addEventListener("DOMContentLoaded", () => {
    const formsWithHandlers = document.querySelectorAll("[data-submit-handler]");

    formsWithHandlers.forEach((form) => {
        const formElement = form as HTMLFormElement;
        const config = formElement.dataset;

        if (config.submitHandler && config.formId && config.buttonId && config.messageId) {
            const submissionConfig: SubmissionConfig = {
                formId: config.formId,
                buttonId: config.buttonId,
                messageId: config.messageId,
                endpoint: config.endpoint,
                successRedirect: config.successRedirect,
                successMessage: config.successMessage,
                successTimeout: config.successTimeout ? parseInt(config.successTimeout) : undefined,
            };

            createFormSubmissionHandler(submissionConfig);
        }
    });
});

// Export for manual initialization if needed
window.createFormSubmissionHandler = createFormSubmissionHandler;
