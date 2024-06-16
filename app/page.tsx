import { STEPS } from "@/app/lib/constant"
import { getUsers } from "@/app/lib/getUsers"
import type { User } from "@/app/lib/schema"
import {
  CameraIcon,
  ForwardIcon,
  PlusIcon,
  TableCellsIcon,
} from "@heroicons/react/24/solid"
import Link from "next/link"
import type React from "react"
import { Suspense } from "react"

export const dynamic = "force-dynamic"

export default function Home(): React.JSX.Element {
  return (
    <>
      <h1 className="flex font-semibold items-center mx-auto text-center text-2xl w-fit">
        <ForwardIcon className="move-right mr-2 size-8 text-info" />
        登録手順
        <ForwardIcon className="move-right mx-2 size-8 text-info" />
      </h1>
      <ul className="timeline timeline-vertical lg:timeline-horizontal">
        {STEPS.map((step, index) => (
          <li key={step.name}>
            {0 < index && <hr />}
            <div className="timeline-start">{index + 1}</div>
            <div className="timeline-middle">
              <step.icon className={`size-5 ${step.color}`} />
            </div>
            <div className="timeline-end timeline-box">{step.name}</div>
            {index < STEPS.length - 1 && <hr />}
          </li>
        ))}
      </ul>
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
  const userData: { users: User[] } = await getUsers()

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
