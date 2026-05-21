/**
 * Sitemap Generator for Jolrong
 * Generates XML sitemap for better SEO and search engine indexing
 */

interface SitemapEntry {
  url: string;
  changeFrequency?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
  lastModified?: string;
}

/**
 * Generate XML sitemap from entries
 */
export const generateSitemapXML = (entries: SitemapEntry[]): string => {
  const baseUrl = "https://jolrongarchitects.com";

  const xmlEntries = entries
    .map((entry) => {
      const fullUrl = entry.url.startsWith("http")
        ? entry.url
        : `${baseUrl}${entry.url}`;

      return `
  <url>
    <loc>${escapeXml(fullUrl)}</loc>
    ${entry.lastModified ? `<lastmod>${entry.lastModified}</lastmod>` : ""}
    ${
      entry.changeFrequency
        ? `<changefreq>${entry.changeFrequency}</changefreq>`
        : ""
    }
    ${entry.priority ? `<priority>${entry.priority}</priority>` : ""}
  </url>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0">
${xmlEntries}
</urlset>`;
};

/**
 * Escape XML special characters
 */
const escapeXml = (unsafe: string): string => {
  return unsafe
    .replace(/[<>&'"]/g, (c) => {
      switch (c) {
        case "<":
          return "&lt;";
        case ">":
          return "&gt;";
        case "&":
          return "&amp;";
        case "'":
          return "&apos;";
        case '"':
          return "&quot;";
        default:
          return c;
      }
    });
};

/**
 * Default sitemap entries for static pages
 */
export const DEFAULT_SITEMAP_ENTRIES: SitemapEntry[] = [
  {
    url: "/",
    changeFrequency: "weekly",
    priority: 1.0,
  },
  {
    url: "/projects",
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    url: "/art-and-craft",
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: "/about",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: "/contact",
    changeFrequency: "monthly",
    priority: 0.7,
  },
];

/**
 * Generate sitemap index for multiple sitemaps
 */
export const generateSitemapIndex = (
  sitemaps: Array<{ url: string; lastModified?: string }>
): string => {
  const baseUrl = "https://jolrongarchitects.com";

  const entries = sitemaps
    .map((sitemap) => {
      const fullUrl = sitemap.url.startsWith("http")
        ? sitemap.url
        : `${baseUrl}${sitemap.url}`;

      return `
  <sitemap>
    <loc>${escapeXml(fullUrl)}</loc>
    ${sitemap.lastModified ? `<lastmod>${sitemap.lastModified}</lastmod>` : ""}
  </sitemap>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</sitemapindex>`;
};
