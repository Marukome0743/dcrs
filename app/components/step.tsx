export function Step({
  step,
  targetStep,
}: { step: string[]; targetStep: number }) {
  return (
    <>
      <ul className="steps">
        {step.map((step, index) => (
          <li
            key={step}
            className={`step${index <= targetStep ? ' step-primary' : ''}`}
          >
            {step}
          </li>
        ))}
      </ul>
      <h1 className="font-semibold text-2xl">{step[targetStep]}</h1>
    </>
  )
}
