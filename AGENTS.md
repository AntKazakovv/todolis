# AGENTS.md

## Project Overview
Todolis is a React-based PWA (Progressive Web App) for creating and managing reminders/tasks. Built with React 19, TypeScript, Vite, and Tailwind CSS.

## Tech Stack
- **Framework**: React 19 with TypeScript
- **Build tool**: Vite 6
- **Styling**: Tailwind CSS 3
- **PWA**: vite-plugin-pwa
- **Routing**: react-router-dom v7
- **Forms**: react-hook-form
- **Database**: IndexedDB (via idb library)

## Project Structure
```
src/
├── components/      # Reusable UI components (NavBar, TaskCard)
├── context/         # React context (TaskContext)
├── db/              # IndexedDB operations (tasks.ts)
├── pages/           # Page components (TaskList, TaskEdit, Settings)
├── types/           # TypeScript type definitions
├── App.tsx          # Main app component with routing
├── main.tsx         # Entry point
└── index.css        # Tailwind directives and global styles
```

## Available Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production (runs TypeScript check + Vite build)
- `npm run preview` - Preview production build locally

## Type Checking
- `npx tsc -b` - Run TypeScript type checking
- TypeScript config: strict mode enabled, no unused locals/parameters, no fallthrough cases

## Code Conventions
- Use TypeScript strict mode
- React 19 with functional components and hooks
- Tailwind CSS for styling (no custom CSS except global styles)
- IndexedDB for data persistence with import/export to JSON capability
- Task states: "queued" | "in-progress" | "done"
- Mobile-first design approach

## Notes
- No ESLint configured - rely on TypeScript strict checks
- PWA features enabled via vite-plugin-pwa
- All task data stored locally in IndexedDB
