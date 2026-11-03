import { ENDPOINTS } from "@/utils/constants";
import { USE_MOCKS } from "@/utils/config";
import { http } from "./api";
import type { TranslateResult } from "@/types/translation";

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function translateDocument(id: string): Promise<TranslateResult> {
  if (USE_MOCKS) {
    await wait(400);
    return {
      text: "Hello World. Braille Vision AI successfully translated this document.",
      language: "en",
      confidence: 0.96,
    };
  }
  const { data } = await http.post<TranslateResult>(ENDPOINTS.translate, { id });
  return data;
}