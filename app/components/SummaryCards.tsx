"use client";

import { Analysis } from "../types";

const REGIME_CONFIG = {
  "risk-on": {
    label: "Risk-On",
    color: "#10B981",
    bg: "rgba(16,185,129,0.1)",
    border: "rgba(16,185,129,0.25)",
    icon: "🟢",
    desc: "Appetite for risk assets",
  },
  "risk-off": {
    label: "Risk-Off",
    color: "#EF4444",
    bg: "rgba(239,68,68,0.1)",
    border: "rgba(239,68,68,0.25)",
    icon: "🔴",
    desc: "Flight to safety",
  },
  neutral: {
    label: "Neutral",
    color: "#6B7280",
    bg: "rgba(107,114,128,0.1)",
    border: "rgba(107,114,128,0.2)",
    icon: "⚪",
    desc: "Mixed signals",
  },
};

const CONFIDENCE_CONFIG = {
  high: { label: "High Confidence", color: "#10B981", dots: 3 },
  medium: { label: "Medium Confidence", color: "#F59E0B", dots: 2 },
  low: { label: "Low Confidence", color: "#6B7280", dots: 1 },
};

const TIME_CONFIG = {
  immediate: { label: "Immediate", color: "#EF4444" },
  "short-term": { label: "Short-Term (1-3M)", color: "#F59E0B" },
  "medium-term": { label: "Medium-Term (3-12M)", color: "#3B82F6" },
  "long-term": { label: "Long-Term (12M+)", color: "#8B5CF6" },
};

interface SummaryCardsProps {
  analysis: Analysis;
}

export function SummaryCards({ analysis }: SummaryCardsProps) {
  const { headline_assessment } = analysis;
  const regime =
    REGIME_CONFIG[headline_assessment.macro_regime] ?? REGIME_CONFIG.neutral;
  const confidence =
    CONFIDENCE_CONFIG[headline_assessment.confidence] ??
    CONFIDENCE_CONFIG.medium;
  const time =
    TIME_CONFIG[headline_assessment.time_horizon] ??
    TIME_CONFIG["short-term"];

  // Count impacts
  const allImpacts = [
    ...Object.values(analysis.asset_impacts.equities),
    ...Object.values(analysis.asset_impacts.fixed_income),
    ...Object.values(analysis.asset_impacts.currencies),
    ...Object.values(analysis.asset_impacts.commodities),
    ...Object.values(analysis.asset_impacts.alternatives),
  ];
  const bullishCount = allImpacts.filter((a) => a.direction === "bullish").length;
  const bearishCount = allImpacts.filter((a) => a.direction === "bearish").length;
  const total = allImpacts.length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
      {/* Macro Regime */}
      <div
        className="rounded-xl p-4"
        style={{
          border: `1px solid ${regime.border}`,
          background: regime.bg,
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">{regime.icon}</span>
          <span
            className="text-xs font-medium uppercase tracking-wider"
            style={{ color: regime.color }}
          >
            Macro Regime
          </span>
        </div>
        <div
          className="text-xl font-bold mb-1"
          style={{ color: regime.color }}
        >
          {regime.label}
        </div>
        <div className="text-xs" style={{ color: "var(--text-muted)" }}>
          {regime.desc}
        </div>
      </div>

      {/* Impact Distribution */}
      <div
        className="rounded-xl p-4"
        style={{
          border: "1px solid var(--border)",
          background: "var(--bg-card)",
          boxShadow: "var(--shadow)",
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span
            className="text-xs font-medium uppercase tracking-wider"
            style={{ color: "var(--text-muted)" }}
          >
            Impact Distribution
          </span>
        </div>
        {/* Bar chart */}
        <div className="flex items-end gap-1 h-8 mb-2">
          <div
            className="flex-none rounded-sm"
            style={{
              width: `${(bullishCount / total) * 100}%`,
              height: "100%",
              background: "#10B981",
              minWidth: bullishCount > 0 ? "8px" : "0",
            }}
          />
          <div
            className="flex-none rounded-sm"
            style={{
              width: `${(bearishCount / total) * 100}%`,
              height: "100%",
              background: "#EF4444",
              minWidth: bearishCount > 0 ? "8px" : "0",
            }}
          />
          <div
            className="flex-1 rounded-sm"
            style={{
              height: "60%",
              background: "var(--border)",
            }}
          />
        </div>
        <div className="flex gap-3 text-xs">
          <span style={{ color: "#10B981" }}>
            ↑ {bullishCount} bullish
          </span>
          <span style={{ color: "#EF4444" }}>
            ↓ {bearishCount} bearish
          </span>
          <span style={{ color: "var(--text-muted)" }}>
            → {total - bullishCount - bearishCount} neutral
          </span>
        </div>
      </div>

      {/* Confidence & Time */}
      <div
        className="rounded-xl p-4"
        style={{
          border: "1px solid var(--border)",
          background: "var(--bg-card)",
          boxShadow: "var(--shadow)",
        }}
      >
        <div
          className="text-xs font-medium uppercase tracking-wider mb-2"
          style={{ color: "var(--text-muted)" }}
        >
          Signal Quality
        </div>

        <div className="flex items-center gap-2 mb-2">
          <div className="flex gap-1">
            {Array.from({ length: 3 }, (_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full"
                style={{
                  background:
                    i < confidence.dots
                      ? confidence.color
                      : "var(--border)",
                }}
              />
            ))}
          </div>
          <span
            className="text-xs font-medium"
            style={{ color: confidence.color }}
          >
            {confidence.label}
          </span>
        </div>

        <div
          className="inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-full"
          style={{
            background: `${time.color}15`,
            color: time.color,
          }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {time.label}
        </div>
      </div>
    </div>
  );
}
