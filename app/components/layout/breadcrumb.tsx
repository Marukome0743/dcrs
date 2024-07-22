import type { Index } from "@/app/interfaces/index"
import { HomeIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import type { JSX } from "react"

export function Breadcrumb({
  crumbs,
}: Readonly<{ crumbs: Index[] }>): JSX.Element {
  return (
    <div className="breadcrumbs mx-auto text-sm">
      <ul>
        <li>
          <Link href="/">
            <HomeIcon className="mr-1 size-4 text-primary" />
            ホーム
          </Link>
        </li>
        {crumbs.map((crumb) => (
          <li key={crumb.name}>
            <Link href={crumb.href || ""}>
              <crumb.icon className={`mr-1 size-4 ${crumb.color}`} />
              {crumb.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
