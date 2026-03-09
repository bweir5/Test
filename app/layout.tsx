import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FT Market Impact — CFA Analysis",
  description:
    "AI-powered CFA-level market impact analysis of Financial Times headlines across all major asset classes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
