import { ENDPOINTS } from "@/utils/constants";
import { USE_MOCKS } from "@/utils/config";
import { http } from "./api";
import type { Statistics } from "@/types/translation";

export async function getStatistics(): Promise<Statistics> {
  if (USE_MOCKS) {
    await new Promise((r) => setTimeout(r, 150));
    return {
      accuracy: 96.2,
      processing_time_ms: 1420,
      recognized_characters: 48213,
      uploaded_documents: 1284,
    };
  }
  const { data } = await http.get<Statistics>(ENDPOINTS.statistics);
  return data;
}