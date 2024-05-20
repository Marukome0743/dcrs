import { ExclamationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import type React from 'react'

export function Alert({
  message,
  setMessage,
}: {
  message: string
  setMessage: React.Dispatch<React.SetStateAction<string>>
}): React.JSX.Element {
  return (
    <div className="toast toast-top toast-center z-10">
      <div role="alert" className="alert alert-error shadow-lg">
        <ExclamationCircleIcon className="size-6 text-info" />
        <span>{message}</span>
        <button
          type="button"
          className="btn btn-sm flex-nowrap"
          onClick={() => setMessage('')}
        >
          <XMarkIcon className="size-6" />
          閉じる
        </button>
      </div>
    </div>
  )
}
