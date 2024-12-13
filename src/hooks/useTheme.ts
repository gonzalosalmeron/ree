'use client'

import { useEffect, useState } from 'react'

import { FaceSmileIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline'

const themeIcons = {
  light: SunIcon,
  dark: MoonIcon,
  random: FaceSmileIcon,
}

type Theme = keyof typeof themeIcons

const themes: Theme[] = Object.keys(themeIcons) as Theme[]

export default function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      localStorage.getItem('theme')
      return (localStorage.getItem('theme') as Theme) || 'light'
    }
    return 'light'
  })

  useEffect(() => {
    document.documentElement.classList.add(theme)
    localStorage.setItem('theme', theme)
    return () => {
      document.documentElement.classList.remove(theme)
    }
  }, [theme])

  const toggleTheme = () => {
    const currentIndex = themes.indexOf(theme)
    const nextIndex = (currentIndex + 1) % themes.length
    const nextTheme = themes[nextIndex]

    document.documentElement.classList.remove(theme)
    document.documentElement.classList.add(nextTheme)
    localStorage.setItem('theme', nextTheme)
    setTheme(nextTheme)
  }

  const Icon = themeIcons[theme]

  return { theme, toggleTheme, icon: Icon }
}
