"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { FTHeadline } from "../types";

const CATEGORIES = ["All", "Top Stories", "Markets", "World", "Companies"];

function timeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "";
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

const CATEGORY_COLORS: Record<string, string> = {
  "Top Stories": "#D97706",
  Markets: "#3B82F6",
  World: "#10B981",
  Companies: "#8B5CF6",
};

interface Props {
  onSelectHeadline: (headline: string) => void;
  isAnalyzing: boolean;
}

export function HeadlinesFeed({ onSelectHeadline, isAnalyzing }: Props) {
  const [headlines, setHeadlines] = useState<FTHeadline[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchedAt, setFetchedAt] = useState<Date | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [analyzingHeadline, setAnalyzingHeadline] = useState<string | null>(null);

  // Pull-to-refresh state
  const [pullY, setPullY] = useState(0);
  const touchStartY = useRef(0);
  const isPulling = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const fetchHeadlines = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/headlines");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch");
      setHeadlines(data.headlines);
      setFetchedAt(new Date(data.fetchedAt));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load headlines");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHeadlines();
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchHeadlines, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchHeadlines]);

  // Reset analyzing state when parent signals done
  useEffect(() => {
    if (!isAnalyzing) setAnalyzingHeadline(null);
  }, [isAnalyzing]);

  // Touch handlers for pull-to-refresh
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (scrollRef.current && scrollRef.current.scrollTop === 0) {
      touchStartY.current = e.touches[0].clientY;
      isPulling.current = true;
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isPulling.current) return;
    const delta = e.touches[0].clientY - touchStartY.current;
    if (delta > 0 && scrollRef.current?.scrollTop === 0) {
      setPullY(Math.min(delta * 0.5, 72));
      if (delta > 10) e.preventDefault();
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!isPulling.current) return;
    isPulling.current = false;
    if (pullY >= 52) {
      fetchHeadlines();
    }
    setPullY(0);
  }, [pullY, fetchHeadlines]);

  const filtered =
    activeCategory === "All"
      ? headlines
      : headlines.filter((h) => h.category === activeCategory);

  const handleSelect = (headline: FTHeadline) => {
    if (isAnalyzing) return;
    setAnalyzingHeadline(headline.title);
    onSelectHeadline(headline.title);
  };

  const pullProgress = Math.min(pullY / 52, 1);
  const showPullIndicator = pullY > 4;

  return (
    <div
      className="flex flex-col rounded-xl overflow-hidden"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        height: "100%",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 flex-shrink-0"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{
              background: isLoading ? "#F59E0B" : error ? "#EF4444" : "#10B981",
              boxShadow: isLoading
                ? "0 0 6px #F59E0B"
                : error
                ? "0 0 6px #EF4444"
                : "0 0 6px #10B981",
            }}
          />
          <span
            className="text-sm font-semibold tracking-wide"
            style={{ color: "var(--text-primary)" }}
          >
            FT Live Feed
          </span>
          {fetchedAt && !isLoading && (
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              · {timeAgo(fetchedAt.toISOString())}
            </span>
          )}
        </div>
        <button
          onClick={fetchHeadlines}
          disabled={isLoading}
          className="p-1.5 rounded-lg transition-all cursor-pointer"
          style={{
            background: "var(--bg-secondary)",
            color: "var(--text-secondary)",
            opacity: isLoading ? 0.5 : 1,
          }}
          title="Refresh headlines"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={isLoading ? "animate-spin" : ""}
          >
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
            <path d="M8 16H3v5" />
          </svg>
        </button>
      </div>

      {/* Category tabs */}
      <div
        className="flex gap-1 px-3 py-2 overflow-x-auto flex-shrink-0"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="flex-shrink-0 px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer"
            style={{
              background:
                activeCategory === cat
                  ? cat === "All"
                    ? "var(--text-primary)"
                    : CATEGORY_COLORS[cat] + "22"
                  : "transparent",
              color:
                activeCategory === cat
                  ? cat === "All"
                    ? "var(--bg-primary)"
                    : CATEGORY_COLORS[cat] || "var(--text-primary)"
                  : "var(--text-muted)",
              border:
                activeCategory === cat
                  ? `1px solid ${
                      cat === "All"
                        ? "var(--text-primary)"
                        : CATEGORY_COLORS[cat] || "var(--border)"
                    }`
                  : "1px solid transparent",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Pull-to-refresh indicator */}
      {showPullIndicator && (
        <div
          className="flex items-center justify-center flex-shrink-0 transition-all overflow-hidden"
          style={{ height: pullY, opacity: pullProgress }}
        >
          <div
            className="flex items-center gap-2 text-xs"
            style={{ color: "var(--text-muted)" }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                transform: `rotate(${pullProgress * 180}deg)`,
                transition: "transform 0.1s",
              }}
            >
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
              <path d="M21 3v5h-5" />
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
              <path d="M8 16H3v5" />
            </svg>
            {pullProgress >= 1 ? "Release to refresh" : "Pull to refresh"}
          </div>
        </div>
      )}

      {/* Scrollable list */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ WebkitOverflowScrolling: "touch" } as React.CSSProperties}
      >
        {isLoading && headlines.length === 0 ? (
          <div className="p-3 space-y-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-lg p-3 skeleton" style={{ height: 72 }} />
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-48 gap-3 p-6 text-center">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#EF4444"
              strokeWidth="1.5"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              {error}
            </p>
            <button
              onClick={fetchHeadlines}
              className="text-xs px-3 py-1.5 rounded-lg cursor-pointer"
              style={{
                background: "var(--bg-secondary)",
                color: "var(--text-secondary)",
                border: "1px solid var(--border)",
              }}
            >
              Retry
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="flex items-center justify-center h-32 text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            No headlines in this category
          </div>
        ) : (
          <div className="p-2 space-y-1">
            {filtered.map((headline, i) => {
              const isActive = analyzingHeadline === headline.title;
              const catColor =
                CATEGORY_COLORS[headline.category] || "var(--text-muted)";
              return (
                <button
                  key={`${headline.link}-${i}`}
                  onClick={() => handleSelect(headline)}
                  disabled={isAnalyzing}
                  className="w-full text-left rounded-lg p-3 transition-all cursor-pointer group"
                  style={{
                    background: isActive
                      ? "rgba(59,130,246,0.08)"
                      : "transparent",
                    border: isActive
                      ? "1px solid rgba(59,130,246,0.3)"
                      : "1px solid transparent",
                    opacity: isAnalyzing && !isActive ? 0.5 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive && !isAnalyzing) {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "var(--bg-secondary)";
                      (e.currentTarget as HTMLButtonElement).style.border =
                        "1px solid var(--border)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "transparent";
                      (e.currentTarget as HTMLButtonElement).style.border =
                        "1px solid transparent";
                    }
                  }}
                >
                  <div className="flex items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-xs font-medium leading-snug mb-1"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {headline.title}
                      </p>
                      {headline.description && (
                        <p
                          className="text-xs leading-snug line-clamp-2 mb-1.5"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {headline.description}
                        </p>
                      )}
                      <div className="flex items-center gap-2">
                        <span
                          className="text-xs font-medium"
                          style={{ color: catColor }}
                        >
                          {headline.category}
                        </span>
                        <span
                          className="text-xs"
                          style={{ color: "var(--text-muted)" }}
                        >
                          · {timeAgo(headline.pubDate)}
                        </span>
                      </div>
                    </div>
                    {isActive ? (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#3B82F6"
                        strokeWidth="2.5"
                        className="flex-shrink-0 mt-0.5 animate-spin"
                      >
                        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                        <path d="M21 3v5h-5" />
                      </svg>
                    ) : (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: "var(--text-muted)" }}
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer count */}
      {filtered.length > 0 && (
        <div
          className="px-4 py-2 text-xs flex-shrink-0"
          style={{
            borderTop: "1px solid var(--border)",
            color: "var(--text-muted)",
          }}
        >
          {filtered.length} headline{filtered.length !== 1 ? "s" : ""} · Tap to
          analyze
        </div>
      )}
    </div>
  );
}
