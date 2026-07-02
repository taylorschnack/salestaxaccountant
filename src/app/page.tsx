"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { track } from "@vercel/analytics";
import {
  ChevronRight,
  Mail,
  MapPin,
  MessageSquare,
  ShieldCheck,
  Layers,
  Calculator,
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

/**
 * SalesTaxAccountant.com
 * Professional sales & use tax consulting landing page with lead generation.
 */

function Wordmark({ className = "text-lg" }: { className?: string }) {
  return (
    <span className={`tracking-tight ${className}`}>
      <span className="font-normal text-blue-950">SalesTax</span>
      <span className="font-bold text-blue-950">Accountant</span>
      <span className="font-normal text-slate-400">.com</span>
    </span>
  );
}

const FEATURES = [
  { icon: <ShieldCheck className="h-6 w-6" />, title: "Audit-ready documentation", text: "Clear memos, citations, and state-by-state conclusions that stand up to scrutiny." },
  { icon: <MapPin className="h-6 w-6" />, title: "Post-Wayfair, multistate expertise", text: "Nexus, marketplace rules, local jurisdictions, and thresholds across the U.S." },
  { icon: <FileText className="h-6 w-6" />, title: "Engine-agnostic guidance", text: "Practical taxability mapping and exemption logic, whatever provider you use." }
];

const SERVICES = [
  { icon: <Flag className="h-6 w-6" />, title: "Nexus & Exposure Study", text: "Economic and physical nexus by state with thresholds, dates, and a remediation plan." },
  { icon: <Building2 className="h-6 w-6" />, title: "Registration & Onboarding", text: "State registrations, marketplace settings, and filing calendars set up correctly." },
  { icon: <FileSpreadsheet className="h-6 w-6" />, title: "Product Taxability Matrix", text: "Taxability calls for your catalog across nexus states with notes and citations." },
  { icon: <ShieldCheck className="h-6 w-6" />, title: "Audit Support & Sampling", text: "Prepare evidence, manage requests, sampling strategies, and negotiation support." },
  { icon: <Calculator className="h-6 w-6" />, title: "Voluntary Disclosures (VDAs)", text: "Quantify historical exposure and guide VDA or amnesty to reduce penalties and lookback." },
  { icon: <Layers className="h-6 w-6" />, title: "Sales Tax Systems & Controls", text: "Provider-neutral rules, exemption certificate process, and monthly close checklist." }
];

const STEPS = [
  { title: "Intake", text: "A short questionnaire and a quick call to set goals and states in scope." },
  { title: "Analyze", text: "Nexus thresholds, product taxability, and marketplace rules." },
  { title: "Plan", text: "Registrations, VDAs where needed, filing calendar, and clear owners." },
  { title: "Implement", text: "Provider rules, exemption certificate process, and QA checks." },
  { title: "Support", text: "Ongoing advisory or audit help as your footprint evolves." }
];

const FAQS = [
  { q: "How fast can you deliver a nexus study?", a: "Typical turnarounds are 1-2 weeks depending on states and data readiness. Rush options are available." },
  { q: "Do you implement or resell tax engines?", a: "We stay vendor-neutral. We help you choose, configure rules, and validate results without reselling software." },
  { q: "Can you represent us in front of the state?", a: "We support audits end-to-end and coordinate with legal counsel when formal representation is required." },
];

function LeadForm() {
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Track form submission attempt
    track("Lead Form Started", {
      formType: "consultation",
      location: "page"
    });

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
        // Track successful submission
        track("Lead Form Submitted", {
          formType: "consultation",
          location: "page"
        });
      } else {
        setError("Something went wrong sending your message. Please try again, or email us at hello@salestaxaccountant.com.");
        track("Lead Form Error", {
          formType: "consultation",
          error: "submission_failed"
        });
      }
    } catch {
      setError("Something went wrong sending your message. Please try again, or email us at hello@salestaxaccountant.com.");
      track("Lead Form Error", {
        formType: "consultation",
        error: "network_error"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl bg-white p-6 md:p-8 text-slate-900">
      <h3 className="text-lg font-semibold">Book a consult</h3>
      <div className="mt-4 grid gap-3">
        {sent ? (
          <div className="rounded-xl p-4 bg-blue-50 text-blue-950 text-sm border border-blue-200">
            Thanks! We just received your note and will reply within one business day.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            <Input type="text" name="name" placeholder="Your Name" required />
            <Input type="email" name="email" placeholder="Your Email" required />
            <Input type="text" name="company" placeholder="Your Company Name" required />
            <Textarea name="message" placeholder="Tell us about your sales tax situation" required />
            {error && (
              <div className="rounded-xl p-4 bg-red-50 text-red-900 text-sm border border-red-200">
                {error}
              </div>
            )}
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send message"}
            </Button>
          </form>
        )}
        <p className="text-xs text-slate-500">
          We never share your info.{" "}
          <Link href="/privacy" className="hover:underline">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}

function LeadMagnetForm() {
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Add a marker to identify this as a lead magnet request
    formData.append("message", "Lead Magnet Request: Sales Tax Nexus Checklist");

    // Track lead magnet request
    track("Lead Magnet Started", {
      type: "nexus_checklist"
    });

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
        // Track successful lead magnet form submission
        track("Lead Magnet Submitted", {
          type: "nexus_checklist"
        });
      } else {
        setError("Something went wrong sending your message. Please try again, or email us at hello@salestaxaccountant.com.");
        track("Lead Magnet Error", {
          type: "nexus_checklist",
          error: "submission_failed"
        });
      }
    } catch {
      setError("Something went wrong sending your message. Please try again, or email us at hello@salestaxaccountant.com.");
      track("Lead Magnet Error", {
        type: "nexus_checklist",
        error: "network_error"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
      <BookOpen className="mx-auto h-10 w-10 text-blue-950" />
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mt-4">
        Free guide: Sales Tax Nexus Checklist
      </h2>
      <p className="text-slate-600 mt-3 max-w-xl mx-auto">Download our practical checklist to see if your business has obligations in other states.</p>

      {sent ? (
        <div className="mt-6 max-w-md mx-auto grid gap-3">
          <div className="rounded-xl p-4 bg-blue-50 text-blue-950 text-sm border border-blue-200">
            Thanks! Your Sales Tax Nexus Checklist is ready.
          </div>
          <Button asChild className="w-full bg-amber-600 hover:bg-amber-700 text-white">
            <a
              href="/resources/sales-tax-nexus-checklist.pdf"
              download="Sales-Tax-Nexus-Checklist.pdf"
              onClick={() => track("Lead Magnet PDF Downloaded", { type: "nexus_checklist" })}
            >
              <Download className="mr-2 h-4 w-4" />
              Download the checklist (PDF)
            </a>
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 max-w-md mx-auto grid gap-3">
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
          <Input
            type="email"
            name="email"
            placeholder="Your email"
            aria-label="Email"
            required
          />
          {error && (
            <div className="rounded-xl p-4 bg-red-50 text-red-900 text-sm border border-red-200 text-left">
              {error}
            </div>
          )}
          <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white" disabled={isSubmitting}>
            <Download className="mr-2 h-4 w-4" />
            {isSubmitting ? "Sending..." : "Get the free checklist"}
          </Button>
        </form>
      )}

      <p className="text-xs text-slate-500 mt-3">
        We&apos;ll send occasional updates. Unsubscribe anytime.{" "}
        <Link href="/privacy" className="hover:underline">Privacy Policy</Link>.
      </p>
    </div>
  );
}

export default function SalesTaxAccountantSite() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="font-sans min-h-screen bg-white text-slate-900">

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur bg-white/90 border-b" role="banner">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="#top" aria-label="Go to top">
            <Wordmark />
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm" aria-label="Primary">
            <a href="#services" className="hover:text-slate-900 text-slate-600">Services</a>
            <a href="#approach" className="hover:text-slate-900 text-slate-600">Approach</a>
            <a href="#industries" className="hover:text-slate-900 text-slate-600">Who we serve</a>
            <a href="#faq" className="hover:text-slate-900 text-slate-600">FAQ</a>
            <a href="#contact" className="hover:text-slate-900 text-slate-600">Contact</a>
          </nav>
          <div className="flex items-center gap-3">
            <Button asChild className="hidden md:inline-flex">
              <a href="#contact" onClick={() => track("CTA Click", { button: "get_started", location: "header" })}>Book a consult</a>
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
        <AnimatePresence>
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
              <Button asChild className="mt-2">
                <a href="#contact" onClick={() => { setMobileMenuOpen(false); track("CTA Click", { button: "get_started", location: "mobile_menu" }); }}>Book a consult</a>
              </Button>
            </nav>
          </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero */}
      <main id="top" className="max-w-6xl mx-auto px-4 pt-20 pb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] text-blue-950">
              Sales tax confidence, built for growing businesses.
            </motion.h1>
            <p className="mt-5 text-lg text-slate-600 max-w-xl">
              Nexus, taxability, registrations, audits, and disclosures for online sellers, SaaS companies, and retailers. Plain language, audit-ready documentation.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a href="#contact" onClick={() => track("CTA Click", { button: "book_consult", location: "hero" })}>Book a consult</a>
              </Button>
              <Button variant="outline" asChild size="lg">
                <a href="#services" onClick={() => track("CTA Click", { button: "explore_services", location: "hero" })}>Explore services</a>
              </Button>
            </div>
            <div className="mt-10 flex gap-12">
              <div>
                <div className="text-3xl font-semibold text-blue-950">14+</div>
                <div className="text-sm text-slate-600 mt-1">Years in practice</div>
              </div>
              <div>
                <div className="text-3xl font-semibold text-blue-950">45+</div>
                <div className="text-sm text-slate-600 mt-1">States registered for clients</div>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
            <h2 className="text-lg font-semibold">What we deliver</h2>
            <div className="mt-6 grid gap-6">
              {FEATURES.map((f, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 text-blue-950">{f.icon}</div>
                  <div>
                    <div className="font-medium">{f.title}</div>
                    <div className="text-sm text-slate-600 mt-0.5">{f.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Services */}
      <section id="services" className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold tracking-tight">Services</h2>
        <p className="text-slate-600 mt-3 max-w-2xl">Pick the lane you need now and add on as you grow. Every engagement includes documentation you can hand to auditors and future staff.</p>
        <div className="grid md:grid-cols-2 gap-x-12 mt-10">
          {SERVICES.map((s, i) => (
            <a
              key={i}
              href="#contact"
              onClick={() => track("Service Card Click", {
                service: s.title.toLowerCase().replace(/\s+/g, "_"),
                position: i + 1
              })}
              className="group flex items-start gap-4 border-t border-slate-200 py-6"
            >
              <div className="mt-0.5 text-blue-950">{s.icon}</div>
              <div>
                <div className="font-semibold group-hover:text-blue-800 transition-colors">{s.title}</div>
                <p className="text-sm text-slate-600 mt-1">{s.text}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Approach */}
      <section id="approach" className="bg-slate-50 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold tracking-tight">How we work</h2>
          <p className="text-slate-600 mt-3 max-w-2xl">From first call to ongoing support, every engagement follows the same five steps.</p>
          <div className="grid lg:grid-cols-5 gap-y-10 lg:gap-x-8 mt-12">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex items-start gap-5 lg:block ${
                  i < STEPS.length - 1
                    ? "after:content-[''] after:absolute after:bg-slate-300 after:left-5 after:top-10 after:-bottom-10 after:w-px lg:after:left-12 lg:after:-right-8 lg:after:top-5 lg:after:bottom-auto lg:after:h-px lg:after:w-auto"
                    : ""
                }`}
              >
                <div className="h-10 w-10 shrink-0 rounded-full bg-blue-950 text-white grid place-items-center text-sm font-semibold">{i + 1}</div>
                <div className="lg:mt-5">
                  <div className="font-semibold text-blue-950">{step.title}</div>
                  <p className="text-sm text-slate-600 mt-1.5">{step.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section id="industries" className="max-w-6xl mx-auto px-4 pt-20 pb-4">
        <h2 className="text-3xl font-bold tracking-tight">Who we serve</h2>
        <p className="text-lg text-slate-600 mt-3 max-w-3xl">
          Fast-growing, multistate companies: e-commerce and marketplace sellers, SaaS and software
          companies, manufacturers and wholesalers, professional services firms, and multi-location
          retailers, including VC-backed growth companies.
        </p>
      </section>

      {/* Resources/Blog */}
      <section id="resources" className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold tracking-tight">Resources &amp; insights</h2>
        <p className="text-slate-600 mt-3 max-w-2xl">Practical guides and updates to help you navigate sales and use tax with confidence.</p>
        <div className="mt-8">
          <div className="border-t border-slate-200 py-6">
            <Link
              href="/blog/wayfair-decision-guide-2026"
              className="font-semibold text-blue-950 hover:underline"
              onClick={() => track("Resource Click", { resource: "wayfair_decision_guide_2026" })}
            >
              Post-Wayfair Sales Tax Nexus: Complete Guide for 2026
            </Link>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl">Understand economic nexus thresholds, registration requirements, and compliance strategies after the Wayfair Supreme Court decision.</p>
          </div>
          <div className="border-t border-slate-200 py-6">
            <Link
              href="/blog/saas-sales-tax-guide"
              className="font-semibold text-blue-950 hover:underline"
              onClick={() => track("Resource Click", { resource: "saas_sales_tax_guide" })}
            >
              Sales Tax for SaaS Companies: State-by-State Taxability Guide
            </Link>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl">Is your software taxable? Learn which states tax SaaS, how to handle exemptions, and how to navigate digital goods taxation.</p>
          </div>
        </div>
        <div className="mt-4">
          <Button asChild variant="outline">
            <Link href="/blog" onClick={() => track("CTA Click", { button: "view_all_articles", location: "resources_section" })}>
              View all articles <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* FAQs */}
      <section id="faq" className="bg-slate-50 border-y border-slate-200">
        <div className="max-w-3xl mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold tracking-tight">FAQ</h2>
          <div className="mt-8 divide-y divide-slate-200">
            {FAQS.map((f, i) => (
              <div key={i} className="py-6">
                <h3 className="font-semibold">{f.q}</h3>
                <p className="text-sm text-slate-600 mt-2">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Magnet */}
      <section id="leadmagnet" className="max-w-6xl mx-auto px-4 py-20">
        <LeadMagnetForm />
      </section>

      {/* Contact */}
      <section id="contact" className="bg-blue-950 text-white">
        <div className="max-w-6xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Let&apos;s get your sales tax under control</h2>
            <p className="text-blue-100 mt-3">Tell us a bit about your situation. We&apos;ll propose a right-sized plan: no bloat, just the work that matters.</p>
            <div className="mt-8 space-y-3 text-sm text-blue-100">
              <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> <a href="mailto:hello@salestaxaccountant.com" className="hover:underline">hello@salestaxaccountant.com</a></div>
              <div className="flex items-start gap-2"><MessageSquare className="h-4 w-4 mt-1" /> Prefer a quick chat? Add a note in the form and we&apos;ll send a booking link.</div>
            </div>
          </div>
          <LeadForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t" role="contentinfo">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
            <div className="max-w-sm">
              <Wordmark className="text-base" />
              <p className="text-sm text-slate-500 mt-2">Multistate sales and use tax consulting for online sellers, SaaS companies, and retailers.</p>
            </div>
            <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600" aria-label="Footer">
              <a href="#services" className="hover:text-slate-900">Services</a>
              <a href="#approach" className="hover:text-slate-900">Approach</a>
              <a href="#faq" className="hover:text-slate-900">FAQ</a>
              <Link href="/blog" className="hover:text-slate-900">Blog</Link>
              <a href="#contact" className="hover:text-slate-900">Contact</a>
            </nav>
          </div>
          <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-2 text-xs text-slate-400">
            <span>&copy; {new Date().getFullYear()} SalesTaxAccountant.com. All rights reserved.</span>
            <span>
              This site provides general information, not legal or tax advice.{" "}
              <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
