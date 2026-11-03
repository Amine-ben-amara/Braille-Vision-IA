/**
 * Runtime configuration for the Braille Vision AI frontend.
 * The FastAPI backend will be reachable at API_URL.
 */
export const API_URL =
  (import.meta.env.VITE_API_URL as string | undefined) ??
  "http://localhost:8000/api";

export const API_TIMEOUT_MS = 30_000;

/**
 * When true, services return mocked JSON instead of hitting the network.
 * Flip to false (or set VITE_USE_MOCKS=false) once FastAPI is live.
 */
export const USE_MOCKS =
  (import.meta.env.VITE_USE_MOCKS as string | undefined) !== "false";

export const config = {
  apiUrl: API_URL,
  timeoutMs: API_TIMEOUT_MS,
  useMocks: USE_MOCKS,
};

export default config;