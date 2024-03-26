import { Footer } from '@/app/components/footer'
import type { Metadata } from 'next'
import { Sawarabi_Gothic } from 'next/font/google'
import type React from 'react'
import './globals.css'

const sawarabi = Sawarabi_Gothic({
  subsets: ['latin'],
  weight: '400',
})

export const metadata: Metadata = {
  title: 'DCRS',
  description: '障がい者手帳登録システム',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={sawarabi.className}>
        <main className="flex flex-col gap-6 min-h-svh items-center justify-center bg-gray-50 px-4 py-6 lg:px-8 sm:px-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
