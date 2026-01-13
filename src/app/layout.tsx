import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SalesTaxAccountant.com | Sales Tax Confidence for Growing Businesses",
  description: "Practical multistate sales & use tax help for online sellers, SaaS, and retailers — nexus, taxability, registration, audits, and disclosures — delivered in plain language with audit‑ready support.",
  keywords: ["sales tax", "nexus study", "voluntary disclosure", "VDA", "sales tax registration", "audit defense", "multistate compliance"],
  robots: "index,follow",
  openGraph: {
    title: "SalesTaxAccountant.com | Sales Tax Confidence",
    description: "Simplify multistate sales tax. From nexus and taxability to audits and disclosures, we deliver audit‑ready, plain‑language solutions.",
    type: "website",
    url: "https://www.salestaxaccountant.com",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SalesTaxAccountant.com"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SalesTaxAccountant.com | Sales Tax Confidence",
    description: "Sales tax confidence, built for audit‑ready teams.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.salestaxaccountant.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "SalesTaxAccountant.com",
              url: "https://www.salestaxaccountant.com",
              logo: "https://www.salestaxaccountant.com/favicon.ico",
              sameAs: ["https://www.linkedin.com/company/salestaxaccountant"],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "SalesTaxAccountant.com",
              url: "https://www.salestaxaccountant.com",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Sales & Use Tax Consulting",
              url: "https://www.salestaxaccountant.com#services",
              areaServed: "US",
              serviceType: [
                "Nexus & Exposure Study",
                "Registration & Onboarding",
                "Product Taxability Matrix",
                "Audit Support",
                "Voluntary Disclosures (VDAs)",
                "Sales Tax Systems & Controls",
              ],
              provider: { "@type": "Organization", name: "SalesTaxAccountant.com" },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "How fast can you deliver a nexus study?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Typical turnarounds are 1–2 weeks depending on states and data readiness. Rush options available.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Do you implement or resell tax engines?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "We stay vendor‑neutral. We help you choose, configure rules, and validate results without reselling software.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can you represent us in front of the state?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "We support audits end‑to‑end and coordinate with legal counsel when formal representation is required.",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
