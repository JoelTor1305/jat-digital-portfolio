import { getAllPosts } from "@/lib/mdx";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Notes",
  description: "Documenting my journey, sharing learnings, and exploring ideas around AI, automation, and backend systems.",
  openGraph: {
    title: "Blog & Notes | JAT Digital",
    description: "Documenting my journey, sharing learnings, and exploring ideas around AI, automation, and backend systems.",
    type: "website",
    images: [
      {
        url: "/images/profile-headshot.webp",
        width: 1200,
        height: 630,
        alt: "JAT Digital Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog & Notes | JAT Digital",
    description: "Documenting my journey, sharing learnings, and exploring ideas around AI, automation, and backend systems.",
    images: ["/images/profile-headshot.webp"],
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Blog & Notes</h1>
          <p className="text-foreground/80 text-lg">
            Documenting my journey, sharing learnings, and exploring ideas around AI, automation, and backend systems.
          </p>
        </div>

        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="group">
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-32 h-32 rounded-lg overflow-hidden">
                        <Image
                          src={post.frontmatter.image || "/images/blog-hero.png"}
                          alt={post.frontmatter.title}
                          width={128}
                          height={128}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
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
                      <h2 className="text-2xl font-bold mb-3 group-hover:text-white/90 transition">
                        {post.frontmatter.title}
                      </h2>
                      <p className="text-foreground/70 mb-4">
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
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-foreground/60">No blog posts yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
