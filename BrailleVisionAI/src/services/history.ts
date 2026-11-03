import { ENDPOINTS } from "@/utils/constants";
import { USE_MOCKS } from "@/utils/config";
import { http } from "./api";
import type { HistoryItem } from "@/types/translation";

const MOCK: HistoryItem[] = [
  { id: "1", filename: "document_01.png", date: "2026-07-10", accuracy: 97.4, status: "success" },
  { id: "2", filename: "scan_page3.jpg", date: "2026-07-09", accuracy: 94.1, status: "success" },
  { id: "3", filename: "textbook.pdf", date: "2026-07-08", accuracy: 91.8, status: "success" },
  { id: "4", filename: "notes.tiff", date: "2026-07-07", accuracy: 88.2, status: "failed" },
  { id: "5", filename: "letter_a.bmp", date: "2026-07-06", accuracy: 98.9, status: "success" },
  { id: "6", filename: "poem.png", date: "2026-07-05", accuracy: 95.0, status: "success" },
];

export async function getHistory(): Promise<HistoryItem[]> {
  if (USE_MOCKS) {
    await new Promise((r) => setTimeout(r, 150));
    return MOCK;
  }
  const { data } = await http.get<HistoryItem[]>(ENDPOINTS.history);
  return data;
}