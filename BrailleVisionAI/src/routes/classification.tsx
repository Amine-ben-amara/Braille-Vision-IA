import { createFileRoute } from "@tanstack/react-router";
import { Brain, Database, Target, Trophy, HardDrive, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/classification")({
  head: () => ({
    meta: [
      { title: "Classification Model — Braille Vision AI" },
      { name: "description", content: "MobileNetV3 Small classifier details and metrics." },
    ],
  }),
  component: ClassificationPage,
});

const metrics = [
  { icon: Brain, label: "Model", value: "MobileNetV3 Small", accent: "primary" },
  { icon: Database, label: "Dataset Classes", value: "26" },
  { icon: Target, label: "Training Accuracy", value: "97.8%" },
  { icon: Trophy, label: "Top-3 Accuracy", value: "99.4%" },
  { icon: HardDrive, label: "Model Size", value: "9.2 MB" },
  { icon: Zap, label: "Inference Time", value: "12 ms" },
];

function ClassificationPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <PageHeader title="Classification" desc="Model architecture and evaluation metrics." />

      <Card className="mb-6 border-border/60 overflow-hidden">
        <div className="gradient-primary p-6 text-primary-foreground">
          <div className="flex flex-wrap items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/20 backdrop-blur">
              <Brain className="h-7 w-7" />
            </div>
            <div className="min-w-0">
              <div className="text-xs uppercase tracking-wider opacity-80">Current AI Model</div>
              <div className="truncate text-2xl font-bold">MobileNetV3 Small</div>
              <div className="mt-1 flex gap-2">
                <Badge variant="secondary">Production</Badge>
                <Badge variant="secondary">v1.2.0</Badge>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((m) => (
          <Card
            key={m.label}
            className="border-border/60 transition-all hover:-translate-y-0.5 hover:shadow-elegant"
          >
            <CardContent className="p-5">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <m.icon className="h-5 w-5" />
              </div>
              <div className="mt-4 text-2xl font-bold tracking-tight">{m.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{m.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6 border-border/60">
        <CardContent className="p-6">
          <div className="mb-4 text-sm font-semibold">Class Coverage</div>
          <div className="grid grid-cols-6 gap-2 sm:grid-cols-13">
            {Array.from({ length: 26 }).map((_, i) => (
              <div
                key={i}
                className="grid aspect-square place-items-center rounded-lg border border-border/60 bg-muted/40 text-sm font-semibold"
              >
                {String.fromCharCode(97 + i)}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
