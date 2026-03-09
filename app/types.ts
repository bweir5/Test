export type Direction = "bullish" | "bearish" | "neutral";
export type MacroDirection = "up" | "down" | "unchanged" | "wider" | "tighter" | "steeper" | "flatter";
export type Confidence = "high" | "medium" | "low";
export type MacroRegime = "risk-on" | "risk-off" | "neutral";
export type TimeHorizon = "immediate" | "short-term" | "medium-term" | "long-term";

export interface AssetImpact {
  direction: Direction;
  magnitude: number; // 1-5
  reasoning: string;
}

export interface MacroMetric {
  direction: MacroDirection;
  reasoning: string;
}

export interface Analysis {
  headline_assessment: {
    summary: string;
    key_themes: string[];
    time_horizon: TimeHorizon;
    confidence: Confidence;
    macro_regime: MacroRegime;
  };
  asset_impacts: {
    equities: {
      global: AssetImpact;
      us_large_cap: AssetImpact;
      us_small_cap: AssetImpact;
      europe: AssetImpact;
      emerging_markets: AssetImpact;
      china: AssetImpact;
      tech_sector: AssetImpact;
      financials: AssetImpact;
      energy_sector: AssetImpact;
    };
    fixed_income: {
      us_treasuries: AssetImpact;
      german_bunds: AssetImpact;
      investment_grade_credit: AssetImpact;
      high_yield: AssetImpact;
      em_debt: AssetImpact;
      inflation_linked: AssetImpact;
    };
    currencies: {
      usd: AssetImpact;
      eur: AssetImpact;
      gbp: AssetImpact;
      jpy: AssetImpact;
      cny: AssetImpact;
      em_fx: AssetImpact;
    };
    commodities: {
      crude_oil: AssetImpact;
      natural_gas: AssetImpact;
      gold: AssetImpact;
      silver: AssetImpact;
      copper: AssetImpact;
      agricultural: AssetImpact;
    };
    alternatives: {
      real_estate_reits: AssetImpact;
      private_equity: AssetImpact;
      bitcoin: AssetImpact;
      volatility_vix: AssetImpact;
    };
  };
  macro_metrics: {
    interest_rates: MacroMetric;
    inflation: MacroMetric;
    growth: MacroMetric;
    credit_spreads: MacroMetric;
    yield_curve: MacroMetric;
  };
  cfa_insight: string;
}

export interface AnalysisResult {
  analysis: Analysis;
  headline: string;
  timestamp: Date;
}

export interface FTHeadline {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  category: string;
}
