"use client"

import { AlertContext } from "@/app/components/alertBox"
import type { Profile } from "@/app/interfaces/profile"
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import { type DragEvent, useContext, useRef, useState } from "react"
import type React from "react"
import type { Path, UseFormRegister, UseFormUnregister } from "react-hook-form"

const MAX_UPLOAD_SIZE: number = 5 * 1024 * 1024
const ACCEPTED_IMAGE_TYPES: string[] = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]

export function ImageUploader({
  register,
  unregister,
}: {
  register: UseFormRegister<Profile>
  unregister: UseFormUnregister<Profile>
}): React.JSX.Element {
  const { ref, onChange, ...rest } = register("image" as Path<Profile>, {
    required: true,
  })
  const setAlert = useContext(AlertContext)
  const inputRef = useRef<HTMLInputElement>()
  const [image, setImage] = useState<FileList>()

  function validateFile(file: File): string {
    if (file.size > MAX_UPLOAD_SIZE) {
      return "ファイルサイズは最大5MBです"
    }
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      return "不正なファイル形式です"
    }
    return ""
  }

  function onUpload(e: React.ChangeEvent<HTMLInputElement>): void {
    const result = validateFile(e.target.files?.[0] as File)
    if (result) {
      onUploadCancel("error", result)
      return
    }
    setImage(e.target.files as FileList)
  }

  function onUploadCancel(eventType: string, message: string): void {
    const ref = inputRef as React.MutableRefObject<HTMLInputElement>
    ref.current.value = ""
    setImage(undefined)
    unregister("image" as Path<Profile>)
    setAlert({
      eventType: eventType,
      message: message,
    })
  }

  return (
    <>
      {image?.[0] && (
        <Image
          src={encodeURI(URL.createObjectURL(image[0]))}
          width={100}
          height={100}
          alt="Uploaded File"
          className="w-full"
        />
      )}
      <DropImageZone
        image={image as FileList}
        inputRef={inputRef as React.MutableRefObject<HTMLInputElement>}
      >
        <PhotoIcon
          className="mx-auto size-12 text-gray-300"
          aria-hidden="true"
        />
        <div className="mt-4 flex text-gray-600 text-sm leading-6">
          <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2">
            <span>アップロード</span>
            <input
              type="file"
              className="sr-only"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  onChange(e)
                  onUpload(e)
                }
              }}
              ref={(element) => {
                ref(element)
                inputRef.current = element as HTMLInputElement
              }}
              {...rest}
              alt="Upload Image"
              required={true}
            />
          </label>
          <p className="pl-1">又は、ドラッグ＆ドロップ</p>
        </div>
        <p className="text-gray-600 text-xs leading-5">
          JPEG, JPG, PNG, WEBP のファイルを 5MB まで
        </p>
      </DropImageZone>
      <button
        type="button"
        onClick={() => onUploadCancel("success", "キャンセルしました")}
        className="btn btn-error w-max place-self-center hover:scale-110"
        disabled={!image}
      >
        <XMarkIcon className="size-6" />
        アップロードキャンセル
      </button>
    </>
  )
}

function DropImageZone({
  children,
  image,
  inputRef,
}: {
  children: React.ReactNode
  image: FileList
  inputRef: React.MutableRefObject<HTMLInputElement>
}): React.JSX.Element {
  const [isHoverd, setIsHoverd] = useState<boolean>(false)

  function onDragLeave(e: DragEvent<HTMLDivElement>): void {
    e.preventDefault()
    if (e.relatedTarget && e.currentTarget.contains(e.relatedTarget as Node)) {
      return
    }
    setIsHoverd(false)
  }

  function onDrop(e: DragEvent<HTMLDivElement>): void {
    e.preventDefault()
    setIsHoverd(false)

    inputRef.current.files = e.dataTransfer.files
    inputRef.current.dispatchEvent(new Event("change", { bubbles: true }))
  }

  return (
    <div
      onDragEnter={() => setIsHoverd(true)}
      onDragLeave={(e) => onDragLeave(e)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDrop(e)}
      className={`mt-2 justify-center rounded-lg border border-dashed px-6 py-10 text-center${
        isHoverd ? " border-indigo-600" : " border-gray-900/25"
      }`}
      hidden={!!image}
    >
      {children}
    </div>
  )
}
