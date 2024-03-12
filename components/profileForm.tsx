'use client'

import {
  CheckIcon,
  EnvelopeIcon,
  IdentificationIcon,
  PhoneIcon,
  PhotoIcon,
  UserIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid'
import Image from 'next/image'
import { useId, useState } from 'react'
import type React from 'react'
import {
  type SubmitHandler,
  type UseFormRegister,
  type UseFormUnregister,
  useForm,
} from 'react-hook-form'

type Profile = {
  name: string
  company: string
  employeeId: number
  phoneNumber: string
  mail: string
  image: FileList
}

export function ProfileForm() {
  const { register, handleSubmit, unregister } = useForm<Profile>()
  const onSubmit: SubmitHandler<Profile> = (data) => {
    alert(JSON.stringify(data, null, 2))
    // デモ版仮でlocalStorageに保存
    // ホントはAPI送信してDBに投げたい。
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('profile', JSON.stringify(data))
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-6 [&>labe:input]:w-80"
    >
      <label className="input input-bordered flex items-center gap-2">
        <UserIcon className="h-4 w-4 opacity-70" />
        <span className="label-text after:ml-0.5 after:text-red-500 after:content-['*']">
          氏名
        </span>
        <input
          type="text"
          className="grow"
          {...register('name', { required: true })}
          placeholder="オープン太郎"
          required={true}
        />
      </label>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text after:ml-0.5 after:text-red-500 after:content-['*']">
            所属会社
          </span>
        </div>
        <select
          className="select select-bordered w-full max-w-xs"
          {...register('company', { required: true })}
          required={true}
        >
          <option disabled selected>
            以下から１つ選択
          </option>
          <option value="株式会社オープンアップグループ">
            株式会社オープンアップグループ
          </option>
          <option value="株式会社ビーネックステクノロジーズ">
            株式会社ビーネックステクノロジーズ
          </option>
        </select>
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <IdentificationIcon className="h-4 w-4 opacity-70" />
        <span className="after:ml-0.5 after:text-red-500 after:content-['*']">
          社員番号
        </span>
        <input
          type="number"
          className="block w-80"
          placeholder="123456"
          {...register('employeeId', { required: true })}
          required={true}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <PhoneIcon className="h-4 w-4 opacity-70" />
        <span className="after:ml-0.5 after:text-red-500 after:content-['*']">
          電話番号
        </span>
        <input
          type="tel"
          className="block w-80"
          placeholder="09012345678"
          {...register('phoneNumber', { required: true })}
          required={true}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <EnvelopeIcon className="h-4 w-4 opacity-70" />
        <span className="after:ml-0.5 after:text-red-500 after:content-['*']">
          メールアドレス
        </span>
        <input
          type="email"
          className="block w-80"
          placeholder="example@mail.com"
          {...register('mail', { required: true })}
          required={true}
        />
      </label>
      <span className="after:ml-0.5 after:text-red-500 after:content-['*']">
        個人情報提供への同意
      </span>
      <label className="label cursor-pointer">
        <span className="label-text">同意する</span>
        <input type="checkbox" className="checkbox" required={true} />
      </label>
      <span className="after:ml-0.5 after:text-red-500 after:content-['*']">
        障がい者手帳の画像・写真
      </span>
      <ImageUpload register={register} unregister={unregister} />
      <button className="btn btn-warning" type="submit">
        <CheckIcon className="h-6 w-6" />
        確認画面へ
      </button>
    </form>
  )
}

function ImageUpload({
  register,
  unregister,
}: {
  register: UseFormRegister<Profile>
  unregister: UseFormUnregister<Profile>
}) {
  const imageId = useId()
  const [image, setImage] = useState<FileList | null>(null)

  function onClickCancel() {
    setImage(null)
    unregister('image')
  }

  return (
    <>
      {!image ? (
        <div className="mt-2 flex justify-center rounded-lg border border-gray-900/25 border-dashed px-6 py-10">
          <div className="text-center">
            <PhotoIcon
              className="mx-auto h-12 w-12 text-gray-300"
              aria-hidden="true"
            />
            <div className="mt-4 flex text-gray-600 text-sm leading-6">
              <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2">
                <span>アップロード</span>
                <input
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  id={imageId}
                  {...register('image', { required: true })}
                  alt="Upload Image"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setImage(e.target.files)
                  }
                  required={true}
                />
              </label>
              <p className="pl-1">又は、ドラッグ＆ドロップ</p>
            </div>
            <p className="text-gray-600 text-xs leading-5">
              PNG, JPG, GIF, WEBP のファイルを 1MB まで
            </p>
          </div>
        </div>
      ) : (
        <>
          <Image
            src={encodeURI(URL.createObjectURL(image[0]))}
            width={100}
            height={100}
            alt="Uploaded File"
            className="h-64 w-96 object-scale-down"
          />
          <button
            type="button"
            onClick={onClickCancel}
            className="btn btn-error"
          >
            <XMarkIcon className="h-6 w-6" />
            アップロードキャンセル
          </button>
        </>
      )}
    </>
  )
}
