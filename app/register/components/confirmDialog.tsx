import { Step } from '@/app/components/step'
import {
  ArrowUturnLeftIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/solid'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import type React from 'react'
import type { FieldValues } from 'react-hook-form'
import { STEP } from '../page'

export function ConfirmDialog<FormType extends FieldValues>({
  checkList,
  dialog,
  imageSrc,
  values,
}: {
  checkList: {
    [key: string]: string
  }
  dialog: React.RefObject<HTMLDialogElement>
  imageSrc: string
  values: FormType
}) {
  const router = useRouter()
  function onSubmit() {
    router.push('/register/success')
  }

  return (
    <dialog ref={dialog} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box text-center">
        <Step step={STEP} targetStep={1} />
        <div className="overflow-x-auto">
          <table className="table">
            <tbody>
              {Object.entries(checkList).map(([key, value]) => (
                <tr key={key}>
                  <th>{value}</th>
                  <td>
                    {key === 'agreement' && '同意する'}
                    {key === 'image' && imageSrc ? (
                      <Image
                        src={imageSrc}
                        width={100}
                        height={100}
                        alt="Uploaded File"
                        className="h-64 w-96 object-scale-down"
                      />
                    ) : (
                      values[key]
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="modal-action justify-center gap-4">
          <button type="submit" className="btn btn-info" onClick={onSubmit}>
            <PaperAirplaneIcon className="h-6 w-6" />
            送信
          </button>
          <button
            type="button"
            className="btn btn-error"
            onClick={() => dialog.current?.close()}
          >
            <ArrowUturnLeftIcon className="h-6 w-6" />
            戻る
          </button>
        </div>
      </div>
      <div className="modal-backdrop">
        <button type="button" onClick={() => dialog.current?.close()} />
      </div>
    </dialog>
  )
}
