import { Stepper } from "@/app/components/stepper"
import type React from "react"
import { ProfileForm } from "./components/profileForm"

export default function Register(): React.JSX.Element {
  return (
    <>
      <Stepper targetStep={0} />
      <ProfileForm />
    </>
  )
}
