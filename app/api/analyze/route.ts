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

interface CfaCurriculum {
  primaryTopic: string;
  secondaryTopics: string[];
  levelRelevance: ("L1" | "L2" | "L3")[];
}

interface HistoricalParallel { event: string; lesson: string; }
interface KeyRisks { bullCase: string; bearCase: string; }
interface PortfolioAction { reduce: string[]; increase: string[]; monitor: string[]; }

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
  candidateExplainer: string;
  historicalParallel: HistoricalParallel;
  keyRisks: KeyRisks;
  portfolioAction: PortfolioAction;
  cfaCurriculum: CfaCurriculum;
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
    candidateExplainer: "When a central bank raises rates, borrowing costs rise throughout the economy. Think of it through the lens of the discount rate model: higher rates mean future cash flows are worth less today, so stocks — especially long-duration growth stocks — fall. Bonds already in issue also fall in price because new bonds now offer higher yields (price and yield move inversely). The currency typically strengthens as higher rates attract foreign capital seeking better returns.",
    historicalParallel: { event: "US Fed rate-hike cycle 2022–2023", lesson: "The Fed raised the fed funds rate from 0.25% to 5.5% in 18 months. The S&P 500 fell ~20% in 2022. Long-duration Treasuries dropped ~30%. The USD (DXY) strengthened ~15%. The NASDAQ — dominated by long-duration growth stocks — fell nearly 33%. Classic textbook: higher rates → higher discount rate → lower present value of future earnings." },
    keyRisks: { bullCase: "Central bank signals a pause or pivot sooner than expected, reversing the rate path and triggering a sharp relief rally in equities and bonds.", bearCase: "Rates stay high long enough to cause a credit event or recession — credit spreads blow out and equities face both multiple compression and earnings contraction simultaneously." },
    portfolioAction: { reduce: ["Long-duration bonds (TLT, 20Y+)", "High P/E growth / tech stocks", "REITs", "EM equities"], increase: ["Short-duration bonds (T-bills, 1-3Y)", "Bank / financial sector equities", "Value / dividend stocks", "Cash and money market"], monitor: ["2Y/10Y yield curve inversion depth", "Credit spreads (IG and HY)", "Fed futures-implied terminal rate", "CPI and PCE monthly prints"] },
    cfaCurriculum: { primaryTopic: "Economics: Monetary Policy Tools & Transmission", secondaryTopics: ["Fixed Income: Duration & Convexity", "Fixed Income: Yield Curve Dynamics", "Equity: DDM & DCF Valuation", "Portfolio Mgmt: Strategic Asset Allocation"], levelRelevance: ["L1", "L2", "L3"] },
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
    candidateExplainer: "Rate cuts are the mirror image of rate hikes. Lower borrowing costs stimulate spending and investment, boosting economic activity. For equities, a lower discount rate raises the present value of future earnings — especially for long-duration growth companies whose cash flows are far in the future. Bonds rise in price as yields fall. The currency weakens as it becomes less attractive to foreign capital seeking yield.",
    historicalParallel: { event: "Fed cutting cycle 2019 & 2024", lesson: "In 2019, three 'insurance cuts' saw the S&P 500 rally 28.9% for the year. In 2024, as the Fed pivoted from 5.5% to 4.5%, growth stocks and REITs re-rated sharply higher. Key lesson: markets often front-run cuts — by the time the first cut lands, much of the move in equities and bonds has already happened." },
    keyRisks: { bullCase: "Cuts come faster and deeper than priced, unleashing pent-up refinancing demand and a housing market re-acceleration, turbocharging risk assets.", bearCase: "Cuts are premature — inflation re-accelerates, forcing the central bank to reverse course. 'Cut, then hike' is extremely damaging for investor confidence and bond markets." },
    portfolioAction: { reduce: ["Short-duration bonds", "Cash overweight", "Defensive sectors (utilities, consumer staples)"], increase: ["Long-duration Treasuries and IG credit", "Growth / tech equities", "REITs", "EM equities and EM local debt"], monitor: ["Breakeven inflation rates (5Y5Y)", "Real yields (TIPS)", "Fed futures path", "Housing market data and mortgage rates"] },
    cfaCurriculum: { primaryTopic: "Economics: Monetary Policy & the Business Cycle", secondaryTopics: ["Fixed Income: Duration, Convexity & Price Sensitivity", "Equity: Cost of Capital & Valuation", "Portfolio Mgmt: Dynamic Asset Allocation", "Fixed Income: Yield Curve Strategies"], levelRelevance: ["L1", "L2", "L3"] },
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
    candidateExplainer: "Inflation is the rate at which the general price level rises, eroding purchasing power. The Fisher Effect states that nominal rates must rise to preserve real returns — so when inflation is elevated, central banks raise rates (hawkish). This hits bonds (real yields fall, then central banks push nominal yields up), and compresses equity multiples via higher discount rates. The CFA curriculum links this directly to the Taylor Rule, which guides central banks on the appropriate rate given inflation and output gaps.",
    historicalParallel: { event: "1970s US stagflation & Volcker era", lesson: "After the 1973 oil shock, US CPI peaked at 14.8% in 1980. The S&P 500 delivered near-zero real returns for an entire decade. Gold rose from ~$35 in 1971 to $850 by 1980 (+2,300%). TIPS did not exist yet — investors who owned commodities and real assets were the clear winners. Volcker ultimately broke inflation by raising the fed funds rate to 20%." },
    keyRisks: { bullCase: "Inflation prints come in below expectations for several consecutive months, allowing central banks to pause hikes — sparking a strong rally in rate-sensitive assets.", bearCase: "Inflation becomes entrenched (wage-price spiral), forcing central banks to overtighten until a recession breaks demand — the stagflation scenario." },
    portfolioAction: { reduce: ["Long-duration nominal bonds", "High P/E growth stocks", "Consumer discretionary"], increase: ["TIPS / inflation-linked bonds", "Energy equities and commodities", "Value stocks with pricing power", "Short-duration instruments"], monitor: ["Core CPI and PCE monthly data", "5Y5Y inflation breakevens", "PPI (leading indicator for CPI)", "Wage growth (ECI, Average Hourly Earnings)"] },
    cfaCurriculum: { primaryTopic: "Economics: Inflation, Monetary & Fiscal Policy", secondaryTopics: ["Fixed Income: Inflation-Linked Bonds & Real Yields", "Fixed Income: The Fisher Effect", "Portfolio Mgmt: Liability-Driven Investing", "Alternative Investments: Commodities as Inflation Hedge"], levelRelevance: ["L1", "L2", "L3"] },
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
    candidateExplainer: "Geopolitical events inject uncertainty, which markets price as a risk premium — the extra return required to hold risky assets. The CFA curriculum covers this under 'geopolitical risk' in portfolio management: investors demand higher compensation for uncertainty, so they sell equities (reducing exposure) and buy safe-haven assets. Safe havens are assets that historically hold or gain value in crises: US Treasuries (world's reserve currency debt), gold (store of value for millennia), USD and JPY (safe-haven currencies). Energy often rallies if supply routes are threatened.",
    historicalParallel: { event: "Russia's invasion of Ukraine, February 2022", lesson: "On the day of invasion, European equities fell 3-4%, WTI crude surged 8%, gold jumped 2%, and the JPY strengthened. Within weeks, European natural gas prices had tripled. The S&P 500 initially fell but recovered within months as the systemic financial impact was contained. Key lesson: initial geopolitical shock is sharp but often short-lived unless supply disruption is sustained." },
    keyRisks: { bullCase: "Rapid de-escalation or ceasefire restores confidence — markets snap back quickly as the risk premium unwinds (geopolitical shocks are often mean-reverting).", bearCase: "Escalation draws in major powers or involves nuclear threats, or supply routes for critical commodities (oil, gas, food) are cut off for a sustained period, triggering stagflation." },
    portfolioAction: { reduce: ["European equities (proximity risk)", "EM equities (capital flight)", "High-yield credit"], increase: ["Gold and precious metals", "Energy equities (supply risk hedge)", "US Treasuries and Bunds", "USD and JPY positions"], monitor: ["Oil and natural gas spot prices", "Commodity supply chain disruption", "NATO/geopolitical statements", "EM capital flow data"] },
    cfaCurriculum: { primaryTopic: "Portfolio Mgmt: Geopolitical Risk & Risk Premiums", secondaryTopics: ["Economics: International Trade & Sanctions", "Alternative Investments: Gold as Safe Haven", "Portfolio Mgmt: Tail Risk & Drawdown Management", "Fixed Income: Flight-to-Safety Dynamics"], levelRelevance: ["L2", "L3"] },
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
    candidateExplainer: "A recession is technically two consecutive quarters of negative real GDP growth. For markets, the key mechanism is the earnings cycle: corporate revenues fall as demand drops, while operating leverage means profits fall even faster than revenues. At the same time, investors reduce the multiple (P/E) they're willing to pay, causing a 'double-whammy' for equities. The yield curve — one of the CFA curriculum's key leading indicators — typically inverts before recession, then steepens sharply as the Fed cuts. High-yield credit spreads are another textbook leading indicator of economic stress.",
    historicalParallel: { event: "Global Financial Crisis 2008–2009", lesson: "The S&P 500 fell 57% peak-to-trough. High-yield spreads exceeded 2,000bps. US Treasuries rallied as the Fed cut to 0% and launched QE. Gold initially fell (forced liquidation) then rallied 170% over the following years. Consumer discretionary was the worst sector; healthcare and consumer staples held up best. The recovery from the bottom (March 2009) was swift for those who held — a key lesson about the cost of being out of the market." },
    keyRisks: { bullCase: "Economic data stabilises ('soft landing'), the Fed engineers a sharp pivot, and a recovery rally begins — missing which is costly for underweight-equity investors.", bearCase: "Recession morphs into a financial crisis as a credit event (corporate defaults, bank stress) amplifies the downturn — analogous to 2008, not just 2001 or 1990." },
    portfolioAction: { reduce: ["Cyclical equities (materials, industrials, consumer discretionary)", "High-yield bonds", "EM assets", "Private equity (illiquid)"], increase: ["Government bonds (extend duration)", "Defensive equities (healthcare, utilities, staples)", "Gold", "Cash and short-duration instruments"], monitor: ["High-yield credit spreads (key leading indicator)", "ISM Manufacturing PMI", "Initial jobless claims (weekly)", "Yield curve shape (2Y/10Y)"] },
    cfaCurriculum: { primaryTopic: "Economics: Business Cycles, Recessions & Leading Indicators", secondaryTopics: ["Equity: Cyclical vs. Defensive Sectors", "Fixed Income: Duration Extension in Recessions", "Portfolio Mgmt: Tactical Asset Allocation", "Credit Analysis: Default Risk & HY Spreads"], levelRelevance: ["L1", "L2", "L3"] },
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
    candidateExplainer: "Strong GDP or employment data signals the economy is in the expansion phase of the business cycle. Revenues grow, profit margins expand, and companies upgrade earnings guidance — all of which lift equity valuations. The CFA curriculum maps sectors to business cycle phases: cyclicals (materials, industrials, consumer discretionary, financials) outperform in expansion, while defensives (utilities, healthcare, staples) lag. The risk: too-strong growth can overheat, forcing central banks to raise rates — eventually ending the cycle.",
    historicalParallel: { event: "Post-COVID US economic rebound 2021", lesson: "US GDP grew 5.7% in 2021 — the fastest since 1984. The S&P 500 returned 28.7%, led by energy (+54%), REITs (+41%), and financials (+35%). Consumer discretionary and industrials also strongly outperformed. The lesson: in a genuine growth boom, almost everything goes up, but cyclicals capture the most upside. The downside: this same growth sowed the seeds of 2022's inflation surge." },
    keyRisks: { bullCase: "Growth is broad-based and accompanied by contained inflation — a genuine 'Goldilocks' environment that sustains above-average equity returns for longer.", bearCase: "Growth is too hot: labour market tightness and demand-pull inflation force central banks to overtighten, killing the expansion and triggering a hard landing." },
    portfolioAction: { reduce: ["Long-duration government bonds", "Defensive sectors (utilities, staples)", "Cash overweight"], increase: ["Cyclical equities (industrials, materials, consumer discretionary)", "Small cap equities", "High-yield credit (default risk falls)", "Commodity-linked equities"], monitor: ["ISM Manufacturing and Services PMI", "Nonfarm Payrolls and wage growth", "Yield curve steepening", "Earnings revision breadth"] },
    cfaCurriculum: { primaryTopic: "Economics: Business Cycle Phases & Equity Sector Rotation", secondaryTopics: ["Equity: Top-Down Fundamental Analysis", "Portfolio Mgmt: Sector & Style Rotation", "Fixed Income: Duration in Growth Environments", "Economics: Output Gap & Potential GDP"], levelRelevance: ["L1", "L2", "L3"] },
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
    candidateExplainer: "Tariffs are taxes on imported goods, ultimately paid by domestic businesses and consumers. They raise prices (inflationary), reduce trade volumes (contractionary), and distort supply chains. This creates a 'stagflationary' mix — higher prices AND lower growth — which is the worst outcome for central banks who can only fight one at a time. The CFA curriculum covers comparative advantage: trade barriers reduce global economic efficiency, shrinking the total pie even if they benefit specific domestic industries.",
    historicalParallel: { event: "US-China Trade War 2018–2019", lesson: "The S&P 500 fell ~20% by December 2018 before the Fed pivoted. The CNY depreciated 10% vs USD. EM equities (MSCI EM) fell ~20%. Copper — the 'economist's metal' — fell 20% on reduced global growth expectations. Agricultural commodities suffered from Chinese retaliatory tariffs on US soybeans. Companies with China-exposed supply chains underperformed sharply." },
    keyRisks: { bullCase: "Rapid trade deal or tariff rollback removes uncertainty — markets re-rate sharply higher, especially for EM and trade-sensitive sectors.", bearCase: "Tit-for-tat retaliation escalates into a full trade war affecting all sectors, combined with currency wars (competitive devaluations), creating a genuine global growth shock." },
    portfolioAction: { reduce: ["EM equities and EM debt", "Export-oriented European and Asian equities", "Agricultural commodities (retaliation risk)", "Tech hardware (supply chain risk)"], increase: ["Domestic-focused US small caps", "Gold (safe haven + inflation hedge)", "US Treasuries (safe haven)", "Domestic services sectors"], monitor: ["US-China bilateral trade data", "CNY exchange rate (devaluation signal)", "Copper price (growth barometer)", "Retaliatory tariff announcements"] },
    cfaCurriculum: { primaryTopic: "Economics: International Trade, Tariffs & Comparative Advantage", secondaryTopics: ["Economics: Currency Regimes & Exchange Rates", "Portfolio Mgmt: Country & Political Risk", "Fixed Income: Stagflation & Monetary Policy Dilemmas", "Equity: Supply Chain & Global Business Risk"], levelRelevance: ["L1", "L2"] },
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
    candidateExplainer: "China is the world's second-largest economy (~18% of global GDP) and by far the largest consumer of industrial commodities — it accounts for ~55% of global steel demand, ~50% of copper, and ~15% of oil. When China stimulates — whether via rate cuts by the PBOC, fiscal infrastructure spending, or property sector support — commodity prices surge and EM economies that export these resources (Australia, Brazil, Chile, Indonesia) benefit enormously. The CFA curriculum covers this as the 'China growth impulse' in international investing.",
    historicalParallel: { event: "China's 4-trillion RMB stimulus package, 2008–2009", lesson: "China launched a massive infrastructure stimulus in response to the GFC. Copper prices doubled from their lows. The Australian dollar (AUD) — a commodity currency tied to China demand — rallied 40% in 12 months. MSCI Emerging Markets surged 75% from March 2009 to end-2009. Countries with high commodity export exposure to China were the biggest winners, reinforcing the commodity-currency-EM nexus in portfolio management." },
    keyRisks: { bullCase: "Stimulus is larger-than-expected and consumption-led (rather than just investment), driving a broader and more durable Chinese growth recovery.", bearCase: "Stimulus fails to offset structural headwinds (property sector deleveraging, demographic decline, US tech restrictions) — a 'pushing on a string' scenario where credit creation doesn't translate into growth." },
    portfolioAction: { reduce: ["Defensive global equities", "USD (weakens in risk-on)", "US Treasuries (risk-off assets sold)"], increase: ["Chinese equities (A-shares and H-shares)", "EM equities and EM local debt", "Industrial metals (copper, iron ore)", "Commodity-exporting currencies (AUD, BRL, CLP)"], monitor: ["China PMI (Manufacturing & Services)", "PBOC loan prime rate decisions", "Iron ore and copper spot prices", "CNY direction (strength = confidence)"] },
    cfaCurriculum: { primaryTopic: "Economics: Emerging Markets & Chinese Macro Policy", secondaryTopics: ["Alternative Investments: Commodities & Demand Cycles", "Portfolio Mgmt: EM Allocation & Currency Risk", "Economics: Fiscal & Monetary Policy Transmission", "Fixed Income: EM Sovereign Debt"], levelRelevance: ["L2", "L3"] },
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
    candidateExplainer: "Banks are the pipes of the financial system — they create credit by lending deposits and are the transmission mechanism for monetary policy. A bank failure can trigger a 'bank run' (depositors withdraw en masse, a self-fulfilling prophecy) and contagion — where fear about one bank spreads to others regardless of their actual health. The CFA curriculum covers systemic risk: when the banking system is impaired, the credit multiplier goes into reverse, contracting money supply and credit availability, directly causing economic contraction. Central banks act as 'lender of last resort' (Bagehot's principle: lend freely against good collateral at penalty rates).",
    historicalParallel: { event: "Silicon Valley Bank & Credit Suisse collapses, March 2023", lesson: "SVB's duration mismatch (long-duration bonds funded by short-duration deposits) caused a $1.8B loss that triggered a bank run in 36 hours — accelerated by social media. 2-year Treasury yields fell 100bps in four days as markets priced in a Fed pivot. The KBW Bank Index fell 28%. The broader crisis was contained by FDIC guarantees, but the episode showed how quickly confidence can evaporate. Lesson: duration risk and deposit concentration are critical credit analysis factors." },
    keyRisks: { bullCase: "Authorities act decisively (deposit guarantees, emergency liquidity), the crisis is contained to idiosyncratic failures, and broader economic spillover is minimal.", bearCase: "Contagion spreads to systemically important banks (G-SIBs), triggering a full credit crunch — the 2008 scenario where the real economy seizes up for 18+ months." },
    portfolioAction: { reduce: ["Financials sector equities (broad)", "High-yield credit (credit crunch risk)", "EM assets (capital flight)", "Leveraged loans and CLOs"], increase: ["Government bonds (Treasuries, Bunds)", "Gold (ultimate safe haven)", "Cash and money market funds", "Systemically safe deposits / T-bills"], monitor: ["Bank CDS spreads (contagion indicator)", "FRA-OIS spread (interbank stress)", "Fed/ECB emergency lending facilities", "Money market fund outflows"] },
    cfaCurriculum: { primaryTopic: "Fixed Income: Credit Analysis & Financial Institutions", secondaryTopics: ["Economics: Monetary Policy — Lender of Last Resort", "Portfolio Mgmt: Systemic Risk & Contagion", "Fixed Income: Duration Mismatch & ALM", "Equity: Financial Sector Analysis"], levelRelevance: ["L1", "L2", "L3"] },
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
  candidateExplainer: "Not every headline has a clear, single macro direction. In practice, many events are company-specific, sector-specific, or have mixed signals that require deeper analysis before forming a view. The CFA curriculum emphasises that a disciplined investment process — forming an investment thesis, identifying key risks, and sizing positions appropriately — matters more than acting on every piece of news. When the signal is ambiguous, the correct answer is often to gather more information before acting.",
  historicalParallel: { event: "Mixed macro signals (2015–2016)", lesson: "The mid-2010s saw a confused market environment: Chinese slowdown fears, oil price collapse, and mixed US data created a 'risk-on / risk-off' whipsaw. Investors who reacted to every headline underperformed those who stayed disciplined and focused on fundamentals. Key lesson: not every data point is a trend — patience and process beat reactivity." },
  keyRisks: { bullCase: "Further clarity reveals the event is a net positive — markets reprice higher as uncertainty resolves.", bearCase: "Secondary effects emerge that create contagion beyond the immediately obvious — the unknown unknowns prove more impactful than expected." },
  portfolioAction: { reduce: ["Highly concentrated positions in directly affected sectors"], increase: ["Diversified exposures until clarity emerges"], monitor: ["Secondary market reactions over 24–48 hours", "Analyst commentary and earnings guidance updates", "Bond market and credit spread reactions as leading indicators"] },
  cfaCurriculum: { primaryTopic: "Portfolio Mgmt: Investment Policy & Risk Management", secondaryTopics: ["Portfolio Mgmt: Behavioural Finance & Discipline", "Economics: Fundamental vs. Technical Analysis", "Portfolio Mgmt: Position Sizing & Uncertainty"], levelRelevance: ["L1", "L2", "L3"] },
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
    candidate_explainer: theme.candidateExplainer,
    historical_parallel: theme.historicalParallel,
    key_risks: theme.keyRisks,
    portfolio_action: theme.portfolioAction,
    cfa_curriculum: theme.cfaCurriculum,
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
