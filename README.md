# FarOut

A premium skate shop e-commerce application built with Next.js, featuring product browsing, cart management, and checkout functionality.

## Features

- **Product Catalog**: Browse skateboarding gear including decks, trucks, wheels, hardware, apparel, and accessories
- **Category Filtering**: Filter products by category with a responsive UI
- **Cart Management**: Add items to cart, update quantities, and persist cart across sessions
- **Form Validation**: Secure payment form validation using Zod
- **Dark Mode**: Theme switching with next-themes
- **Responsive Design**: Mobile-first design that works on all screen sizes
- **SEO Optimized**: Comprehensive metadata and Open Graph tags
- **Accessibility**: Skip-to-content link and semantic HTML

## Tech Stack

- **Framework**: Next.js 15.4.2 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Theme**: next-themes
- **Validation**: Zod
- **Deployment**: GitHub Pages

## Available Scripts

- `npm run dev` — Start development server with Turbopack
- `npm run build` — Build production application
- `npm run start` — Start production server
- `npm run lint` — Run ESLint
- `npm run typecheck` — Run TypeScript type checking
- `npm run check` — Run both lint and typecheck
- `npm run export` — Build static export for GitHub Pages

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

This project is configured for automatic deployment to GitHub Pages via GitHub Actions.

### Setup Instructions

1. **Push to GitHub**: Ensure your repository is pushed to GitHub on the `main` branch.

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Navigate to **Settings** > **Pages**
   - Under **Build and deployment**, set **Source** to **GitHub Actions**
   - The workflow will automatically run on pushes to the `main` branch

3. **Automatic Deployment**:
   - Every push to the `main` branch triggers the build and deployment
   - The workflow builds the static export and deploys to GitHub Pages
   - Your site will be available at `https://<username>.github.io/far-out/`

### Build Locally

To test the static export locally:

```bash
npm run export
```

The built files will be in the `out/` directory.

## Project Structure

```
far-out/
├── app/                 # Next.js App Router pages
│   ├── data/           # Product data
│   ├── layout.tsx      # Root layout with metadata
│   ├── loading.tsx     # Loading state
│   ├── error.tsx       # Error boundary
│   ├── not-found.tsx   # 404 page
│   └── providers.tsx   # Context providers
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   └── ...             # Feature components
├── contexts/           # React contexts
│   └── CartContext.tsx # Cart state management
├── hooks/              # Custom React hooks
├── lib/                # Utilities and helpers
│   ├── validations.ts  # Zod schemas
│   └── utils.ts        # Utility functions
└── public/             # Static assets
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.