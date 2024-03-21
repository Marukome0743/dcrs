import { Step } from '@/app/components/step'
import { ProfileForm } from '@/app/register/components/profileForm'

export const STEP = ['必要情報の入力', '入力確認', '完了']

export default function Upload() {
  return (
    <>
      <Step step={STEP} targetStep={0} />
      <ProfileForm />
      <br />
    </>
  )
}
