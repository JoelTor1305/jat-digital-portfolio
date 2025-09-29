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
          url: "/images/profile-headshot.webp",
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
      images: ["/images/profile-headshot.webp"],
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) return notFound();

  return (
    <div className="min-h-screen py-24">
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

        {/* Featured image */}
        <div className="mb-12">
          <div className="relative overflow-hidden rounded-xl bg-white/5 border border-white/10 aspect-[16/9]">
            <Image
              src="/images/blog-hero.png"
              alt={post.frontmatter.title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Article content */}
        <article className="prose prose-invert max-w-none">
          <div className="text-foreground/90 leading-relaxed space-y-6">
            {post.content.split('\n').map((paragraph, index) => {
              if (paragraph.trim() === '') return null;
              
              // Handle headings
              if (paragraph.startsWith('# ')) {
                return (
                  <h1 key={index} className="text-3xl font-bold mt-8 mb-4">
                    {paragraph.replace('# ', '')}
                  </h1>
                );
              }
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-2xl font-bold mt-6 mb-3">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-xl font-bold mt-4 mb-2">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              
              // Handle horizontal rules
              if (paragraph.trim() === '---') {
                return <hr key={index} className="border-white/20 my-8" />;
              }
              
              // Handle italic text (lines starting with *)
              if (paragraph.startsWith('*') && paragraph.endsWith('*')) {
                return (
                  <p key={index} className="italic text-foreground/70">
                    {paragraph.slice(1, -1).replace(/&apos;/g, "'")}
                  </p>
                );
              }
              
              // Regular paragraphs
              return (
                <p key={index} className="text-foreground/90 leading-relaxed">
                  {paragraph.replace(/&apos;/g, "'")}
                </p>
              );
            })}
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
