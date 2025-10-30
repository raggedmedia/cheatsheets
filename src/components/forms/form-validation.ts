/**
 * Universal Form Validation
 * Automatically validates any form by scanning for form elements
 * Usage: setupFormValidation('form[data-validate]') or setupFormValidation('#my-form')
 */

interface FormValidationConfig {
    formSelector: string;
    submitButtonSelector?: string;
}

function setupFormValidation(config: FormValidationConfig | string) {
    const formSelector = typeof config === 'string' ? config : config.formSelector;
    const submitButtonSelector = typeof config === 'object' ? config.submitButtonSelector : undefined;

    const form = document.querySelector(formSelector) as HTMLFormElement;
    if (!form) {
        console.warn(`Form validation: Could not find form with selector "${formSelector}"`);
        return;
    }

    // Find submit button - either specified selector, or first submit button in form
    const submitButton = submitButtonSelector
        ? document.querySelector(submitButtonSelector) as HTMLButtonElement
        : form.querySelector('button[type="submit"], input[type="submit"]') as HTMLButtonElement;

    if (!submitButton) {
        console.warn('Form validation: Could not find submit button');
        return;
    }

    // Find all form inputs that should be validated
    const inputs = Array.from(form.querySelectorAll('input, textarea, select')) as (HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)[];

    function markAsTouched(input: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) {
        input.classList.add('touched');
    }

    function validateForm(): boolean {
        let isFormValid = true;

        inputs.forEach(input => {
            // Check if input is required and has value
            const isRequired = input.hasAttribute('required');
            const hasValue = input.value.trim() !== '';

            // Enhanced email validation
            let isNativelyValid = input.validity.valid;
            if (input.type === 'email' && hasValue) {
                // More strict email validation
                const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                const isValidEmail = emailPattern.test(input.value);

                if (!isValidEmail) {
                    // Set custom validity message
                    input.setCustomValidity('Please enter a valid email address (e.g., user@example.com)');
                    isNativelyValid = false;
                } else {
                    // Clear custom validity if email is valid
                    input.setCustomValidity('');
                }
            }

            // Input is valid if: not required OR (required AND has value AND passes validation)
            const isInputValid = !isRequired || (hasValue && isNativelyValid);

            if (!isInputValid) {
                isFormValid = false;
            }
        });

        // Enable/disable submit button based on form validity
        submitButton.disabled = !isFormValid;

        return isFormValid;
    }

    // Set up event listeners for all inputs
    inputs.forEach(input => {
        // Mark as touched when user leaves the field
        input.addEventListener('blur', () => markAsTouched(input));

        // Validate on input change
        input.addEventListener('input', validateForm);

        // Also validate on change (for selects, checkboxes, radios)
        input.addEventListener('change', validateForm);
    });

    // Initial validation
    validateForm();

    // Return validation function for manual triggering if needed
    return {
        validate: validateForm,
        markAllTouched: () => inputs.forEach(markAsTouched),
        form,
        inputs,
        submitButton
    };
}

// Auto-setup for forms with data-validate attribute
document.addEventListener('DOMContentLoaded', () => {
    // Auto-discover forms with data-validate attribute
    const autoForms = document.querySelectorAll('form[data-validate]');
    autoForms.forEach(form => {
        const selector = `#${form.id}` || `form[data-validate="${form.getAttribute('data-validate')}"]`;
        setupFormValidation(selector);
    });
});

// Make available globally
(window as any).setupFormValidation = setupFormValidation;
