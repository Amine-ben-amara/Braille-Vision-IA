export const ACCEPTED_MIME_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/bmp",
  "image/tiff",
  "application/pdf",
] as const;

export const ACCEPTED_EXTENSIONS = ".png,.jpg,.jpeg,.bmp,.tiff,.pdf";

export const MAX_UPLOAD_MB = 20;
export const MAX_UPLOAD_BYTES = MAX_UPLOAD_MB * 1024 * 1024;

export const PIPELINE_STEPS = [
  { key: "upload", label: "Upload" },
  { key: "preprocess", label: "Preprocessing" },
  { key: "segment", label: "Segmentation" },
  { key: "classify", label: "Classification" },
  { key: "translate", label: "Translation" },
  { key: "result", label: "Result" },
] as const;

export type PipelineStepKey = (typeof PIPELINE_STEPS)[number]["key"];

export const ENDPOINTS = {
  upload: "/upload",
  preprocess: "/preprocess",
  segment: "/segment",
  classify: "/classify",
  translate: "/translate",
  history: "/history",
  statistics: "/statistics",
} as const;

export const DEFAULT_LANGUAGE = "en";
export const DEFAULT_CONFIDENCE_THRESHOLD = 0.8;