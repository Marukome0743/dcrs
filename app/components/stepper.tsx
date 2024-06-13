import { STEPS } from "@/app/lib/constant"
import type React from "react"

export function Stepper({
  targetStep,
}: { targetStep: number }): React.JSX.Element {
  return (
    <>
      <ul className="steps">
        {STEPS.map((step, index) => (
          <li
            key={step.name}
            className={`step${index <= targetStep ? " step-primary" : ""}`}
          >
            {step.name}
          </li>
        ))}
      </ul>
      <h1 className="font-semibold text-2xl">{STEPS[targetStep].name}</h1>
    </>
  )
}
