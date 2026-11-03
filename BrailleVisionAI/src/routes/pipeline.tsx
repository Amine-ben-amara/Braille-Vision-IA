import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Upload,
  Wand2,
  ScanLine,
  Grid3x3,
  Brain,
  Languages,
  FileText,
  CheckCircle2,
  Loader2,
  Circle,
  ArrowDown,
  Play,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/pipeline")({
  head: () => ({
    meta: [
      { title: "Processing Pipeline — Braille Vision AI" },
      {
        name: "description",
        content: "The complete AI recognition pipeline visualized step by step.",
      },
    ],
  }),
  component: PipelinePage,
});

const steps = [
  { icon: Upload, title: "Image Upload", desc: "Accept PNG/JPG/PDF from user." },
  {
    icon: Wand2,
    title: "OpenCV Preprocessing",
    desc: "Grayscale, denoise, adaptive threshold, deskew.",
  },
  {
    icon: ScanLine,
    title: "Braille Dot Detection",
    desc: "Blob detection and clustering to find raised dots.",
  },
  {
    icon: Grid3x3,
    title: "Braille Cell Segmentation",
    desc: "Group dots into 2×3 cells with adaptive grid.",
  },
  {
    icon: Brain,
    title: "MobileNetV3 Classification",
    desc: "Predict one of 26 Braille classes per cell.",
  },
  {
    icon: Languages,
    title: "Liblouis Translation",
    desc: "Back-translate Braille sequences to text.",
  },
  { icon: FileText, title: "Recognized Text", desc: "Confidence-scored, editable output." },
];

function PipelinePage() {
  const [running, setRunning] = useState(false);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    if (!running) return;
    if (active >= steps.length) {
      setRunning(false);
      return;
    }
    const t = setTimeout(() => setActive((a) => a + 1), 700);
    return () => clearTimeout(t);
  }, [running, active]);

  const start = () => {
    setActive(0);
    setRunning(true);
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <PageHeader
          title="Processing Pipeline"
          desc="Visualize the end-to-end AI recognition workflow."
        />
        <div className="flex gap-2">
          <Button onClick={start} disabled={running} className="gradient-primary shadow-elegant">
            <Play className="mr-2 h-4 w-4" />
            {running ? "Running…" : "Run Demo"}
          </Button>
          <Button asChild variant="outline">
            <Link to="/result">
              View Result
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {steps.map((s, i) => {
          const status = i < active ? "done" : i === active && running ? "running" : "pending";
          return (
            <div key={s.title}>
              <Card
                className={`border-border/60 transition-all ${
                  status === "running" ? "shadow-elegant ring-2 ring-primary/40" : ""
                }`}
              >
                <CardContent className="flex items-center gap-4 p-4">
                  <div
                    className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl transition-all ${
                      status === "done"
                        ? "bg-success/15 text-success"
                        : status === "running"
                          ? "gradient-primary text-primary-foreground shadow-elegant"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <s.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <div className="text-xs font-medium text-muted-foreground">Step {i + 1}</div>
                      <Badge
                        variant={
                          status === "done"
                            ? "default"
                            : status === "running"
                              ? "secondary"
                              : "outline"
                        }
                        className="text-[10px]"
                      >
                        {status}
                      </Badge>
                    </div>
                    <div className="truncate font-semibold">{s.title}</div>
                    <div className="mt-0.5 truncate text-sm text-muted-foreground">{s.desc}</div>
                    {status === "running" && <Progress value={60} className="mt-2 h-1" />}
                  </div>
                  <div className="shrink-0">
                    {status === "done" ? (
                      <CheckCircle2 className="h-5 w-5 text-success" />
                    ) : status === "running" ? (
                      <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground/40" />
                    )}
                  </div>
                </CardContent>
              </Card>
              {i < steps.length - 1 && (
                <div className="flex justify-center py-1">
                  <ArrowDown className="h-4 w-4 text-muted-foreground/50" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
