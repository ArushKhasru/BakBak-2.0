# BakBak 2.0

BakBak 2.0 is a **Next.js 16 + React 19** real-time chat platform with **Clerk authentication** and **Stream Chat** integration. It provides:

- topic-based community forums (`/forums` → `/forum/[slug]`)
- direct user-to-user messaging (`/chat`)
- protected routes using Clerk middleware
- modern glassmorphism UI built with Tailwind CSS

## Features

- **Authentication & user management** with Clerk
- **Forum channels** by topic (Python, Cryptography, UI Design, React/Next.js, Cybersecurity, Developer feedback)
- **Direct messages** using Stream Chat channel list + message window
- **Automatic Stream token provisioning** via API route and Clerk public metadata
- **Responsive UI** with custom components, icons, and animated hero carousel

## Tech Stack

- **Framework:** Next.js (App Router)
- **Frontend:** React, Tailwind CSS, Framer Motion, Lucide, React Icons
- **Auth:** Clerk (`@clerk/nextjs`)
- **Chat backend/service:** Stream Chat (`stream-chat`, `stream-chat-react`)
- **Linting:** ESLint + eslint-config-next

## Project Structure

```text
app/
  api/create/route.js      # Creates Stream user token + initial channels
  chat/page.js             # Direct messaging UI
  forum/[slug]/page.js     # Topic channel page
  forums/page.js           # Forum/topic listing
  layout.js                # Root layout + ClerkProvider + Navbar/Footer
  page.js                  # Landing page
components/
  ChatForum.js             # Stream-powered forum chat component
  Navbar.js, Footer.js
  Carousel.js
assets/page.js             # Forum topic metadata
middleware.js              # Route protection with Clerk
```

## Routes

- `/` – Landing page
- `/forums` – Topic/forum directory
- `/forum/[slug]` – Forum channel chat
- `/chat` – Direct user chat (DM)
- `/api/create` – Public API endpoint used to provision Stream token/user data

## Environment Variables

Create a `.env.local` file in the repository root and define:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...

# Stream Chat (used in both server and client code in this repo)
NEXT_PUBLIC_STREAM_API_KEY=...
NEXT_PUBLIC_STREAM_API_SECRET=...
```

> Note: In this codebase, `NEXT_PUBLIC_STREAM_API_SECRET` is referenced by server routes/components. Ensure values are set correctly for local execution.

## Getting Started

1. Install dependencies:
   ```bash
   npm ci
   ```
2. Add environment variables to `.env.local`.
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` – start development server
- `npm run build` – production build
- `npm run start` – run production server
- `npm run lint` – run ESLint

## Current Build/Lint Notes

- Lint currently reports existing issues in chat components (`setState` in effects, one `<img>` warning).
- Build may fail in restricted/offline environments because `next/font` fetches Google Geist fonts at build time.

## Repository

GitHub: https://github.com/ArushKhasru/BakBak-2.0
