"use client";

import React, { useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  Check,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Layers,
  MessageSquare,
  Calculator,
  BadgeCheck,
  ArrowRight,
  Flag,
  FileText,
  FileSpreadsheet,
  Building2,
  BookOpen,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" role="img" aria-label="SalesTaxAccountant.com logo">
      <defs>
        <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" rx="14" ry="14" width="52" height="52" fill="url(#g)" />
      <path d="M22 24c0-1.1.9-2 2-2h12.6c.5 0 1 .2 1.4.6l8.4 8.4c.8.8.8 2 0 2.8L39 41.6c-.4.4-.9.6-1.4.6H25c-1.1 0-2-.9-2-2V24z" fill="#EC4899" />
      <circle cx="28.5" cy="28.5" r="2" fill="#fff" />
      <g fill="#fff" transform="translate(33 28)">
        <circle cx="2" cy="2" r="2" />
        <rect x="-1.5" y="7" width="11" height="2.2" transform="rotate(-45 4 8)" rx="1" />
      </g>
    </svg>
  );
}

const BRAND = {
  gradient: "bg-gradient-to-br from-indigo-600 to-emerald-600",
  gradientText: "bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-emerald-500",
  indigo: "text-indigo-600",
  emerald: "text-emerald-600",
  pink: "text-pink-500",
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
      <div className={`text-3xl font-semibold ${BRAND.gradientText}`}>{value}</div>
      <div className="text-sm text-slate-600">{label}</div>
    </div>
  );
}

function LeadForm() {
  const [sent, setSent] = useState(false);
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle>Request a consult</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        {sent ? (
          <div className="rounded-xl p-4 bg-emerald-50 text-emerald-900 text-sm">
            Thanks! We just received your note and will reply within one business day.
          </div>
        ) : (
          <>
            <Input placeholder="Name" aria-label="Name" />
            <Input type="email" placeholder="Work email" aria-label="Work email" />
            <Input placeholder="Company" aria-label="Company" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input placeholder="States (e.g., CA, TX, NY)" aria-label="States of operation" />
              <Input placeholder="Annual revenue (approx.)" aria-label="Annual revenue" />
            </div>
            <Textarea rows={4} placeholder="What challenge can we help with?" aria-label="Message" />
            <Button className="w-full" onClick={() => setSent(true)}>
              Send request <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </>
        )}
        <p className="text-xs text-slate-500">We never share your info.</p>
      </CardContent>
    </Card>
  );
}

export default function SalesTaxAccountantSite() {
  return (
    <div className={`${inter.variable} font-sans min-h-screen bg-white text-slate-900`}>
      {/* Header, Hero, Services, Approach, Industries, FAQ, Contact remain unchanged */}

      {/* About Section */}
      <section id="about" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold">About SalesTaxAccountant.com</h2>
        <p className="text-slate-600 mt-2 max-w-3xl">
          Founded by an experienced sales tax consultant with 14+ years of practice, SalesTaxAccountant.com helps
          fast‑growing companies simplify multi‑state sales tax. We focus on clear, audit‑ready deliverables
          and practical guidance that teams can trust.
        </p>
        <ul className="mt-4 space-y-2 text-slate-700 text-sm">
          <li><BadgeCheck className="inline h-4 w-4 mr-1"/> 14+ years in sales tax consulting</li>
          <li><BadgeCheck className="inline h-4 w-4 mr-1"/> Experience with Fortune 500 and middle‑market clients</li>
          <li><BadgeCheck className="inline h-4 w-4 mr-1"/> Specialized in post‑Wayfair multi‑state compliance</li>
        </ul>
      </section>

      {/* Resources/Blog Section */}
      <section id="resources" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold">Resources & Insights</h2>
        <p className="text-slate-600 mt-2 max-w-2xl">Practical guides and updates to help you navigate sales & use tax with confidence.</p>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <Card>
            <CardHeader><CardTitle className="text-base">Sales Tax 101 for Online Sellers</CardTitle></CardHeader>
            <CardContent className="text-sm text-slate-600">A beginner’s guide to understanding nexus, thresholds, and registrations. <a href="#" className="text-indigo-600 hover:underline">Read more</a></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-base">5 Common Mistakes in Sales Tax Compliance</CardTitle></CardHeader>
            <CardContent className="text-sm text-slate-600">Avoid costly errors in multi‑state taxability and filings. <a href="#" className="text-indigo-600 hover:underline">Read more</a></CardContent>
          </Card>
        </div>
      </section>

      {/* Lead Magnet Section */}
      <section id="leadmagnet" className="max-w-6xl mx-auto px-4 py-16 text-center">
        <div className="rounded-2xl border p-10 bg-gradient-to-br from-indigo-50 to-emerald-50">
          <BookOpen className="mx-auto h-10 w-10 text-indigo-600" />
          <h2 className="text-2xl md:text-3xl font-bold mt-4">Free Guide: Sales Tax Nexus Checklist</h2>
          <p className="text-slate-600 mt-2">Download our practical checklist to see if your business has obligations in other states.</p>
          <form className="mt-6 max-w-md mx-auto grid gap-3">
            <Input type="email" placeholder="Your email" aria-label="Email" required />
            <Button className="w-full"><Download className="mr-2 h-4 w-4"/> Get the guide</Button>
          </form>
          <p className="text-xs text-slate-500 mt-2">We’ll email you the PDF and occasional updates. Unsubscribe anytime.</p>
        </div>
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
