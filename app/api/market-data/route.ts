import { NextResponse } from "next/server";
import { MarketQuote } from "@/app/types";

const SYMBOLS = [
  { symbol: "^GSPC",     label: "S&P 500",    unit: "price" },
  { symbol: "^IXIC",     label: "NASDAQ",     unit: "price" },
  { symbol: "^TNX",      label: "10Y Yield",  unit: "%" },
  { symbol: "^VIX",      label: "VIX",        unit: "price" },
  { symbol: "GC=F",      label: "Gold",       unit: "$" },
  { symbol: "CL=F",      label: "WTI Oil",    unit: "$" },
  { symbol: "DX-Y.NYB",  label: "DXY",        unit: "price" },
  { symbol: "EURUSD=X",  label: "EUR/USD",    unit: "price" },
  { symbol: "BTC-USD",   label: "Bitcoin",    unit: "$" },
];

export async function GET() {
  try {
    const symbolList = SYMBOLS.map((s) => encodeURIComponent(s.symbol)).join(",");
    const url = `https://query1.finance.yahoo.com/v7/finance/quote?formatted=false&symbols=${symbolList}`;

    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; MarketImpact/1.0)",
        Accept: "application/json",
      },
      next: { revalidate: 60 }, // cache 1 min server-side
    });

    if (!res.ok) throw new Error(`Yahoo Finance responded ${res.status}`);

    const json = await res.json();
    const results: { [key: string]: { regularMarketPrice: number; regularMarketChange: number; regularMarketChangePercent: number } } = {};

    for (const q of json?.quoteResponse?.result ?? []) {
      results[q.symbol] = {
        regularMarketPrice: q.regularMarketPrice,
        regularMarketChange: q.regularMarketChange,
        regularMarketChangePercent: q.regularMarketChangePercent,
      };
    }

    const quotes: MarketQuote[] = SYMBOLS.map(({ symbol, label, unit }) => {
      const q = results[symbol];
      return {
        symbol,
        label,
        unit,
        price: q?.regularMarketPrice ?? 0,
        change: q?.regularMarketChange ?? 0,
        changePercent: q?.regularMarketChangePercent ?? 0,
      };
    }).filter((q) => q.price > 0);

    return NextResponse.json(
      { quotes, fetchedAt: new Date().toISOString() },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    console.error("Market data fetch error:", err);
    return NextResponse.json({ quotes: [], fetchedAt: new Date().toISOString() });
  }
}
