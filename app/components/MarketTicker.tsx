"use client";

import { useEffect, useState, useRef } from "react";
import { MarketQuote } from "../types";

function formatPrice(q: MarketQuote): string {
  if (q.label === "10Y Yield") return `${q.price.toFixed(2)}%`;
  if (q.label === "EUR/USD") return q.price.toFixed(4);
  if (q.label === "DXY") return q.price.toFixed(2);
  if (q.label === "VIX") return q.price.toFixed(2);
  if (q.price >= 1000) return q.price.toLocaleString("en-US", { maximumFractionDigits: 0 });
  return q.price.toFixed(2);
}

function formatChange(q: MarketQuote): string {
  const sign = q.changePercent >= 0 ? "+" : "";
  return `${sign}${q.changePercent.toFixed(2)}%`;
}

export function MarketTicker() {
  const [quotes, setQuotes] = useState<MarketQuote[]>([]);
  const [fetchedAt, setFetchedAt] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const tickerRef = useRef<HTMLDivElement>(null);

  async function fetchQuotes() {
    try {
      const res = await fetch("/api/market-data", { cache: "no-store" });
      const data = await res.json();
      if (data.quotes?.length) {
        setQuotes(data.quotes);
        setFetchedAt(data.fetchedAt);
        setError(false);
      }
    } catch {
      setError(true);
    }
  }

  useEffect(() => {
    fetchQuotes();
    const interval = setInterval(fetchQuotes, 60_000);
    return () => clearInterval(interval);
  }, []);

  if (error || quotes.length === 0) return null;

  const now = fetchedAt ? new Date(fetchedAt) : null;
  const timeStr = now
    ? now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "";

  return (
    <div
      className="border-b overflow-hidden select-none"
      style={{
        background: "var(--bg-card)",
        borderColor: "var(--border)",
      }}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-0 h-9 overflow-x-auto no-scrollbar">
          {/* Live label */}
          <div
            className="flex items-center gap-1.5 flex-shrink-0 pr-4 mr-2"
            style={{ borderRight: "1px solid var(--border)" }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "#10B981" }}
            />
            <span
              className="text-xs font-semibold tracking-wide uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              Live
            </span>
          </div>

          {/* Quotes */}
          <div ref={tickerRef} className="flex items-center gap-0 flex-nowrap">
            {quotes.map((q, i) => {
              const isUp = q.changePercent >= 0;
              const color = Math.abs(q.changePercent) < 0.05
                ? "var(--text-muted)"
                : isUp ? "#10B981" : "#EF4444";

              return (
                <div
                  key={q.symbol}
                  className="flex items-center gap-2 flex-shrink-0 px-4"
                  style={{
                    borderRight: i < quotes.length - 1 ? "1px solid var(--border)" : "none",
                  }}
                >
                  <span
                    className="text-xs font-medium"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {q.label}
                  </span>
                  <span
                    className="text-xs font-semibold tabular-nums"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {formatPrice(q)}
                  </span>
                  <span
                    className="text-xs font-medium tabular-nums"
                    style={{ color }}
                  >
                    {isUp && Math.abs(q.changePercent) >= 0.05 ? "▲" : !isUp && Math.abs(q.changePercent) >= 0.05 ? "▼" : ""}
                    {" "}{formatChange(q)}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Timestamp */}
          {timeStr && (
            <div
              className="flex-shrink-0 pl-4 ml-2"
              style={{ borderLeft: "1px solid var(--border)" }}
            >
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                {timeStr}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
