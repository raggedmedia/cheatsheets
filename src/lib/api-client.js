/**
 * Production-ready Fetch API wrapper
 *
 * Usage:
 * ```js
 * import { api } from './lib/api-client';
 *
 * // Simple GET
 * const users = await api.get('/users');
 *
 * // POST with data
 * const newUser = await api.post('/users', { name: 'Alice' });
 *
 * // With loading state
 * const { data, loading, error } = await api.getWithState('/users');
 * ```
 */

/**
 * Main API client class
 * Handles authentication, error handling, and retries
 */
class APIClient {
	/**
	 * @param {string} baseURL - Base API URL (e.g., 'https://api.example.com')
	 * @param {Object} defaultHeaders - Headers sent with every request
	 * @param {number} timeout - Request timeout in milliseconds (default: 10000)
	 */
	constructor(baseURL, defaultHeaders = {}, timeout = 10000) {
		this.baseURL = baseURL;
		this.defaultHeaders = defaultHeaders;
		this.timeout = timeout;
	}

	/**
	 * Core request method - all HTTP methods use this
	 * Handles timeout, error checking, and JSON parsing
	 */
	async request(endpoint, options = {}) {
		const url = `${this.baseURL}${endpoint}`;

		// Create AbortController for timeout
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), this.timeout);

		// Merge default headers with request-specific headers
		const config = {
			...options,
			signal: controller.signal,
			headers: {
				...this.defaultHeaders,
				...options.headers
			}
		};

		try {
			// Make the fetch request
			const response = await fetch(url, config);

			// Clear timeout since request completed
			clearTimeout(timeoutId);

			// ⚠️ CRITICAL: fetch only rejects on network errors
			// We must manually check for HTTP errors (404, 500, etc.)
			if (!response.ok) {
				// Try to get error details from response body
				const error = await response.json().catch(() => ({}));
				throw new Error(
					error.message ||
					`HTTP ${response.status}: ${response.statusText}`
				);
			}

			// Success! Parse and return JSON
			return await response.json();

		} catch (error) {
			clearTimeout(timeoutId);

			// Provide user-friendly error messages
			if (error.name === 'AbortError') {
				throw new Error(`Request timeout after ${this.timeout}ms`);
			}

			// Network error (no internet, DNS failed, CORS, etc.)
			if (error.message === 'Failed to fetch') {
				throw new Error('Network error - check your connection');
			}

			// Re-throw HTTP errors or other errors
			throw error;
		}
	}

	/**
	 * GET request - retrieve data
	 */
	async get(endpoint) {
		return this.request(endpoint, {
			method: 'GET'
		});
	}

	/**
	 * POST request - create new resource
	 * Automatically sets Content-Type to application/json
	 */
	async post(endpoint, data) {
		return this.request(endpoint, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		});
	}

	/**
	 * PUT request - replace entire resource
	 */
	async put(endpoint, data) {
		return this.request(endpoint, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		});
	}

	/**
	 * PATCH request - update specific fields
	 */
	async patch(endpoint, data) {
		return this.request(endpoint, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		});
	}

	/**
	 * DELETE request - remove resource
	 */
	async delete(endpoint) {
		return this.request(endpoint, {
			method: 'DELETE'
		});
	}

	/**
	 * Upload files with FormData
	 * Note: Don't set Content-Type header - browser sets it with boundary
	 */
	async upload(endpoint, formData) {
		return this.request(endpoint, {
			method: 'POST',
			body: formData
			// No Content-Type header! Browser handles it automatically
		});
	}

	/**
	 * GET request with loading state tracking
	 * Returns { data, loading, error } for UI state management
	 */
	async getWithState(endpoint) {
		const state = {
			data: null,
			loading: true,
			error: null
		};

		try {
			state.data = await this.get(endpoint);
		} catch (error) {
			state.error = error.message;
		} finally {
			state.loading = false;
		}

		return state;
	}

	/**
	 * Retry failed requests with exponential backoff
	 * Useful for flaky networks or rate-limited APIs
	 */
	async requestWithRetry(endpoint, options = {}, maxRetries = 3) {
		let lastError;

		for (let i = 0; i < maxRetries; i++) {
			try {
				return await this.request(endpoint, options);
			} catch (error) {
				lastError = error;

				// Don't retry on client errors (4xx)
				if (error.message.includes('HTTP 4')) {
					throw error;
				}

				// Wait before retrying (exponential backoff: 1s, 2s, 4s)
				if (i < maxRetries - 1) {
					await new Promise(resolve =>
						setTimeout(resolve, 1000 * Math.pow(2, i))
					);
				}
			}
		}

		throw lastError;
	}
}

/**
 * Create and export a singleton instance
 * Configure with your API base URL and auth token
 */
export const api = new APIClient(
	// Base URL - change this to your API
	import.meta.env.PUBLIC_API_URL || 'https://api.example.com',

	// Default headers - add authentication here
	{
		// Example: Bearer token from environment variable
		// 'Authorization': `Bearer ${import.meta.env.PUBLIC_API_TOKEN}`
	},

	// Timeout in milliseconds
	10000
);

/**
 * Example usage in your components/pages:
 *
 * import { api } from '@/lib/api-client';
 *
 * // Simple GET request
 * const users = await api.get('/users');
 *
 * // POST with data
 * const newUser = await api.post('/users', {
 *   name: 'Alice',
 *   email: 'alice@example.com'
 * });
 *
 * // With error handling
 * try {
 *   const user = await api.get('/users/123');
 *   console.log(user);
 * } catch (error) {
 *   console.error('Failed to load user:', error.message);
 * }
 *
 * // With loading state (great for reactive frameworks)
 * const { data, loading, error } = await api.getWithState('/users');
 * if (loading) console.log('Loading...');
 * if (error) console.error(error);
 * if (data) console.log(data);
 *
 * // Retry flaky requests
 * const data = await api.requestWithRetry('/unstable-endpoint', { method: 'GET' }, 3);
 *
 * // File upload
 * const formData = new FormData();
 * formData.append('file', fileInput.files[0]);
 * formData.append('title', 'My Upload');
 * await api.upload('/files', formData);
 */

/**
 * Helper: Make multiple requests in parallel
 * Much faster than awaiting them sequentially
 */
export async function fetchAll(...requests) {
	return Promise.all(requests);
}

/**
 * Example:
 * const [users, posts, comments] = await fetchAll(
 *   api.get('/users'),
 *   api.get('/posts'),
 *   api.get('/comments')
 * );
 */
