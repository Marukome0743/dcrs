import { Stepper } from "@/app/components/stepper"
import type { Steps } from "@/app/interfaces/steps"
import type React from "react"
import { ProfileForm } from "./components/profileForm"

export const STEPS: Steps = ["必要情報の入力", "入力確認", "完了"] as const

export default function Register(): React.JSX.Element {
  return (
    <>
      <Stepper steps={[...STEPS]} targetStep={0} />
      <ProfileForm />
    </>
  )
}
