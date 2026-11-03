import { createFileRoute } from "@tanstack/react-router";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Statistics — Braille Vision AI" },
      { name: "description", content: "Recognition analytics and model performance charts." },
    ],
  }),
  component: AnalyticsPage,
});

const accuracyData = Array.from({ length: 12 }).map((_, i) => ({
  epoch: `E${i + 1}`,
  accuracy: 70 + i * 2.3 + Math.random() * 2,
}));

const distData = "abcdefghij".split("").map((c) => ({
  char: c,
  count: Math.round(20 + Math.random() * 80),
}));

const confData = Array.from({ length: 10 }).map((_, i) => ({
  bucket: `${i * 10}-${i * 10 + 10}`,
  count: Math.round(Math.random() * 30 + (i > 6 ? 50 : 10)),
}));

const timeData = Array.from({ length: 14 }).map((_, i) => ({
  day: `D${i + 1}`,
  ms: 1200 + Math.round(Math.random() * 500),
}));

const pieData = "abcdef".split("").map((c, i) => ({
  name: c,
  value: 30 + i * 8,
}));

const COLORS = [
  "oklch(0.55 0.2 255)",
  "oklch(0.72 0.17 245)",
  "oklch(0.65 0.18 220)",
  "oklch(0.6 0.15 200)",
  "oklch(0.7 0.13 280)",
  "oklch(0.55 0.22 300)",
];

function AnalyticsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <PageHeader title="Statistics" desc="Model performance and recognition analytics." />
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Recognition Accuracy" desc="Per training epoch">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={accuracyData}>
              <defs>
                <linearGradient id="acc" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.55 0.2 255)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="oklch(0.55 0.2 255)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="epoch" stroke="var(--muted-foreground)" fontSize={11} />
              <YAxis stroke="var(--muted-foreground)" fontSize={11} />
              <Tooltip
                contentStyle={{
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                }}
              />
              <Area
                type="monotone"
                dataKey="accuracy"
                stroke="oklch(0.55 0.2 255)"
                strokeWidth={2}
                fill="url(#acc)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Character Distribution" desc="Top recognized characters">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={distData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="char" stroke="var(--muted-foreground)" fontSize={11} />
              <YAxis stroke="var(--muted-foreground)" fontSize={11} />
              <Tooltip
                contentStyle={{
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                }}
              />
              <Bar dataKey="count" fill="oklch(0.55 0.2 255)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Confidence Histogram" desc="Predictions by confidence bucket">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={confData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="bucket" stroke="var(--muted-foreground)" fontSize={10} />
              <YAxis stroke="var(--muted-foreground)" fontSize={11} />
              <Tooltip
                contentStyle={{
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                }}
              />
              <Bar dataKey="count" fill="oklch(0.72 0.17 245)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Processing Time" desc="Milliseconds per document, last 14 days">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={timeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={11} />
              <YAxis stroke="var(--muted-foreground)" fontSize={11} />
              <Tooltip
                contentStyle={{
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                }}
              />
              <Line
                type="monotone"
                dataKey="ms"
                stroke="oklch(0.55 0.2 255)"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Recognized Letters" desc="Share by letter" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

function ChartCard({
  title,
  desc,
  children,
  className = "",
}: {
  title: string;
  desc?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={`border-border/60 ${className}`}>
      <CardContent className="p-6">
        <div className="mb-4">
          <div className="text-sm font-semibold">{title}</div>
          {desc && <div className="text-xs text-muted-foreground">{desc}</div>}
        </div>
        {children}
      </CardContent>
    </Card>
  );
}
