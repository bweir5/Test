"use client";

import { MacroMetric, MacroDirection } from "../types";

const METRIC_LABELS: Record<string, string> = {
  interest_rates: "Interest Rates",
  inflation: "Inflation",
  growth: "GDP Growth",
  credit_spreads: "Credit Spreads",
  yield_curve: "Yield Curve",
};

const DIRECTION_ICONS: Record<MacroDirection, string> = {
  up: "↑",
  down: "↓",
  unchanged: "→",
  wider: "⟷",
  tighter: "⟵⟶",
  steeper: "↗",
  flatter: "⟶",
};

const DIRECTION_COLORS: Record<MacroDirection, { color: string; bg: string }> = {
  up: { color: "#EF4444", bg: "rgba(239,68,68,0.1)" },
  down: { color: "#10B981", bg: "rgba(16,185,129,0.1)" },
  unchanged: { color: "#6B7280", bg: "rgba(107,114,128,0.1)" },
  wider: { color: "#EF4444", bg: "rgba(239,68,68,0.1)" },
  tighter: { color: "#10B981", bg: "rgba(16,185,129,0.1)" },
  steeper: { color: "#F59E0B", bg: "rgba(245,158,11,0.1)" },
  flatter: { color: "#8B5CF6", bg: "rgba(139,92,246,0.1)" },
};

interface MacroMetricsCardProps {
  metrics: Record<string, MacroMetric>;
}

export function MacroMetricsCard({ metrics }: MacroMetricsCardProps) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        border: "1px solid var(--border)",
        background: "var(--bg-card)",
        boxShadow: "var(--shadow)",
      }}
    >
      <div
        className="px-4 py-3 flex items-center gap-2"
        style={{
          borderBottom: "1px solid var(--border)",
          background: "var(--bg-secondary)",
        }}
      >
        <span className="text-lg">🌍</span>
        <span
          className="font-semibold text-sm"
          style={{ color: "var(--text-primary)" }}
        >
          Macro Metrics
        </span>
      </div>

      <div className="p-4 grid grid-cols-1 gap-3">
        {Object.entries(metrics).map(([key, metric]) => {
          const dir = metric.direction as MacroDirection;
          const dc = DIRECTION_COLORS[dir] ?? DIRECTION_COLORS.unchanged;
          const icon = DIRECTION_ICONS[dir] ?? "→";

          return (
            <div key={key} className="flex items-start gap-3">
              <div
                className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
                style={{ background: dc.bg, color: dc.color }}
              >
                {icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span
                    className="text-xs font-medium"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {METRIC_LABELS[key] ?? key}
                  </span>
                  <span
                    className="text-xs px-1.5 py-0.5 rounded font-medium capitalize"
                    style={{ background: dc.bg, color: dc.color }}
                  >
                    {metric.direction}
                  </span>
                </div>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  {metric.reasoning}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
