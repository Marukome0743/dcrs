import { HomeBtn } from "@/app/components/homeBtn"
import type React from "react"

export default function RegisterLayout({
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
