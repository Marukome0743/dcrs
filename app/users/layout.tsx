import { HomeBtn } from "@/app/components/button/homeBtn"
import type React from "react"

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): React.JSX.Element {
  return (
    <>
      {children}
      <HomeBtn />
    </>
  )
}
