# Zone Co — Hotel & Chalet Booking Platform

A bilingual (English/Arabic) hotel and chalet booking website for properties in **Ain Sokhna, Red Sea coast, Egypt**. Built with Next.js 15, featuring full RTL support and a modern booking experience.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss)

## Features

- **Bilingual UI** — Full English and Arabic support with automatic RTL layout switching
- **Property Browsing** — Filter by type (hotel/chalet), price range, rating, and amenities
- **Booking Flow** — 3-step process: Guest Details → Review & Pay → Confirmation
- **Admin Dashboard** — Overview stats, bookings management, and property listings
- **Responsive Design** — Mobile-first layout across all pages
- **Image Gallery** — Lightbox-style property image viewer with thumbnails

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/[locale]` | Hero search, featured properties, testimonials |
| Properties | `/[locale]/properties` | Filterable property grid with sorting |
| Property Detail | `/[locale]/properties/[id]` | Gallery, tabs (overview/amenities/reviews/location), booking sidebar |
| Booking | `/[locale]/booking/[propertyId]` | Multi-step booking with payment |
| Admin Dashboard | `/[locale]/admin` | Stats cards, recent bookings |
| Admin Bookings | `/[locale]/admin/bookings` | Full bookings table with status filters |
| Admin Properties | `/[locale]/admin/properties` | Property management table |

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS with custom teal/gold theme
- **UI Components:** Radix UI primitives (shadcn-style)
- **Internationalization:** next-intl (EN + AR, RTL)
- **Icons:** lucide-react
- **Fonts:** Inter (EN) + Noto Sans Arabic (AR)
- **Currency:** EGP (Egyptian Pounds)
- **Payment:** Paymob (Egyptian local gateway) — planned

## Getting Started

### Prerequisites

- Node.js 18.x or 20.x
- npm or yarn

### Installation

```bash
git clone https://github.com/your-username/booking-prototype.git
cd booking-prototype
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/en` or `/ar` based on your browser locale.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/[locale]/          # All pages (locale-aware routing)
├── components/
│   ├── ui/                # Base UI components (button, card, dialog, etc.)
│   ├── layout/            # Navbar, footer
│   ├── home/              # Hero, featured properties, testimonials
│   ├── properties/        # Property grid, card, filters, gallery
│   ├── booking/           # Booking stepper, payment form, confirmation
│   └── admin/             # Admin sidebar, stats cards
├── data/                  # Mock data (properties, bookings, reviews)
├── i18n/                  # Locale config, routing, navigation
└── lib/                   # Utilities (formatting, calculations)
messages/
├── en.json                # English translations (215+ keys)
└── ar.json                # Arabic translations (215+ keys)
```

## Deployment

Optimized for **Vercel**. Connect the repo and deploy — Next.js is auto-detected.

Environment variables (add when integrations are ready):

| Variable | Purpose |
|----------|---------|
| `PAYMOB_SECRET_KEY` | Paymob payment gateway |
| `PAYMOB_PUBLIC_KEY` | Paymob client-side key |
| `RESEND_API_KEY` | Email service |
| `SUPABASE_URL` | Database |
| `SUPABASE_ANON_KEY` | Database client key |

## License

Private — All rights reserved.
