'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9">
        <Sun className="h-5 w-5" />
        <span className="sr-only">Cambiar tema</span>
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="h-9 w-9 transition-all duration-300 hover:bg-primary/10"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 text-yellow-500 transition-transform duration-300 rotate-0" />
      ) : (
        <Moon className="h-5 w-5 text-primary transition-transform duration-300 rotate-0" />
      )}
      <span className="sr-only">Cambiar tema</span>
    </Button>
  )
}
