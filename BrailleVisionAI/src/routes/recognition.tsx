import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useRef, useState } from "react";
import { UploadCloud, FileImage, X, Loader2, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Link } from "@tanstack/react-router";
import { api } from "@/lib/api";

export const Route = createFileRoute("/recognition")({
  head: () => ({
    meta: [
      { title: "Document Recognition — Braille Vision AI" },
      { name: "description", content: "Upload a Braille document to recognize with AI." },
    ],
  }),
  component: RecognitionPage,
});

const ACCEPT = ".png,.jpg,.jpeg,.bmp,.tiff,.pdf";

function RecognitionPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((f: File) => {
    setFile(f);
    if (f.type.startsWith("image/")) {
      const url = URL.createObjectURL(f);
      setPreview(url);
    } else {
      setPreview(null);
    }
    setUploading(true);
    setProgress(0);
    const iv = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(iv);
          setUploading(false);
          void api.upload(f);
          toast.success("Document uploaded", { description: f.name });
          return 100;
        }
        return p + 8;
      });
    }, 80);
  }, []);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setProgress(0);
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <PageHeader
        title="Document Recognition"
        desc="Drag & drop a Braille document to begin. Supported formats: PNG, JPG, JPEG, BMP, TIFF, PDF."
      />

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3 border-border/60">
          <CardContent className="p-6">
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              onClick={() => inputRef.current?.click()}
              className={`group relative flex min-h-[320px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition-all ${
                dragging
                  ? "border-primary bg-primary/5"
                  : "border-border/70 hover:border-primary/60 hover:bg-muted/40"
              }`}
            >
              <input
                ref={inputRef}
                type="file"
                accept={ACCEPT}
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFile(f);
                }}
              />
              <div className="grid h-16 w-16 place-items-center rounded-2xl gradient-primary shadow-elegant transition-transform group-hover:scale-105">
                <UploadCloud className="h-8 w-8 text-primary-foreground" />
              </div>
              <div className="mt-5 text-lg font-semibold">Drop your document here</div>
              <div className="mt-1 text-sm text-muted-foreground">or click to browse files</div>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {["PNG", "JPG", "JPEG", "BMP", "TIFF", "PDF"].map((t) => (
                  <Badge key={t} variant="secondary" className="text-xs">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>

            {file && (
              <div className="mt-6 space-y-3 rounded-xl border border-border/60 bg-muted/30 p-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <FileImage className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{file.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {(file.size / 1024).toFixed(1)} KB
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={reset}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <Progress value={progress} className="h-2" />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{uploading ? "Uploading…" : "Ready"}</span>
                  <span>{progress}%</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 border-border/60">
          <CardContent className="p-6">
            <div className="mb-4 text-sm font-semibold">Document Information</div>
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="mb-4 aspect-video w-full rounded-xl border border-border/60 object-cover"
              />
            ) : (
              <div className="mb-4 grid aspect-video w-full place-items-center rounded-xl border border-dashed border-border/60 bg-muted/30 text-xs text-muted-foreground">
                Preview appears here
              </div>
            )}
            <InfoRow
              label="Image Size"
              value={file ? `${(file.size / 1024).toFixed(1)} KB` : "—"}
            />
            <InfoRow label="Resolution" value={file ? "1024 × 768" : "—"} />
            <InfoRow label="File Size" value={file ? `${(file.size / 1024).toFixed(1)} KB` : "—"} />
            <InfoRow
              label="Format"
              value={file ? (file.name.split(".").pop()?.toUpperCase() ?? "—") : "—"}
            />

            <Button
              asChild
              disabled={!file || uploading}
              className="mt-6 w-full gradient-primary shadow-elegant"
            >
              <Link to="/pipeline">
                {uploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing…
                  </>
                ) : (
                  <>
                    Process Document
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border/40 py-2 text-sm last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

export function PageHeader({ title, desc }: { title: string; desc?: string }) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      {desc && <p className="mt-2 text-sm text-muted-foreground">{desc}</p>}
    </div>
  );
}
