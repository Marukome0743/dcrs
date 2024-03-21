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
  '株式会社オープンアップグループ',
  '株式会社ビーネックステクノロジーズ',
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
      <form onSubmit={onSubmit} className="grid gap-6">
        <p className="text-center before:ml-0.5 before:text-red-500 before:content-['*']">
          は必須項目
        </p>
        <Input
          Icon={UserIcon}
          name="name"
          placeholder="オープン太郎"
          register={register}
          title={CHECKLIST.name}
          type="text"
        />
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <p className="label-text after:ml-0.5 after:text-red-500 after:content-['*']">
              {CHECKLIST.company}
            </p>
          </div>
          <select
            className="select select-bordered w-full max-w-xs"
            {...register('company', { required: true })}
            defaultValue={''}
            required={true}
          >
            <option value={''} disabled>
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
          Icon={IdentificationIcon}
          name="employeeId"
          placeholder="123456"
          register={register}
          title={CHECKLIST.employeeId}
          type="number"
        />
        <Input
          Icon={PhoneIcon}
          name="telephone"
          placeholder="09012345678"
          register={register}
          title={CHECKLIST.telephone}
          type="tel"
        />
        <Input
          Icon={EnvelopeIcon}
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
              <ArrowTopRightOnSquareIcon className="h-4 w-4" />
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
          <CheckIcon className="h-6 w-6" />
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
  Icon,
  name,
  placeholder,
  register,
  title,
  type,
}: {
  Icon: React.ElementType
  name: Path<Profile>
  placeholder: string
  register: UseFormRegister<Profile>
  title: string
  type: string
}) {
  return (
    <label className="input input-bordered flex items-center gap-2">
      <Icon className="h-4 w-4 opacity-70" />
      <span className="label-text after:ml-0.5 after:text-red-500 after:content-['*']">
        {title}
      </span>
      <input
        type={type}
        className="grow"
        {...register(name, { required: true })}
        placeholder={placeholder}
        required={true}
      />
    </label>
  )
}
