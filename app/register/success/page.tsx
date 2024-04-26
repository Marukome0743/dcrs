import { Step } from '@/app/components/step'
import { STEPS } from '../page'

export default function Success() {
  return <Step steps={STEPS} targetStep={2} />
}
