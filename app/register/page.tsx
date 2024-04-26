import { Step } from '@/app/components/step'
import type React from 'react'
import { ProfileForm } from './components/profileForm'

export const STEP: string[] = ['必要情報の入力', '入力確認', '完了'] as const

export default function Register(): React.JSX.Element {
  return (
    <>
      <Step step={[...STEP]} targetStep={0} />
      <ProfileForm />
    </>
  )
}
