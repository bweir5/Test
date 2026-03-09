"use client";

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export function Header({ isDark, onToggleTheme }: HeaderProps) {
  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-md"
      style={{
        background: "color-mix(in srgb, var(--bg-primary) 85%, transparent)",
        borderColor: "var(--border)",
      }}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center w-8 h-8 rounded-lg"
            style={{ background: "#FD3D54" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M2 12L8 4L14 12"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 9L8 4L11 9"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.6"
              />
            </svg>
          </div>
          <div>
            <span
              className="font-semibold text-sm tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Market Impact
            </span>
            <span
              className="ml-2 text-xs px-1.5 py-0.5 rounded font-medium"
              style={{
                background: "rgba(253,61,84,0.12)",
                color: "#FD3D54",
              }}
            >
              CFA
            </span>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <span
            className="hidden sm:block text-xs"
            style={{ color: "var(--text-muted)" }}
          >
            Powered by Claude Opus
          </span>

          {/* Theme toggle */}
          <button
            onClick={onToggleTheme}
            className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
            style={{
              background: "var(--bg-secondary)",
              border: "1px solid var(--border)",
              color: "var(--text-secondary)",
            }}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
