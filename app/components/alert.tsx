import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import type React from 'react'

export function Alert({
  eventType,
  message,
  setMessage,
}: {
  eventType: string
  message: string
  setMessage: React.Dispatch<
    React.SetStateAction<{ eventType: string; message: string }>
  >
}): React.JSX.Element {
  return (
    <div className="toast toast-top toast-center z-10">
      <div
        role="alert"
        className={`alert shadow-lg ${
          eventType === 'error' ? 'alert-error' : 'alert-info'
        }`}
      >
        {eventType === 'error' ? (
          <ExclamationCircleIcon className="size-6 text-info" />
        ) : (
          <CheckCircleIcon className="size-6 text-warning" />
        )}
        <span>{message}</span>
        <button
          type="button"
          className="btn btn-sm flex-nowrap"
          onClick={() => setMessage({ eventType: '', message: '' })}
        >
          <XMarkIcon className="size-6" />
          閉じる
        </button>
      </div>
    </div>
  )
}
