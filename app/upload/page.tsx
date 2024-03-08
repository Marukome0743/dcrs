import { ProfileForm } from '@/components/profileForm'
import Link from 'next/link'

export default function Upload() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="mb-3 text-2xl font-semibold">アップロードフォーム</h1>
      <span className="before:content-['*'] before:ml-0.5 before:text-red-500">
        は必須項目です
      </span>
      <ProfileForm />
      <br />
      <Link
        href="/"
        className="group relative w-1/8 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        ホームに戻る
      </Link>
    </main>
  )
}
