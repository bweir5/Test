import { NextResponse } from "next/server";
import { FTHeadline } from "@/app/types";

const FT_FEEDS = [
  { url: "https://www.ft.com/rss/home", category: "Top Stories" },
  { url: "https://www.ft.com/markets?format=rss", category: "Markets" },
  { url: "https://www.ft.com/world?format=rss", category: "World" },
  { url: "https://www.ft.com/companies?format=rss", category: "Companies" },
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
  return html.replace(/<[^>]+>/g, "").trim();
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

function parseRSS(xml: string, defaultCategory: string): FTHeadline[] {
  const items: FTHeadline[] = [];
  const itemRegex = /<item[^>]*>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1];
    const title = extractTag(itemXml, "title");
    const link =
      extractTag(itemXml, "link") || extractTag(itemXml, "guid");
    const description = extractTag(itemXml, "description");
    const pubDate = extractTag(itemXml, "pubDate");
    const category = extractTag(itemXml, "category") || defaultCategory;

    if (title && link) {
      items.push({
        title: decodeEntities(title),
        link,
        description: description
          ? decodeEntities(stripHtml(description)).slice(0, 200)
          : "",
        pubDate: pubDate || new Date().toUTCString(),
        category: decodeEntities(category),
      });
    }
  }

  return items;
}

export async function GET() {
  try {
    const results = await Promise.allSettled(
      FT_FEEDS.map(async ({ url, category }) => {
        const response = await fetch(url, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (compatible; FTImpact/1.0; +https://ft-impact.vercel.app)",
            Accept: "application/rss+xml, application/xml, text/xml, */*",
          },
          next: { revalidate: 300 }, // cache 5 min
        });

        if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);
        const xml = await response.text();
        return parseRSS(xml, category);
      })
    );

    const allHeadlines: FTHeadline[] = [];
    const seenLinks = new Set<string>();

    for (const result of results) {
      if (result.status === "fulfilled") {
        for (const headline of result.value) {
          const key = headline.link.split("?")[0];
          if (!seenLinks.has(key)) {
            seenLinks.add(key);
            allHeadlines.push(headline);
          }
        }
      }
    }

    allHeadlines.sort(
      (a, b) =>
        new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    );

    return NextResponse.json(
      { headlines: allHeadlines.slice(0, 60), fetchedAt: new Date().toISOString() },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("Headlines fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch headlines" },
      { status: 500 }
    );
  }
}
