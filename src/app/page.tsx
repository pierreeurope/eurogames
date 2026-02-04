import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-dvh flex flex-col bg-[var(--background)]">
      {/* Header */}
      <header className="w-full border-b border-[var(--tile-border)] bg-[var(--background)]/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto flex items-center justify-center px-4 py-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-wider page-enter">
            <span className="text-[var(--primary)] dark:text-[var(--accent)]">Euro</span>
            <span>Games</span>
            <span className="ml-2 text-2xl float-animation inline-block">🇪🇺</span>
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-4 py-8 sm:py-12">
        <div className="max-w-2xl w-full">
          {/* Tagline */}
          <p className="text-center text-lg sm:text-xl text-[var(--foreground)]/60 mb-8 sm:mb-12 stagger-1">
            Daily puzzles with a European twist
          </p>

          {/* Games Grid */}
          <div className="grid gap-4 sm:gap-6">
            {/* Wurdle */}
            <Link
              href="/wurdle"
              className="game-card game-card-success group block p-6 sm:p-8 bg-[var(--tile-bg)] border-2 border-[var(--tile-border)] rounded-2xl stagger-2"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl sm:text-3xl font-bold group-hover:text-[var(--success)] transition-colors">
                      Wurdle
                    </h2>
                    <span className="play-badge px-2.5 py-1 bg-[var(--success)] text-white rounded-full text-xs font-bold uppercase tracking-wide">
                      Play
                    </span>
                  </div>
                  <p className="text-[var(--foreground)]/60 text-sm sm:text-base">
                    Guess the 5-letter word in 6 tries. Color hints guide you to victory.
                  </p>
                </div>
                <div className="card-icon text-4xl sm:text-5xl ml-4 opacity-90">🟩</div>
              </div>
              <div className="mt-4 flex items-center gap-3 text-xs text-[var(--foreground)]/50">
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Daily
                </span>
                <span className="w-1 h-1 rounded-full bg-[var(--foreground)]/30" />
                <span>6 attempts</span>
                <span className="w-1 h-1 rounded-full bg-[var(--foreground)]/30" />
                <span>Track streaks</span>
              </div>
            </Link>

            {/* MiniX */}
            <Link
              href="/minix"
              className="game-card game-card-info group block p-6 sm:p-8 bg-[var(--tile-bg)] border-2 border-[var(--tile-border)] rounded-2xl stagger-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl sm:text-3xl font-bold group-hover:text-[var(--info)] transition-colors">
                      MiniX
                    </h2>
                    <span className="play-badge px-2.5 py-1 bg-[var(--info)] text-white rounded-full text-xs font-bold uppercase tracking-wide">
                      Play
                    </span>
                  </div>
                  <p className="text-[var(--foreground)]/60 text-sm sm:text-base">
                    Quick 5×5 mini crossword. Perfect for a coffee break challenge.
                  </p>
                </div>
                <div className="card-icon text-4xl sm:text-5xl ml-4 opacity-90">📝</div>
              </div>
              <div className="mt-4 flex items-center gap-3 text-xs text-[var(--foreground)]/50">
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Daily
                </span>
                <span className="w-1 h-1 rounded-full bg-[var(--foreground)]/30" />
                <span>~5 min solve</span>
                <span className="w-1 h-1 rounded-full bg-[var(--foreground)]/30" />
                <span>Timer</span>
              </div>
            </Link>

            {/* EuroGrid - Coming Soon */}
            <div className="game-card game-card-warning p-6 sm:p-8 bg-[var(--tile-bg)] border-2 border-[var(--tile-border)] rounded-2xl opacity-60 cursor-not-allowed stagger-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl sm:text-3xl font-bold">
                      EuroGrid
                    </h2>
                    <span className="px-2.5 py-1 bg-[var(--warning)]/20 text-[var(--warning)] rounded-full text-xs font-bold uppercase tracking-wide">
                      Soon
                    </span>
                  </div>
                  <p className="text-[var(--foreground)]/60 text-sm sm:text-base">
                    Football players by club & country. 9 guesses, infinite glory.
                  </p>
                </div>
                <div className="text-4xl sm:text-5xl ml-4 opacity-60">⚽</div>
              </div>
              <div className="mt-4 flex items-center gap-3 text-xs text-[var(--foreground)]/40">
                <span>3×3 Grid</span>
                <span className="w-1 h-1 rounded-full bg-[var(--foreground)]/20" />
                <span>European leagues</span>
              </div>
            </div>
          </div>

          {/* Stats teaser */}
          <div className="mt-10 sm:mt-14 text-center stagger-4">
            <p className="text-sm text-[var(--foreground)]/40">
              Play daily. Build streaks. Share with friends.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--tile-border)] py-4">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-center gap-4 text-xs text-[var(--foreground)]/40">
          <span>EuroGames</span>
          <span className="w-1 h-1 rounded-full bg-[var(--foreground)]/20" />
          <span>Daily puzzles for everyone</span>
        </div>
      </footer>
    </div>
  );
}
