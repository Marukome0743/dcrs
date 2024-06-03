import { getUsers } from '@/app/lib/getUsers'
import { CameraIcon, PlusIcon, TableCellsIcon } from '@heroicons/react/24/solid'
import type { User } from '@prisma/client'
import Link from 'next/link'
import type React from 'react'
import { Suspense } from 'react'

export const dynamic = 'force-dynamic'

export default function Home(): React.JSX.Element {
  return (
    <>
      <h1 className="text-center font-extrabold text-3xl leading-normal">
        障がい者手帳
        <br />
        登録システム
      </h1>
      <br />
      <Link href="/register" className="btn btn-primary hover:scale-110">
        <CameraIcon className="size-6" />
        障がい者手帳画像を提出
      </Link>
      <Link
        href="/users"
        className="indicator btn btn-secondary hover:scale-110"
      >
        <TableCellsIcon className="size-6" />
        登録データ一覧
        <Suspense
          fallback={<div className="indicator-item badge skeleton w-8" />}
        >
          <Badge />
        </Suspense>
      </Link>
    </>
  )
}

async function Badge(): Promise<React.JSX.Element> {
  const userData = (await getUsers()) as { users: User[] }

  return (
    <>
      {userData && userData.users.length > 0 && (
        <div className="indicator-item badge badge-warning">
          <PlusIcon className="size-4" />
          {userData.users.length}件
        </div>
      )}
    </>
  )
}
