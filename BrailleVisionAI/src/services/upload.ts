import { ENDPOINTS } from "@/utils/constants";
import { USE_MOCKS } from "@/utils/config";
import { http } from "./api";
import type { UploadResult, PreprocessResult } from "@/types/prediction";

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function uploadDocument(
  file: File,
  onProgress?: (pct: number) => void,
): Promise<UploadResult> {
  if (USE_MOCKS) {
    // Simulate incremental upload progress
    for (let p = 0; p <= 100; p += 20) {
      onProgress?.(p);
      await wait(80);
    }
    return {
      id: crypto.randomUUID(),
      filename: file.name,
      status: "uploaded",
      size_kb: Math.round(file.size / 1024),
      width: 1024,
      height: 768,
    };
  }

  const form = new FormData();
  form.append("file", file);
  const { data } = await http.post<UploadResult>(ENDPOINTS.upload, form, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (e) => {
      if (e.total) onProgress?.(Math.round((e.loaded / e.total) * 100));
    },
  });
  return data;
}

export async function preprocessDocument(id: string): Promise<PreprocessResult> {
  if (USE_MOCKS) {
    await wait(400);
    return { status: "completed", preprocessed_image: `mock://preprocessed/${id}` };
  }
  const { data } = await http.post<PreprocessResult>(ENDPOINTS.preprocess, { id });
  return data;
}