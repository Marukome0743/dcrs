import { CameraIcon, TableCellsIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <h1 className="text-center font-extrabold text-3xl leading-normal">
        障がい者手帳
        <br />
        登録システム
      </h1>
      <br />
      <Link href="/register" className="btn btn-primary">
        <CameraIcon className="size-6" />
        障がい者手帳画像を提出
      </Link>
      <Link href="/users" className="btn btn-secondary">
        <TableCellsIcon className="size-6" />
        登録データ一覧
      </Link>
    </>
  )
}
