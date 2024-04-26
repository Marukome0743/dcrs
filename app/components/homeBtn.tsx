import { HomeIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import type React from 'react'

export function HomeBtn(): React.JSX.Element {
  return (
    <Link href="/" className="btn btn-primary">
      <HomeIcon className="size-6" />
      ホームに戻る
    </Link>
  )
}
