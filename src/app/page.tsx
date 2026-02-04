import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-dvh flex flex-col bg-[var(--background)]">
      {/* Header */}
      <header className="w-full border-b border-[var(--tile-border)]">
        <div className="max-w-4xl mx-auto flex items-center justify-center px-4 py-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-wider">
            <span className="text-[var(--primary)] dark:text-[var(--accent)]">Euro</span>
            <span>Games</span>
            <span className="ml-2 text-2xl">🇪🇺</span>
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-4 py-8 sm:py-12">
        <div className="max-w-2xl w-full">
          {/* Tagline */}
          <p className="text-center text-lg sm:text-xl text-[var(--foreground)]/70 mb-8 sm:mb-12">
            Daily puzzles with a European twist
          </p>

          {/* Games Grid */}
          <div className="grid gap-4 sm:gap-6">
            {/* Wurdle */}
            <Link
              href="/wurdle"
              className="
                group relative
                p-6 sm:p-8
                bg-[var(--tile-bg)] border-2 border-[var(--tile-border)]
                rounded-xl
                hover:border-[var(--success)] hover:shadow-lg
                transition-all duration-200
              "
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2 group-hover:text-[var(--success)] transition-colors">
                    Wurdle
                  </h2>
                  <p className="text-[var(--foreground)]/70">
                    Guess the 5-letter word in 6 tries
                  </p>
                </div>
                <div className="text-4xl sm:text-5xl">🟩</div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-[var(--foreground)]/50">
                <span className="px-2 py-1 bg-[var(--success)]/20 text-[var(--success)] rounded-full font-medium">
                  Play Now
                </span>
                <span>Daily + Unlimited</span>
              </div>
            </Link>

            {/* MiniX - Coming Soon */}
            <div
              className="
                relative
                p-6 sm:p-8
                bg-[var(--tile-bg)] border-2 border-[var(--tile-border)]
                rounded-xl
                opacity-60
              "
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                    MiniX
                  </h2>
                  <p className="text-[var(--foreground)]/70">
                    5x5 mini crossword puzzle
                  </p>
                </div>
                <div className="text-4xl sm:text-5xl">📝</div>
              </div>
              <div className="mt-4">
                <span className="px-2 py-1 bg-[var(--warning)]/20 text-[var(--warning)] rounded-full text-sm font-medium">
                  Coming Soon
                </span>
              </div>
            </div>

            {/* EuroGrid - Coming Soon */}
            <div
              className="
                relative
                p-6 sm:p-8
                bg-[var(--tile-bg)] border-2 border-[var(--tile-border)]
                rounded-xl
                opacity-60
              "
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                    EuroGrid
                  </h2>
                  <p className="text-[var(--foreground)]/70">
                    Football players by club & country
                  </p>
                </div>
                <div className="text-4xl sm:text-5xl">⚽</div>
              </div>
              <div className="mt-4">
                <span className="px-2 py-1 bg-[var(--warning)]/20 text-[var(--warning)] rounded-full text-sm font-medium">
                  Coming Soon
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--tile-border)] py-4 text-center text-sm text-[var(--foreground)]/50">
        <p>EuroGames - Daily puzzles for everyone</p>
      </footer>
    </div>
  );
}
