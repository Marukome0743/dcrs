import { HomeBtn } from "@/app/components/button/homeBtn"
import type React from "react"
import type { ReactNode } from "react"

export default function UserLayout({
  children,
}: Readonly<{
  children: ReactNode
}>): React.JSX.Element {
  return (
    <>
      {children}
      <HomeBtn />
    </>
  )
}
