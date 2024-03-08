'use client'

import { useEffect, useId, useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'

type Profile = {
  name: string
  company: string
  employeeId: number
  phoneNumber: string
  mail: string
  image: FileList | null
}

export function ProfileForm() {
  const imageInputId = useId()
  const [image, setImage] = useState<FileList | null>(null)
  const [imageUrl, setImageUrl] = useState<string>('')

  useEffect(() => {
    if (image?.[0]) {
      setImageUrl(URL.createObjectURL(image[0]))
    }
  }, [image?.[0]])

  const { register, handleSubmit } = useForm<Profile>()

  const onSubmit: SubmitHandler<Profile> = (data) => {
    alert(JSON.stringify(data, null, 2))
    // デモ版仮でlocalStorageに保存
    // ホントはAPI送信してDBに投げたい。
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('profile', JSON.stringify(data))
    }
  }

  function handleClickCancel() {
    setImage(null)
    setImageUrl('')
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-6 [&>labe:input]:w-80"
    >
      <label className="block">
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
          お名前
        </span>
        <input
          className="block w-80"
          {...register('name')}
          placeholder="オープン太郎"
          required={true}
        />
      </label>
      <label className="block">
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
          所属会社
        </span>
        <select
          className="block w-80"
          defaultValue={''}
          {...register('company')}
          required={true}
        >
          <option value="" disabled>
            以下から選択して下さい。
          </option>
          <option value="株式会社オープンアップグループ">
            株式会社オープンアップグループ
          </option>
          <option value="株式会社ビーネックステクノロジーズ">
            株式会社ビーネックステクノロジーズ
          </option>
        </select>
      </label>
      <label className="block">
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
          社員番号
        </span>
        <input
          className="block w-80"
          placeholder="123456"
          {...register('employeeId')}
          required={true}
        />
      </label>
      <label className="block">
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
          連絡可能な個人電話番号
        </span>
        <input
          className="block w-80"
          placeholder="090-1234-5678"
          {...register('phoneNumber')}
          required={true}
        />
      </label>
      <label className="block">
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
          メールアドレス
        </span>
        <input
          className="block w-80"
          placeholder="example@mail.com"
          {...register('mail')}
          required={true}
        />
      </label>
      <label className="block">
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
          個人情報提供への同意
        </span>
        <br />
        同意する
        <input type="checkbox" required={true} />
      </label>

      {!(imageUrl || image) && (
        <label
          className="mb-5"
          style={{
            border: 'white 3px dotted',
            display: 'flex',
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            cursor: 'pointer',
          }}
        >
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500">
            画像をアップロードする
          </span>
          <input
            className="w-1 h-1 opacity-0"
            type="file"
            accept="image/*"
            id={imageInputId}
            {...register('image')}
            alt="Upload Image"
            onChange={(e) => {
              if (e.target.files) {
                setImage(e.target.files)
              }
            }}
            required={true}
          />
        </label>
      )}

      {imageUrl && image && (
        <img
          src={imageUrl}
          alt="Uploaded File"
          className="object-scale-down h-64 w-96"
        />
      )}

      {imageUrl && image && (
        <button
          type="button"
          onClick={handleClickCancel}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mr-2"
        >
          × アップロードキャンセル
        </button>
      )}

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        type="submit"
      >
        確認画面へ
      </button>
    </form>
  )
}
