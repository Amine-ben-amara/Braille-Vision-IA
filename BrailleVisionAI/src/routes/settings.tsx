import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Braille Vision AI" },
      { name: "description", content: "Configure the Braille Vision AI recognition engine." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const [theme, setTheme] = useState("system");
  const [lang, setLang] = useState("en");
  const [threshold, setThreshold] = useState([75]);
  const [size, setSize] = useState("1024");
  const [fmt, setFmt] = useState("txt");

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <PageHeader title="Settings" desc="Configure your recognition preferences." />
      <Card className="border-border/60">
        <CardContent className="space-y-6 p-6">
          <Field label="Theme">
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field label="Language">
            <Select value={lang} onValueChange={setLang}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="ar">العربية</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field label={`Recognition Threshold — ${threshold[0]}%`}>
            <Slider value={threshold} onValueChange={setThreshold} min={50} max={99} step={1} />
          </Field>

          <Field label="Image Size">
            <Select value={size} onValueChange={setSize}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="512">512 px</SelectItem>
                <SelectItem value="1024">1024 px</SelectItem>
                <SelectItem value="2048">2048 px</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field label="Export Format">
            <Select value={fmt} onValueChange={setFmt}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="txt">Plain Text (.txt)</SelectItem>
                <SelectItem value="json">JSON (.json)</SelectItem>
                <SelectItem value="pdf">PDF (.pdf)</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <div className="flex justify-end pt-2">
            <Button
              className="gradient-primary shadow-elegant"
              onClick={() => toast.success("Settings saved")}
            >
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
