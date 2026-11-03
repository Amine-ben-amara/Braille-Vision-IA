import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Copy, Download, ZoomIn, ZoomOut, FileJson, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/result")({
  head: () => ({
    meta: [
      { title: "Recognition Result — Braille Vision AI" },
      { name: "description", content: "Recognized text with confidence and export options." },
    ],
  }),
  component: ResultPage,
});

const DEMO_TEXT =
  "the quick brown fox jumps over the lazy dog. braille vision ai successfully recognized this document with high confidence.";

function ResultPage() {
  const [text, setText] = useState(DEMO_TEXT);
  const [zoom, setZoom] = useState(1);
  const confidence = 96.2;

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const download = (type: "txt" | "json") => {
    const content =
      type === "txt"
        ? text
        : JSON.stringify({ text, confidence, cells: 128, processing_ms: 1420 }, null, 2);
    const blob = new Blob([content], {
      type: type === "txt" ? "text/plain" : "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `recognition.${type}`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Downloaded ${type.toUpperCase()}`);
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <PageHeader title="Recognition Result" desc="Review, edit and export the recognized text." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/60">
          <CardContent className="p-6">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-sm font-semibold">Original Image</div>
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setZoom((z) => Math.min(2, z + 0.1))}
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-xl border border-border/60 bg-muted/30">
              <div
                className="relative aspect-[4/3] w-full transition-transform"
                style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}
              >
                <div className="absolute inset-0 grid grid-cols-16 grid-rows-12 gap-1 p-4">
                  {Array.from({ length: 16 * 12 }).map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-sm ${
                        i % 3 === 0 ? "bg-primary/60" : i % 5 === 0 ? "bg-primary/30" : "bg-muted"
                      }`}
                    />
                  ))}
                </div>
                <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 gap-2 p-3">
                  {Array.from({ length: 8 * 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="rounded-md border-2 border-primary/40"
                      style={{ opacity: 0.3 + ((i * 37) % 60) / 100 }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <span>Bounding boxes overlay</span>
              <span>·</span>
              <span>128 cells detected</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardContent className="p-6">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-sm font-semibold">Recognized Text</div>
              <Button variant="ghost" size="sm" onClick={copy}>
                <Copy className="mr-1.5 h-3.5 w-3.5" />
                Copy
              </Button>
            </div>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[180px] resize-none font-mono text-sm"
            />

            <div className="mt-5 space-y-3">
              <div>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Confidence Score</span>
                  <span className="font-semibold">{confidence}%</span>
                </div>
                <Progress value={confidence} className="h-2" />
              </div>
              <div className="grid grid-cols-3 gap-3 pt-2">
                <Stat label="Cells" value="128" />
                <Stat label="Characters" value={String(text.length)} />
                <Stat label="Time" value="1.42s" />
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2">
              <Button variant="outline" onClick={() => download("txt")}>
                <FileText className="mr-2 h-4 w-4" />
                Download TXT
              </Button>
              <Button variant="outline" onClick={() => download("json")}>
                <FileJson className="mr-2 h-4 w-4" />
                Download JSON
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border/60 bg-muted/30 p-3 text-center">
      <div className="text-lg font-bold">{value}</div>
      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
    </div>
  );
}
