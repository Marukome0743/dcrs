import { DownloadBtn } from "@/app/components/button/downloadBtn"
import { DcrsImage } from "@/app/components/dcrsImage"
import { Breadcrumb } from "@/app/components/layout/breadcrumb"
import type { SiteLink } from "@/app/interfaces/siteLink"
import { usersLink } from "@/app/users/page"
import { ArrowUturnLeftIcon, PhotoIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import type React from "react"
import { Suspense } from "react"

export default function ImagePage({
  params: { key },
}: Readonly<{
  params: { key: string }
}>): React.JSX.Element {
  const imageLink: SiteLink = {
    name: key,
    href: "",
    icon: PhotoIcon,
    color: "text-accent",
  }

  return (
    <>
      <Breadcrumb crumbs={[usersLink, imageLink]} />
      <Suspense fallback={<Skelton />}>
        <DcrsImage path={key} />
      </Suspense>
      <DownloadBtn />
      <Link href="/users" className="btn hover:scale-110">
        <ArrowUturnLeftIcon className="size-6 rotate-z" />
        表に戻る
      </Link>
    </>
  )
}

function Skelton(): React.JSX.Element {
  return (
    <>
      <h1>
        <p className="skeleton h-6 w-32" />
      </h1>
      <div className="skeleton h-80 w-full max-w-lg" />
    </>
  )
}
