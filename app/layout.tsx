import { AlertBox } from "@/app/components/alertBox"
import { Footer } from "@/app/components/footer"
import { Header } from "@/app/components/header"
import type { Metadata } from "next"
import type { NextFont } from "next/dist/compiled/@next/font"
import { Sawarabi_Gothic } from "next/font/google"
import type React from "react"
import "./globals.css"

const sawarabi: NextFont = Sawarabi_Gothic({
  subsets: ["latin"],
  weight: "400",
})

export const metadata: Metadata = {
  title: "DCRS",
  description: "障がい者手帳登録システム",
  metadataBase: new URL("https://openuplab-takizawa.com"),
}

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>): React.JSX.Element {
  return (
    <html lang="ja">
      <body className={sawarabi.className}>
        <Header />
        <main className="flex flex-col gap-6 min-h-svh items-center justify-center bg-gray-50 px-4 py-6 lg:px-8 sm:px-6">
          <AlertBox>
            {children}
            {modal}
          </AlertBox>
        </main>
        <Footer />
      </body>
    </html>
  )
}
