import { HomeButton } from '@/app/components/homeButton'
import { Step } from '@/app/components/step'
import { STEP } from '@/app/upload/page'

export default function Success() {
  return (
    <>
      <Step step={STEP} targetStep={2} />
      <HomeButton />
    </>
  )
}
