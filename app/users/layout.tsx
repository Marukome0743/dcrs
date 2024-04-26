import { HomeBtn } from '@/app/components/homeBtn'
import { ScrollToTop } from '@/app/components/scrollToTop'
import type React from 'react'

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return (
    <>
      {children}
      <HomeBtn />
      <ScrollToTop />
      <div id="modal-root" />
    </>
  )
}
