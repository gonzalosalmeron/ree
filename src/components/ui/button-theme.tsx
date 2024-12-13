'use client'

import useTheme from '@/hooks/useTheme'

export default function ButtonTheme() {
  const { theme, toggleTheme, icon } = useTheme()

  const ElementIcon = icon

  return (
    <button
      className='group flex h-full w-full items-center justify-center rounded-xl duration-150 active:scale-90'
      onClick={toggleTheme}
      aria-label={`Theme ${theme}`}
      data-cy='btn-switch-theme'
    >
      <ElementIcon className='h-5 w-5' />
    </button>
  )
}
