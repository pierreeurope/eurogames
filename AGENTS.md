# AGENTS.md - EuroGames Development Guide

## Project Overview

EuroGames is a daily puzzle hub — a European competitor to NYT Games. It features word games, geography puzzles, and logic challenges with a focus on:
- **European flavor** - Geography, languages, culture
- **Multiplayer-first** - Play with friends, vs mode
- **Multi-language** - Support for DE/FR/ES/IT/NL
- **Mobile-first** - Responsive, PWA-ready

## Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL + Auth)
- **Hosting:** Vercel

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page with game grid
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   ├── wurdle/
│   │   └── page.tsx          # Wurdle game
│   ├── minix/
│   │   └── page.tsx          # MiniX crossword
│   └── eurogrid/
│       └── page.tsx          # EuroGrid geography game
├── components/
│   ├── ui/                   # Reusable UI components
│   ├── games/                # Game-specific components
│   └── shared/               # Shared components (header, footer)
├── lib/
│   ├── supabase.ts           # Supabase client
│   ├── games/                # Game logic
│   └── utils.ts              # Utility functions
├── hooks/                    # Custom React hooks
└── types/                    # TypeScript types
```

## MVP Games (Phase 1)

### 1. Wurdle
- Wordle clone with European language support
- 6 attempts to guess a 5-letter word
- Color feedback: green (correct), yellow (wrong position), gray (not in word)
- Languages: English first, then DE/FR/ES/IT/NL
- Daily word + unlimited practice mode
- Share results as emoji grid

### 2. MiniX
- 5x5 mini crossword
- Quick solve (< 5 minutes)
- Clues for across and down
- Timer + streak tracking
- Mobile-friendly grid input

### 3. EuroGrid
- Football players by club/country grid (like Immaculate Grid)
- 3x3 grid with clubs on top, countries on side
- 9 guesses to fill the grid
- European leagues focus (Premier League, La Liga, Serie A, Bundesliga, Ligue 1)

## Design Guidelines

### Colors
- Primary: Deep blue (#1a365d)
- Accent: Euro gold (#FFD700)
- Success: Green (#22c55e)
- Warning: Yellow (#eab308)
- Error: Red (#ef4444)
- Background: Near-white (#fafafa) / Dark (#0f172a)

### UI Principles
- Clean, minimal interface
- Large touch targets for mobile
- Smooth animations (Framer Motion)
- Dark mode support
- Accessible (WCAG AA)

## Game State Management

Use localStorage for:
- Current game state
- Statistics (games played, win %, streak)
- Settings (dark mode, language)

Use Supabase for:
- User accounts (optional)
- Daily leaderboards
- Global statistics

## Share Format (Wurdle example)

```
Wurdle 123 4/6 🇪🇺

⬛🟨⬛⬛🟩
⬛🟩🟩⬛🟩
🟩🟩🟩⬛🟩
🟩🟩🟩🟩🟩

eurogames.app/wurdle
```

## Development Commands

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run test     # Run tests
```

## Current Sprint: Wurdle MVP

Build Wurdle first as the quickest win:

1. **Game board** - 6 rows × 5 columns grid
2. **Keyboard** - On-screen keyboard with color feedback
3. **Game logic** - Word validation, letter state tracking
4. **Stats modal** - Show game statistics
5. **Share button** - Copy results to clipboard
6. **Daily word** - Seed-based word selection
7. **Animations** - Tile flip, shake on invalid word

Word list: Use a curated list of common 5-letter English words (~2,500 words for solutions, ~10,000 for valid guesses).

## Notes

- Start simple, iterate fast
- Mobile-first responsive design
- Test on real devices
- Keep accessibility in mind
- Add Supabase later for persistence
