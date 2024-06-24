import { PingAnimation } from "@/app/components/animation/pingAnimation"
import { Stepper } from "@/app/components/stepper"
import type { Profile } from "@/app/interfaces/profile"
import { CHECKLIST } from "@/app/lib/constant"
import {
  ArrowUturnLeftIcon,
  PaperAirplaneIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid"
import Image from "next/image"
import type React from "react"
import type { Path, UseFormWatch } from "react-hook-form"

export function ConfirmDialog({
  ref,
  watch,
  isSubmitting,
}: Readonly<{
  ref: React.RefObject<HTMLDialogElement>
  watch: UseFormWatch<Profile>
  isSubmitting: boolean
}>): React.JSX.Element {
  return (
    <dialog ref={ref} className="modal modal-bottom sm:modal-middle">
      <div className="grid gap-4 modal-box text-center">
        <button
          type="button"
          onClick={() => ref.current?.close()}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:scale-110"
          aria-label="閉じる"
        >
          <XMarkIcon />
        </button>
        <Stepper targetStep={1} />
        <table className="table">
          <tbody>
            {CHECKLIST.map(({ name, value }) => (
              <tr key={name}>
                <th>{value}</th>
                <td>
                  {name === "agreement" && "同意する"}
                  {name === "image" && watch(name as Path<Profile>) ? (
                    <Image
                      src={document.getElementsByTagName("img")[0].src}
                      width={100}
                      height={100}
                      alt="Uploaded File"
                      className="w-full"
                    />
                  ) : (
                    (watch(name as Path<Profile>) as string)
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="modal-action justify-center gap-4">
          <button
            type="submit"
            className={`btn btn-info ${
              isSubmitting ? "indicator" : "[&:not(:hover)]:animate-bounce"
            }`}
          >
            {isSubmitting && <PingAnimation />}
            <PaperAirplaneIcon className="size-6" />
            送信
          </button>
          <button
            type="button"
            className="btn btn-error hover:scale-110"
            onClick={() => ref.current?.close()}
          >
            <ArrowUturnLeftIcon className="size-6" />
            戻る
          </button>
        </div>
      </div>
      <div className="modal-backdrop">
        <button
          type="button"
          onClick={() => ref.current?.close()}
          aria-label="戻る"
        />
      </div>
    </dialog>
  )
}
