'use client'

import { Alert } from '@/app/components/alert'
import type { FormItem } from '@/app/interfaces/formItem'
import type { Profile } from '@/app/interfaces/profile'
import {
  CheckIcon,
  EnvelopeIcon,
  IdentificationIcon,
  PhoneIcon,
  UserIcon,
} from '@heroicons/react/24/solid'
import type React from 'react'
import { useRef, useState } from 'react'
import { type Path, type UseFormRegister, useForm } from 'react-hook-form'
import { ConfirmDialog } from './confirmDialog'
import { ImageUploader } from './imageUploader'

const checklist: FormItem[] = [
  {
    name: 'name',
    value: '氏名',
    type: 'text',
    icon: UserIcon,
    placeholder: 'オープン太郎',
  },
  {
    name: 'company',
    value: '所属会社',
    type: 'select',
  },
  {
    name: 'employeeId',
    value: '社員番号',
    type: 'number',
    icon: IdentificationIcon,
    placeholder: '123456',
  },
  {
    name: 'telephone',
    value: '電話番号',
    type: 'tel',
    icon: PhoneIcon,
    placeholder: '09012345678',
  },
  {
    name: 'email',
    value: 'Eメール',
    type: 'email',
    icon: EnvelopeIcon,
    placeholder: 'example@mail.com',
  },
  {
    name: 'agreement',
    value: '個人情報提供への同意',
    type: 'checkbox',
  },
  {
    name: 'image',
    value: '障がい者手帳の画像・写真',
    type: 'file',
  },
] as const

const COMPANIES: string[] = [
  'オープンアップグループ',
  'ビーネックステクノロジーズ',
] as const

export function ProfileForm(): React.JSX.Element {
  const { handleSubmit, register, unregister, watch } = useForm<Profile>()
  const [alert, setAlert] = useState<{ eventType: string; message: string }>({
    eventType: '',
    message: '',
  })
  const dialog = useRef<HTMLDialogElement>(null)
  const onSubmit: React.FormEventHandler<HTMLFormElement> = handleSubmit(() => {
    dialog.current?.showModal()
  })

  return (
    <>
      {alert.eventType && alert.message && (
        <Alert
          eventType={alert.eventType}
          message={alert.message}
          setMessage={setAlert}
        />
      )}
      <form onSubmit={onSubmit} className="flex flex-col gap-6 max-w-xs">
        <p className="text-center before:ml-0.5 before:text-red-500 before:content-['*']">
          は必須項目
        </p>
        <Input
          item={checklist.find((item) => item.name === 'name') as FormItem}
          register={register}
        />
        <label className="form-control w-full">
          <div className="label">
            <p className="label-text after:ml-0.5 after:text-red-500 after:content-['*']">
              {checklist.find((item) => item.name === 'company')?.value}
            </p>
          </div>
          <select
            className="select select-bordered"
            {...register('company', { required: true })}
            defaultValue=""
            required={true}
          >
            <option value="" disabled={true}>
              以下から１つ選択
            </option>
            {COMPANIES.map((company) => (
              <option key={company} value={company}>
                {company}
              </option>
            ))}
          </select>
        </label>
        <Input
          item={
            checklist.find((item) => item.name === 'employeeId') as FormItem
          }
          register={register}
        />
        <Input
          item={checklist.find((item) => item.name === 'telephone') as FormItem}
          register={register}
        />
        <Input
          item={checklist.find((item) => item.name === 'email') as FormItem}
          register={register}
        />
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body overflow-y-auto max-h-72">
            <p className="mb-2 after:ml-0.5 after:text-red-500 after:content-['*']">
              {checklist.find((item) => item.name === 'agreement')?.value}
            </p>
            <p className="text-sm">
              お預かりした個人情報は、株式会社オープンアップグループ（以下「当社」）が業務に利用するほか、
              当社のグループ企業において、以下の利用目的で共同利用します。
              <br />
              共同利用についての公表事項及び共同利用者の範囲に含まれるグループ企業の一覧は、
              以下の個人情報保護方針の記載をご覧下さい。
              <br />
              株式会社オープンアップグループは、提供頂いた個人情報を法令及び個人情報保護方針に従って
              安全且つ適切に取り扱います。
              <br />
              個人情報に関する問い合わせ・請求方法等につきましては、「個人情報について」をご覧下さい。
              <br />
              上記の内容について同意頂ける方は、以下の「同意する」にチェックをお願い致します。
            </p>
            <label className="label cursor-pointer self-center">
              <span className="label-text mr-2">同意する</span>
              <input type="checkbox" className="checkbox" required={true} />
            </label>
          </div>
        </div>
        <p className="after:ml-0.5 after:text-red-500 after:content-['*']">
          {checklist.find((item) => item.name === 'image')?.value}
        </p>
        <ImageUploader
          register={register}
          unregister={unregister}
          setAlert={setAlert}
        />
        <button
          className="animate-bounce btn btn-warning w-max place-self-center"
          type="submit"
        >
          <CheckIcon className="size-6" />
          確認画面へ
        </button>
      </form>
      <ConfirmDialog
        dialog={dialog}
        checkList={[...checklist]}
        watch={watch}
        setAlert={setAlert}
      />
    </>
  )
}

function Input({
  item,
  register,
}: {
  item: FormItem
  register: UseFormRegister<Profile>
}): React.JSX.Element {
  const Icon = item.icon as React.ElementType

  return (
    <label className="input input-bordered flex flex-row items-center gap-2">
      <span className="flex flex-row items-center text-sm whitespace-nowrap after:ml-0.5 after:text-red-500 after:content-['*']">
        <Icon className="mr-2 size-4 opacity-70" />
        {item.value}
      </span>
      <input
        type={item.type}
        {...register(item.name as Path<Profile>, { required: true })}
        placeholder={item.placeholder}
        required={true}
      />
    </label>
  )
}
