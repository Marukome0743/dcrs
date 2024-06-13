import { Stepper } from "@/app/components/stepper"
import { STEPS } from "@/app/lib/constant"
import type React from "react"

export default function Success(): React.JSX.Element {
  return <Stepper steps={[...STEPS]} targetStep={2} />
}
