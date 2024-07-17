"use client"

import { SITE_TITLE } from "@/app/lib/constant"
import {
  ArrowRightEndOnRectangleIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline"
import Link from "next/link"
import type React from "react"
import { useEffect, useState } from "react"
import { themeChange } from "theme-change"

export function Header(): React.JSX.Element {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [scrollY, setScrollY] = useState<{
    scrollY: number
    isScrollDown: boolean
  }>({ scrollY: 0, isScrollDown: false })
  const headerHeight: number = 100

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setScrollY({
        scrollY: window.scrollY,
        isScrollDown: scrollY.scrollY < window.scrollY,
      })
    })
  }

  useEffect(() => {
    if (
      !("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      localStorage.setItem("theme", "dark")
    }

    themeChange(false)
    if (localStorage.getItem("theme") === "dark") {
      setTheme("dark")
    }
  })

  return (
    <header
      className={`transition duration-400 ease bg-base-100 justify-between navbar sticky top-0 z-10 ${
        headerHeight < scrollY.scrollY && scrollY.isScrollDown
          ? "-translate-y-20"
          : "translate-y-0"
      }`}
    >
      <Link href="/" className="btn btn-ghost h-fit text-xl">
        {SITE_TITLE}
      </Link>
      <div className="gap-4">
        <Link
          href="/login"
          className="btn btn-ghost btn-square h-fit gap-0 text-nowrap"
        >
          <ArrowRightEndOnRectangleIcon className="size-10 text-primary rotate-y" />
          ログイン
        </Link>
        <label className="btn btn-ghost btn-square h-fit swap swap-rotate">
          <input type="checkbox" />
          <div
            className={`${theme === "light" ? "swap-off" : "swap-on"}`}
            data-set-theme="light"
          >
            <SunIcon className="size-10 text-warning" />
            ライト
          </div>
          <div
            className={`${theme === "dark" ? "swap-off" : "swap-on"}`}
            data-set-theme="dark"
          >
            <MoonIcon className="size-10 text-secondary" />
            ダーク
          </div>
        </label>
      </div>
    </header>
  )
}
