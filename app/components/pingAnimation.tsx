import type React from 'react'

export function PingAnimation(): React.JSX.Element {
  return (
    <span className="indicator-item">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
      <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500" />
    </span>
  )
}
