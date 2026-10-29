---
target: the website (homepage)
total_score: 20
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: "file:C:\\Client\\Projects\\Sales_Tax_Accountant_com\\src\\app\\page.tsx"
target_fingerprint: "sha256:b74c077ca6882d9506a03b73f497bc07a62119e5f122a25b391a1f8d2007cdb4"
target_path: "C:\\Client\\Projects\\Sales_Tax_Accountant_com\\src\\app\\page.tsx"
timestamp: 2026-10-29T18-03-01Z
slug: src-app-page-tsx
---
Method: dual-agent (A: design review · B: detector + browser overlay)

Target: src/app/page.tsx (homepage), light pass on /blog and /blog/wayfair-decision-guide-2026. Mode: Persuade.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Form has sending/success/error states; no active-section nav; H1 fades in from opacity 0 |
| 2 | Match System / Real World | 3 | Controller-fluent vocabulary; "we" voice misdescribes a solo practice |
| 3 | User Control and Freedom | 3 | Success state removes form with no "send another"; blog has only "Back to home" |
| 4 | Consistency and Standards | 2 | Blog renders in system font (font-sans only on home wrapper), no shared header; navy vs amber CTAs; header/footer nav differ |
| 5 | Error Prevention | 2 | Only native required/email; service-row clicks don't carry context into the form |
| 6 | Recognition Rather Than Recall | 2 | Contact form is placeholder-only (page.tsx:137-140) |
| 7 | Flexibility and Efficiency | n/a | Persuade surface |
| 8 | Aesthetic and Minimalist Design | 3 | Calm, restrained; amber lead-magnet button is the loudest element on the page |
| 9 | Error Recovery | 2 | Generic error; fallback points to hello@ which may not be a live mailbox |
| 10 | Help and Documentation | n/a | Persuade surface |
| **Total** | | **20/32** | **Acceptable** |

## Design Specificity Verdict

LLM: Mostly category-interchangeable. Clean and restrained (the SaaS-template look is gone), but the structure is the stock services template (hero + feature card, 6 icon rows, 5 steps, FAQ, lead magnet, contact), the headline could be any vendor's, the 14+/45+ stat row is the hero-metric anti-reference, and tokens/type are create-next-app + shadcn defaults. The solo senior specialist, the core differentiator, is absent.

Detector: CLI 1 finding (side-tab, globals.css:178 `.prose blockquote border-l-4`): false positive, standard blockquote style and no blockquotes render. Browser: / 6 (straggler 4, low-contrast 2), /blog 1 (straggler), Wayfair post 4 (line-length ~92ch, straggler 3). True positives: white on amber-600 3.2:1 (page.tsx:254, also 227); footer slate-400 on white 2.6:1 (page.tsx:559).

## Priority Issues

- [P1] Solo specialist invisible: no name, face, credentials; "we" voice; blog author "Sales Tax Accountant Team". Fix: "Who you'll work with" block near hero or form, first-person copy, personal byline. Commands: clarify, shape.
- [P1] Contact form under-built: placeholder-only fields, no trigger/deadline prompt, 36px inputs and narrow button on mobile, generic "Send message", SLA hidden until after submit, no direct scheduling. Fix: labels, "What's prompting this?" select prefilled from service rows, SLA microcopy, calendar link, 44px full-width on mobile. Command: harden.
- [P2] Lead magnet competes with consult at peak intent: only saturated color (amber, also fails contrast 3.2:1) sits right before the form. Fix: move to Resources/blog, outline style, reserve accent for consult CTA. Commands: layout, colorize.
- [P2] Hero is trigger-blind: generic headline, hero-metric row, abstract "What we deliver" card. Fix: headline naming triggers and the person; trigger list deep-linking to prefilled form; fold stats into a proof sentence. Command: bolder.
- [P2] Blog off-system: no header/nav, system font, duplicate CTAs, team byline. Fix: shared header/footer in layout, font-sans on body, single CTA, personal byline. Command: polish.

## Persona Red Flags

- Jordan: unglossed "Post-Wayfair", "Engine-agnostic", "VDAs"; service rows look static but jump to a generic form; vanishing placeholder labels.
- Riley: service choice silently lost; error fallback to possibly dead hello@; company field required; header/footer nav mismatch.
- Casey: 40px hamburger, 36px inputs, 130px button, no sticky consult CTA on a ~6,460px page, no click-to-call.
- Dana (controller with a 30-day state notice): no urgency/notice acknowledgment, SLA hidden, no engagement model or pricing signal, no proof, can't tell who she'd talk to, FAQ misses her questions.

## Minor Observations

No scroll-margin-top on anchors; service rows lack an arrow affordance; "45+ States registered for clients" reads awkwardly; "professional services firms" not in PRODUCT.md audience; unused shadcn chart/sidebar/dark tokens, amber hardcoded; footer copyright 2.6:1; Geist fell back to Arial metrics in dev; H1 (likely LCP) starts at opacity 0; stragglers in service descriptions; ~92ch article lines.

## Questions to Consider

1. What if the hero were the person: name, face, "you'll talk to me, not a team"?
2. What if the page opened on the controller's trigger instead of a service catalog?
3. Does a PDF lead magnet belong between a ready visitor and the consult form?
4. Could a redacted excerpt of a real nexus memo replace the stats row as proof?
