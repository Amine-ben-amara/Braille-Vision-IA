import axios, { AxiosError, type AxiosInstance } from "axios";
import { toast } from "sonner";
import { API_TIMEOUT_MS, API_URL } from "@/utils/config";
import { ApiError } from "@/types/api";

/**
 * Shared Axios instance for the future FastAPI backend.
 * All service modules import this client so interceptors,
 * auth headers, and base URL stay in one place.
 */
export const http: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT_MS,
  headers: { Accept: "application/json" },
});

http.interceptors.request.use((cfg) => {
  const token =
    typeof window !== "undefined"
      ? window.localStorage.getItem("bv_token")
      : null;
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

http.interceptors.response.use(
  (res) => res,
  (error: AxiosError<{ message?: string; code?: string; details?: unknown }>) => {
    const status = error.response?.status ?? 0;
    const payload = error.response?.data;
    const message =
      payload?.message ||
      error.message ||
      "Unexpected error while contacting the server";
    return Promise.reject(new ApiError(message, status, payload?.code, payload?.details));
  },
);

/**
 * Wrap any async call with a normalized error surface + toast.
 * Silences toast when `silent` is true (useful for background polling).
 */
export async function callApi<T>(
  fn: () => Promise<T>,
  opts: { silent?: boolean; errorMessage?: string } = {},
): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    const apiErr =
      err instanceof ApiError
        ? err
        : new ApiError(
            err instanceof Error ? err.message : "Unknown error",
            0,
          );
    if (!opts.silent) {
      toast.error(opts.errorMessage ?? "Request failed", {
        description: apiErr.message,
      });
    }
    throw apiErr;
  }
}

export function isApiError(err: unknown): err is ApiError {
  return err instanceof ApiError;
}