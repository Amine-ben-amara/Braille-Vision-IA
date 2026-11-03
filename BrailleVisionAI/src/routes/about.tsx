import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/page-header";
import { Eye } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Braille Vision AI" },
      { name: "description", content: "About the Braille Vision AI project." },
    ],
  }),
  component: AboutPage,
});

const tech = [
  "Python",
  "OpenCV",
  "TensorFlow",
  "MobileNetV3",
  "Liblouis",
  "FastAPI",
  "React",
  "Tailwind CSS",
];

const datasets = ["DSBI", "Braille Character Dataset", "Braille Character Image Dataset"];

function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <PageHeader title="About" desc="The story and stack behind Braille Vision AI." />

      <Card className="mb-6 border-border/60 overflow-hidden">
        <div className="gradient-hero p-8">
          <div className="grid h-16 w-16 place-items-center rounded-2xl gradient-primary shadow-elegant">
            <Eye className="h-8 w-8 text-primary-foreground" />
          </div>
          <h2 className="mt-5 text-2xl font-bold">Making Braille documents machine-readable</h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Braille Vision AI is an intelligent Braille document recognition system developed during
            an AI engineering internship. It combines classical computer vision, deep learning, and
            the Liblouis translator to turn scanned Braille pages into editable text, at scale and
            with high accuracy.
          </p>
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border/60">
          <CardContent className="p-6">
            <div className="mb-3 text-sm font-semibold">Technologies</div>
            <div className="flex flex-wrap gap-2">
              {tech.map((t) => (
                <Badge key={t} variant="secondary" className="text-xs">
                  {t}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/60">
          <CardContent className="p-6">
            <div className="mb-3 text-sm font-semibold">Datasets</div>
            <ul className="space-y-2 text-sm">
              {datasets.map((d) => (
                <li key={d} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full gradient-primary" />
                  {d}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
