import { HomeBtn } from "@/app/components/button/homeBtn"
import type { JSX, ReactNode } from "react"

export default function UserLayout({
  children,
}: Readonly<{ children: ReactNode }>): JSX.Element {
  return (
    <>
      {children}
      <HomeBtn />
    </>
  )
}
