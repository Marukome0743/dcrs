import { PingAnimation } from '@/app/components/pingAnimation'
import { Stepper } from '@/app/components/stepper'
import type { FormItem } from '@/app/interfaces/formItem'
import type { Profile } from '@/app/interfaces/profile'
import {
  ArrowUturnLeftIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/solid'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import type React from 'react'
import { useState } from 'react'
import type { Path, UseFormWatch } from 'react-hook-form'
import { STEPS } from '../page'

export function ConfirmDialog({
  checkList,
  dialog,
  watch,
  setError,
}: {
  checkList: FormItem[]
  dialog: React.RefObject<HTMLDialogElement>
  watch: UseFormWatch<Profile>
  setError: React.Dispatch<React.SetStateAction<string>>
}): React.JSX.Element {
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()

  async function onSubmit(): Promise<void> {
    setIsPending(true)
    const formElement = document.querySelector('form') as HTMLFormElement
    const formData: FormData = new FormData(formElement)

    fetch('/api/users', {
      method: 'POST',
      body: formData,
    })
      .then((res) => {
        dialog.current?.close()
        if (!res.ok) {
          setError(res.statusText)
          setIsPending(false)
          return
        }
        router.push('/register/success')
      })
      .catch((error) => {
        dialog.current?.close()
        setError(error)
        setIsPending(false)
      })
  }

  return (
    <dialog ref={dialog} className="modal modal-bottom sm:modal-middle">
      <div className="grid gap-4 modal-box text-center">
        <Stepper steps={[...STEPS]} targetStep={1} />
        <table className="table">
          <tbody>
            {checkList.map(({ name, value }) => (
              <tr key={name}>
                <th>{value}</th>
                <td>
                  {name === 'agreement' && '同意する'}
                  {name === 'image' && watch(name as Path<Profile>) ? (
                    <Image
                      src={document.getElementsByTagName('img')[0].src}
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
              isPending ? 'indicator' : 'animate-bounce'
            }`}
            onClick={onSubmit}
            disabled={isPending}
          >
            {isPending && <PingAnimation />}
            <PaperAirplaneIcon className="size-6" />
            送信
          </button>
          <button
            type="button"
            className="btn btn-error"
            onClick={() => dialog.current?.close()}
          >
            <ArrowUturnLeftIcon className="size-6" />
            戻る
          </button>
        </div>
      </div>
      <div className="modal-backdrop">
        <button
          type="button"
          onClick={() => dialog.current?.close()}
          aria-label="戻る"
        />
      </div>
    </dialog>
  )
}
