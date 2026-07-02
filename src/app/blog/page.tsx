import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { getAllBlogPosts } from "@/lib/blog";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Sales Tax Insights & Resources | SalesTaxAccountant.com",
  description:
    "Expert guidance on sales tax nexus, compliance, VDAs, and multi-state obligations. Practical insights for e-commerce, SaaS, and growing businesses.",
  alternates: {
    canonical: "https://www.salestaxaccountant.com/blog",
  },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link
            href="/"
            className="text-sm text-blue-950 hover:underline flex items-center gap-1"
          >
            ← Back to home
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-blue-950">
          Sales Tax Insights
        </h1>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl leading-relaxed">
          Practical guidance on nexus, compliance, audits, and multi-state
          sales tax for growing businesses.
        </p>
      </section>

      {/* Blog Posts */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        {posts.length === 0 ? (
          <p className="text-slate-600">No blog posts yet. Check back soon!</p>
        ) : (
          <div className="divide-y divide-slate-200 border-t border-slate-200">
            {posts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.slug} className="group block py-8">
                <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
                  <span className="px-2 py-1 bg-blue-50 text-blue-950 rounded font-medium">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readingTime}
                  </span>
                </div>
                <h2 className="text-xl font-semibold mt-3 group-hover:text-blue-800 transition-colors">
                  {post.title}
                </h2>
                <p className="text-slate-600 leading-relaxed mt-2">{post.description}</p>
                <div className="mt-3 text-blue-950 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read article <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="rounded-2xl p-8 md:p-10 bg-blue-950 text-white">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
            Need personalized guidance?
          </h2>
          <p className="text-blue-100 mb-6">
            We can help you navigate complex sales tax situations with confidence.
          </p>
          <Button asChild className="bg-white text-blue-950 hover:bg-blue-50">
            <Link href="/#contact">Book a consult</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
