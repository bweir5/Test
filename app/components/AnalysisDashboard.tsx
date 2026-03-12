"use client";

import { useState } from "react";
import { AnalysisResult } from "../types";
import { SummaryCards } from "./SummaryCards";
import { AssetSection } from "./AssetSection";
import { MacroMetricsCard } from "./MacroMetricsCard";

const EQUITY_LABELS: Record<string, string> = {
  global: "Global Equities",
  us_large_cap: "US Large Cap (S&P 500)",
  us_small_cap: "US Small Cap (Russell 2000)",
  europe: "Europe (Stoxx 600)",
  emerging_markets: "Emerging Markets",
  china: "China (CSI 300 / H-Shares)",
  tech_sector: "Technology Sector",
  financials: "Financials",
  energy_sector: "Energy Sector",
};

const FIXED_INCOME_LABELS: Record<string, string> = {
  us_treasuries: "US Treasuries",
  german_bunds: "German Bunds",
  investment_grade_credit: "Investment Grade Credit",
  high_yield: "High Yield Bonds",
  em_debt: "EM Sovereign Debt",
  inflation_linked: "Inflation-Linked (TIPS)",
};

const CURRENCY_LABELS: Record<string, string> = {
  usd: "US Dollar (DXY)",
  eur: "Euro (EUR/USD)",
  gbp: "British Pound (GBP/USD)",
  jpy: "Japanese Yen (USD/JPY)",
  cny: "Chinese Yuan (USD/CNY)",
  em_fx: "EM Currencies (Basket)",
};

const COMMODITY_LABELS: Record<string, string> = {
  crude_oil: "Crude Oil (WTI / Brent)",
  natural_gas: "Natural Gas (Henry Hub)",
  gold: "Gold (XAU/USD)",
  silver: "Silver (XAG/USD)",
  copper: "Copper (LME)",
  agricultural: "Agricultural (Wheat, Corn, Soy)",
};

const ALTERNATIVE_LABELS: Record<string, string> = {
  real_estate_reits: "REITs / Real Estate",
  private_equity: "Private Equity",
  bitcoin: "Bitcoin / Digital Assets",
  volatility_vix: "Volatility (VIX)",
};

const LEVEL_COLORS: Record<string, { bg: string; color: string; border: string }> = {
  L1: { bg: "rgba(16,185,129,0.1)", color: "#10B981", border: "rgba(16,185,129,0.3)" },
  L2: { bg: "rgba(59,130,246,0.1)", color: "#3B82F6", border: "rgba(59,130,246,0.3)" },
  L3: { bg: "rgba(139,92,246,0.1)", color: "#8B5CF6", border: "rgba(139,92,246,0.3)" },
};

interface Props { result: AnalysisResult; }

export function AnalysisDashboard({ result }: Props) {
  const [activeTab, setActiveTab] = useState<"impact" | "study">("impact");
  const { analysis, headline, source, timestamp } = result;

  const sourceLabel = source || "Live Feed";

  return (
    <div className="animate-fade-in space-y-4">
      {/* Headline card */}
      <div
        className="rounded-xl px-4 py-3 flex items-start gap-3"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow)" }}
      >
        <div className="flex-shrink-0 w-1 self-stretch rounded-full" style={{ background: "#FD3D54" }} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#FD3D54" }}>
              {sourceLabel}
            </span>
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              {timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
          <p className="font-semibold text-base leading-snug" style={{ color: "var(--text-primary)" }}>
            {headline}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}>
        {([["impact", "Market Impact"], ["study", "Study Notes"]] as const).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className="flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all cursor-pointer"
            style={{
              background: activeTab === id ? "var(--bg-card)" : "transparent",
              color: activeTab === id ? "var(--text-primary)" : "var(--text-muted)",
              boxShadow: activeTab === id ? "var(--shadow)" : "none",
              border: activeTab === id ? "1px solid var(--border)" : "1px solid transparent",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {activeTab === "impact" ? (
        <>
          {/* CFA Charterholder Analysis */}
          <div
            className="rounded-xl px-4 py-4"
            style={{ background: "rgba(59,130,246,0.05)", border: "1px solid rgba(59,130,246,0.2)" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded flex items-center justify-center text-xs font-bold" style={{ background: "#3B82F6", color: "#fff" }}>
                ✦
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#3B82F6" }}>
                Charterholder Analysis
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-primary)" }}>
              {analysis.headline_assessment.summary}
            </p>
            {analysis.cfa_insight && (
              <p className="text-sm leading-relaxed pt-3 border-t" style={{ color: "var(--text-secondary)", borderColor: "rgba(59,130,246,0.15)" }}>
                {analysis.cfa_insight}
              </p>
            )}
            {analysis.headline_assessment.key_themes?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {analysis.headline_assessment.key_themes.map((theme, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: "rgba(59,130,246,0.1)", color: "#3B82F6", border: "1px solid rgba(59,130,246,0.2)" }}
                  >
                    {theme}
                  </span>
                ))}
              </div>
            )}
          </div>

          <SummaryCards analysis={analysis} />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <AssetSection title="Equities" icon="📈" color="#10B981" assets={analysis.asset_impacts.equities} labels={EQUITY_LABELS} />
            <AssetSection title="Fixed Income" icon="🏦" color="#3B82F6" assets={analysis.asset_impacts.fixed_income} labels={FIXED_INCOME_LABELS} />
            <AssetSection title="Currencies" icon="💱" color="#8B5CF6" assets={analysis.asset_impacts.currencies} labels={CURRENCY_LABELS} />
            <AssetSection title="Commodities" icon="🛢️" color="#F59E0B" assets={analysis.asset_impacts.commodities} labels={COMMODITY_LABELS} />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <AssetSection title="Alternative Investments" icon="⚡" color="#EC4899" assets={analysis.asset_impacts.alternatives} labels={ALTERNATIVE_LABELS} />
            <MacroMetricsCard metrics={analysis.macro_metrics} />
          </div>
        </>
      ) : (
        <div className="space-y-4">
          {/* CFA Curriculum tags */}
          {analysis.cfa_curriculum && (
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                  CFA Curriculum
                </span>
                <div className="flex gap-1">
                  {analysis.cfa_curriculum.levelRelevance.map((lvl) => {
                    const c = LEVEL_COLORS[lvl];
                    return (
                      <span key={lvl} className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: c.bg, color: c.color, border: `1px solid ${c.border}` }}>
                        {lvl}
                      </span>
                    );
                  })}
                </div>
              </div>
              <p className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                {analysis.cfa_curriculum.primaryTopic}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {analysis.cfa_curriculum.secondaryTopics.map((t, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-lg" style={{ background: "var(--bg-secondary)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Candidate explainer */}
          {analysis.candidate_explainer && (
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "rgba(16,185,129,0.04)", border: "1px solid rgba(16,185,129,0.2)" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5">
                  <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#10B981" }}>
                  Candidate Explainer
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-primary)" }}>
                {analysis.candidate_explainer}
              </p>
            </div>
          )}

          {/* Historical parallel */}
          {analysis.historical_parallel && (
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.2)" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#F59E0B" }}>
                  Historical Parallel
                </span>
              </div>
              <p className="text-sm font-semibold mb-1.5" style={{ color: "var(--text-primary)" }}>
                {analysis.historical_parallel.event}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {analysis.historical_parallel.lesson}
              </p>
            </div>
          )}

          {/* Key risks */}
          {analysis.key_risks && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                className="rounded-xl px-4 py-4"
                style={{ background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.2)" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#10B981" }}>
                    ↑ Bull Case
                  </span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {analysis.key_risks.bullCase}
                </p>
              </div>
              <div
                className="rounded-xl px-4 py-4"
                style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.2)" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#EF4444" }}>
                    ↓ Bear Case
                  </span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {analysis.key_risks.bearCase}
                </p>
              </div>
            </div>
          )}

          {/* Portfolio action */}
          {analysis.portfolio_action && (
            <div
              className="rounded-xl px-4 py-4"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
                </svg>
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                  Portfolio Actions
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: "Reduce", items: analysis.portfolio_action.reduce, color: "#EF4444", bg: "rgba(239,68,68,0.06)" },
                  { label: "Increase", items: analysis.portfolio_action.increase, color: "#10B981", bg: "rgba(16,185,129,0.06)" },
                  { label: "Monitor", items: analysis.portfolio_action.monitor, color: "#F59E0B", bg: "rgba(245,158,11,0.06)" },
                ].map(({ label, items, color, bg }) => (
                  <div key={label} className="rounded-lg px-3 py-3" style={{ background: bg }}>
                    <p className="text-xs font-semibold mb-2" style={{ color }}>{label}</p>
                    <ul className="space-y-1.5">
                      {items.map((item, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-xs mt-0.5" style={{ color }}>•</span>
                          <span className="text-xs leading-snug" style={{ color: "var(--text-secondary)" }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
