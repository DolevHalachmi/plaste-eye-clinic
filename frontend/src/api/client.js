const defaultApiUrl = 'http://localhost:8080';
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || defaultApiUrl;

export async function apiFetch(path, options = {}) {
  return fetch(`${API_BASE_URL}${path}`, {
    credentials: 'include',
    ...options,
  });
}