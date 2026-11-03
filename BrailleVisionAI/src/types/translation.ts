export interface TranslateResult {
  text: string;
  language?: string;
  confidence?: number;
}

export interface HistoryItem {
  id: string;
  filename: string;
  date: string;
  accuracy: number;
  status: "success" | "failed" | "processing";
}

export interface Statistics {
  accuracy: number;
  processing_time_ms: number;
  recognized_characters: number;
  uploaded_documents: number;
}

export interface RecognitionResult {
  id: string;
  filename: string;
  originalImage: string | null;
  cells: number;
  characters: import("./prediction").ClassifiedCharacter[];
  text: string;
  confidence: number;
  processing_ms: number;
}