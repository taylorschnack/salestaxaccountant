"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { track } from "@vercel/analytics";
import {
  ChevronDown,
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
import { FAQS } from "@/lib/faqs";

/**
 * SalesTaxAccountant.com
 * Professional sales & use tax consulting landing page with lead generation.
 */

function Wordmark({ className = "text-lg", icon = 36 }: { className?: string; icon?: number }) {
  return (
    <span className={`inline-flex items-center gap-2.5 tracking-tight ${className}`}>
      <Image src="/images/logo-icon.png" alt="" width={icon} height={icon} className="shrink-0" priority />
      <span className="font-bold text-blue-950">salestaxaccountant.com</span>
    </span>
  );
}

const FEATURES = [
  { icon: <ShieldCheck className="h-6 w-6" />, title: "Audit-ready documentation", text: "Clear memos, citations, and state-by-state conclusions that stand up to scrutiny." },
  { icon: <MapPin className="h-6 w-6" />, title: "Post-Wayfair, multistate expertise", text: "Nexus, marketplace rules, local jurisdictions, and thresholds across the U.S." },
  { icon: <FileText className="h-6 w-6" />, title: "Engine-agnostic guidance", text: "Practical taxability mapping and exemption logic, whatever provider you use." }
];

const REASONS = [
  { value: "nexus_threshold", label: "Crossed or nearing a nexus threshold" },
  { value: "state_notice", label: "State notice or audit" },
  { value: "past_exposure", label: "Past exposure / voluntary disclosure" },
  { value: "registration", label: "Registering in new states" },
  { value: "taxability", label: "Product taxability questions" },
  { value: "tax_engine", label: "Tax engine setup or cleanup" },
  { value: "diligence", label: "Due diligence or fundraising" },
  { value: "other", label: "Something else" }
];

const SERVICES = [
  { icon: <Flag className="h-6 w-6" />, title: "Nexus & Exposure Study", text: "Economic and physical nexus by state with thresholds, dates, and a remediation plan.", reason: "nexus_threshold" },
  { icon: <Building2 className="h-6 w-6" />, title: "Registration & Onboarding", text: "State registrations, marketplace settings, and filing calendars set up correctly.", reason: "registration" },
  { icon: <FileSpreadsheet className="h-6 w-6" />, title: "Product Taxability Matrix", text: "Taxability calls for your catalog across nexus states with notes and citations.", reason: "taxability" },
  { icon: <ShieldCheck className="h-6 w-6" />, title: "Audit Support & Sampling", text: "Prepare evidence, manage requests, sampling strategies, and negotiation support.", reason: "state_notice" },
  { icon: <Calculator className="h-6 w-6" />, title: "Voluntary Disclosures (VDAs)", text: "Quantify historical exposure and guide VDA or amnesty to reduce penalties and lookback.", reason: "past_exposure" },
  { icon: <Layers className="h-6 w-6" />, title: "Sales Tax Systems & Controls", text: "Provider-neutral rules, exemption certificate process, and monthly close checklist.", reason: "tax_engine" }
];

const STEPS = [
  { title: "Intake", text: "A short questionnaire and a quick call to set goals and states in scope." },
  { title: "Analyze", text: "Nexus thresholds, product taxability, and marketplace rules." },
  { title: "Plan", text: "Registrations, VDAs where needed, filing calendar, and clear owners." },
  { title: "Implement", text: "Provider rules, exemption certificate process, and QA checks." },
  { title: "Support", text: "Ongoing advisory or audit help as your footprint evolves." }
];


const FORMSPREE_ENDPOINT = "https://formspree.io/f/manbgjvk";
const CONTACT_EMAIL = "hello@salestaxaccountant.com";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SubmitFailure = "offline" | "network" | "timeout" | "rate_limited" | "invalid" | "server";

type SubmitResult =
  | { ok: true }
  | { ok: false; kind: SubmitFailure; fieldErrors?: Record<string, string> };

async function submitToFormspree(formData: FormData): Promise<SubmitResult> {
  if (typeof navigator !== "undefined" && !navigator.onLine) {
    return { ok: false, kind: "offline" };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });

    if (response.ok) return { ok: true };
    if (response.status === 429) return { ok: false, kind: "rate_limited" };
    if (response.status === 422) {
      // Formspree reports field-level problems as { errors: [{ field, message }] }; its wording is terse, so use ours
      const data = await response.json().catch(() => null);
      const fieldErrors: Record<string, string> = {};
      for (const e of data?.errors ?? []) {
        if (e?.field) fieldErrors[e.field] = e.field === "email" ? "Enter an email like name@company.com." : "Check this field and try again.";
      }
      return { ok: false, kind: "invalid", fieldErrors };
    }
    return { ok: false, kind: "server" };
  } catch (err) {
    const timedOut = err instanceof DOMException && err.name === "AbortError";
    return { ok: false, kind: timedOut ? "timeout" : "network" };
  } finally {
    clearTimeout(timeout);
  }
}

function SubmitError({ kind }: { kind: SubmitFailure }) {
  const emailLink = (
    <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium underline underline-offset-2">
      {CONTACT_EMAIL}
    </a>
  );
  const messages: Record<SubmitFailure, React.ReactNode> = {
    offline: <>You appear to be offline. Reconnect and send again; your message is still here.</>,
    network: <>Your message couldn&apos;t reach the server. Check your connection and send again, or email {emailLink}.</>,
    timeout: <>Sending is taking longer than it should. Try once more, or email {emailLink}.</>,
    rate_limited: <>Too many attempts in a short time. Wait a minute and send again, or email {emailLink}.</>,
    invalid: <>A few details need another look. Check the fields marked above.</>,
    server: <>Your message didn&apos;t go through. Send again, or email {emailLink}. Nothing you typed was lost.</>,
  };
  return (
    <div role="alert" className="rounded-lg p-4 bg-red-50 text-red-900 text-sm border border-red-200">
      {messages[kind]}
    </div>
  );
}

const FIELD_CLASS = "h-11 bg-white";
const LABEL_CLASS = "block text-sm font-medium text-slate-900 mb-1.5";
const FIELD_ERROR_CLASS = "mt-1.5 text-sm text-red-700";

function validateLead(formData: FormData) {
  const errors: Record<string, string> = {};
  const value = (key: string) => String(formData.get(key) ?? "").trim();

  if (!value("name")) errors.name = "Enter your name.";
  if (!value("email")) errors.email = "Enter your work email.";
  else if (!EMAIL_PATTERN.test(value("email"))) errors.email = "Enter an email like name@company.com.";
  if (!value("reason")) errors.reason = "Choose what's prompting your inquiry.";
  if (!value("message")) errors.message = "Add a sentence or two about your situation.";

  return errors;
}

function LeadForm({ reason, onReasonChange }: { reason: string; onReasonChange: (value: string) => void }) {
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<SubmitFailure | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sentTo) successRef.current?.focus();
  }, [sentTo]);

  const clearFieldError = (field: string) => {
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    const errors = validateLead(formData);

    setSubmitError(null);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      const firstInvalid = form.querySelector<HTMLElement>(`[name="${Object.keys(errors)[0]}"]`);
      firstInvalid?.focus();
      return;
    }

    const reasonLabel = REASONS.find((r) => r.value === formData.get("reason"))?.label ?? "General inquiry";
    formData.set("reason", reasonLabel);
    formData.set("_subject", `Consult request: ${reasonLabel}`);

    setIsSubmitting(true);
    track("Lead Form Started", {
      formType: "consultation",
      location: "page",
      reason: String(reason || "none")
    });

    const result = await submitToFormspree(formData);
    setIsSubmitting(false);

    if (result.ok) {
      setSentTo(String(formData.get("email")));
      form.reset();
      onReasonChange("");
      track("Lead Form Submitted", {
        formType: "consultation",
        location: "page"
      });
    } else {
      setSubmitError(result.kind);
      if (result.fieldErrors) setFieldErrors(result.fieldErrors);
      track("Lead Form Error", {
        formType: "consultation",
        error: result.kind
      });
    }
  };

  const describedBy = (field: string, hint?: boolean) =>
    [hint ? `lead-${field}-hint` : null, fieldErrors[field] ? `lead-${field}-error` : null].filter(Boolean).join(" ") || undefined;

  return (
    <div className="rounded-2xl bg-white p-6 md:p-8 text-slate-900">
      <h3 className="text-lg font-semibold">Book a consult</h3>
      <div className="mt-5 grid gap-4">
        {sentTo ? (
          <>
            <div
              ref={successRef}
              tabIndex={-1}
              role="status"
              className="rounded-lg p-5 bg-blue-50 text-blue-950 border border-blue-200 outline-none"
            >
              <p className="font-semibold">Request received.</p>
              <p className="text-sm mt-1.5 [overflow-wrap:anywhere]">
                Expect a reply at {sentTo} within one business day. Facing a notice with a response deadline? Email{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium underline underline-offset-2">{CONTACT_EMAIL}</a>{" "}
                with the date in the subject line.
              </p>
            </div>
            <Button variant="outline" className="h-11 w-full sm:w-auto sm:justify-self-start" onClick={() => setSentTo(null)}>
              Send another message
            </Button>
          </>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="grid gap-5">
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

            <div>
              <label htmlFor="lead-name" className={LABEL_CLASS}>Name</label>
              <Input
                id="lead-name"
                name="name"
                autoComplete="name"
                maxLength={100}
                className={FIELD_CLASS}
                aria-invalid={!!fieldErrors.name}
                aria-describedby={describedBy("name")}
                onChange={() => clearFieldError("name")}
              />
              {fieldErrors.name && <p id="lead-name-error" className={FIELD_ERROR_CLASS}>{fieldErrors.name}</p>}
            </div>

            <div>
              <label htmlFor="lead-email" className={LABEL_CLASS}>Work email</label>
              <Input
                id="lead-email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                maxLength={254}
                className={FIELD_CLASS}
                aria-invalid={!!fieldErrors.email}
                aria-describedby={describedBy("email")}
                onChange={() => clearFieldError("email")}
              />
              {fieldErrors.email && <p id="lead-email-error" className={FIELD_ERROR_CLASS}>{fieldErrors.email}</p>}
            </div>

            <div>
              <label htmlFor="lead-company" className={LABEL_CLASS}>
                Company <span className="font-normal text-slate-500">(optional)</span>
              </label>
              <Input
                id="lead-company"
                name="company"
                autoComplete="organization"
                maxLength={120}
                className={FIELD_CLASS}
              />
            </div>

            <div>
              <label htmlFor="lead-reason" className={LABEL_CLASS}>What&apos;s prompting this?</label>
              <div className="relative">
                <select
                  id="lead-reason"
                  name="reason"
                  value={reason}
                  onChange={(e) => { onReasonChange(e.target.value); clearFieldError("reason"); }}
                  aria-invalid={!!fieldErrors.reason}
                  aria-describedby={describedBy("reason")}
                  className={`h-11 w-full appearance-none rounded-md border border-input bg-white pl-3 pr-10 text-base shadow-xs outline-none transition-[color,box-shadow] md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:border-destructive aria-invalid:ring-destructive/20 ${reason ? "text-slate-900" : "text-muted-foreground"}`}
                >
                  <option value="">Choose one</option>
                  {REASONS.map((r) => (
                    <option key={r.value} value={r.value} className="text-slate-900">{r.label}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" aria-hidden="true" />
              </div>
              {fieldErrors.reason && <p id="lead-reason-error" className={FIELD_ERROR_CLASS}>{fieldErrors.reason}</p>}
            </div>

            <div>
              <label htmlFor="lead-message" className={LABEL_CLASS}>What&apos;s going on?</label>
              <Textarea
                id="lead-message"
                name="message"
                rows={4}
                maxLength={4000}
                className="min-h-28 bg-white"
                aria-invalid={!!fieldErrors.message}
                aria-describedby={describedBy("message", true)}
                onChange={() => clearFieldError("message")}
              />
              <p id="lead-message-hint" className="mt-1.5 text-sm text-slate-600">
                States involved, any deadlines, and the tax engine you use, if any.
              </p>
              {fieldErrors.message && <p id="lead-message-error" className={FIELD_ERROR_CLASS}>{fieldErrors.message}</p>}
            </div>

            {submitError && <SubmitError kind={submitError} />}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Button type="submit" className="h-11 w-full px-6 sm:w-auto" disabled={isSubmitting}>
                {isSubmitting ? "Sending…" : "Request a consult"}
              </Button>
              <p className="text-sm text-slate-600">Replies within one business day.</p>
            </div>
          </form>
        )}
        <p className="text-xs text-slate-500">
          Your details are never shared or sold.{" "}
          <Link href="/privacy" className="underline-offset-2 hover:underline">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}

function LeadMagnetForm() {
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<SubmitFailure | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") ?? "").trim();

    setSubmitError(null);
    if (!EMAIL_PATTERN.test(email)) {
      setEmailError(email ? "Enter an email like name@company.com." : "Enter your email to get the checklist.");
      form.querySelector<HTMLInputElement>('[name="email"]')?.focus();
      return;
    }
    setEmailError(null);

    // Add a marker to identify this as a lead magnet request
    formData.append("message", "Lead Magnet Request: Sales Tax Nexus Checklist");
    formData.set("_subject", "Checklist download: Sales Tax Nexus Checklist");

    setIsSubmitting(true);
    track("Lead Magnet Started", {
      type: "nexus_checklist"
    });

    const result = await submitToFormspree(formData);
    setIsSubmitting(false);

    if (result.ok) {
      setSent(true);
      form.reset();
      track("Lead Magnet Submitted", {
        type: "nexus_checklist"
      });
    } else {
      if (result.fieldErrors?.email) setEmailError(result.fieldErrors.email);
      setSubmitError(result.kind);
      track("Lead Magnet Error", {
        type: "nexus_checklist",
        error: result.kind
      });
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
      <BookOpen className="mx-auto h-10 w-10 text-blue-950" />
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mt-4">
        Free guide: Sales Tax Nexus Checklist
      </h2>
      <p className="text-slate-600 mt-3 max-w-xl mx-auto">A practical checklist for spotting sales tax obligations in states beyond your own.</p>

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
        <form onSubmit={handleSubmit} noValidate className="mt-6 max-w-md mx-auto grid gap-3 text-left">
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
          <div>
            <Input
              type="email"
              name="email"
              inputMode="email"
              autoComplete="email"
              maxLength={254}
              placeholder="Your email"
              aria-label="Email"
              className="h-11"
              aria-invalid={!!emailError}
              aria-describedby={emailError ? "magnet-email-error" : undefined}
              onChange={() => setEmailError(null)}
            />
            {emailError && <p id="magnet-email-error" className="mt-1.5 text-sm text-red-700">{emailError}</p>}
          </div>
          {submitError && <SubmitError kind={submitError} />}
          <Button type="submit" className="h-11 w-full bg-amber-600 hover:bg-amber-700 text-white" disabled={isSubmitting}>
            <Download className="mr-2 h-4 w-4" />
            {isSubmitting ? "Sending..." : "Get the free checklist"}
          </Button>
        </form>
      )}

      <p className="text-xs text-slate-500 mt-3">
        You&apos;ll also get occasional sales tax updates. Unsubscribe anytime.{" "}
        <Link href="/privacy" className="hover:underline">Privacy Policy</Link>.
      </p>
    </div>
  );
}

export default function SalesTaxAccountantSite() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [leadReason, setLeadReason] = useState("");
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
            <a href="#industries" className="hover:text-slate-900 text-slate-600">Who it&apos;s for</a>
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
                Who it&apos;s for
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
              Nexus, taxability, registrations, audits, and disclosures for online sellers, SaaS companies, and retailers, handled directly by one senior specialist. Plain language, audit-ready documentation.
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
            <h2 className="text-lg font-semibold">What you get</h2>
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
              onClick={() => {
                setLeadReason(s.reason);
                track("Service Card Click", {
                  service: s.title.toLowerCase().replace(/\s+/g, "_"),
                  position: i + 1
                });
              }}
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
          <h2 className="text-3xl font-bold tracking-tight">How an engagement runs</h2>
          <p className="text-slate-600 mt-3 max-w-2xl">Five steps from first call to ongoing support, all handled by the same senior specialist.</p>
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
        <h2 className="text-3xl font-bold tracking-tight">Who this is for</h2>
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
      <section id="contact" className="scroll-mt-20 bg-blue-950 text-white">
        <div className="max-w-6xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Let&apos;s get your sales tax under control</h2>
            <p className="text-blue-100 mt-3">Describe your situation and get a right-sized plan back: no bloat, just the work that matters. You work directly with one senior specialist, from the first call to the final memo.</p>
            <div className="mt-8 space-y-3 text-sm text-blue-100">
              <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> <a href="mailto:hello@salestaxaccountant.com" className="hover:underline">hello@salestaxaccountant.com</a></div>
              <div className="flex items-start gap-2"><MessageSquare className="h-4 w-4 mt-1" /> Prefer a quick call? Say so in your message and the reply will include a booking link.</div>
            </div>
          </div>
          <LeadForm reason={leadReason} onReasonChange={setLeadReason} />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t" role="contentinfo">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
            <div className="max-w-sm">
              <Wordmark className="text-base" icon={28} />
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
