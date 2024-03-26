import Link from 'next/link'

export default function Home() {
  return (
    <>
      <h1 className="text-center font-extrabold text-3xl leading-normal">
        障がい者手帳
        <br />
        登録システム
      </h1>
      <Link href="/register" className="btn btn-primary">
        障がい者手帳画像を提出
      </Link>
      <Link href="/users" className="btn btn-secondary">
        登録データ一覧
      </Link>
    </>
  )
}
