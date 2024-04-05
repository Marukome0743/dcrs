import { Step } from '@/app/components/step'
import type { Checklist } from '@/app/interfaces/checklist'
import type { Profile } from '@/app/interfaces/profile'
import { getServerUrl } from '@/app/lib/s3'
import { CvtDataUrl2File } from '@/app/register/components/cvtDataUrl2File'
import {
  ArrowUturnLeftIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/solid'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import type React from 'react'
import type { Path } from 'react-hook-form'
import { STEP } from '../page'

export function ConfirmDialog({
  checkList,
  dialog,
  imageSrc,
  fileType,
  extention,
  values,
}: {
  checkList: Checklist[]
  dialog: React.RefObject<HTMLDialogElement>
  imageSrc: string
  fileType: string
  extention: string
  values: Profile
}) {
  const router = useRouter()

  async function onSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.currentTarget.disabled = true
    event.currentTarget.innerHTML =
      '<span class="loading loading-ring loading-lg"></span>送信中...'

    const fileName = `${crypto.randomUUID()}.${extention}`
    const file = await CvtDataUrl2File(imageSrc, fileName)
    const url = await getServerUrl(fileName)

    await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': fileType,
        'Content-Disposition': `attachment; filename=${fileName}`,
      },
      body: file,
    })
      .catch((error) => {
        alert(error)
        return
      })
      .then((res) => {
        if (!res) {
          alert('送信に失敗しました')
        } else if (res.ok) {
          // values.image[0] からファイル取得困難のためdbdataにs3に保存したファイル名を押し込む。
          const dbdata = Object.assign(values, { fileName: fileName })
          fetch('/api/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dbdata),
          })
            .then((res) => {
              if (!res.ok) {
                // DB登録失敗時の画像削除処理は未実装
                alert(res.statusText)
                return
              }
              router.push('/register/success')
            })
            .catch((error) => {
              // DB登録失敗時の画像削除処理は未実装
              alert(error)
            })
        } else {
          // DB登録失敗時の画像削除処理は未実装
          alert(res.statusText)
          return
        }
      })
  }

  return (
    <dialog ref={dialog} className="modal modal-bottom sm:modal-middle">
      <div className="grid gap-4 modal-box text-center">
        <Step step={STEP} targetStep={1} />
        <table className="table">
          <tbody>
            {checkList.map(({ name, value }) => (
              <tr key={name}>
                <th>{value}</th>
                <td>
                  {name === 'agreement' && '同意する'}
                  {name === 'image' && imageSrc ? (
                    <Image
                      src={imageSrc}
                      width={100}
                      height={100}
                      alt="Uploaded File"
                      className="w-full"
                    />
                  ) : (
                    (values[name as Path<Profile>] as string)
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="modal-action justify-center gap-4">
          <button type="submit" className="btn btn-info" onClick={onSubmit}>
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
        <button type="button" onClick={() => dialog.current?.close()} />
      </div>
    </dialog>
  )
}
