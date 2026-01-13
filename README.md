# SalesTaxAccountant.com

Professional sales & use tax consulting landing page built with Next.js 15, React 19, and Tailwind CSS.

## Overview

This is a modern, responsive marketing website for a B2B sales tax consulting firm. The site features lead generation forms, SEO optimization, structured data for search engines, and a mobile-first design.

## Tech Stack

- **Framework**: Next.js 15.4.10
- **UI Library**: React 19.1.0
- **Styling**: Tailwind CSS 4
- **Components**: shadcn/ui (custom built)
- **Animations**: Framer Motion 12.23.12
- **Icons**: Lucide React
- **Analytics**: Vercel Analytics
- **Forms**: Formspree integration

## Features

- ✅ **SEO Optimized**: Complete metadata, Open Graph, Twitter Cards, and JSON-LD structured data
- ✅ **Lead Generation**: Two fully functional contact forms (consultation requests and lead magnet)
- ✅ **Mobile Navigation**: Responsive hamburger menu with smooth animations
- ✅ **Modern UI**: Gradient backgrounds, smooth animations, and clean design
- ✅ **Performance**: Static generation for optimal load times
- ✅ **Accessibility**: ARIA labels, semantic HTML, keyboard navigation

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata and SEO
│   ├── page.tsx            # Main landing page
│   └── globals.css         # Global styles and Tailwind
├── components/
│   └── ui/                 # Reusable UI components (Button, Card, Input, etc.)
└── lib/
    └── utils.ts            # Utility functions
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/taylorschnack/salestaxaccountant.git
cd salestaxaccountant

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site in your browser.

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## Configuration

### Forms

Forms are configured to use Formspree. To connect your own form endpoint:

1. Sign up at [Formspree.io](https://formspree.io)
2. Create a new form
3. Update the form endpoint in `src/app/page.tsx`:
   - `LeadForm` component (line ~119)
   - `LeadMagnetForm` component (line ~182)

### SEO & Metadata

Update site metadata in `src/app/layout.tsx`:
- Page title and description
- Open Graph images
- Canonical URL
- Social media links

### Analytics

Vercel Analytics is integrated. To enable:
1. Deploy to Vercel
2. Enable Analytics in your Vercel project settings

## Key Sections

- **Hero**: Value proposition with key statistics
- **Services**: 6 core service offerings
- **How We Work**: 5-step process with integrated lead form
- **Industries**: Target market segments
- **FAQs**: Common questions with structured data
- **Contact**: Lead generation form with contact information
- **About**: Company background and credentials
- **Resources**: Blog/article preview section
- **Lead Magnet**: Free guide download form

## Recent Updates

All high-priority fixes implemented:
- ✅ Fixed SEO metadata (moved to layout.tsx)
- ✅ Fixed form submission handling with loading states
- ✅ Implemented mobile navigation menu
- ✅ Removed placeholder contact information
- ✅ Connected lead magnet form functionality

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint
```

## Deployment

This site is optimized for deployment on [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import the repository in Vercel
3. Vercel will automatically detect Next.js and configure the build
4. Your site will be live with automatic deployments on every push

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/taylorschnack/salestaxaccountant)

## License

All rights reserved © 2026 SalesTaxAccountant.com

## Support

For questions or issues, please contact hello@salestaxaccountant.com
