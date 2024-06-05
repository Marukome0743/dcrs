import {
  ArrowRightEndOnRectangleIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline"
import Link from "next/link"
import type React from "react"

export function Header(): React.JSX.Element {
  return (
    <header className="navbar bg-base-100 sticky top-0 z-10">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost h-fit text-xl">
          障がい者手帳
          <br />
          登録システム
        </Link>
      </div>
      <div className="flex-none gap-4">
        <Link
          href="/login"
          className="btn btn-ghost btn-square h-fit gap-0 text-nowrap"
        >
          <ArrowRightEndOnRectangleIcon className="size-10 text-primary rotate-y" />
          ログイン
        </Link>
        <label className="btn btn-ghost btn-square h-fit swap swap-rotate">
          <input type="checkbox" className="theme-controller" value="dark" />
          <div className="swap-on">
            <MoonIcon className="size-10 text-secondary" />
            ダーク
          </div>
          <div className="swap-off">
            <SunIcon className="size-10 text-warning" />
            ライト
          </div>
        </label>
      </div>
    </header>
  )
}
