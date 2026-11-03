// Placeholder frontend service calls for the future FastAPI backend.
// All functions return mocked JSON so the UI can be built end-to-end.

export interface UploadResponse {
  file_id: string;
  filename: string;
  size_kb: number;
  width: number;
  height: number;
}

export interface RecognitionResult {
  text: string;
  confidence: number;
  cells: number;
  processing_ms: number;
}

export interface HistoryItem {
  id: string;
  filename: string;
  date: string;
  accuracy: number;
  status: "success" | "failed" | "processing";
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const api = {
  async upload(file: File): Promise<UploadResponse> {
    await wait(400);
    return {
      file_id: crypto.randomUUID(),
      filename: file.name,
      size_kb: Math.round(file.size / 1024),
      width: 1024,
      height: 768,
    };
  },
  async preprocess(_id: string) {
    await wait(300);
    return { ok: true };
  },
  async segment(_id: string) {
    await wait(300);
    return { ok: true, cells: 128 };
  },
  async classify(_id: string) {
    await wait(400);
    return { ok: true, top1: 0.962 };
  },
  async translate(_id: string): Promise<RecognitionResult> {
    await wait(300);
    return {
      text: "the quick brown fox jumps over the lazy dog. braille vision ai successfully recognized this document with high confidence.",
      confidence: 0.962,
      cells: 128,
      processing_ms: 1420,
    };
  },
  async history(): Promise<HistoryItem[]> {
    await wait(150);
    return mockHistory;
  },
  async statistics() {
    await wait(150);
    return {
      total_documents: 1284,
      total_characters: 48213,
      accuracy: 96.2,
      avg_processing_ms: 1420,
    };
  },
};

const mockHistory: HistoryItem[] = [
  { id: "1", filename: "document_01.png", date: "2026-07-10", accuracy: 97.4, status: "success" },
  { id: "2", filename: "scan_page3.jpg", date: "2026-07-09", accuracy: 94.1, status: "success" },
  { id: "3", filename: "textbook.pdf", date: "2026-07-08", accuracy: 91.8, status: "success" },
  { id: "4", filename: "notes.tiff", date: "2026-07-07", accuracy: 88.2, status: "failed" },
  { id: "5", filename: "letter_a.bmp", date: "2026-07-06", accuracy: 98.9, status: "success" },
  { id: "6", filename: "poem.png", date: "2026-07-05", accuracy: 95.0, status: "success" },
];
