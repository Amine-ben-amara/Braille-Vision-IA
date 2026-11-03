import { ENDPOINTS } from "@/utils/constants";
import { USE_MOCKS } from "@/utils/config";
import { http } from "./api";
import type {
  SegmentResult,
  ClassifyResult,
  SegmentedCell,
  ClassifiedCharacter,
} from "@/types/prediction";

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
const ALPHA = "abcdefghijklmnopqrstuvwxyz";

export async function segmentDocument(id: string): Promise<SegmentResult> {
  if (USE_MOCKS) {
    await wait(500);
    const cells = 74;
    const images: SegmentedCell[] = Array.from({ length: cells }, (_, i) => ({
      index: i + 1,
      image: `mock://cell/${id}/${i + 1}`,
    }));
    return { cells, images };
  }
  const { data } = await http.post<SegmentResult>(ENDPOINTS.segment, { id });
  return data;
}

export async function classifyDocument(
  id: string,
  cellCount = 74,
): Promise<ClassifyResult> {
  if (USE_MOCKS) {
    await wait(650);
    const characters: ClassifiedCharacter[] = Array.from(
      { length: cellCount },
      (_, i) => ({
        cell: i + 1,
        letter: ALPHA[i % ALPHA.length],
        confidence: 0.85 + Math.random() * 0.14,
      }),
    );
    return { characters };
  }
  const { data } = await http.post<ClassifyResult>(ENDPOINTS.classify, { id });
  return data;
}