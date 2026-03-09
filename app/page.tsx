"use client";

import { useState, useCallback, useEffect } from "react";
import { Analysis, AnalysisResult } from "./types";
import { Header } from "./components/Header";
import { HeadlinesFeed } from "./components/HeadlinesFeed";
import { AnalysisDashboard } from "./components/AnalysisDashboard";
import { EmptyState } from "./components/EmptyState";
import { LoadingState } from "./components/LoadingState";

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const handleAnalyze = useCallback(async (headline: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ headline }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Analysis failed");
      }

      const result: AnalysisResult = {
        analysis: data.analysis as Analysis,
        headline: data.headline,
        timestamp: new Date(),
      };

      setResults((prev) => [result, ...prev]);
      setActiveIndex(0);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return next;
    });
  }, []);

  const activeResult = results[activeIndex] ?? null;

  return (
    <div
      className="min-h-screen transition-colors duration-200"
      style={{ background: "var(--bg-primary)" }}
    >
      <Header isDark={isDark} onToggleTheme={toggleTheme} />

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex flex-col lg:flex-row gap-5 pt-5">
          {/* Left: Live FT Headlines Feed */}
          <aside
            className="w-full lg:w-80 xl:w-96 flex-shrink-0 lg:sticky lg:top-5"
            style={{ height: "calc(100vh - 5.5rem)", maxHeight: "calc(100vh - 5.5rem)" }}
          >
            <HeadlinesFeed onSelectHeadline={handleAnalyze} isAnalyzing={isLoading} />
          </aside>

          {/* Right: Analysis panel */}
          <div className="flex-1 min-w-0">
            {error && (
              <div
                className="mb-5 px-4 py-3 rounded-lg text-sm"
                style={{
                  background: "rgba(239,68,68,0.08)",
                  color: "#EF4444",
                  border: "1px solid rgba(239,68,68,0.2)",
                }}
              >
                {error}
              </div>
            )}

            {/* History tabs */}
            {results.length > 1 && (
              <div className="flex gap-2 mb-5 overflow-x-auto pb-2">
                {results.map((r, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer"
                    style={{
                      background:
                        i === activeIndex
                          ? "var(--text-primary)"
                          : "var(--bg-card)",
                      color:
                        i === activeIndex
                          ? "var(--bg-primary)"
                          : "var(--text-secondary)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    {r.headline.length > 40
                      ? r.headline.substring(0, 40) + "…"
                      : r.headline}
                  </button>
                ))}
              </div>
            )}

            {/* Content */}
            {isLoading ? (
              <LoadingState />
            ) : activeResult ? (
              <AnalysisDashboard result={activeResult} />
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
