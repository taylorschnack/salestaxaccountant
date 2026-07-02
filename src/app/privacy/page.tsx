import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | SalesTaxAccountant.com",
  description:
    "How SalesTaxAccountant.com collects, uses, and protects the information you share through our contact and guide request forms.",
  alternates: {
    canonical: "https://www.salestaxaccountant.com/privacy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
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

      <main className="max-w-3xl mx-auto px-4 py-16 text-slate-700">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-slate-500">Effective date: July 2, 2026</p>

        <div className="mt-8 space-y-8 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-slate-900">1. Overview</h2>
            <p className="mt-2">
              SalesTaxAccountant.com provides sales and use tax consulting services to
              businesses. This policy explains what information we collect when you use this
              website, how we use it, and the choices you have. We keep our data practices
              limited and straightforward.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">2. Information We Collect</h2>
            <p className="mt-2">
              We only collect the information you choose to give us through our forms. This
              typically includes your name, email address, company name, and any message or
              details you provide about your sales tax situation. When you request a guide, we
              collect your email address so we can send it to you.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">3. How We Use Your Information</h2>
            <p className="mt-2">
              We use the information you provide to respond to your inquiries, send the guide or
              checklist you requested, and share occasional updates related to sales tax topics.
              We do not use your information for automated decision-making or profiling.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">4. Service Providers</h2>
            <p className="mt-2">
              We rely on a small number of third-party processors to operate this site:
            </p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>
                <strong>Formspree</strong> processes and delivers submissions from our contact
                and guide request forms.
              </li>
              <li>
                <strong>Vercel Analytics</strong> provides anonymous, aggregated usage analytics.
                It does not use cookies to track individual users.
              </li>
            </ul>
            <p className="mt-2">
              These providers only handle the data needed to perform their function and are not
              permitted to use it for their own purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">5. No Selling or Sharing</h2>
            <p className="mt-2">
              We do not sell, rent, or trade your personal information. We do not share it with
              third parties for their own marketing, and we only disclose it to the service
              providers described above or where required by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">6. Data Retention</h2>
            <p className="mt-2">
              We keep the information you submit only as long as needed to respond to your
              inquiry and maintain a reasonable record of our correspondence. When it is no
              longer needed, we delete it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">7. Your Choices and Rights</h2>
            <p className="mt-2">
              You can ask us to access or delete the personal information you have shared with
              us, and you can unsubscribe from updates at any time. To make a request, email us
              at{" "}
              <a href="mailto:hello@salestaxaccountant.com" className="text-blue-900 hover:underline">
                hello@salestaxaccountant.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">8. Contact Us</h2>
            <p className="mt-2">
              If you have any questions about this policy or our data practices, please contact
              us at{" "}
              <a href="mailto:hello@salestaxaccountant.com" className="text-blue-900 hover:underline">
                hello@salestaxaccountant.com
              </a>
              . We may update this policy from time to time; the effective date above reflects
              the most recent revision.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
