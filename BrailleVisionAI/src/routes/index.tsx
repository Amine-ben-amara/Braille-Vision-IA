import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { FileText, Type, Target, Timer, Sparkles, Upload, PlayCircle, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedCounter } from "@/components/animated-counter";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative overflow-hidden gradient-hero border-b border-border/60">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute top-20 right-0 h-80 w-80 rounded-full bg-primary-glow/40 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 py-20 lg:py-28">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <Sparkles className="h-3 w-3 text-primary" />
            AI Engineering Internship Project
          </div>
          <h1 className="max-w-3xl bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl">
            Braille Vision AI
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            AI-powered Braille document recognition using Computer Vision, Deep Learning and
            Liblouis.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="gradient-primary shadow-elegant">
              <Link to="/recognition">
                <Upload className="mr-2 h-4 w-4" />
                Upload Document
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/pipeline">
                <PlayCircle className="mr-2 h-4 w-4" />
                Live Demo
              </Link>
            </Button>
          </div>
          <div className="mt-16 flex items-center justify-center animate-float">
            <div className="grid h-32 w-32 place-items-center rounded-3xl gradient-primary shadow-glow">
              <Eye className="h-14 w-14 text-primary-foreground" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={FileText} label="Uploaded Documents" value={1284} />
          <StatCard icon={Type} label="Recognized Characters" value={48213} />
          <StatCard
            icon={Target}
            label="Recognition Accuracy"
            value={96.2}
            suffix="%"
            decimals={1}
          />
          <StatCard
            icon={Timer}
            label="Avg. Processing Time"
            value={1.42}
            suffix="s"
            decimals={2}
          />
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <FeatureCard
            title="OpenCV Preprocessing"
            desc="Denoise, threshold and align pages for consistent dot detection."
          />
          <FeatureCard
            title="MobileNetV3 Classifier"
            desc="Lightweight CNN trained on 26 Braille classes with strong top-3 accuracy."
          />
          <FeatureCard
            title="Liblouis Translation"
            desc="Industry-standard back-translation from Braille cells to plain text."
          />
        </div>
      </section>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  suffix,
  decimals = 0,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  suffix?: string;
  decimals?: number;
}) {
  return (
    <Card className="group relative overflow-hidden border-border/60 transition-all hover:-translate-y-0.5 hover:shadow-elegant">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
            <Icon className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-4 text-3xl font-bold tracking-tight">
          <AnimatedCounter value={value} suffix={suffix} decimals={decimals} />
        </div>
        <div className="mt-1 text-sm text-muted-foreground">{label}</div>
      </CardContent>
    </Card>
  );
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <Card className="glass transition-all hover:shadow-elegant">
      <CardContent className="p-6">
        <div className="mb-3 h-1 w-10 rounded-full gradient-primary" />
        <div className="font-semibold">{title}</div>
        <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
      </CardContent>
    </Card>
  );
}
