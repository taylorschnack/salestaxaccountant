"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  ChevronRight,
  Mail,
  MapPin,
  MessageSquare,
  ShieldCheck,
  Layers,
  Calculator,
  BadgeCheck,
  Flag,
  FileText,
  FileSpreadsheet,
  Building2,
  BookOpen,
  Download,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

/**
 * SalesTaxAccountant.com — Branded MVP Site
 * Professional sales & use tax consulting landing page with lead generation.
 */

function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" role="img" aria-label="SalesTaxAccountant.com logo">
      <defs>
        <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="100%" stopColor="#0f766e" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" rx="14" ry="14" width="52" height="52" fill="url(#g)" />
      <path d="M22 24c0-1.1.9-2 2-2h12.6c.5 0 1 .2 1.4.6l8.4 8.4c.8.8.8 2 0 2.8L39 41.6c-.4.4-.9.6-1.4.6H25c-1.1 0-2-.9-2-2V24z" fill="#d97706" />
      <circle cx="28.5" cy="28.5" r="2" fill="#fff" />
      <g fill="#fff" transform="translate(33 28)">
        <circle cx="2" cy="2" r="2" />
        <rect x="-1.5" y="7" width="11" height="2.2" transform="rotate(-45 4 8)" rx="1" />
      </g>
    </svg>
  );
}

const BRAND = {
  gradient: "bg-gradient-to-br from-blue-900 to-teal-700",
  gradientText: "bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-teal-700",
  navy: "text-blue-900",
  teal: "text-teal-700",
  gold: "text-amber-600",
};

const FEATURES = [
  { icon: <ShieldCheck className="h-6 w-6" />, title: "Audit-ready documentation", text: "Clear memos, citations, and state-by-state conclusions that stand up to scrutiny." },
  { icon: <MapPin className="h-6 w-6" />, title: "Post‑Wayfair, multi‑state expertise", text: "Nexus, marketplace rules, local jurisdictions, and thresholds across the U.S." },
  { icon: <FileText className="h-6 w-6" />, title: "Engine‑agnostic guidance", text: "Practical taxability mapping and exemption logic, whatever provider you use." }
];

const SERVICES = [
  { icon: <Flag className="h-6 w-6" />, title: "Nexus & Exposure Study", text: "Economic + physical nexus by state with thresholds, dates, and remediation plan." },
  { icon: <Building2 className="h-6 w-6" />, title: "Registration & Onboarding", text: "State registrations, marketplace settings, and filing calendars set up correctly." },
  { icon: <FileSpreadsheet className="h-6 w-6" />, title: "Product Taxability Matrix", text: "Taxability calls for your catalog across nexus states with notes and citations." },
  { icon: <ShieldCheck className="h-6 w-6" />, title: "Audit Support & Sampling", text: "Prepare evidence, manage requests, sampling strategies, and negotiation support." },
  { icon: <Calculator className="h-6 w-6" />, title: "Voluntary Disclosures (VDAs)", text: "Quantify historical exposure and guide VDA/amnesty to reduce penalties and lookback." },
  { icon: <Layers className="h-6 w-6" />, title: "Sales Tax Systems & Controls", text: "Provider‑neutral rules, exemption certificate process, and monthly close checklist." }
];

const INDUSTRIES = [
  "E‑commerce & Marketplaces",
  "Software / SaaS",
  "Manufacturing & Wholesale",
  "Professional Services",
  "Multi‑state Retail",
  "VC‑backed Growth Cos."
];

const FAQS = [
  { q: "How fast can you deliver a nexus study?", a: "Typical turnarounds are 1–2 weeks depending on states and data readiness. Rush options available." },
  { q: "Do you implement or resell tax engines?", a: "We stay vendor‑neutral. We help you choose, configure rules, and validate results without reselling software." },
  { q: "Can you represent us in front of the state?", a: "We support audits end‑to‑end and coordinate with legal counsel when formal representation is required." },
];

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center p-4">
      <div className={`text-3xl font-semibold ${BRAND.gold}`}>{value}</div>
      <div className="text-sm text-slate-600">{label}</div>
    </div>
  );
}

function LeadForm() {
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/manbgjvk", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setSent(true);
        form.reset();
      } else {
        alert("There was a problem submitting your form. Please try again.");
      }
    } catch {
      alert("There was a problem submitting your form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle>Request a consult</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        {sent ? (
          <div className="rounded-xl p-4 bg-teal-50 text-teal-900 text-sm border border-teal-200">
            Thanks! We just received your note and will reply within one business day.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input type="text" name="name" placeholder="Your Name" required />
            <Input type="email" name="email" placeholder="Your Email" required />
            <Input type="text" name="company" placeholder="Your Company Name" required />
            <Textarea name="message" placeholder="Tell us about your sales tax situation" required />
            <Button type="submit" disabled={isSubmitting} className="bg-blue-900 hover:bg-teal-700">
              {isSubmitting ? "Sending..." : "Send"}
            </Button>
          </form>
        )}
        <p className="text-xs text-slate-500">We never share your info.</p>
      </CardContent>
    </Card>
  );
}

function LeadMagnetForm() {
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Add a marker to identify this as a lead magnet request
    formData.append("message", "Lead Magnet Request: Sales Tax Nexus Checklist");

    try {
      const response = await fetch("https://formspree.io/f/manbgjvk", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setSent(true);
        form.reset();
      } else {
        alert("There was a problem submitting your request. Please try again.");
      }
    } catch {
      alert("There was a problem submitting your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl border p-10 bg-gradient-to-br from-blue-50 to-teal-50">
      <BookOpen className="mx-auto h-10 w-10 text-amber-600" />
      <h2 className="text-2xl md:text-3xl font-bold mt-4">
        <span className="text-blue-900">Free Guide: </span>
        <span className="text-teal-700">Sales Tax Nexus Checklist</span>
      </h2>
      <p className="text-slate-600 mt-2">Download our practical checklist to see if your business has obligations in other states.</p>

      {sent ? (
        <div className="mt-6 max-w-md mx-auto rounded-xl p-4 bg-teal-50 text-teal-900 text-sm border border-teal-200">
          Thanks! Check your email for the Sales Tax Nexus Checklist PDF.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 max-w-md mx-auto grid gap-3">
          <Input
            type="email"
            name="email"
            placeholder="Your email"
            aria-label="Email"
            required
          />
          <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white" disabled={isSubmitting}>
            <Download className="mr-2 h-4 w-4" />
            {isSubmitting ? "Sending..." : "Get the guide"}
          </Button>
        </form>
      )}

      <p className="text-xs text-slate-500 mt-2">We&apos;ll email you the PDF and occasional updates. Unsubscribe anytime.</p>
    </div>
  );
}

export default function SalesTaxAccountantSite() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="font-sans min-h-screen bg-white text-slate-900">

      {/* Decorative gradient backdrop */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-24 -left-24 h-[32rem] w-[32rem] rounded-full blur-3xl opacity-20 bg-gradient-to-tr from-blue-900 to-teal-600" />
        <div className="absolute -bottom-32 -right-24 h-[28rem] w-[28rem] rounded-full blur-3xl opacity-15 bg-gradient-to-tr from-teal-700 to-blue-900" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b" role="banner">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2" aria-label="Go to top">
            <span className="grid place-items-center rounded-2xl p-1 bg-white shadow-sm">
              <LogoMark className="h-9 w-9" />
            </span>
            <span className="font-semibold">SalesTaxAccountant<span className="text-slate-400">.com</span></span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm" aria-label="Primary">
            <a href="#services" className="hover:text-slate-900 text-slate-600">Services</a>
            <a href="#approach" className="hover:text-slate-900 text-slate-600">Approach</a>
            <a href="#industries" className="hover:text-slate-900 text-slate-600">Who we serve</a>
            <a href="#faq" className="hover:text-slate-900 text-slate-600">FAQ</a>
            <a href="#contact" className="hover:text-slate-900 text-slate-600">Contact</a>
          </nav>
          <div className="flex items-center gap-3">
            <Button asChild className="hidden md:inline-flex bg-blue-900 hover:bg-teal-700">
              <a href="#contact">Get started</a>
            </Button>
            <button
              className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t bg-white"
          >
            <nav className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-3" aria-label="Mobile navigation">
              <a
                href="#services"
                className="px-3 py-2 hover:bg-slate-100 rounded-lg text-slate-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </a>
              <a
                href="#approach"
                className="px-3 py-2 hover:bg-slate-100 rounded-lg text-slate-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Approach
              </a>
              <a
                href="#industries"
                className="px-3 py-2 hover:bg-slate-100 rounded-lg text-slate-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Who we serve
              </a>
              <a
                href="#faq"
                className="px-3 py-2 hover:bg-slate-100 rounded-lg text-slate-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </a>
              <a
                href="#contact"
                className="px-3 py-2 hover:bg-slate-100 rounded-lg text-slate-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
              <Button asChild className="mt-2 bg-blue-900 hover:bg-teal-700">
                <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Get started</a>
              </Button>
            </nav>
          </motion.div>
        )}
      </header>

      {/* Hero */}
      <main id="top" className="max-w-6xl mx-auto px-4 pt-16 pb-8">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold leading-tight">
              Sales tax confidence,
              <span className={`block ${BRAND.gradientText}`}>built for growing businesses.</span>
            </motion.h1>
            <p className="mt-4 text-slate-600 max-w-xl">
              Practical multistate sales & use tax help for online sellers, SaaS, and retailers — nexus, taxability, registration, audits, and disclosures — delivered in plain language with audit‑ready support.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-blue-900 hover:bg-teal-700"><a href="#contact">Book a consult</a></Button>
              <Button variant="outline" asChild size="lg"><a href="#services">Explore services</a></Button>
            </div>
            <nav aria-label="Quick links" className="mt-6 text-sm">
              <a href="#services" className="text-blue-900 hover:underline mr-4">Services</a>
              <a href="#faq" className="text-blue-900 hover:underline mr-4">FAQs</a>
              <a href="#contact" className="text-blue-900 hover:underline">Contact</a>
            </nav>
            <div className="grid grid-cols-3 gap-4 mt-8">
              <Stat label="Years in practice" value="14+" />
              <Stat label="States covered" value="45+" />
              <Stat label="Avg. reverse sales/use tax refund ROI" value="3–10×" />
            </div>
          </div>
          <Card className="border-0 shadow-xl">
            <CardHeader className="pb-2">
              <CardTitle>What we deliver</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              {FEATURES.map((f, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`mt-0.5 ${BRAND.navy}`}>{f.icon}</div>
                  <div>
                    <div className="font-medium">{f.title}</div>
                    <div className="text-sm text-slate-600">{f.text}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Services */}
      <section id="services" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold">Services</h2>
        <p className="text-slate-600 mt-2 max-w-2xl">Pick the lane you need now; add on as you grow. Every engagement includes documentation you can hand to auditors and future staff.</p>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {SERVICES.map((s, i) => (
            <Card key={i} className="hover:shadow-lg hover:border-teal-700 transition-all">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className={`${BRAND.teal}`}>{s.icon}</div>
                  <CardTitle className="text-base">{s.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-slate-600">{s.text}</CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-6">
          <Button asChild variant="outline"><a href="#contact" className="">Get pricing & availability <ChevronRight className="ml-1 h-4 w-4" /></a></Button>
        </div>
      </section>

      {/* Approach */}
      <section id="approach" className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">How we work</h2>
            <ul className="mt-4 space-y-3 text-slate-700">
              <li className="flex gap-3"><BadgeCheck className="h-5 w-5 mt-0.5"/>Intake: simple questionnaire + quick call to set goals and states in scope.</li>
              <li className="flex gap-3"><BadgeCheck className="h-5 w-5 mt-0.5"/>Analyze: nexus thresholds, product taxability, and marketplace rules.</li>
              <li className="flex gap-3"><BadgeCheck className="h-5 w-5 mt-0.5"/>Plan: registrations, VDAs/amnesty if needed, filing calendar, and responsibilities.</li>
              <li className="flex gap-3"><BadgeCheck className="h-5 w-5 mt-0.5"/>Implement: configure provider rules, exemption certificate process, and QA checks.</li>
              <li className="flex gap-3"><BadgeCheck className="h-5 w-5 mt-0.5"/>Support: ongoing advisory or audit assistance as your footprint evolves.</li>
            </ul>
          </div>
          <LeadForm />
        </div>
      </section>

      {/* Industries */}
      <section id="industries" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold">Who we serve</h2>
        <p className="text-slate-600 mt-2">Multi‑state, fast‑growing companies that need practical, audit‑ready sales & use tax help.</p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mt-6">
          {INDUSTRIES.map((name) => (
            <div key={name} className="rounded-2xl border bg-white p-4 text-sm flex items-center justify-between">
              <span>{name}</span>
              <Check className="h-4 w-4 text-emerald-600" />
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section id="faq" className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold">FAQ</h2>
        <div className="mt-6 space-y-4">
          {FAQS.map((f, i) => (
            <Card key={i} className="border-0 shadow-sm">
              <CardHeader className="pb-2"><CardTitle className="text-base">{f.q}</CardTitle></CardHeader>
              <CardContent className="text-sm text-slate-600">{f.a}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Let&apos;s get your sales tax under control</h2>
            <p className="text-slate-600 mt-2">Tell us a bit about your situation. We&apos;ll propose a right‑sized plan—no bloat, just the work that matters.</p>
            <div className="mt-6 space-y-2 text-sm text-slate-700">
              <div className="flex items-center gap-2"><Mail className="h-4 w-4"/> hello@salestaxaccountant.com</div>
              <div className="flex items-start gap-2"><MessageSquare className="h-4 w-4 mt-1"/> Prefer a quick chat? Add a note in the form and we&apos;ll send a booking link.</div>
            </div>
          </div>
          <LeadForm />
        </div>
      </section>

      {/* About Section (new) */}
      <section id="about" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold">About SalesTaxAccountant.com</h2>
        <p className="text-slate-600 mt-2 max-w-3xl">
          Founded by an experienced sales tax consultant with 14+ years of practice, SalesTaxAccountant.com helps
          fast-growing companies simplify multi-state sales tax. We focus on clear, audit-ready deliverables
          and practical guidance that teams can trust.
        </p>
        <ul className="mt-4 space-y-2 text-slate-700 text-sm">
          <li><BadgeCheck className="inline h-4 w-4 mr-1"/> 14+ years in sales tax consulting</li>
          <li><BadgeCheck className="inline h-4 w-4 mr-1"/> Experience with Fortune 500 and middle-market clients</li>
          <li><BadgeCheck className="inline h-4 w-4 mr-1"/> Specialized in post-Wayfair multi-state compliance</li>
        </ul>
      </section>

      {/* Resources/Blog Section (new) */}
      <section id="resources" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold">Resources & Insights</h2>
        <p className="text-slate-600 mt-2 max-w-2xl">Practical guides and updates to help you navigate sales & use tax with confidence.</p>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <Card>
            <CardHeader><CardTitle className="text-base">Sales Tax 101 for Online Sellers</CardTitle></CardHeader>
            <CardContent className="text-sm text-slate-600">A beginner’s guide to understanding nexus, thresholds, and registrations. <a href="#" className="text-blue-900 hover:underline">Read more</a></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-base">5 Common Mistakes in Sales Tax Compliance</CardTitle></CardHeader>
            <CardContent className="text-sm text-slate-600">Avoid costly errors in multi-state taxability and filings. <a href="#" className="text-blue-900 hover:underline">Read more</a></CardContent>
          </Card>
        </div>
      </section>

      {/* Lead Magnet Section */}
      <section id="leadmagnet" className="max-w-6xl mx-auto px-4 py-16 text-center">
        <LeadMagnetForm />
      </section>

      {/* Footer */}
      <footer className="border-t py-10" role="contentinfo">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <LogoMark className="h-6 w-6" />
            <span className="text-sm text-slate-500">© {new Date().getFullYear()} SalesTaxAccountant.com — All rights reserved.</span>
          </div>
          <div className="text-xs text-slate-400">This site provides general information, not legal or tax advice.</div>
        </div>
      </footer>
    </div>
  );
}
