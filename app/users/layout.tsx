import { HomeBtn } from '@/app/components/homeBtn'
import { ScrollToTop } from '@/app/components/scrollToTop'
import type React from 'react'

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): React.JSX.Element {
  return (
    <>
      {children}
      <HomeBtn />
      <ScrollToTop />
    </>
  )
}
