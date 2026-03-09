import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 60;

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const CFA_SYSTEM_PROMPT = `You are a CFA charterholder with 20+ years of experience in global macro investing, asset allocation, and financial markets. You have deep expertise across all major asset classes including equities, fixed income, commodities, currencies, real estate, and alternative investments.

When analyzing financial headlines, you:
1. Apply CFA-level rigor and the CFA Institute Code of Ethics
2. Consider macroeconomic implications across the full investment universe
3. Assess both direct and second-order effects on asset prices
4. Evaluate impact across different time horizons (immediate, short-term 1-3 months, medium-term 3-12 months)
5. Consider regional and sector-specific nuances
6. Account for current market positioning and sentiment

You respond with structured JSON analysis only — no preamble, no explanations outside the JSON.`;

const ANALYSIS_PROMPT = (headline: string) => `Analyze this Financial Times headline and assess its impact on financial markets from a CFA charterholder's perspective:

HEADLINE: "${headline}"

Respond with ONLY valid JSON in this exact structure:
{
  "headline_assessment": {
    "summary": "2-3 sentence CFA-level interpretation of the headline",
    "key_themes": ["theme1", "theme2", "theme3"],
    "time_horizon": "immediate|short-term|medium-term|long-term",
    "confidence": "high|medium|low",
    "macro_regime": "risk-on|risk-off|neutral"
  },
  "asset_impacts": {
    "equities": {
      "global": { "direction": "bullish|bearish|neutral", "magnitude": 1-5, "reasoning": "brief reason" },
      "us_large_cap": { "direction": "bullish|bearish|neutral", "magnitude": 1-5, "reasoning": "brief reason" },
      "us_small_cap": { "direction": "bullish|bearish|neutral", "magnitude": 1-5, "reasoning": "brief reason" },
      "europe": { "direction": "bullish|bearish|neutral", "magnitude": 1-5, "reasoning": "brief reason" },
      "emerging_markets": { "direction": "bullish|bearish|neutral", "magnitude": 1-5, "reasoning": "brief reason" },
      "china": { "direction": "bullish|bearish|neutral", "magnitude": 1-5, "reasoning": "brief reason" },
      "tech_sector": { "direction": "bullish|bearish|neutral", "magnitude": 1-5, "reasoning": "brief reason" },
      "financials": { "direction": "bullish|bearish|neutral", "magnitude": 1-5, "reasoning": "brief reason" },
      "energy_sector": { "direction": "bullish|bearish|neutral", "magnitude": 1-5, "reasoning": "brief reason" }
    },
    "fixed_income": {
      "us_treasuries": { "direction": "bullish|bearish|neutral", "magnitude": 1-5, "reasoning": "brief reason" },
      "german_bunds": { "direction": "bullish|bearish|neutral", "magnitude": 1-5, "reasoning": "brief reason" },
      "investment_grade_credit": { "direction": "bullish|bearish|neutral", "magnitude": 1-5, "reasoning": "brief reason" },
      "high_yield": { "direction": "bullish|bearish|neutral", "magnitude": 1-5, "reasoning": "brief reason" },
      "em_debt": { "direction": "bullish|bearish|neutral", "magnitude": 1-5, "reasoning": "brief reason" },
      "inflation_linked": { "direction": "bullish|bearish|neutral", "magnitude": 1-5, "reasoning": "brief reason" }
    },
    "currencies": {
      "usd": { "direction": "bullish|bearish|neutral", "magnitude": 1-5, "reasoning": "brief reason" },
      "eur": { "direction": "bullish|bearish|neutral", "magnitude": 1-5, "reasoning": "brief reason" },
      "gbp": { "direction": "bullish|bearish|neutral", "magnitude": 1-5, "reasoning": "brief reason" },
      "jpy": { "direction": "bullish|bearish|neutral", "magnitude": 1-5, "reasoning": "brief reason" },
      "cny": { "direction": "bullish|bearish|neutral", "magnitude": 1-5, "reasoning": "brief reason" },
      "em_fx": { "direction": "bullish|bearish|neutral", "magnitude": 1-5, "reasoning": "brief reason" }
    },
    "commodities": {
      "crude_oil": { "direction": "bullish|bearish|neutral", "magnitude": 1-5, "reasoning": "brief reason" },
      "natural_gas": { "direction": "bullish|bearish|neutral", "magnitude": 1-5, "reasoning": "brief reason" },
      "gold": { "direction": "bullish|bearish|neutral", "magnitude": 1-5, "reasoning": "brief reason" },
      "silver": { "direction": "bullish|bearish|neutral", "magnitude": 1-5, "reasoning": "brief reason" },
      "copper": { "direction": "bullish|bearish|neutral", "magnitude": 1-5, "reasoning": "brief reason" },
      "agricultural": { "direction": "bullish|bearish|neutral", "magnitude": 1-5, "reasoning": "brief reason" }
    },
    "alternatives": {
      "real_estate_reits": { "direction": "bullish|bearish|neutral", "magnitude": 1-5, "reasoning": "brief reason" },
      "private_equity": { "direction": "bullish|bearish|neutral", "magnitude": 1-5, "reasoning": "brief reason" },
      "bitcoin": { "direction": "bullish|bearish|neutral", "magnitude": 1-5, "reasoning": "brief reason" },
      "volatility_vix": { "direction": "bullish|bearish|neutral", "magnitude": 1-5, "reasoning": "brief reason" }
    }
  },
  "macro_metrics": {
    "interest_rates": { "direction": "up|down|unchanged", "reasoning": "brief reason" },
    "inflation": { "direction": "up|down|unchanged", "reasoning": "brief reason" },
    "growth": { "direction": "up|down|unchanged", "reasoning": "brief reason" },
    "credit_spreads": { "direction": "wider|tighter|unchanged", "reasoning": "brief reason" },
    "yield_curve": { "direction": "steeper|flatter|unchanged", "reasoning": "brief reason" }
  },
  "cfa_insight": "A 2-3 sentence professional assessment with specific actionable implications for portfolio managers, highlighting the most important risk/opportunity and any contrarian considerations."
}`;

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

    const message = await client.messages.create({
      model: "claude-3-5-haiku-20241022",
      max_tokens: 2000,
      system: CFA_SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: ANALYSIS_PROMPT(headline.trim()),
        },
      ],
    });

    // Extract text content from the response
    const textContent = message.content.find((block) => block.type === "text");
    if (!textContent || textContent.type !== "text") {
      return NextResponse.json(
        { error: "No analysis generated" },
        { status: 500 }
      );
    }

    // Parse the JSON response
    let analysis;
    try {
      // Strip markdown code blocks if present
      const raw = textContent.text.trim();
      const jsonStr = raw.startsWith("```")
        ? raw.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "")
        : raw;
      analysis = JSON.parse(jsonStr);
    } catch {
      return NextResponse.json(
        { error: "Failed to parse analysis", raw: textContent.text },
        { status: 500 }
      );
    }

    return NextResponse.json({ analysis, headline: headline.trim() });
  } catch (error) {
    if (error instanceof Anthropic.AuthenticationError) {
      return NextResponse.json(
        { error: "Invalid API key. Please check your ANTHROPIC_API_KEY." },
        { status: 401 }
      );
    }
    if (error instanceof Anthropic.RateLimitError) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again later." },
        { status: 429 }
      );
    }
    const message = error instanceof Error ? error.message : String(error);
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: `Analysis failed: ${message}` },
      { status: 500 }
    );
  }
}
