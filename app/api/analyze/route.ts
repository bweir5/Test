import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 10;

type Direction = "bullish" | "bearish" | "neutral";
type MacroDirection = "up" | "down" | "unchanged";
type SpreadDirection = "wider" | "tighter" | "unchanged";
type CurveDirection = "steeper" | "flatter" | "unchanged";
type MacroRegime = "risk-on" | "risk-off" | "neutral";
type TimeHorizon = "immediate" | "short-term" | "medium-term" | "long-term";
type Confidence = "high" | "medium" | "low";

interface AssetImpact {
  direction: Direction;
  magnitude: number;
  reasoning: string;
}

interface Theme {
  name: string;
  keywords: string[];
  invertKeywords?: string[];
  regime: MacroRegime;
  horizon: TimeHorizon;
  confidence: Confidence;
  keyThemes: string[];
  summary: string;
  cfaInsight: string;
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
  macro_metrics: {
    interest_rates: { direction: MacroDirection; reasoning: string };
    inflation: { direction: MacroDirection; reasoning: string };
    growth: { direction: MacroDirection; reasoning: string };
    credit_spreads: { direction: SpreadDirection; reasoning: string };
    yield_curve: { direction: CurveDirection; reasoning: string };
  };
}

const THEMES: Theme[] = [
  {
    name: "rate_hike_hawkish",
    keywords: ["rate hike", "rate rise", "raises rates", "interest rate increase", "hawkish", "tightening", "hikes rates", "rate increase", "raises interest", "boe raises", "fed raises", "ecb raises", "central bank raises"],
    regime: "risk-off",
    horizon: "short-term",
    confidence: "high",
    keyThemes: ["Monetary tightening", "Higher borrowing costs", "Yield curve pressure"],
    summary: "A rate hike signals central bank determination to combat inflation, raising the cost of capital across the economy. This is a classic risk-off catalyst that compresses equity valuations via higher discount rates and inverts the yield curve. Fixed income markets re-price duration risk immediately.",
    cfaInsight: "Portfolio managers should reduce duration exposure and rotate from growth to value equities. The higher-for-longer narrative pressures leveraged balance sheets and long-duration assets disproportionately. Contrarian opportunity exists in financials, which benefit from wider net interest margins.",
    equities: {
      global: { direction: "bearish", magnitude: 3, reasoning: "Higher discount rates compress valuations globally" },
      us_large_cap: { direction: "bearish", magnitude: 3, reasoning: "Valuation compression from higher risk-free rate" },
      us_small_cap: { direction: "bearish", magnitude: 4, reasoning: "Small caps more sensitive to financing costs" },
      europe: { direction: "bearish", magnitude: 3, reasoning: "European equities re-price on tighter conditions" },
      emerging_markets: { direction: "bearish", magnitude: 4, reasoning: "EM equities hit by USD strength and capital outflows" },
      china: { direction: "bearish", magnitude: 2, reasoning: "China partially insulated by divergent monetary policy" },
      tech_sector: { direction: "bearish", magnitude: 5, reasoning: "Long-duration growth stocks most sensitive to rate rises" },
      financials: { direction: "bullish", magnitude: 3, reasoning: "Banks benefit from wider net interest margins" },
      energy_sector: { direction: "neutral", magnitude: 2, reasoning: "Energy less rate-sensitive, commodity price driven" },
    },
    fixed_income: {
      us_treasuries: { direction: "bearish", magnitude: 4, reasoning: "Yields rise as rate hike is priced in" },
      german_bunds: { direction: "bearish", magnitude: 3, reasoning: "Bunds sell off on global rate repricing" },
      investment_grade_credit: { direction: "bearish", magnitude: 3, reasoning: "Spread widening and duration loss" },
      high_yield: { direction: "bearish", magnitude: 4, reasoning: "Higher rates increase default risk for leveraged issuers" },
      em_debt: { direction: "bearish", magnitude: 4, reasoning: "EM debt faces outflows as USD strengthens" },
      inflation_linked: { direction: "neutral", magnitude: 2, reasoning: "TIPS protected by inflation component, but real yields rise" },
    },
    currencies: {
      usd: { direction: "bullish", magnitude: 4, reasoning: "Rate differential widens in favour of USD" },
      eur: { direction: "bearish", magnitude: 3, reasoning: "EUR weakens unless ECB hikes simultaneously" },
      gbp: { direction: "bearish", magnitude: 2, reasoning: "GBP impact depends on BoE policy divergence" },
      jpy: { direction: "bearish", magnitude: 4, reasoning: "JPY weakens sharply as rate differential expands" },
      cny: { direction: "bearish", magnitude: 2, reasoning: "CNY faces modest depreciation pressure" },
      em_fx: { direction: "bearish", magnitude: 4, reasoning: "EM currencies under pressure from USD strength and outflows" },
    },
    commodities: {
      crude_oil: { direction: "bearish", magnitude: 2, reasoning: "Higher rates dampen demand expectations" },
      natural_gas: { direction: "neutral", magnitude: 1, reasoning: "Gas prices more supply/weather driven" },
      gold: { direction: "bearish", magnitude: 3, reasoning: "Rising real yields increase opportunity cost of gold" },
      silver: { direction: "bearish", magnitude: 3, reasoning: "Silver follows gold lower with added industrial demand risk" },
      copper: { direction: "bearish", magnitude: 3, reasoning: "Copper falls on weaker growth outlook" },
      agricultural: { direction: "neutral", magnitude: 1, reasoning: "Agricultural prices driven by weather and supply" },
    },
    alternatives: {
      real_estate_reits: { direction: "bearish", magnitude: 5, reasoning: "REITs highly sensitive to rate rises; valuations compressed" },
      private_equity: { direction: "bearish", magnitude: 4, reasoning: "PE multiples compress as cost of leverage rises" },
      bitcoin: { direction: "bearish", magnitude: 3, reasoning: "Risk-off environment and higher rates weigh on crypto" },
      volatility_vix: { direction: "bullish", magnitude: 3, reasoning: "Market uncertainty rises with tighter financial conditions" },
    },
    macro_metrics: {
      interest_rates: { direction: "up", reasoning: "Direct rate hike increases policy rate" },
      inflation: { direction: "down", reasoning: "Tightening policy designed to reduce inflation" },
      growth: { direction: "down", reasoning: "Higher borrowing costs dampen investment and consumption" },
      credit_spreads: { direction: "wider", reasoning: "Tighter conditions increase credit risk" },
      yield_curve: { direction: "flatter", reasoning: "Short end rises faster than long end" },
    },
  },
  {
    name: "rate_cut_dovish",
    keywords: ["rate cut", "cuts rates", "lowers rates", "interest rate cut", "dovish", "easing", "rate reduction", "lower rates", "rate relief", "emergency cut", "quantitative easing", "qe", "stimulus package", "monetary stimulus"],
    regime: "risk-on",
    horizon: "short-term",
    confidence: "high",
    keyThemes: ["Monetary easing", "Liquidity injection", "Risk asset tailwind"],
    summary: "A rate cut reduces the cost of capital, boosting equity valuations through higher multiples and stimulating economic activity. This risk-on catalyst benefits long-duration assets and compresses the USD, historically supporting emerging markets and commodities. Fixed income rallies across the curve.",
    cfaInsight: "Increase duration in fixed income and overweight growth equities and emerging markets. Historically, the first 12 months following a rate-cutting cycle have been positive for risk assets. Watch for credit spread tightening as the primary opportunity; contrarian risk is re-ignition of inflation if cuts are premature.",
    equities: {
      global: { direction: "bullish", magnitude: 3, reasoning: "Lower discount rates boost equity valuations globally" },
      us_large_cap: { direction: "bullish", magnitude: 3, reasoning: "Multiple expansion on lower risk-free rate" },
      us_small_cap: { direction: "bullish", magnitude: 4, reasoning: "Small caps benefit most from cheaper financing" },
      europe: { direction: "bullish", magnitude: 3, reasoning: "European equities re-rate on easing" },
      emerging_markets: { direction: "bullish", magnitude: 4, reasoning: "EM benefits from USD weakness and looser conditions" },
      china: { direction: "bullish", magnitude: 3, reasoning: "China equities benefit from global easing backdrop" },
      tech_sector: { direction: "bullish", magnitude: 5, reasoning: "Long-duration growth stocks biggest beneficiary of lower rates" },
      financials: { direction: "bearish", magnitude: 2, reasoning: "Net interest margins compress with lower rates" },
      energy_sector: { direction: "bullish", magnitude: 2, reasoning: "Better growth outlook supports energy demand" },
    },
    fixed_income: {
      us_treasuries: { direction: "bullish", magnitude: 4, reasoning: "Yields fall as rate cuts are priced in" },
      german_bunds: { direction: "bullish", magnitude: 3, reasoning: "Bunds rally on global rate repricing" },
      investment_grade_credit: { direction: "bullish", magnitude: 4, reasoning: "Lower rates and tighter spreads benefit IG credit" },
      high_yield: { direction: "bullish", magnitude: 4, reasoning: "Lower rates reduce refinancing risk for leveraged issuers" },
      em_debt: { direction: "bullish", magnitude: 4, reasoning: "EM debt benefits from USD weakness and inflows" },
      inflation_linked: { direction: "bullish", magnitude: 2, reasoning: "Lower real yields boost TIPS prices" },
    },
    currencies: {
      usd: { direction: "bearish", magnitude: 3, reasoning: "Rate differential narrows, USD weakens" },
      eur: { direction: "bullish", magnitude: 2, reasoning: "EUR benefits from relative rate differential" },
      gbp: { direction: "bullish", magnitude: 2, reasoning: "GBP appreciates on USD weakness" },
      jpy: { direction: "bullish", magnitude: 3, reasoning: "JPY strengthens as rate differential compresses" },
      cny: { direction: "bullish", magnitude: 2, reasoning: "CNY benefits from improved risk sentiment" },
      em_fx: { direction: "bullish", magnitude: 4, reasoning: "EM currencies rally on USD weakness and inflows" },
    },
    commodities: {
      crude_oil: { direction: "bullish", magnitude: 2, reasoning: "Lower rates support demand expectations" },
      natural_gas: { direction: "neutral", magnitude: 1, reasoning: "Gas prices driven by supply and weather" },
      gold: { direction: "bullish", magnitude: 4, reasoning: "Lower real yields boost gold's relative attractiveness" },
      silver: { direction: "bullish", magnitude: 3, reasoning: "Silver benefits with gold and improved industrial demand" },
      copper: { direction: "bullish", magnitude: 3, reasoning: "Copper rallies on improved growth outlook" },
      agricultural: { direction: "neutral", magnitude: 1, reasoning: "Agricultural prices supply/weather driven" },
    },
    alternatives: {
      real_estate_reits: { direction: "bullish", magnitude: 5, reasoning: "REITs highly sensitive to rate cuts; cap rates compress" },
      private_equity: { direction: "bullish", magnitude: 4, reasoning: "PE multiples expand as cost of leverage falls" },
      bitcoin: { direction: "bullish", magnitude: 3, reasoning: "Risk-on environment and USD weakness support crypto" },
      volatility_vix: { direction: "bearish", magnitude: 3, reasoning: "Easing reduces uncertainty and suppresses volatility" },
    },
    macro_metrics: {
      interest_rates: { direction: "down", reasoning: "Direct rate cut reduces policy rate" },
      inflation: { direction: "up", reasoning: "Easing policy may re-ignite inflationary pressures" },
      growth: { direction: "up", reasoning: "Lower borrowing costs stimulate investment and consumption" },
      credit_spreads: { direction: "tighter", reasoning: "Easier conditions reduce credit risk" },
      yield_curve: { direction: "steeper", reasoning: "Short end falls faster, long end anchored by inflation expectations" },
    },
  },
  {
    name: "inflation_high",
    keywords: ["inflation", "cpi", "pce", "price surge", "prices rise", "prices soar", "cost of living", "price pressures", "inflationary", "prices jump", "prices climb", "price hike", "wages rise", "wage growth", "hot inflation", "above target"],
    invertKeywords: ["falls", "slows", "cools", "eases", "declines", "drops", "below"],
    regime: "risk-off",
    horizon: "short-term",
    confidence: "high",
    keyThemes: ["Inflationary pressure", "Central bank response risk", "Real return erosion"],
    summary: "Elevated inflation data forces central banks toward a more hawkish stance, threatening the rate environment underpinning equity valuations. Real purchasing power erodes, squeezing consumer discretionary spending and corporate margins. Fixed income bears the brunt as real yields deteriorate.",
    cfaInsight: "Reduce nominal duration and overweight inflation-linked bonds and real assets (commodities, TIPS, energy equities). Inflation-resilient sectors such as energy and materials outperform. The primary portfolio risk is a policy error where central banks overtighten into a slowdown.",
    equities: {
      global: { direction: "bearish", magnitude: 3, reasoning: "Inflation erodes margins and forces hawkish policy response" },
      us_large_cap: { direction: "bearish", magnitude: 3, reasoning: "Margin pressure and valuation risk from higher rates" },
      us_small_cap: { direction: "bearish", magnitude: 3, reasoning: "Small caps vulnerable to cost pressures and rate rises" },
      europe: { direction: "bearish", magnitude: 3, reasoning: "European equities face same inflationary headwinds" },
      emerging_markets: { direction: "bearish", magnitude: 3, reasoning: "EM vulnerable to import inflation and USD strength" },
      china: { direction: "neutral", magnitude: 2, reasoning: "China may see less inflationary pressure domestically" },
      tech_sector: { direction: "bearish", magnitude: 4, reasoning: "Tech multiples compress on higher real rates" },
      financials: { direction: "bullish", magnitude: 2, reasoning: "Banks benefit from steeper yield curve initially" },
      energy_sector: { direction: "bullish", magnitude: 4, reasoning: "Energy equities hedge inflation well; commodity prices elevated" },
    },
    fixed_income: {
      us_treasuries: { direction: "bearish", magnitude: 4, reasoning: "Yields rise as inflation expectations increase" },
      german_bunds: { direction: "bearish", magnitude: 3, reasoning: "European fixed income sells off on inflation data" },
      investment_grade_credit: { direction: "bearish", magnitude: 3, reasoning: "Duration loss and spread widening" },
      high_yield: { direction: "bearish", magnitude: 3, reasoning: "Inflation erodes real return; credit risk rises" },
      em_debt: { direction: "bearish", magnitude: 3, reasoning: "EM debt faces outflows on USD strength" },
      inflation_linked: { direction: "bullish", magnitude: 4, reasoning: "TIPS benefit directly from higher inflation breakevens" },
    },
    currencies: {
      usd: { direction: "bullish", magnitude: 3, reasoning: "Fed likely to hike, supporting USD" },
      eur: { direction: "bearish", magnitude: 2, reasoning: "EUR weakens if ECB lags Fed in hiking" },
      gbp: { direction: "neutral", magnitude: 2, reasoning: "GBP depends on BoE response pace" },
      jpy: { direction: "bearish", magnitude: 4, reasoning: "JPY very vulnerable if BoJ maintains ultra-loose policy" },
      cny: { direction: "neutral", magnitude: 2, reasoning: "CNY impact depends on domestic inflation trajectory" },
      em_fx: { direction: "bearish", magnitude: 3, reasoning: "EM currencies under pressure from USD strength" },
    },
    commodities: {
      crude_oil: { direction: "bullish", magnitude: 3, reasoning: "Oil often a component of inflation; prices remain elevated" },
      natural_gas: { direction: "bullish", magnitude: 2, reasoning: "Energy prices a driver of broader inflation" },
      gold: { direction: "bullish", magnitude: 3, reasoning: "Gold is an inflation hedge but competes with rising real yields" },
      silver: { direction: "bullish", magnitude: 2, reasoning: "Silver benefits from inflation hedge demand" },
      copper: { direction: "neutral", magnitude: 2, reasoning: "Copper reflects both inflation and growth concerns" },
      agricultural: { direction: "bullish", magnitude: 3, reasoning: "Food prices a key CPI component; further upside risk" },
    },
    alternatives: {
      real_estate_reits: { direction: "bearish", magnitude: 3, reasoning: "Rising cap rates from higher yields offset rental income growth" },
      private_equity: { direction: "bearish", magnitude: 3, reasoning: "Higher discount rates compress PE valuations" },
      bitcoin: { direction: "bearish", magnitude: 2, reasoning: "Bitcoin struggles in high inflation/high rate environment" },
      volatility_vix: { direction: "bullish", magnitude: 3, reasoning: "Policy uncertainty elevates implied volatility" },
    },
    macro_metrics: {
      interest_rates: { direction: "up", reasoning: "Central banks forced to tighten in response to inflation" },
      inflation: { direction: "up", reasoning: "Headline data confirms inflation remains elevated" },
      growth: { direction: "down", reasoning: "Inflation erodes real purchasing power and consumer demand" },
      credit_spreads: { direction: "wider", reasoning: "Tighter policy increases credit risk" },
      yield_curve: { direction: "flatter", reasoning: "Short end rises on rate expectations; long end anchored by growth fears" },
    },
  },
  {
    name: "geopolitical_risk",
    keywords: ["war", "conflict", "invasion", "military", "sanctions", "geopolitical", "tension", "crisis", "attack", "troops", "nato", "escalation", "missile", "nuclear", "coup", "terrorism", "strait", "blockade"],
    regime: "risk-off",
    horizon: "immediate",
    confidence: "medium",
    keyThemes: ["Geopolitical risk premium", "Safe haven demand", "Supply chain disruption"],
    summary: "Geopolitical escalation triggers immediate risk-off repositioning as investors price in uncertainty, supply chain disruption, and potential energy supply shocks. Safe haven assets benefit strongly — gold, JPY, CHF, and Treasuries. Commodity markets, particularly energy, reprice to reflect supply risk.",
    cfaInsight: "Implement defensive positioning: overweight gold, government bonds, and defensive equity sectors (utilities, healthcare). Energy equities are a natural hedge given supply disruption risk. Portfolio managers should monitor commodity supply chains and assess direct revenue exposure to affected regions. Contrarian opportunity may emerge in EM if the conflict remains localised.",
    equities: {
      global: { direction: "bearish", magnitude: 4, reasoning: "Risk premium rises; investors reduce equity exposure" },
      us_large_cap: { direction: "bearish", magnitude: 2, reasoning: "US less directly exposed but global sentiment weighs" },
      us_small_cap: { direction: "bearish", magnitude: 3, reasoning: "Small caps more sensitive to domestic confidence shock" },
      europe: { direction: "bearish", magnitude: 4, reasoning: "Europe most exposed to nearby geopolitical disruption" },
      emerging_markets: { direction: "bearish", magnitude: 4, reasoning: "EM equities see sharp outflows in risk-off" },
      china: { direction: "bearish", magnitude: 3, reasoning: "China faces trade and geopolitical scrutiny" },
      tech_sector: { direction: "bearish", magnitude: 3, reasoning: "Tech sells off in risk-off but less directly exposed" },
      financials: { direction: "bearish", magnitude: 3, reasoning: "Financials vulnerable to credit and sovereign risk" },
      energy_sector: { direction: "bullish", magnitude: 4, reasoning: "Energy equities benefit from supply disruption and higher prices" },
    },
    fixed_income: {
      us_treasuries: { direction: "bullish", magnitude: 4, reasoning: "Flight to safety drives Treasury rally" },
      german_bunds: { direction: "bullish", magnitude: 3, reasoning: "Bunds benefit from safe haven demand" },
      investment_grade_credit: { direction: "bearish", magnitude: 2, reasoning: "Spreads widen moderately on uncertainty" },
      high_yield: { direction: "bearish", magnitude: 4, reasoning: "High yield spreads blow out in risk-off" },
      em_debt: { direction: "bearish", magnitude: 5, reasoning: "EM debt hardest hit by capital flight" },
      inflation_linked: { direction: "bullish", magnitude: 3, reasoning: "TIPS benefit from energy-driven inflation expectations" },
    },
    currencies: {
      usd: { direction: "bullish", magnitude: 4, reasoning: "USD is the primary safe haven currency" },
      eur: { direction: "bearish", magnitude: 3, reasoning: "EUR weakens on proximity to conflict" },
      gbp: { direction: "bearish", magnitude: 2, reasoning: "GBP weakens in risk-off" },
      jpy: { direction: "bullish", magnitude: 4, reasoning: "JPY is a classic geopolitical safe haven" },
      cny: { direction: "bearish", magnitude: 3, reasoning: "CNY weakens on risk-off and potential sanctions exposure" },
      em_fx: { direction: "bearish", magnitude: 5, reasoning: "EM currencies see sharp depreciation in risk-off" },
    },
    commodities: {
      crude_oil: { direction: "bullish", magnitude: 5, reasoning: "Supply disruption risk drives oil sharply higher" },
      natural_gas: { direction: "bullish", magnitude: 4, reasoning: "Gas supply at risk from conflict in key regions" },
      gold: { direction: "bullish", magnitude: 5, reasoning: "Gold is the classic geopolitical safe haven" },
      silver: { direction: "bullish", magnitude: 3, reasoning: "Silver follows gold in safe haven demand" },
      copper: { direction: "bearish", magnitude: 3, reasoning: "Copper falls on global growth uncertainty" },
      agricultural: { direction: "bullish", magnitude: 3, reasoning: "Supply disruption risk for agricultural commodities" },
    },
    alternatives: {
      real_estate_reits: { direction: "bearish", magnitude: 3, reasoning: "REITs sell off in broad risk-off environment" },
      private_equity: { direction: "bearish", magnitude: 3, reasoning: "PE marks impacted; deal flow freezes" },
      bitcoin: { direction: "bearish", magnitude: 3, reasoning: "Crypto sells off with risk assets initially" },
      volatility_vix: { direction: "bullish", magnitude: 5, reasoning: "VIX spikes sharply on geopolitical shock" },
    },
    macro_metrics: {
      interest_rates: { direction: "unchanged", reasoning: "Central banks may pause to assess geopolitical impact" },
      inflation: { direction: "up", reasoning: "Energy and commodity supply shocks are inflationary" },
      growth: { direction: "down", reasoning: "Uncertainty chills investment; sanctions disrupt trade" },
      credit_spreads: { direction: "wider", reasoning: "Risk aversion drives spread widening" },
      yield_curve: { direction: "flatter", reasoning: "Flight to safety flattens as long rates fall" },
    },
  },
  {
    name: "recession_slowdown",
    keywords: ["recession", "slowdown", "contraction", "gdp falls", "gdp shrinks", "gdp decline", "economic weakness", "downturn", "slump", "layoffs", "job cuts", "unemployment rises", "growth slows", "negative growth", "stagflation", "hard landing"],
    regime: "risk-off",
    horizon: "medium-term",
    confidence: "medium",
    keyThemes: ["Growth deterioration", "Earnings revision risk", "Safe haven rotation"],
    summary: "Recession signals trigger broad risk-off repositioning as forward earnings estimates are revised lower and credit risk rises. The classic late-cycle playbook applies: rotate from cyclicals to defensives, extend duration in fixed income, and increase gold allocation. Corporate credit spreads widen as default probability rises.",
    cfaInsight: "Implement late-cycle/recession asset allocation: underweight cyclical equities, overweight defensives (healthcare, utilities, consumer staples), extend fixed income duration, and increase gold. Monitor high-yield spreads as a leading indicator of equity market stress. The contrarian opportunity is in high-quality beaten-down growth stocks for eventual recovery.",
    equities: {
      global: { direction: "bearish", magnitude: 4, reasoning: "Recession risk triggers earnings downgrades globally" },
      us_large_cap: { direction: "bearish", magnitude: 3, reasoning: "S&P 500 earnings estimates revised lower" },
      us_small_cap: { direction: "bearish", magnitude: 5, reasoning: "Small caps most vulnerable to domestic slowdown" },
      europe: { direction: "bearish", magnitude: 4, reasoning: "Europe's cyclical economy suffers in slowdown" },
      emerging_markets: { direction: "bearish", magnitude: 4, reasoning: "EM suffers from lower commodity demand and risk-off" },
      china: { direction: "bearish", magnitude: 3, reasoning: "China demand impacted by global slowdown" },
      tech_sector: { direction: "bearish", magnitude: 3, reasoning: "Tech ad spend and capex cut in recession" },
      financials: { direction: "bearish", magnitude: 4, reasoning: "Credit losses rise; net interest income falls" },
      energy_sector: { direction: "bearish", magnitude: 3, reasoning: "Energy demand falls with economic activity" },
    },
    fixed_income: {
      us_treasuries: { direction: "bullish", magnitude: 5, reasoning: "Flight to safety; Fed expected to cut rates" },
      german_bunds: { direction: "bullish", magnitude: 4, reasoning: "Bunds rally as ECB easing is priced in" },
      investment_grade_credit: { direction: "bearish", magnitude: 2, reasoning: "Spreads widen moderately; quality holds" },
      high_yield: { direction: "bearish", magnitude: 5, reasoning: "Default risk spikes; high yield spreads blow out" },
      em_debt: { direction: "bearish", magnitude: 4, reasoning: "EM debt under pressure from outflows and USD" },
      inflation_linked: { direction: "bullish", magnitude: 2, reasoning: "TIPS benefit from eventual rate cuts but inflation falls" },
    },
    currencies: {
      usd: { direction: "bullish", magnitude: 3, reasoning: "USD strengthens on safe haven demand" },
      eur: { direction: "bearish", magnitude: 3, reasoning: "EUR weakens on European economic fragility" },
      gbp: { direction: "bearish", magnitude: 3, reasoning: "GBP vulnerable to UK recession risk" },
      jpy: { direction: "bullish", magnitude: 4, reasoning: "JPY safe haven demand rises in risk-off" },
      cny: { direction: "bearish", magnitude: 2, reasoning: "CNY weakens on lower growth expectations" },
      em_fx: { direction: "bearish", magnitude: 4, reasoning: "EM currencies sell off on risk aversion" },
    },
    commodities: {
      crude_oil: { direction: "bearish", magnitude: 4, reasoning: "Oil demand falls sharply in recession" },
      natural_gas: { direction: "bearish", magnitude: 3, reasoning: "Industrial gas demand contracts" },
      gold: { direction: "bullish", magnitude: 4, reasoning: "Gold surges as safe haven in recession" },
      silver: { direction: "bearish", magnitude: 2, reasoning: "Silver's industrial demand falls more than gold" },
      copper: { direction: "bearish", magnitude: 5, reasoning: "Copper most sensitive to global growth; sharp falls" },
      agricultural: { direction: "neutral", magnitude: 1, reasoning: "Agricultural demand relatively inelastic" },
    },
    alternatives: {
      real_estate_reits: { direction: "bearish", magnitude: 4, reasoning: "Vacancy rates rise; values decline in recession" },
      private_equity: { direction: "bearish", magnitude: 4, reasoning: "Exit multiples compress; portfolio company stress rises" },
      bitcoin: { direction: "bearish", magnitude: 4, reasoning: "Bitcoin sells off with risk assets in recession" },
      volatility_vix: { direction: "bullish", magnitude: 5, reasoning: "VIX spikes sharply in recession scenario" },
    },
    macro_metrics: {
      interest_rates: { direction: "down", reasoning: "Central banks cut aggressively to stimulate" },
      inflation: { direction: "down", reasoning: "Demand destruction reduces inflationary pressure" },
      growth: { direction: "down", reasoning: "GDP contraction defines recession" },
      credit_spreads: { direction: "wider", reasoning: "Credit risk surges as defaults rise" },
      yield_curve: { direction: "steeper", reasoning: "Short end falls sharply on rate cuts; long end sticky" },
    },
  },
  {
    name: "strong_growth",
    keywords: ["strong growth", "gdp beats", "gdp growth", "economic expansion", "booming", "beats expectations", "strong jobs", "jobs surge", "employment rises", "consumer spending rises", "retail sales beat", "strong earnings", "record profits", "earnings beat"],
    regime: "risk-on",
    horizon: "short-term",
    confidence: "high",
    keyThemes: ["Growth momentum", "Earnings upgrades", "Risk appetite expansion"],
    summary: "Strong economic data validates the growth cycle, driving earnings upgrades and risk-on sentiment. Equities rally broadly with cyclicals leading, while fixed income faces modest pressure from improved growth expectations and potential hawkish repricing. The USD typically strengthens on positive US growth surprises.",
    cfaInsight: "Overweight cyclical equities (industrials, materials, consumer discretionary) and reduce fixed income duration. The primary risk is that strong growth data causes central banks to maintain higher rates longer, eventually tipping into late-cycle dynamics. Rotate within equities from defensives to cyclicals and small caps.",
    equities: {
      global: { direction: "bullish", magnitude: 3, reasoning: "Strong growth drives earnings upgrades globally" },
      us_large_cap: { direction: "bullish", magnitude: 4, reasoning: "US growth strength lifts S&P 500 earnings estimates" },
      us_small_cap: { direction: "bullish", magnitude: 4, reasoning: "Small caps levered to domestic economic strength" },
      europe: { direction: "bullish", magnitude: 2, reasoning: "European equities benefit from improved global demand" },
      emerging_markets: { direction: "bullish", magnitude: 3, reasoning: "EM benefits from improved trade flows" },
      china: { direction: "bullish", magnitude: 2, reasoning: "China benefits from improved global growth backdrop" },
      tech_sector: { direction: "bullish", magnitude: 3, reasoning: "Tech capex and ad spend rise with economic growth" },
      financials: { direction: "bullish", magnitude: 3, reasoning: "Loan growth and lower default risk support financials" },
      energy_sector: { direction: "bullish", magnitude: 3, reasoning: "Energy demand rises with economic activity" },
    },
    fixed_income: {
      us_treasuries: { direction: "bearish", magnitude: 2, reasoning: "Strong growth reduces flight-to-safety demand" },
      german_bunds: { direction: "bearish", magnitude: 2, reasoning: "Bunds under modest pressure from growth repricing" },
      investment_grade_credit: { direction: "bullish", magnitude: 2, reasoning: "Better growth reduces default risk" },
      high_yield: { direction: "bullish", magnitude: 3, reasoning: "Strong economy reduces default probability significantly" },
      em_debt: { direction: "bullish", magnitude: 2, reasoning: "Improved global growth supports EM credit" },
      inflation_linked: { direction: "neutral", magnitude: 1, reasoning: "Growth doesn't immediately change inflation path" },
    },
    currencies: {
      usd: { direction: "bullish", magnitude: 2, reasoning: "Strong growth data supports USD" },
      eur: { direction: "neutral", magnitude: 1, reasoning: "EUR flat unless European growth also strong" },
      gbp: { direction: "neutral", magnitude: 1, reasoning: "GBP impact depends on UK-specific data" },
      jpy: { direction: "bearish", magnitude: 2, reasoning: "Risk-on reduces JPY safe haven demand" },
      cny: { direction: "bullish", magnitude: 2, reasoning: "CNY benefits from improved global growth" },
      em_fx: { direction: "bullish", magnitude: 3, reasoning: "EM currencies rally on improved global risk appetite" },
    },
    commodities: {
      crude_oil: { direction: "bullish", magnitude: 3, reasoning: "Strong economic growth boosts energy demand" },
      natural_gas: { direction: "bullish", magnitude: 2, reasoning: "Industrial activity increases gas demand" },
      gold: { direction: "bearish", magnitude: 2, reasoning: "Risk-on reduces gold safe haven demand" },
      silver: { direction: "bullish", magnitude: 2, reasoning: "Silver's industrial demand benefits from growth" },
      copper: { direction: "bullish", magnitude: 4, reasoning: "Copper most levered to global growth cycle" },
      agricultural: { direction: "neutral", magnitude: 1, reasoning: "Agricultural demand relatively stable" },
    },
    alternatives: {
      real_estate_reits: { direction: "bullish", magnitude: 2, reasoning: "Strong economy supports occupancy and rental growth" },
      private_equity: { direction: "bullish", magnitude: 3, reasoning: "Better exit environment and portfolio company performance" },
      bitcoin: { direction: "bullish", magnitude: 3, reasoning: "Risk-on environment supports crypto" },
      volatility_vix: { direction: "bearish", magnitude: 3, reasoning: "VIX compresses as uncertainty falls" },
    },
    macro_metrics: {
      interest_rates: { direction: "up", reasoning: "Strong growth may keep central banks from cutting" },
      inflation: { direction: "up", reasoning: "Demand-pull inflationary pressure rises with growth" },
      growth: { direction: "up", reasoning: "Data confirms expansion in economic activity" },
      credit_spreads: { direction: "tighter", reasoning: "Better growth reduces credit default risk" },
      yield_curve: { direction: "steeper", reasoning: "Long end rises as growth outlook improves" },
    },
  },
  {
    name: "trade_war_tariffs",
    keywords: ["tariff", "tariffs", "trade war", "trade dispute", "trade tension", "import duty", "import duties", "protectionism", "trade barrier", "trade restriction", "sanctions", "trade deal", "trade agreement fails", "wto", "trade deficit"],
    regime: "risk-off",
    horizon: "medium-term",
    confidence: "medium",
    keyThemes: ["Trade disruption", "Supply chain reshoring", "Inflationary tariffs"],
    summary: "Trade barriers introduce supply-side inflation and reduce economic efficiency, pressuring global growth and corporate margins. Emerging markets and export-oriented economies face the sharpest pain. The inflationary nature of tariffs complicates central bank response, risking stagflation if growth slows while prices remain elevated.",
    cfaInsight: "Reduce EM and export-oriented equity exposure. Domestic-focused small caps with limited global supply chains may outperform. Gold benefits from both safe haven demand and inflation risk. Watch for retaliation cycles that escalate the economic impact. Contrarian opportunities exist in sectors that benefit from trade protection.",
    equities: {
      global: { direction: "bearish", magnitude: 3, reasoning: "Trade restrictions reduce global growth and corporate margins" },
      us_large_cap: { direction: "bearish", magnitude: 2, reasoning: "US multinationals face retaliation and margin pressure" },
      us_small_cap: { direction: "neutral", magnitude: 2, reasoning: "Domestic focus partially insulates from trade war" },
      europe: { direction: "bearish", magnitude: 3, reasoning: "European exporters hit by trade barriers" },
      emerging_markets: { direction: "bearish", magnitude: 5, reasoning: "EM export economies most severely impacted" },
      china: { direction: "bearish", magnitude: 5, reasoning: "China primary target of trade measures; severe impact" },
      tech_sector: { direction: "bearish", magnitude: 4, reasoning: "Tech supply chains disrupted by tariffs and sanctions" },
      financials: { direction: "bearish", magnitude: 2, reasoning: "Trade uncertainty reduces loan demand" },
      energy_sector: { direction: "neutral", magnitude: 2, reasoning: "Energy less directly exposed to trade barriers" },
    },
    fixed_income: {
      us_treasuries: { direction: "bullish", magnitude: 2, reasoning: "Safe haven demand rises on uncertainty" },
      german_bunds: { direction: "bullish", magnitude: 2, reasoning: "Bunds benefit from flight to quality" },
      investment_grade_credit: { direction: "bearish", magnitude: 2, reasoning: "Trade uncertainty widens spreads" },
      high_yield: { direction: "bearish", magnitude: 3, reasoning: "Trade-sensitive high yield issuers under pressure" },
      em_debt: { direction: "bearish", magnitude: 4, reasoning: "EM debt hit by capital outflows and currency pressure" },
      inflation_linked: { direction: "bullish", magnitude: 2, reasoning: "Tariff-driven inflation supports TIPS" },
    },
    currencies: {
      usd: { direction: "bullish", magnitude: 2, reasoning: "USD benefits from safe haven demand" },
      eur: { direction: "bearish", magnitude: 2, reasoning: "EUR weakens on European export exposure" },
      gbp: { direction: "bearish", magnitude: 2, reasoning: "GBP vulnerable to trade disruption" },
      jpy: { direction: "bullish", magnitude: 3, reasoning: "JPY safe haven demand rises in risk-off" },
      cny: { direction: "bearish", magnitude: 5, reasoning: "CNY depreciates sharply on trade war with China" },
      em_fx: { direction: "bearish", magnitude: 4, reasoning: "EM currencies weaken on capital outflows" },
    },
    commodities: {
      crude_oil: { direction: "bearish", magnitude: 2, reasoning: "Lower growth expectations reduce oil demand" },
      natural_gas: { direction: "neutral", magnitude: 1, reasoning: "Gas less affected by trade barriers" },
      gold: { direction: "bullish", magnitude: 3, reasoning: "Gold benefits from safe haven and inflation risk" },
      silver: { direction: "neutral", magnitude: 2, reasoning: "Silver mixed: inflation positive vs demand negative" },
      copper: { direction: "bearish", magnitude: 4, reasoning: "Copper very sensitive to global trade volumes" },
      agricultural: { direction: "bearish", magnitude: 3, reasoning: "Agricultural trade disrupted by tariffs and retaliation" },
    },
    alternatives: {
      real_estate_reits: { direction: "bearish", magnitude: 2, reasoning: "Economic slowdown risk reduces real estate demand" },
      private_equity: { direction: "bearish", magnitude: 2, reasoning: "Supply chain disruption affects portfolio companies" },
      bitcoin: { direction: "neutral", magnitude: 2, reasoning: "Bitcoin sometimes seen as hedge against trade instability" },
      volatility_vix: { direction: "bullish", magnitude: 4, reasoning: "Trade uncertainty elevates market volatility" },
    },
    macro_metrics: {
      interest_rates: { direction: "unchanged", reasoning: "Stagflation risk makes central bank response unclear" },
      inflation: { direction: "up", reasoning: "Tariffs are directly inflationary via import prices" },
      growth: { direction: "down", reasoning: "Trade restrictions reduce economic efficiency and output" },
      credit_spreads: { direction: "wider", reasoning: "Uncertainty and growth risk widen credit spreads" },
      yield_curve: { direction: "flatter", reasoning: "Safe haven demand flattens the curve" },
    },
  },
  {
    name: "china_stimulus",
    keywords: ["china stimulus", "pboc", "china easing", "china cuts rates", "china gdp", "beijing stimulus", "china economy", "chinese economy", "china growth", "china recovery", "china reopening", "china expansion", "chinese market"],
    regime: "risk-on",
    horizon: "short-term",
    confidence: "medium",
    keyThemes: ["China growth impulse", "Commodity demand boost", "EM outperformance"],
    summary: "Chinese stimulus measures provide a significant tailwind for global commodity demand and emerging market equities. As the world's largest consumer of industrial metals and energy, Chinese growth acceleration has an outsized impact on commodity markets. EM equities, particularly in Asia, benefit disproportionately.",
    cfaInsight: "Overweight Chinese equities and EM broadly, with a bias toward commodity exporters (Australia, Brazil, Chile). Industrial metals, particularly copper and iron ore, offer the most direct leverage to Chinese stimulus. Monitor the quality of stimulus — infrastructure-led is more commodity-intensive than consumption-led.",
    equities: {
      global: { direction: "bullish", magnitude: 3, reasoning: "China stimulus boosts global growth expectations" },
      us_large_cap: { direction: "bullish", magnitude: 2, reasoning: "US multinationals benefit from China demand" },
      us_small_cap: { direction: "neutral", magnitude: 1, reasoning: "Less direct exposure to China demand" },
      europe: { direction: "bullish", magnitude: 2, reasoning: "European exporters benefit from China demand recovery" },
      emerging_markets: { direction: "bullish", magnitude: 5, reasoning: "EM equities see strongest benefit from China recovery" },
      china: { direction: "bullish", magnitude: 5, reasoning: "Direct beneficiary of domestic stimulus measures" },
      tech_sector: { direction: "bullish", magnitude: 2, reasoning: "China tech demand recovery supports sector" },
      financials: { direction: "bullish", magnitude: 2, reasoning: "Improved growth outlook supports financials" },
      energy_sector: { direction: "bullish", magnitude: 3, reasoning: "China is world's largest oil importer" },
    },
    fixed_income: {
      us_treasuries: { direction: "bearish", magnitude: 2, reasoning: "Risk-on reduces safe haven demand" },
      german_bunds: { direction: "bearish", magnitude: 1, reasoning: "Modest pressure from improved global growth" },
      investment_grade_credit: { direction: "bullish", magnitude: 2, reasoning: "Better growth reduces credit risk" },
      high_yield: { direction: "bullish", magnitude: 3, reasoning: "China-exposed high yield benefits from recovery" },
      em_debt: { direction: "bullish", magnitude: 4, reasoning: "EM debt rallies strongly on China demand" },
      inflation_linked: { direction: "bullish", magnitude: 2, reasoning: "Commodity demand supports inflation expectations" },
    },
    currencies: {
      usd: { direction: "bearish", magnitude: 2, reasoning: "Risk-on reduces USD safe haven premium" },
      eur: { direction: "bullish", magnitude: 2, reasoning: "EUR benefits from improved risk sentiment" },
      gbp: { direction: "bullish", magnitude: 1, reasoning: "Modest GBP benefit from global risk-on" },
      jpy: { direction: "bearish", magnitude: 2, reasoning: "Risk-on reduces JPY safe haven demand" },
      cny: { direction: "bullish", magnitude: 4, reasoning: "CNY strengthens on China economic recovery" },
      em_fx: { direction: "bullish", magnitude: 4, reasoning: "EM currencies rally strongly on China stimulus" },
    },
    commodities: {
      crude_oil: { direction: "bullish", magnitude: 4, reasoning: "China is world's largest oil importer; demand surge" },
      natural_gas: { direction: "bullish", magnitude: 2, reasoning: "Improved industrial activity boosts gas demand" },
      gold: { direction: "neutral", magnitude: 2, reasoning: "Risk-on reduces gold safe haven but inflation supports" },
      silver: { direction: "bullish", magnitude: 3, reasoning: "Industrial demand for silver rises with China growth" },
      copper: { direction: "bullish", magnitude: 5, reasoning: "China consumes ~50% of global copper; huge demand boost" },
      agricultural: { direction: "bullish", magnitude: 2, reasoning: "China agricultural imports rise with economic growth" },
    },
    alternatives: {
      real_estate_reits: { direction: "bullish", magnitude: 2, reasoning: "Improved growth outlook supports real estate" },
      private_equity: { direction: "bullish", magnitude: 3, reasoning: "China-linked PE portfolio companies benefit" },
      bitcoin: { direction: "bullish", magnitude: 2, reasoning: "Risk-on sentiment supports crypto" },
      volatility_vix: { direction: "bearish", magnitude: 2, reasoning: "Stimulus reduces uncertainty and suppresses vol" },
    },
    macro_metrics: {
      interest_rates: { direction: "down", reasoning: "PBOC likely easing rates to stimulate" },
      inflation: { direction: "up", reasoning: "Commodity demand surge is inflationary globally" },
      growth: { direction: "up", reasoning: "China is ~18% of global GDP; stimulus lifts all boats" },
      credit_spreads: { direction: "tighter", reasoning: "Improved growth outlook tightens spreads" },
      yield_curve: { direction: "steeper", reasoning: "Growth expectations steepen the yield curve" },
    },
  },
  {
    name: "banking_crisis",
    keywords: ["bank collapse", "bank failure", "banking crisis", "bank run", "liquidity crisis", "credit crunch", "bank bailout", "systemic risk", "contagion", "bank stress", "fdic", "deposit insurance", "capital flight", "bank rescue"],
    regime: "risk-off",
    horizon: "immediate",
    confidence: "high",
    keyThemes: ["Systemic financial risk", "Contagion fear", "Credit crunch risk"],
    summary: "Banking sector stress triggers immediate risk-off as contagion fears ripple through financial markets. The credit transmission mechanism is threatened, raising recession risk as bank lending contracts. Government bond yields fall sharply on safe haven demand while the central bank faces a difficult trade-off between financial stability and inflation control.",
    cfaInsight: "Immediate de-risking is warranted: underweight financials, increase cash and government bonds, and add gold exposure. Monitor for contagion to non-bank financial intermediaries (money market funds, shadow banking). The most contrarian trade — post-stabilisation — is high-quality bank debt once the resolution mechanism is clear.",
    equities: {
      global: { direction: "bearish", magnitude: 4, reasoning: "Systemic risk and credit crunch fears weigh on equities" },
      us_large_cap: { direction: "bearish", magnitude: 3, reasoning: "Contagion risk spreads to broader market" },
      us_small_cap: { direction: "bearish", magnitude: 4, reasoning: "Small caps more dependent on regional bank lending" },
      europe: { direction: "bearish", magnitude: 4, reasoning: "European banking exposure creates contagion risk" },
      emerging_markets: { direction: "bearish", magnitude: 4, reasoning: "EM capital outflows intensify on risk-off" },
      china: { direction: "bearish", magnitude: 3, reasoning: "China not immune to global financial stress" },
      tech_sector: { direction: "bearish", magnitude: 3, reasoning: "Tech funding environment tightens in credit crunch" },
      financials: { direction: "bearish", magnitude: 5, reasoning: "Financials at epicentre; contagion to healthy banks" },
      energy_sector: { direction: "bearish", magnitude: 2, reasoning: "Energy less directly exposed but falls in risk-off" },
    },
    fixed_income: {
      us_treasuries: { direction: "bullish", magnitude: 5, reasoning: "Massive flight to safety; yields collapse" },
      german_bunds: { direction: "bullish", magnitude: 4, reasoning: "Bunds benefit from flight to highest quality" },
      investment_grade_credit: { direction: "bearish", magnitude: 3, reasoning: "IG spreads widen as credit risk rises" },
      high_yield: { direction: "bearish", magnitude: 5, reasoning: "High yield market potentially freezes on credit fear" },
      em_debt: { direction: "bearish", magnitude: 5, reasoning: "EM debt hardest hit by capital flight" },
      inflation_linked: { direction: "bullish", magnitude: 2, reasoning: "TIPS benefit from flight to safety" },
    },
    currencies: {
      usd: { direction: "bullish", magnitude: 4, reasoning: "USD strengthens on extreme safe haven demand" },
      eur: { direction: "bearish", magnitude: 3, reasoning: "EUR weakens on European banking exposure" },
      gbp: { direction: "bearish", magnitude: 3, reasoning: "GBP vulnerable to financial sector stress" },
      jpy: { direction: "bullish", magnitude: 5, reasoning: "JPY surges as ultimate safe haven in financial crisis" },
      cny: { direction: "bearish", magnitude: 3, reasoning: "CNY under pressure from capital flight" },
      em_fx: { direction: "bearish", magnitude: 5, reasoning: "EM currencies collapse in financial crisis" },
    },
    commodities: {
      crude_oil: { direction: "bearish", magnitude: 3, reasoning: "Recession fears crush oil demand expectations" },
      natural_gas: { direction: "bearish", magnitude: 2, reasoning: "Economic contraction reduces energy demand" },
      gold: { direction: "bullish", magnitude: 5, reasoning: "Gold surges as safe haven in financial crisis" },
      silver: { direction: "bearish", magnitude: 2, reasoning: "Silver's industrial demand falls in crisis" },
      copper: { direction: "bearish", magnitude: 4, reasoning: "Copper falls sharply on growth fears" },
      agricultural: { direction: "neutral", magnitude: 1, reasoning: "Agricultural demand relatively inelastic" },
    },
    alternatives: {
      real_estate_reits: { direction: "bearish", magnitude: 4, reasoning: "Real estate financing freezes in credit crunch" },
      private_equity: { direction: "bearish", magnitude: 5, reasoning: "PE market freezes; valuations collapse" },
      bitcoin: { direction: "bearish", magnitude: 4, reasoning: "Crypto sells off sharply in financial crisis" },
      volatility_vix: { direction: "bullish", magnitude: 5, reasoning: "VIX spikes to extreme levels in financial crisis" },
    },
    macro_metrics: {
      interest_rates: { direction: "down", reasoning: "Central bank likely to cut rates to support stability" },
      inflation: { direction: "down", reasoning: "Credit crunch is deflationary; demand destruction" },
      growth: { direction: "down", reasoning: "Banking stress causes credit contraction and recession" },
      credit_spreads: { direction: "wider", reasoning: "Credit spreads blow out in banking crisis" },
      yield_curve: { direction: "flatter", reasoning: "Flight to safety crushes long yields" },
    },
  },
];

const NEUTRAL_THEME: Omit<Theme, "name" | "keywords"> = {
  regime: "neutral",
  horizon: "short-term",
  confidence: "low",
  keyThemes: ["Market event", "Fundamental assessment", "Risk monitoring"],
  summary: "This headline introduces a market-relevant development requiring careful assessment of underlying fundamentals. Without a clear directional macro signal, the market impact is likely to be mixed across asset classes, with sector-specific implications driving differentiated performance.",
  cfaInsight: "Maintain a balanced portfolio stance and monitor for secondary effects. In the absence of a clear macro signal, position sizing and risk management take precedence over directional bets. Focus on identifying which specific sectors or geographies have the most direct exposure to this development.",
  equities: {
    global: { direction: "neutral", magnitude: 2, reasoning: "Mixed signals limit directional conviction" },
    us_large_cap: { direction: "neutral", magnitude: 2, reasoning: "US equities await clarity on macro implications" },
    us_small_cap: { direction: "neutral", magnitude: 2, reasoning: "Small caps reflect domestic uncertainty" },
    europe: { direction: "neutral", magnitude: 2, reasoning: "European equities in wait-and-see mode" },
    emerging_markets: { direction: "neutral", magnitude: 2, reasoning: "EM impact unclear without directional macro signal" },
    china: { direction: "neutral", magnitude: 2, reasoning: "China impact depends on domestic policy response" },
    tech_sector: { direction: "neutral", magnitude: 2, reasoning: "Tech sector awaits fundamental clarity" },
    financials: { direction: "neutral", magnitude: 2, reasoning: "Financial sector impact unclear" },
    energy_sector: { direction: "neutral", magnitude: 2, reasoning: "Energy awaits commodity price direction" },
  },
  fixed_income: {
    us_treasuries: { direction: "neutral", magnitude: 1, reasoning: "No clear flight to safety or risk-on signal" },
    german_bunds: { direction: "neutral", magnitude: 1, reasoning: "Bunds reflect unchanged risk environment" },
    investment_grade_credit: { direction: "neutral", magnitude: 1, reasoning: "IG credit spreads unchanged" },
    high_yield: { direction: "neutral", magnitude: 2, reasoning: "High yield monitors for contagion risk" },
    em_debt: { direction: "neutral", magnitude: 2, reasoning: "EM debt awaits risk sentiment direction" },
    inflation_linked: { direction: "neutral", magnitude: 1, reasoning: "Inflation expectations unchanged" },
  },
  currencies: {
    usd: { direction: "neutral", magnitude: 1, reasoning: "USD lacks clear directional catalyst" },
    eur: { direction: "neutral", magnitude: 1, reasoning: "EUR reflects neutral market sentiment" },
    gbp: { direction: "neutral", magnitude: 1, reasoning: "GBP unchanged on mixed signals" },
    jpy: { direction: "neutral", magnitude: 1, reasoning: "JPY safe haven demand neutral" },
    cny: { direction: "neutral", magnitude: 1, reasoning: "CNY reflects unchanged fundamentals" },
    em_fx: { direction: "neutral", magnitude: 2, reasoning: "EM FX mixed on unclear macro direction" },
  },
  commodities: {
    crude_oil: { direction: "neutral", magnitude: 1, reasoning: "Oil awaits demand/supply signal" },
    natural_gas: { direction: "neutral", magnitude: 1, reasoning: "Gas prices supply/weather driven" },
    gold: { direction: "neutral", magnitude: 1, reasoning: "Gold lacks clear safe haven or inflation catalyst" },
    silver: { direction: "neutral", magnitude: 1, reasoning: "Silver mixed on industrial and precious metal demand" },
    copper: { direction: "neutral", magnitude: 2, reasoning: "Copper monitors growth signals" },
    agricultural: { direction: "neutral", magnitude: 1, reasoning: "Agricultural commodities supply/demand driven" },
  },
  alternatives: {
    real_estate_reits: { direction: "neutral", magnitude: 1, reasoning: "REITs await rate and growth direction" },
    private_equity: { direction: "neutral", magnitude: 1, reasoning: "PE market reflects uncertain exit environment" },
    bitcoin: { direction: "neutral", magnitude: 2, reasoning: "Crypto awaits risk sentiment direction" },
    volatility_vix: { direction: "neutral", magnitude: 2, reasoning: "VIX reflects market uncertainty" },
  },
  macro_metrics: {
    interest_rates: { direction: "unchanged", reasoning: "No clear rate catalyst identified" },
    inflation: { direction: "unchanged", reasoning: "Inflation trajectory unchanged by this headline" },
    growth: { direction: "unchanged", reasoning: "Growth outlook unaffected" },
    credit_spreads: { direction: "unchanged", reasoning: "Credit conditions stable" },
    yield_curve: { direction: "unchanged", reasoning: "Yield curve unchanged" },
  },
};

function scoreTheme(headline: string, theme: Theme): number {
  const lower = headline.toLowerCase();
  let score = 0;
  for (const kw of theme.keywords) {
    if (lower.includes(kw)) score += kw.split(" ").length; // longer matches score more
  }
  return score;
}

function detectNegation(headline: string): boolean {
  const lower = headline.toLowerCase();
  const negations = ["no ", "not ", "fails to", "refuses to", "avoids", "halts", "pauses", "holds off", "unlikely to"];
  return negations.some((n) => lower.includes(n));
}

function buildAnalysis(headline: string) {
  let best: Theme | null = null;
  let bestScore = 0;

  for (const theme of THEMES) {
    const score = scoreTheme(headline, theme);
    if (score > bestScore) {
      bestScore = score;
      best = theme;
    }
  }

  // Check if invert keywords negate the theme
  if (best && best.invertKeywords) {
    const lower = headline.toLowerCase();
    const inverted = best.invertKeywords.some((kw) => lower.includes(kw));
    if (inverted) {
      best = null;
      bestScore = 0;
    }
  }

  const theme = best ?? ({ ...NEUTRAL_THEME, name: "neutral", keywords: [] } as Theme);

  return {
    headline_assessment: {
      summary: theme.summary,
      key_themes: theme.keyThemes,
      time_horizon: theme.horizon,
      confidence: best ? theme.confidence : ("low" as Confidence),
      macro_regime: theme.regime,
    },
    asset_impacts: {
      equities: theme.equities,
      fixed_income: theme.fixed_income,
      currencies: theme.currencies,
      commodities: theme.commodities,
      alternatives: theme.alternatives,
    },
    macro_metrics: theme.macro_metrics,
    cfa_insight: theme.cfaInsight,
  };
}

export async function POST(request: NextRequest) {
  try {
    const { headline } = await request.json();

    if (!headline || typeof headline !== "string") {
      return NextResponse.json(
        { error: "Valid headline is required" },
        { status: 400 }
      );
    }

    if (headline.trim().length < 10) {
      return NextResponse.json(
        { error: "Headline is too short" },
        { status: 400 }
      );
    }

    const analysis = buildAnalysis(headline.trim());
    return NextResponse.json({ analysis, headline: headline.trim() });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: `Analysis failed: ${message}` },
      { status: 500 }
    );
  }
}
