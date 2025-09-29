import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

export type PostFrontmatter = {
  title: string;
  description?: string;
  date: string; // ISO
  excerpt?: string;
  tags?: string[];
  category?: string; // Build Logs | Learning Notes | Ideas & Reflections
};

export type Post = {
  slug: string;
  content: string;
  frontmatter: PostFrontmatter;
  readingTimeMinutes: number;
};

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/i, ""))
    .sort()
    .reverse();
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as PostFrontmatter;
  const rt = readingTime(content);
  return {
    slug,
    content,
    frontmatter,
    readingTimeMinutes: Math.max(1, Math.round(rt.minutes)),
  };
}

export function getAllPosts(): Post[] {
  return getAllPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is Post => Boolean(p));
}


