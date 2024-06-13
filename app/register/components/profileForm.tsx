"use client"

import type { FormItem } from "@/app/interfaces/formItem"
import type { Profile } from "@/app/interfaces/profile"
import { CHECKLIST } from "@/app/lib/constant"
import { CheckIcon } from "@heroicons/react/24/solid"
import type React from "react"
import { useRef } from "react"
import { type Path, type UseFormRegister, useForm } from "react-hook-form"
import { ConfirmDialog } from "./confirmDialog"
import { ImageUploader } from "./imageUploader"

const COMPANIES: string[] = [
  "オープンアップグループ",
  "ビーネックステクノロジーズ",
] as const

export function ProfileForm(): React.JSX.Element {
  const { handleSubmit, register, unregister, watch } = useForm<Profile>()
  const dialog = useRef<HTMLDialogElement>(null)
  const onSubmit: React.FormEventHandler<HTMLFormElement> = handleSubmit(() => {
    dialog.current?.showModal()
  })

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6 max-w-xs">
      <p className="text-center before:ml-0.5 before:text-red-500 before:content-['*']">
        は必須項目
      </p>
      <Input
        item={CHECKLIST.find((item) => item.name === "name") as FormItem}
        register={register}
      />
      <label className="form-control w-full">
        <div className="label">
          <p className="label-text after:ml-0.5 after:text-red-500 after:content-['*']">
            {CHECKLIST.find((item) => item.name === "company")?.value}
          </p>
        </div>
        <select
          className="select select-bordered"
          {...register("company", { required: true })}
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
        item={CHECKLIST.find((item) => item.name === "employeeId") as FormItem}
        register={register}
      />
      <Input
        item={CHECKLIST.find((item) => item.name === "telephone") as FormItem}
        register={register}
      />
      <Input
        item={CHECKLIST.find((item) => item.name === "email") as FormItem}
        register={register}
      />
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body overflow-y-auto max-h-72">
          <p className="mb-2 after:ml-0.5 after:text-red-500 after:content-['*']">
            {CHECKLIST.find((item) => item.name === "agreement")?.value}
          </p>
          <p className="text-sm whitespace-pre">
            {
              "お預かりした個人情報は、\n株式会社オープンアップグループ\n（以下「当社」）が業務に利用するほか、\n当社のグループ企業において、\n以下の利用目的で共同利用します。\n\n共同利用についての公表事項及び\n共同利用者の範囲に含まれる\nグループ企業の一覧は、\n以下の個人情報保護方針の\n記載をご覧下さい。\n\n株式会社オープンアップグループは、\n提供頂いた個人情報を法令及び\n個人情報保護方針に従って\n安全且つ適切に取り扱います。\n\n個人情報に関する問い合わせ・\n請求方法等につきましては、\n「個人情報について」をご覧下さい。\n\n上記の内容について同意頂ける方は、\n以下の「同意する」にチェックを\nお願い致します。\n"
            }
          </p>
          <label className="label cursor-pointer self-center">
            <span className="label-text mr-2">同意する</span>
            <input type="checkbox" className="checkbox" required={true} />
          </label>
        </div>
      </div>
      <p className="after:ml-0.5 after:text-red-500 after:content-['*']">
        {CHECKLIST.find((item) => item.name === "image")?.value}
      </p>
      <ImageUploader register={register} unregister={unregister} />
      <button
        className="[&:not(:hover)]:animate-bounce btn btn-warning w-max place-self-center"
        type="submit"
      >
        <CheckIcon className="size-6" />
        確認画面へ
      </button>
      <ConfirmDialog dialog={dialog} watch={watch} />
    </form>
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
