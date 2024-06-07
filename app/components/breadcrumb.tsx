import type { SiteLink } from "@/app/interfaces/siteLink"
import { HomeIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import type React from "react"

export function Breadcrumb({
  crumbs,
}: { crumbs: SiteLink[] }): React.JSX.Element {
  return (
    <div className="text-sm breadcrumbs">
      <ul>
        <li>
          <Link href="/">
            <HomeIcon className="size-4 mr-1 text-primary" />
            ホーム
          </Link>
        </li>
        {crumbs.map((crumb) => (
          <li key={crumb.name}>
            <Link href={crumb.href}>
              <crumb.icon className={`size-4 mr-1 ${crumb.color}`} />
              {crumb.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
