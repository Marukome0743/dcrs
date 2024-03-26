import { HomeIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

export function HomeBtn() {
  return (
    <Link href="/" className="btn btn-primary">
      <HomeIcon className="size-6" />
      ホームに戻る
    </Link>
  )
}
