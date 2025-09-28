import type { MetadataRoute } from "next";
import { getAllPostSlugs } from "@/lib/mdx";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const now = new Date().toISOString();
  const posts = getAllPostSlugs().map((slug) => ({ url: `${base}/blog/${slug}`, lastModified: now }));
  return [
    { url: `${base}/`, lastModified: now },
    { url: `${base}/about`, lastModified: now },
    { url: `${base}/projects`, lastModified: now },
    { url: `${base}/blog`, lastModified: now },
    { url: `${base}/resume`, lastModified: now },
    { url: `${base}/contact`, lastModified: now },
    ...posts,
  ];
}


