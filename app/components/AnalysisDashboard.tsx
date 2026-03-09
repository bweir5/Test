"use client";

import { AnalysisResult } from "../types";
import { SummaryCards } from "./SummaryCards";
import { AssetSection } from "./AssetSection";
import { MacroMetricsCard } from "./MacroMetricsCard";

const EQUITY_LABELS: Record<string, string> = {
  global: "Global Equities",
  us_large_cap: "US Large Cap (S&P 500)",
  us_small_cap: "US Small Cap (Russell)",
  europe: "Europe (Stoxx 600)",
  emerging_markets: "Emerging Markets",
  china: "China (CSI 300)",
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
  gbp: "British Pound",
  jpy: "Japanese Yen",
  cny: "Chinese Yuan",
  em_fx: "EM Currencies",
};

const COMMODITY_LABELS: Record<string, string> = {
  crude_oil: "Crude Oil (WTI/Brent)",
  natural_gas: "Natural Gas",
  gold: "Gold",
  silver: "Silver",
  copper: "Copper (Dr. Copper)",
  agricultural: "Agricultural",
};

const ALTERNATIVE_LABELS: Record<string, string> = {
  real_estate_reits: "REITs / Real Estate",
  private_equity: "Private Equity",
  bitcoin: "Bitcoin / Crypto",
  volatility_vix: "Volatility (VIX)",
};

interface AnalysisDashboardProps {
  result: AnalysisResult;
}

export function AnalysisDashboard({ result }: AnalysisDashboardProps) {
  const { analysis, headline, timestamp } = result;

  return (
    <div className="animate-fade-in space-y-4">
      {/* Headline display */}
      <div
        className="rounded-xl px-4 py-3 flex items-start gap-3"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow)",
        }}
      >
        <div
          className="flex-shrink-0 w-1 self-stretch rounded-full"
          style={{ background: "#FD3D54" }}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="text-xs font-medium uppercase tracking-wider"
              style={{ color: "#FD3D54" }}
            >
              FT Headline
            </span>
            <span
              className="text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              {timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          <p
            className="font-semibold text-base leading-snug"
            style={{ color: "var(--text-primary)" }}
          >
            {headline}
          </p>
        </div>
      </div>

      {/* CFA Insight */}
      <div
        className="rounded-xl px-4 py-3"
        style={{
          background: "rgba(59,130,246,0.05)",
          border: "1px solid rgba(59,130,246,0.2)",
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div
            className="w-5 h-5 rounded flex items-center justify-center text-xs font-bold"
            style={{ background: "#3B82F6", color: "#fff" }}
          >
            ✦
          </div>
          <span
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "#3B82F6" }}
          >
            CFA Charterholder Analysis
          </span>
        </div>
        <p
          className="text-sm leading-relaxed mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          {analysis.headline_assessment.summary}
        </p>
        {analysis.cfa_insight && (
          <p
            className="text-sm leading-relaxed border-t pt-2"
            style={{
              color: "var(--text-secondary)",
              borderColor: "rgba(59,130,246,0.15)",
            }}
          >
            {analysis.cfa_insight}
          </p>
        )}
        {/* Key themes */}
        {analysis.headline_assessment.key_themes?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {analysis.headline_assessment.key_themes.map((theme, i) => (
              <span
                key={i}
                className="text-xs px-2 py-0.5 rounded-full"
                style={{
                  background: "rgba(59,130,246,0.1)",
                  color: "#3B82F6",
                  border: "1px solid rgba(59,130,246,0.2)",
                }}
              >
                {theme}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Summary cards */}
      <SummaryCards analysis={analysis} />

      {/* Asset sections grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <AssetSection
          title="Equities"
          icon="📈"
          color="#10B981"
          assets={analysis.asset_impacts.equities}
          labels={EQUITY_LABELS}
        />
        <AssetSection
          title="Fixed Income"
          icon="🏦"
          color="#3B82F6"
          assets={analysis.asset_impacts.fixed_income}
          labels={FIXED_INCOME_LABELS}
        />
        <AssetSection
          title="Currencies"
          icon="💱"
          color="#8B5CF6"
          assets={analysis.asset_impacts.currencies}
          labels={CURRENCY_LABELS}
        />
        <AssetSection
          title="Commodities"
          icon="🛢️"
          color="#F59E0B"
          assets={analysis.asset_impacts.commodities}
          labels={COMMODITY_LABELS}
        />
      </div>

      {/* Bottom row: alternatives + macro */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <AssetSection
          title="Alternative Investments"
          icon="⚡"
          color="#EC4899"
          assets={analysis.asset_impacts.alternatives}
          labels={ALTERNATIVE_LABELS}
        />
        <MacroMetricsCard metrics={analysis.macro_metrics} />
      </div>
    </div>
  );
}
