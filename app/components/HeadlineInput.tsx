"use client";

import { useState, useRef, KeyboardEvent } from "react";

interface HeadlineInputProps {
  onAnalyze: (headline: string) => void;
  isLoading: boolean;
}

const SAMPLE_HEADLINES = [
  "Federal Reserve signals three rate cuts in 2025 as inflation cools faster than expected",
  "China's central bank announces surprise 50bp rate cut amid property crisis deepening",
  "OPEC+ agrees to extend 2.2 million barrel per day production cuts through Q3",
  "European Central Bank raises rates 25bp, signals further tightening ahead",
  "US economy adds 300,000 jobs in January, unemployment falls to 3.4%",
];

export function HeadlineInput({ onAnalyze, isLoading }: HeadlineInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (trimmed.length >= 10 && !isLoading) {
      onAnalyze(trimmed);
      setValue("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSample = (headline: string) => {
    setValue(headline);
    textareaRef.current?.focus();
  };

  const canSubmit = value.trim().length >= 10 && !isLoading;

  return (
    <div>
      {/* Main input box */}
      <div
        className="rounded-xl overflow-hidden transition-all"
        style={{
          border: "1px solid var(--border)",
          background: "var(--bg-card)",
          boxShadow: "var(--shadow-md)",
        }}
      >
        {/* Label row */}
        <div
          className="flex items-center gap-2 px-4 pt-3 pb-1"
          style={{ borderBottom: "1px solid var(--border-subtle)" }}
        >
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: "#FD3D54" }}
          />
          <span
            className="text-xs font-medium uppercase tracking-widest"
            style={{ color: "var(--text-muted)" }}
          >
            Financial Times Headline
          </span>
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Paste a Financial Times headline to analyze its market impact…"
          rows={2}
          className="w-full px-4 py-3 text-base resize-none outline-none"
          style={{
            background: "transparent",
            color: "var(--text-primary)",
          }}
          disabled={isLoading}
        />

        {/* Footer row */}
        <div
          className="flex items-center justify-between px-4 py-2"
          style={{ borderTop: "1px solid var(--border-subtle)" }}
        >
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            {value.length > 0
              ? `${value.length} chars · Press Enter to analyze`
              : "Enter ↵ to analyze · Shift+Enter for new line"}
          </span>
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer"
            style={{
              background: canSubmit ? "#FD3D54" : "var(--bg-secondary)",
              color: canSubmit ? "#ffffff" : "var(--text-muted)",
              opacity: canSubmit ? 1 : 0.6,
            }}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
                Analyzing…
              </>
            ) : (
              <>
                Analyze
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Sample headlines */}
      <div className="mt-3 flex flex-wrap gap-2">
        <span
          className="text-xs mt-0.5"
          style={{ color: "var(--text-muted)" }}
        >
          Try:
        </span>
        {SAMPLE_HEADLINES.map((h, i) => (
          <button
            key={i}
            onClick={() => handleSample(h)}
            disabled={isLoading}
            className="text-xs px-2.5 py-1 rounded-full transition-colors cursor-pointer"
            style={{
              background: "var(--bg-secondary)",
              color: "var(--text-secondary)",
              border: "1px solid var(--border)",
            }}
          >
            {h.substring(0, 42)}…
          </button>
        ))}
      </div>
    </div>
  );
}
