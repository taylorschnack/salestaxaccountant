import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { getAllBlogPosts, getBlogPost } from "@/lib/blog";
import { Calendar, Clock, User } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | SalesTaxAccountant.com`,
    description: post.description,
    alternates: {
      canonical: `https://www.salestaxaccountant.com/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link
            href="/blog"
            className="text-sm text-blue-900 hover:underline flex items-center gap-1"
          >
            ← Back to blog
          </Link>
        </div>
      </header>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-4 py-16">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-4">
          <span className="px-3 py-1 bg-blue-50 text-blue-900 rounded-full text-xs font-medium">
            {post.category}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {post.readingTime}
          </span>
          <span className="flex items-center gap-1">
            <User className="h-4 w-4" />
            {post.author}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
          {post.title}
        </h1>

        {/* Description */}
        <p className="text-xl text-slate-600 mb-8">{post.description}</p>

        {/* Content */}
        <div className="prose prose-slate prose-lg max-w-none">
          <MDXRemote source={post.content} />
        </div>

        {/* CTA */}
        <div className="mt-16 p-8 bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl">
          <h3 className="text-2xl font-bold text-blue-900 mb-2">
            Need help with your sales tax situation?
          </h3>
          <p className="text-slate-600 mb-4">
            Get expert guidance on nexus, compliance, and multi-state obligations.
          </p>
          <Button asChild className="bg-blue-900 hover:bg-teal-700">
            <Link href="/#contact">Schedule a consultation</Link>
          </Button>
        </div>
      </article>
    </div>
  );
}
