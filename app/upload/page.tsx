import { ProfileForm } from '@/components/profileForm'
import { Step } from '@/components/step'
import { HomeIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

const STEP = ['必要情報の入力', '入力確認', '完了']

export default function Upload() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 lg:px-8 sm:px-6">
      <Step step={STEP} targetStep={0} />
      <ProfileForm>
        <Step step={STEP} targetStep={1} />
      </ProfileForm>
      <br />
      <br />
      <Link href="/" className="btn btn-primary">
        <HomeIcon className="h-6 w-6" />
        ホームに戻る
      </Link>
    </main>
  )
}
