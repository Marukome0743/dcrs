'use client'

import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import { type DragEvent, useId, useState } from 'react'
import type React from 'react'
import type {
  FieldValues,
  Path,
  UseFormRegister,
  UseFormUnregister,
} from 'react-hook-form'

export function ImageUploader<FormType extends FieldValues>({
  register,
  unregister,
  inputType,
}: {
  register: UseFormRegister<FormType>
  unregister: UseFormUnregister<FormType>
  inputType: Path<FormType>
}) {
  const imageId = useId()
  const [image, setImage] = useState<FileList | null>(null)

  function onClickCancel() {
    setImage(null)
    unregister(inputType)
  }

  return (
    <>
      {image ? (
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
      ) : (
        <DropImageZone setImage={setImage}>
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
                {...register(inputType, { required: true })}
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
        </DropImageZone>
      )}
    </>
  )
}

function DropImageZone({
  children,
  setImage,
}: {
  children: React.ReactNode
  setImage: React.Dispatch<React.SetStateAction<FileList | null>>
}) {
  const [isHoverd, setIsHoverd] = useState<boolean>(false)

  function onDragLeave(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    if (e.relatedTarget && e.currentTarget.contains(e.relatedTarget as Node))
      return
    setIsHoverd(false)
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setIsHoverd(false)
    setImage(e.dataTransfer.files)
  }

  return (
    <div
      onDragEnter={() => setIsHoverd(true)}
      onDragLeave={(e) => onDragLeave(e)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDrop(e)}
      className={`mt-2 justify-center rounded-lg border border-dashed px-6 py-10 text-center${
        isHoverd ? ' border-indigo-600' : ' border-gray-900/25'
      }`}
    >
      {children}
    </div>
  )
}
