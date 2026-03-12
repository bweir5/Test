const ASSET_ICONS = [
  { label: "Equities", icon: "📈", color: "#10B981" },
  { label: "Fixed Income", icon: "🏦", color: "#3B82F6" },
  { label: "Currencies", icon: "💱", color: "#8B5CF6" },
  { label: "Commodities", icon: "🛢️", color: "#F59E0B" },
  { label: "Alternatives", icon: "⚡", color: "#EC4899" },
  { label: "Macro Metrics", icon: "🌍", color: "#6366F1" },
];

const FEATURES = [
  "29 asset sub-categories",
  "CFA curriculum mapping",
  "Historical parallels",
  "Bull & bear risk scenarios",
  "Portfolio action checklist",
  "Live multi-source feed",
];

export function EmptyState() {
  return (
    <div className="animate-fade-in py-14 text-center">
      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        {ASSET_ICONS.map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
              style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}
            >
              {item.icon}
            </div>
            <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
        Real-World Markets for CFA Candidates &amp; Charterholders
      </h2>
      <p className="text-sm max-w-md mx-auto leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
        Select any headline from the live feed to instantly see how it maps to
        CFA curriculum topics, real historical parallels, and actionable
        portfolio positioning — with both candidate-level explanations and
        practitioner-grade analysis.
      </p>

      <div className="flex justify-center gap-2 flex-wrap">
        {FEATURES.map((f, i) => (
          <span
            key={i}
            className="text-xs px-3 py-1 rounded-full"
            style={{ background: "var(--bg-secondary)", color: "var(--text-muted)", border: "1px solid var(--border)" }}
          >
            {f}
          </span>
        ))}
      </div>
    </div>
  );
}
