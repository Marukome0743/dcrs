import { Stepper } from "@/app/components/stepper"
import type React from "react"
import { STEPS } from "../page"

export default function Success(): React.JSX.Element {
  return <Stepper steps={[...STEPS]} targetStep={2} />
}
