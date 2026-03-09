import { NextResponse } from "next/server";
import { NewsHeadline } from "@/app/types";

// Multiple free RSS feeds — no API key required
const FEEDS = [
  {
    url: "https://feeds.reuters.com/reuters/businessNews",
    source: "Reuters",
    defaultCategory: "Business",
  },
  {
    url: "https://feeds.reuters.com/reuters/UKBusinessNews/",
    source: "Reuters",
    defaultCategory: "Markets",
  },
  {
    url: "https://www.cnbc.com/id/10000664/device/rss/rss.html",
    source: "CNBC",
    defaultCategory: "Markets",
  },
  {
    url: "https://www.cnbc.com/id/10001147/device/rss/rss.html",
    source: "CNBC",
    defaultCategory: "Economy",
  },
  {
    url: "https://feeds.marketwatch.com/marketwatch/topstories/",
    source: "MarketWatch",
    defaultCategory: "Top Stories",
  },
  {
    url: "https://feeds.marketwatch.com/marketwatch/marketpulse/",
    source: "MarketWatch",
    defaultCategory: "Market Pulse",
  },
  {
    url: "https://finance.yahoo.com/rss/topfinstories",
    source: "Yahoo Finance",
    defaultCategory: "Finance",
  },
  {
    url: "https://www.investing.com/rss/news.rss",
    source: "Investing.com",
    defaultCategory: "Markets",
  },
];

function extractTag(xml: string, tag: string): string {
  const regex = new RegExp(
    `<${tag}[^>]*>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${tag}>`,
    "i"
  );
  const match = xml.match(regex);
  return match ? match[1].trim() : "";
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function decodeEntities(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#8217;/g, "\u2019")
    .replace(/&#8216;/g, "\u2018")
    .replace(/&#8220;/g, "\u201C")
    .replace(/&#8221;/g, "\u201D")
    .replace(/&#8211;/g, "\u2013")
    .replace(/&#8212;/g, "\u2014");
}

// Filter to market-relevant headlines only
const MARKET_KEYWORDS = [
  "fed", "rate", "inflation", "gdp", "recession", "bank", "market", "stock",
  "bond", "yield", "dollar", "oil", "gold", "china", "economy", "ecb",
  "central bank", "tariff", "trade", "growth", "earnings", "profit", "debt",
  "crisis", "commodity", "currency", "interest", "monetary", "fiscal",
  "treasury", "equity", "fund", "investment", "capital", "financial",
  "employment", "jobs", "unemployment", "consumer", "price", "cost",
  "export", "import", "deficit", "surplus", "quarter", "annual",
  "geopolit", "war", "sanction", "opec", "energy",
];

function isMarketRelevant(title: string, description: string): boolean {
  const text = (title + " " + description).toLowerCase();
  return MARKET_KEYWORDS.some((kw) => text.includes(kw));
}

function parseRSS(xml: string, source: string, defaultCategory: string): NewsHeadline[] {
  const items: NewsHeadline[] = [];
  const itemRegex = /<item[^>]*>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1];
    const title = decodeEntities(extractTag(itemXml, "title"));
    const link = extractTag(itemXml, "link") || extractTag(itemXml, "guid");
    const description = decodeEntities(stripHtml(extractTag(itemXml, "description"))).slice(0, 220);
    const pubDate = extractTag(itemXml, "pubDate");
    const category = decodeEntities(extractTag(itemXml, "category")) || defaultCategory;

    if (title && link && isMarketRelevant(title, description)) {
      items.push({ title, link, description, pubDate: pubDate || new Date().toUTCString(), category, source });
    }
  }

  return items;
}

export async function GET() {
  const results = await Promise.allSettled(
    FEEDS.map(async ({ url, source, defaultCategory }) => {
      const response = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; MarketImpact/1.0)",
          Accept: "application/rss+xml, application/xml, text/xml, */*",
        },
        next: { revalidate: 180 }, // cache upstream fetch for 3 min
      });

      if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);
      const xml = await response.text();
      return parseRSS(xml, source, defaultCategory);
    })
  );

  const allHeadlines: NewsHeadline[] = [];
  const seenTitles = new Set<string>();

  for (const result of results) {
    if (result.status === "fulfilled") {
      for (const h of result.value) {
        // Deduplicate by normalised title (same story from multiple feeds)
        const key = h.title.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 60);
        if (!seenTitles.has(key)) {
          seenTitles.add(key);
          allHeadlines.push(h);
        }
      }
    }
  }

  allHeadlines.sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  );

  return NextResponse.json(
    { headlines: allHeadlines.slice(0, 80), fetchedAt: new Date().toISOString() },
    { headers: { "Cache-Control": "no-store" } }
  );
}
