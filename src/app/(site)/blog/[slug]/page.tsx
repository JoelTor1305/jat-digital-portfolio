import { getPostBySlug, getAllPostSlugs } from "@/lib/mdx";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description || post.frontmatter.excerpt,
    keywords: post.frontmatter.tags,
    authors: [{ name: "Joel Torres" }],
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description || post.frontmatter.excerpt,
      type: "article",
      publishedTime: post.frontmatter.date,
      authors: ["Joel Torres"],
      images: [
        {
          url: post.frontmatter.image || "/images/profile-headshot.webp",
          width: 1200,
          height: 630,
          alt: post.frontmatter.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.frontmatter.title,
      description: post.frontmatter.description || post.frontmatter.excerpt,
      images: [post.frontmatter.image || "/images/profile-headshot.webp"],
    },
    alternates: {
      canonical: `https://jat.digital/blog/${slug}`,
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return notFound();

  const { title, date } = post.frontmatter;

  // JSON-LD for BlogPosting
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": post.frontmatter.description || post.frontmatter.excerpt,
    "author": {
      "@type": "Person",
      "name": "Joel Torres",
      "url": "https://jat.digital"
    },
    "datePublished": date,
    "dateModified": date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://jat.digital/blog/${slug}`
    },
    "image": "https://jat.digital/images/profile-headshot.webp"
  };

  return (
    <div className="min-h-screen py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-4">
        {/* Back to blog */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-foreground/60 hover:text-foreground/80 transition mb-8"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </Link>

        {/* Article header */}
        <header className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">
              {post.frontmatter.category || 'Blog Post'}
            </span>
            <span className="text-sm text-foreground/60">
              {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight mb-4">
            {post.frontmatter.title}
          </h1>

          <p className="text-xl text-foreground/80 mb-6">
            {post.frontmatter.description}
          </p>

          <div className="flex items-center gap-4 text-sm text-foreground/60">
            <span>{post.readingTimeMinutes} min read</span>
            {post.frontmatter.tags && (
              <>
                <span>•</span>
                <span>{post.frontmatter.tags.join(', ')}</span>
              </>
            )}
          </div>
        </header>

        {/* Featured image - only show if content doesn't have embedded video */}
        {!post.content.includes('youtube.com/embed') && (
          <div className="mb-12">
            <div className="relative overflow-hidden rounded-xl bg-white/5 border border-white/10 aspect-[16/9]">
              <Image
                src={post.frontmatter.image || "/images/blog-hero.png"}
                alt={post.frontmatter.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}

        {/* Article content */}
        <article className="prose prose-invert max-w-none">
          <div className="text-foreground/90 leading-relaxed space-y-6">
            {(() => {
              const lines = post.content.split('\n');
              const elements: React.ReactElement[] = [];
              let listItems: string[] = [];
              let listStartIndex = -1;
              let htmlBlock: string[] = [];
              let htmlBlockStartIndex = -1;

              const flushList = () => {
                if (listItems.length > 0) {
                  elements.push(
                    <ul key={`list-${listStartIndex}`} className="list-disc list-inside space-y-2 my-4">
                      {listItems.map((item, i) => (
                        <li key={i} className="text-foreground/90" dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(item) }} />
                      ))}
                    </ul>
                  );
                  listItems = [];
                  listStartIndex = -1;
                }
              };

              const flushHtmlBlock = () => {
                if (htmlBlock.length > 0) {
                  elements.push(
                    <div key={`html-${htmlBlockStartIndex}`} dangerouslySetInnerHTML={{ __html: htmlBlock.join('\n') }} />
                  );
                  htmlBlock = [];
                  htmlBlockStartIndex = -1;
                }
              };

              const parseInlineMarkdown = (text: string): string => {
                // Handle bold text **text**
                text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

                // Handle links [text](url)
                text = text.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-blue-400 hover:text-blue-300 underline">$1</a>');

                // Handle code `code`
                text = text.replace(/`(.+?)`/g, '<code class="bg-white/10 px-1 py-0.5 rounded text-sm">$1</code>');

                // Handle apostrophes
                text = text.replace(/&apos;/g, "'");

                return text;
              };

              lines.forEach((paragraph, index) => {
                // Check if we're in an HTML block
                if (htmlBlockStartIndex !== -1) {
                  htmlBlock.push(paragraph);
                  // Check if this line closes the HTML block
                  if (paragraph.trim().startsWith('</div>') || paragraph.trim().startsWith('</iframe>')) {
                    flushHtmlBlock();
                  }
                  return;
                }

                // Check if this line starts an HTML block
                if (paragraph.trim().startsWith('<div') || paragraph.trim().startsWith('<iframe')) {
                  flushList();
                  htmlBlockStartIndex = index;
                  htmlBlock.push(paragraph);
                  return;
                }

                if (paragraph.trim() === '') {
                  flushList();
                  return;
                }

                // Handle headings
                if (paragraph.startsWith('# ')) {
                  flushList();
                  elements.push(
                    <h1 key={index} className="text-3xl font-bold mt-8 mb-4">
                      {paragraph.replace('# ', '')}
                    </h1>
                  );
                  return;
                }
                if (paragraph.startsWith('## ')) {
                  flushList();
                  elements.push(
                    <h2 key={index} className="text-2xl font-bold mt-6 mb-3">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                  return;
                }
                if (paragraph.startsWith('### ')) {
                  flushList();
                  elements.push(
                    <h3 key={index} className="text-xl font-bold mt-4 mb-2">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                  return;
                }

                // Handle horizontal rules
                if (paragraph.trim() === '---') {
                  flushList();
                  elements.push(<hr key={index} className="border-white/20 my-8" />);
                  return;
                }

                // Handle bullet lists
                if (paragraph.trim().startsWith('- ')) {
                  if (listStartIndex === -1) listStartIndex = index;
                  listItems.push(paragraph.trim().substring(2));
                  return;
                }

                // Flush any pending list before adding other elements
                flushList();

                // Handle italic text (lines starting with * and ending with *)
                if (paragraph.startsWith('*') && paragraph.endsWith('*') && !paragraph.startsWith('**')) {
                  elements.push(
                    <p key={index} className="italic text-foreground/70">
                      {paragraph.slice(1, -1).replace(/&apos;/g, "'")}
                    </p>
                  );
                  return;
                }

                // Regular paragraphs with inline markdown
                elements.push(
                  <p key={index} className="text-foreground/90 leading-relaxed" dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(paragraph) }} />
                );
              });

              // Flush any remaining list items or HTML blocks
              flushList();
              flushHtmlBlock();

              return elements;
            })()}
          </div>
        </article>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground/60">
                Thanks for reading! Feel free to reach out if you have any questions.
              </p>
            </div>
            <Link
              href="https://calendly.com/joelatorres1305/lets-chat"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/15 transition"
            >
              Let&apos;s Connect
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
