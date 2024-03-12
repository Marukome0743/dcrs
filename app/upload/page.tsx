import { ProfileForm } from '@/components/profileForm'
import { HomeIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

export default function Upload() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 lg:px-8 sm:px-6">
      <h1 className="mb-3 font-semibold text-2xl">アップロードフォーム</h1>
      <span className="before:ml-0.5 before:text-red-500 before:content-['*']">
        は必須項目です
      </span>
      <br />
      <ProfileForm />
      <br />
      <br />
      <Link href="/" className="btn btn-primary">
        <HomeIcon className="h-6 w-6" />
        ホームに戻る
      </Link>
    </main>
  )
}
