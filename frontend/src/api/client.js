const defaultApiUrl = 'http://localhost:8080';
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || defaultApiUrl;

const DEFAULT_TIMEOUT_MS = 15000;

export async function apiFetch(path, options = {}) {
  const { timeoutMs = DEFAULT_TIMEOUT_MS, signal, ...fetchOptions } = options;
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);

  if (signal) {
    signal.addEventListener('abort', () => controller.abort(), { once: true });
  }

  try {
    return await fetch(`${API_BASE_URL}${path}`, {
      credentials: 'include',
      ...fetchOptions,
      signal: controller.signal,
    });
  } finally {
    window.clearTimeout(timeoutId);
  }
}
