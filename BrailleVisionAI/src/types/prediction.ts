export interface UploadResult {
  id: string;
  filename: string;
  status: "uploaded" | "failed";
  size_kb?: number;
  width?: number;
  height?: number;
}

export interface PreprocessResult {
  status: "completed" | "failed";
  preprocessed_image: string;
}

export interface SegmentedCell {
  index: number;
  image: string;
  bbox?: [number, number, number, number];
}

export interface SegmentResult {
  cells: number;
  images: SegmentedCell[];
}

export interface ClassifiedCharacter {
  cell: number;
  letter: string;
  confidence: number;
}

export interface ClassifyResult {
  characters: ClassifiedCharacter[];
}