import { useEffect, useState } from 'react'

const DarkModeToggle = () => {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <button
      onClick={() => setDark(!dark)}
      className="px-3 py-1 border rounded-lg"
    >
      {dark ? '☀ Light' : '🌙 Dark'}
    </button>
  )
}

export default DarkModeToggle
