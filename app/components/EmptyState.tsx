const ASSET_ICONS = [
  { label: "Equities", icon: "📈", color: "#10B981" },
  { label: "Fixed Income", icon: "🏦", color: "#3B82F6" },
  { label: "Currencies", icon: "💱", color: "#8B5CF6" },
  { label: "Commodities", icon: "🛢️", color: "#F59E0B" },
  { label: "Alternatives", icon: "⚡", color: "#EC4899" },
  { label: "Macro Metrics", icon: "🌍", color: "#6366F1" },
];

export function EmptyState() {
  return (
    <div className="animate-fade-in py-16 text-center">
      {/* Icon grid */}
      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        {ASSET_ICONS.map((item, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-2"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
              style={{
                background: `${item.color}15`,
                border: `1px solid ${item.color}30`,
              }}
            >
              {item.icon}
            </div>
            <span
              className="text-xs font-medium"
              style={{ color: "var(--text-muted)" }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <h2
        className="text-xl font-semibold mb-2"
        style={{ color: "var(--text-primary)" }}
      >
        CFA-Level Market Impact Analysis
      </h2>
      <p
        className="text-sm max-w-md mx-auto leading-relaxed"
        style={{ color: "var(--text-muted)" }}
      >
        Paste a Financial Times headline above to instantly see how it impacts
        equities, fixed income, currencies, commodities, and alternatives —
        analyzed with CFA charterholder rigor.
      </p>

      {/* Feature pills */}
      <div className="flex justify-center gap-2 mt-6 flex-wrap">
        {[
          "29 asset sub-categories",
          "5-point magnitude scale",
          "Macro regime assessment",
          "CFA professional insight",
        ].map((f, i) => (
          <span
            key={i}
            className="text-xs px-3 py-1 rounded-full"
            style={{
              background: "var(--bg-secondary)",
              color: "var(--text-muted)",
              border: "1px solid var(--border)",
            }}
          >
            {f}
          </span>
        ))}
      </div>
    </div>
  );
}
