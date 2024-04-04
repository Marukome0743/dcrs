import { HomeBtn } from '@/app/components/homeBtn'
import { ScrollToTop } from '@/app/components/scrollToTop'
import type React from 'react'

export const STEP = ['必要情報の入力', '入力確認', '完了']

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <HomeBtn />
      <ScrollToTop />
    </>
  )
}
