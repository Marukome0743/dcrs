export function Step({
  step,
  targetStep,
}: { step: string[]; targetStep: number }) {
  return (
    <>
      <ul className="steps mb-8">
        {step.map((step, index) => (
          <li
            key={step}
            className={`step${index <= targetStep ? ' step-primary' : ''}`}
          >
            {step}
          </li>
        ))}
      </ul>
      <h1 className="mb-3 font-semibold text-2xl">{step[targetStep]}</h1>
    </>
  )
}
