# FoundIt

FoundIt is a polished, responsive community lost-and-found board. People can browse and filter reports, publish a lost or found item, view full details, and mark a post as resolved. All changes persist locally between visits.

## Features

- Search across titles, descriptions, and locations
- Combined type/category filters with newest/oldest sorting
- Responsive item cards and detailed post pages
- Accessible report form with Zod validation
- Lost, found, active, and resolved states
- `localStorage` persistence with reusable storage/context logic
- Loading, empty, error, and missing-item experiences
- Automated search behavior test

## Tech stack

React 18, TypeScript, Vite, Tailwind CSS, React Router v6, React Hook Form, Zod, Lucide React, Vitest, and React Testing Library.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Verification

```bash
npm run typecheck
npm test
npm run build
```

## Project structure

```text
src/
  components/        Shared layout and UI states
  features/items/    Item data, types, storage, context, and components
  pages/             Browse, details, report, and not-found pages
  test/              Test environment setup
  App.tsx            Route composition
  main.tsx           Application entry point
```

## Data and persistence

Eight starter reports are seeded on the first visit. The complete collection is stored under `foundit-items-v1` in the browser's local storage. Clearing site data restores the starter collection on the next load.

No account, backend, or external database is required.
