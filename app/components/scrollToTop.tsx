'use client'

import { ChevronDoubleUpIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

export function ScrollToTop() {
  const [isScrollToTop, setIsScrollToTop] = useState(false)
  const scrollPoint = 200

  if (typeof window !== 'undefined') {
    window.onscroll = () => setIsScrollToTop(scrollPoint < window.scrollY)
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
