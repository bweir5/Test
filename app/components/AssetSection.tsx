"use client";

import { AssetImpact } from "../types";
import { ImpactBadge } from "./ImpactBadge";

interface AssetSectionProps {
  title: string;
  icon: string;
  color: string;
  assets: Record<string, AssetImpact>;
  labels: Record<string, string>;
}

export function AssetSection({
  title,
  icon,
  color,
  assets,
  labels,
}: AssetSectionProps) {
  // Compute overall sentiment
  const items = Object.values(assets);
  const bullish = items.filter((a) => a.direction === "bullish").length;
  const bearish = items.filter((a) => a.direction === "bearish").length;
  const overall =
    bullish > bearish ? "bullish" : bearish > bullish ? "bearish" : "neutral";
  const avgMagnitude =
    items.reduce((s, a) => s + a.magnitude, 0) / items.length;

  const overallColors = {
    bullish: { text: "#10B981", bg: "rgba(16,185,129,0.08)" },
    bearish: { text: "#EF4444", bg: "rgba(239,68,68,0.08)" },
    neutral: { text: "#6B7280", bg: "rgba(107,114,128,0.08)" },
  };

  const oc = overallColors[overall];

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        border: "1px solid var(--border)",
        background: "var(--bg-card)",
        boxShadow: "var(--shadow)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{
          borderBottom: "1px solid var(--border)",
          background: "var(--bg-secondary)",
        }}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">{icon}</span>
          <span
            className="font-semibold text-sm"
            style={{ color: "var(--text-primary)" }}
          >
            {title}
          </span>
        </div>

        {/* Summary badges */}
        <div className="flex items-center gap-2">
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{ background: oc.bg, color: oc.text }}
          >
            {overall.charAt(0).toUpperCase() + overall.slice(1)} overall
          </span>
          <div
            className="flex gap-0.5 items-center"
            title="Avg magnitude"
          >
            {Array.from({ length: 5 }, (_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background:
                    i < Math.round(avgMagnitude) ? color : "var(--border)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Asset grid */}
      <div className="p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {Object.entries(assets).map(([key, impact]) => (
          <ImpactBadge
            key={key}
            impact={impact}
            name={labels[key] ?? key}
          />
        ))}
      </div>
    </div>
  );
}
