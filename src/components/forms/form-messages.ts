/**
 * Form message manager for showing/hiding error, success, info, and warning messages
 * Auto-initializes all FormMessage components on page load
 */

interface FormMessageOptions {
    scroll?: boolean;
    timeout?: number;
}

interface FormMessageManager {
    show(message: string, type?: "error" | "success" | "info" | "warning", options?: FormMessageOptions): void;
    showError(message: string, options?: FormMessageOptions): void;
    showSuccess(message: string, options?: FormMessageOptions): void;
    showInfo(message: string, options?: FormMessageOptions): void;
    showWarning(message: string, options?: FormMessageOptions): void;
    hide(): void;
    isVisible(): boolean;
}

function createFormMessageManager(id: string): FormMessageManager | null {
    const element = document.getElementById(id);
    const textElement = element?.querySelector(".form-message-text");

    if (!element || !textElement) {
        console.warn(`FormMessage: Could not find element with id "${id}"`);
        return null;
    }

    return {
        show(message: string, type: "error" | "success" | "info" | "warning" = "error", options: FormMessageOptions = {}) {
            const { scroll = true, timeout } = options;

            // Update content and type
            textElement.textContent = message;
            element.className = `form-message form-message-${type}`;
            element.style.display = "block";

            // Scroll into view if requested
            if (scroll) {
                element.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                });
            }

            // Auto-hide after timeout if specified
            if (timeout) {
                setTimeout(() => this.hide(), timeout);
            }
        },

        showError(message: string, options?: FormMessageOptions) {
            this.show(message, "error", options);
        },

        showSuccess(message: string, options?: FormMessageOptions) {
            this.show(message, "success", options);
        },

        showInfo(message: string, options?: FormMessageOptions) {
            this.show(message, "info", options);
        },

        showWarning(message: string, options?: FormMessageOptions) {
            this.show(message, "warning", options);
        },

        hide() {
            element.style.display = "none";
        },

        isVisible() {
            return element.style.display !== "none";
        },
    };
}

// Auto-initialize all FormMessage components on page load
document.addEventListener("DOMContentLoaded", () => {
    // Find all elements with class "form-message" and create managers for them
    const messageElements = document.querySelectorAll(".form-message");

    messageElements.forEach((element) => {
        const id = element.id;
        if (id) {
            const manager = createFormMessageManager(id);
            if (manager) {
                // Make this message manager available globally
                (window as any)[`formMessage_${id}`] = manager;
            }
        }
    });
});

// Export for manual initialization if needed
(window as any).createFormMessageManager = createFormMessageManager;
