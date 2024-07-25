"use client"

import { DownloadBtn } from "@/app/components/button/downloadBtn"
import { XMarkIcon } from "@heroicons/react/24/solid"
import { useRouter } from "next/navigation"
import {
  type JSX,
  type ReactNode,
  type RefObject,
  useEffect,
  useRef,
} from "react"

export function Modal({
  children,
}: Readonly<{ children: ReactNode }>): JSX.Element {
  const router = useRouter()
  const dialogRef: RefObject<HTMLDialogElement> =
    useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal()
    }
  })

  return (
    <dialog ref={dialogRef} className="modal" onClose={router.back}>
      <div className="modal-box">
        <button
          type="button"
          onClick={router.back}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:scale-110"
          aria-label="閉じる"
        >
          <XMarkIcon className="size-7" />
        </button>
        <div className="grid gap-4 text-center">{children}</div>
        <div className="modal-action">
          <div className="flex gap-4 justify-end">
            <DownloadBtn />
            <button
              type="button"
              onClick={router.back}
              className="btn hover:scale-110"
            >
              <XMarkIcon className="size-6" />
              閉じる
            </button>
          </div>
        </div>
      </div>
    </dialog>
  )
}
