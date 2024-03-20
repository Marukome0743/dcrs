'use client'

import { ChevronDoubleUpIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'

export function ScrollToTop() {
  const [isScrollToTop, setIsScrollToTop] = useState(false)
  const SCROLL_POINT = 200

  useEffect(() => {
    window.addEventListener('scroll', watchScroll)
    return () => {
      window.removeEventListener('scroll', watchScroll)
    }
  }, [])

  const watchScroll = () => {
    const scrollPosition = window.scrollY
    setIsScrollToTop(SCROLL_POINT < scrollPosition)
  }

  return (
    <>
      {isScrollToTop && (
        <button
          type="button"
          className="btn btn-square btn-primary fixed right-10 bottom-10"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ChevronDoubleUpIcon className="h-8 w-8" />
        </button>
      )}
    </>
  )
}
