export type Direction = "bullish" | "bearish" | "neutral";
export type MacroDirection = "up" | "down" | "unchanged" | "wider" | "tighter" | "steeper" | "flatter";
export type Confidence = "high" | "medium" | "low";
export type MacroRegime = "risk-on" | "risk-off" | "neutral";
export type TimeHorizon = "immediate" | "short-term" | "medium-term" | "long-term";
export type CfaLevel = "L1" | "L2" | "L3";

export interface AssetImpact {
  direction: Direction;
  magnitude: number; // 1-5
  reasoning: string;
}

export interface MacroMetric {
  direction: MacroDirection;
  reasoning: string;
}

export interface CfaCurriculum {
  primaryTopic: string;       // e.g. "Economics: Monetary Policy & Tools"
  secondaryTopics: string[];  // e.g. ["Fixed Income: Duration & Convexity", "Portfolio Mgmt: Asset Allocation"]
  levelRelevance: CfaLevel[]; // which CFA levels this is most relevant to
}

export interface HistoricalParallel {
  event: string;   // e.g. "Volcker Fed rate hikes (1979–1981)"
  lesson: string;  // what happened and what we can learn
}

export interface KeyRisks {
  bullCase: string; // conditions that would make the impact less severe / positive
  bearCase: string; // conditions that would make the impact worse
}

export interface PortfolioAction {
  reduce: string[];   // asset classes / positions to reduce
  increase: string[]; // asset classes / positions to increase
  monitor: string[];  // leading indicators to watch closely
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
      global: AssetImpact; us_large_cap: AssetImpact; us_small_cap: AssetImpact;
      europe: AssetImpact; emerging_markets: AssetImpact; china: AssetImpact;
      tech_sector: AssetImpact; financials: AssetImpact; energy_sector: AssetImpact;
    };
    fixed_income: {
      us_treasuries: AssetImpact; german_bunds: AssetImpact;
      investment_grade_credit: AssetImpact; high_yield: AssetImpact;
      em_debt: AssetImpact; inflation_linked: AssetImpact;
    };
    currencies: {
      usd: AssetImpact; eur: AssetImpact; gbp: AssetImpact;
      jpy: AssetImpact; cny: AssetImpact; em_fx: AssetImpact;
    };
    commodities: {
      crude_oil: AssetImpact; natural_gas: AssetImpact; gold: AssetImpact;
      silver: AssetImpact; copper: AssetImpact; agricultural: AssetImpact;
    };
    alternatives: {
      real_estate_reits: AssetImpact; private_equity: AssetImpact;
      bitcoin: AssetImpact; volatility_vix: AssetImpact;
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
  candidate_explainer: string;
  historical_parallel: HistoricalParallel;
  key_risks: KeyRisks;
  portfolio_action: PortfolioAction;
  cfa_curriculum: CfaCurriculum;
}

export interface AnalysisResult {
  analysis: Analysis;
  headline: string;
  source?: string;
  timestamp: Date;
}

export interface NewsHeadline {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  category: string;
  source: string; // Reuters, CNBC, MarketWatch, Yahoo Finance, etc.
}

// Keep FTHeadline as alias for backward-compat
export type FTHeadline = NewsHeadline;

export interface MarketQuote {
  symbol: string;
  label: string;
  price: number;
  change: number;
  changePercent: number;
  unit?: string; // "%" for yields, "$" for prices, etc.
}
