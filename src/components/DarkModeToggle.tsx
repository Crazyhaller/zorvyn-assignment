import { useEffect, useState } from 'react'

const getInitialTheme = () => {
  if (typeof window === 'undefined') return false

  const storedTheme = window.localStorage.getItem('theme')

  if (storedTheme) {
    return storedTheme === 'dark'
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

const DarkModeToggle = () => {
  const [dark, setDark] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    window.localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <button
      type="button"
      onClick={() => setDark(!dark)}
      className="inline-flex items-center gap-3 rounded-[20px] border border-slate-200/80 bg-white/80 px-3 py-2 text-left shadow-sm backdrop-blur-xl hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.05]"
    >
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
          dark
            ? 'bg-slate-950 text-amber-300 dark:bg-white/[0.08]'
            : 'bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-200'
        }`}
      >
        {dark ? (
          <svg
            aria-hidden="true"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
          >
            <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" />
          </svg>
        ) : (
          <svg
            aria-hidden="true"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="4.5" />
            <path d="M12 2.5v2.2M12 19.3v2.2M4.9 4.9l1.5 1.5M17.6 17.6l1.5 1.5M2.5 12h2.2M19.3 12h2.2M4.9 19.1l1.5-1.5M17.6 6.4l1.5-1.5" />
          </svg>
        )}
      </span>

      <span>
        <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-slate-400 dark:text-slate-500">
          Appearance
        </span>
        <span className="block text-sm font-semibold text-slate-900 dark:text-white">
          {dark ? 'Dark mode' : 'Light mode'}
        </span>
      </span>
    </button>
  )
}

export default DarkModeToggle
