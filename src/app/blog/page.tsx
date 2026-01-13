import Link from "next/link";
import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link
            href="/"
            className="text-sm text-blue-900 hover:underline flex items-center gap-1"
          >
            ← Back to home
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-teal-700">
          Sales Tax Insights
        </h1>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl">
          Practical guidance on nexus, compliance, audits, and multi-state
          sales tax for growing businesses.
        </p>
      </section>

      {/* Blog Posts */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        {posts.length === 0 ? (
          <p className="text-slate-600">No blog posts yet. Check back soon!</p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.slug}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                      <span className="px-2 py-1 bg-blue-50 text-blue-900 rounded">
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
                    <CardTitle className="text-xl">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">{post.description}</p>
                    <div className="mt-4 text-blue-900 font-medium flex items-center gap-1">
                      Read more <ArrowRight className="h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
