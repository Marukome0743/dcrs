import { Stepper } from "@/app/components/stepper"
import { STEPS } from "@/app/lib/constant"
import type React from "react"
import { ProfileForm } from "./components/profileForm"

export default function Register(): React.JSX.Element {
  return (
    <>
      <Stepper steps={[...STEPS]} targetStep={0} />
      <ProfileForm />
    </>
  )
}
