'use client'

import {
  ArrowTopRightOnSquareIcon,
  CheckIcon,
  EnvelopeIcon,
  IdentificationIcon,
  PhoneIcon,
  UserIcon,
} from '@heroicons/react/24/solid'
import Link from 'next/link'
import type React from 'react'
import { useRef, useState } from 'react'
import { type Path, type UseFormRegister, useForm } from 'react-hook-form'
import { ConfirmDialog } from './confirmDialog'
import { ImageUploader } from './imageUploader'

type Profile = {
  name: string
  company: string
  employeeId: number
  telephone: string
  email: string
  image: FileList
}

const CHECKLIST = {
  name: '氏名',
  company: '所属会社',
  employeeId: '社員番号',
  telephone: '電話番号',
  email: 'Eメール',
  agreement: '個人情報提供への同意',
  image: '障がい者手帳の画像・写真',
} as const

const COMPANIES = [
  'オープンアップグループ',
  'ビーネックステクノロジーズ',
] as const

export function ProfileForm() {
  const { register, handleSubmit, unregister, getValues } = useForm<Profile>()
  const dialog = useRef<HTMLDialogElement>(null)
  const [imageSrc, setImageSrc] = useState<string>('')
  const onSubmit = handleSubmit(() => {
    setImageSrc(document.getElementsByTagName('img')?.[0]?.src || '')
    dialog.current?.showModal()
  })

  return (
    <>
      <form onSubmit={onSubmit} className="flex flex-col gap-6 max-w-xs">
        <p className="text-center before:ml-0.5 before:text-red-500 before:content-['*']">
          は必須項目
        </p>
        <Input
          icon=<UserIcon className="mr-2 size-4 opacity-70" />
          name="name"
          placeholder="オープン太郎"
          register={register}
          title={CHECKLIST.name}
          type="text"
        />
        <label className="form-control w-full">
          <div className="label">
            <p className="label-text after:ml-0.5 after:text-red-500 after:content-['*']">
              {CHECKLIST.company}
            </p>
          </div>
          <select
            className="select select-bordered"
            {...register('company', { required: true })}
            defaultValue={''}
            required={true}
          >
            <option value={''} disabled={true}>
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
          icon=<IdentificationIcon className="mr-2 size-4 opacity-70" />
          name="employeeId"
          placeholder="123456"
          register={register}
          title={CHECKLIST.employeeId}
          type="number"
        />
        <Input
          icon=<PhoneIcon className="mr-2 size-4 opacity-70" />
          name="telephone"
          placeholder="09012345678"
          register={register}
          title={CHECKLIST.telephone}
          type="tel"
        />
        <Input
          icon=<EnvelopeIcon className="mr-2 size-4 opacity-70" />
          name="email"
          placeholder="example@mail.com"
          register={register}
          title={CHECKLIST.email}
          type="email"
        />
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <p className="mb-2 after:ml-0.5 after:text-red-500 after:content-['*']">
              {CHECKLIST.agreement}
            </p>
            <Link
              href="https://www.openupgroup.co.jp/privacy-policy/"
              target="_blank"
              className="inline-flex items-center gap-1 self-center text-blue-600 underline underline-offset-4"
            >
              個人情報保護方針
              <ArrowTopRightOnSquareIcon className="size-4" />
            </Link>
            <label className="label cursor-pointer self-center">
              <span className="label-text mr-2">同意する</span>
              <input type="checkbox" className="checkbox" required={true} />
            </label>
          </div>
        </div>
        <p className="after:ml-0.5 after:text-red-500 after:content-['*']">
          {CHECKLIST.image}
        </p>
        <ImageUploader<Profile> register={register} unregister={unregister} />
        <button
          className="btn btn-warning w-max place-self-center"
          type="submit"
        >
          <CheckIcon className="size-6" />
          確認画面へ
        </button>
      </form>
      <ConfirmDialog<Profile>
        dialog={dialog}
        checkList={CHECKLIST}
        imageSrc={imageSrc}
        values={getValues()}
      />
    </>
  )
}

function Input({
  icon,
  name,
  placeholder,
  register,
  title,
  type,
}: {
  icon: React.ReactNode
  name: Path<Profile>
  placeholder: string
  register: UseFormRegister<Profile>
  title: string
  type: string
}): React.JSX.Element {
  return (
    <label className="input input-bordered flex flex-row items-center gap-2">
      <span className="flex flex-row items-center text-sm whitespace-nowrap after:ml-0.5 after:text-red-500 after:content-['*']">
        {icon}
        {title}
      </span>
      <input
        type={type}
        {...register(name, { required: true })}
        placeholder={placeholder}
        required={true}
      />
    </label>
  )
}
