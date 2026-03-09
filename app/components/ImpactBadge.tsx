"use client";

import { AssetImpact, Direction } from "../types";

const DIRECTION_CONFIG = {
  bullish: {
    color: "#10B981",
    bg: "rgba(16,185,129,0.1)",
    border: "rgba(16,185,129,0.25)",
    icon: "↑",
    label: "Bullish",
  },
  bearish: {
    color: "#EF4444",
    bg: "rgba(239,68,68,0.1)",
    border: "rgba(239,68,68,0.25)",
    icon: "↓",
    label: "Bearish",
  },
  neutral: {
    color: "#6B7280",
    bg: "rgba(107,114,128,0.1)",
    border: "rgba(107,114,128,0.2)",
    icon: "→",
    label: "Neutral",
  },
};

interface ImpactBadgeProps {
  impact: AssetImpact;
  name: string;
  showReasoning?: boolean;
}

export function ImpactBadge({
  impact,
  name,
  showReasoning = true,
}: ImpactBadgeProps) {
  const config = DIRECTION_CONFIG[impact.direction] ?? DIRECTION_CONFIG.neutral;
  const magnitude = Math.min(5, Math.max(1, Math.round(impact.magnitude)));

  return (
    <div
      className="group relative rounded-lg p-3 transition-all hover:scale-[1.01]"
      style={{
        background: "var(--bg-secondary)",
        border: "1px solid var(--border)",
      }}
    >
      {/* Asset name & direction */}
      <div className="flex items-center justify-between mb-2">
        <span
          className="text-xs font-medium"
          style={{ color: "var(--text-secondary)" }}
        >
          {name}
        </span>
        <span
          className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
          style={{
            color: config.color,
            background: config.bg,
            border: `1px solid ${config.border}`,
          }}
        >
          {config.icon} {config.label}
        </span>
      </div>

      {/* Magnitude bars */}
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={i}
            className="flex-1 h-1.5 rounded-full transition-all"
            style={{
              background: i < magnitude ? config.color : "var(--border)",
              opacity: i < magnitude ? 1 - i * 0.15 : 0.3,
            }}
          />
        ))}
        <span
          className="ml-1 text-xs tabular-nums"
          style={{ color: "var(--text-muted)" }}
        >
          {magnitude}/5
        </span>
      </div>

      {/* Reasoning tooltip on hover */}
      {showReasoning && impact.reasoning && (
        <div
          className="mt-2 text-xs leading-relaxed line-clamp-2"
          style={{ color: "var(--text-muted)" }}
        >
          {impact.reasoning}
        </div>
      )}
    </div>
  );
}

interface DirectionArrowProps {
  direction: Direction;
  size?: "sm" | "md" | "lg";
}

export function DirectionArrow({
  direction,
  size = "md",
}: DirectionArrowProps) {
  const config = DIRECTION_CONFIG[direction] ?? DIRECTION_CONFIG.neutral;
  const sizes = { sm: "w-5 h-5 text-xs", md: "w-7 h-7 text-sm", lg: "w-10 h-10 text-base" };

  return (
    <div
      className={`${sizes[size]} rounded-full flex items-center justify-center font-bold`}
      style={{
        background: config.bg,
        color: config.color,
        border: `1px solid ${config.border}`,
      }}
    >
      {config.icon}
    </div>
  );
}
