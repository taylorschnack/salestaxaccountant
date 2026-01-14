import Link from "next/link";
import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAllBlogPosts } from "@/lib/blog";
import { Calendar, Clock, ArrowRight, BookOpen, TrendingUp } from "lucide-react";

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
      {/* Decorative gradient backdrop */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-24 -left-24 h-[32rem] w-[32rem] rounded-full blur-3xl opacity-10 bg-gradient-to-tr from-blue-900 to-teal-600" />
        <div className="absolute top-1/2 -right-24 h-[28rem] w-[28rem] rounded-full blur-3xl opacity-10 bg-gradient-to-tr from-teal-700 to-blue-900" />
      </div>

      {/* Header */}
      <header className="border-b backdrop-blur bg-white/70">
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
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="h-8 w-8 text-amber-600" />
          <span className="text-sm font-medium text-slate-600 uppercase tracking-wide">Knowledge Center</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-900 via-blue-800 to-teal-700 leading-tight pb-2">
          Sales Tax Insights
        </h1>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl leading-relaxed">
          Practical guidance on nexus, compliance, audits, and multi-state
          sales tax for growing businesses.
        </p>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 gap-4 max-w-md">
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="h-5 w-5 text-teal-700" />
            <span className="text-slate-600">
              <strong className="text-slate-900">{posts.length}</strong> articles
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-5 w-5 text-teal-700" />
            <span className="text-slate-600">Updated weekly</span>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        {posts.length === 0 ? (
          <p className="text-slate-600">No blog posts yet. Check back soon!</p>
        ) : (
          <div className="space-y-6">
            {posts.map((post, index) => (
              <Link href={`/blog/${post.slug}`} key={post.slug}>
                <Card className="hover:shadow-xl hover:border-teal-700 transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2 flex-wrap">
                      <span className="px-2 py-1 bg-blue-50 text-blue-900 rounded font-medium">
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
                      {index === 0 && (
                        <span className="ml-auto px-2 py-1 bg-amber-50 text-amber-700 rounded text-xs font-medium">
                          Latest
                        </span>
                      )}
                    </div>
                    <CardTitle className="text-xl group-hover:text-teal-700 transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 leading-relaxed">{post.description}</p>
                    <div className="mt-4 text-blue-900 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read article <ArrowRight className="h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="rounded-2xl border p-8 md:p-10 bg-gradient-to-br from-blue-50 to-teal-50">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-2">
            Need personalized guidance?
          </h2>
          <p className="text-slate-600 mb-6">
            Our team can help you navigate complex sales tax situations with confidence.
          </p>
          <Button asChild className="bg-blue-900 hover:bg-teal-700">
            <Link href="/#contact">Schedule a consultation</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
