"use client"

import { AlertContext } from "@/app/components/layout//alertBox"
import type { Alert } from "@/app/interfaces/alert"
import { FolderArrowDownIcon } from "@heroicons/react/24/solid"
import type React from "react"
import { type Dispatch, type SetStateAction, useContext } from "react"

export function DownloadBtn(): React.JSX.Element {
  const setAlert: Dispatch<SetStateAction<Alert>> = useContext(AlertContext)

  function download(): void {
    const image: HTMLImageElement = document.getElementsByTagName("img")?.[0]
    const link: HTMLAnchorElement = document.createElement("a")
    link.href = image.src
    link.download = image.id
    link.click()

    setAlert({ eventType: "success", message: "ダウンロード成功！" })
  }

  return (
    <button
      type="button"
      onClick={download}
      className="[&:not(:hover)]:animate-bounce btn btn-secondary max-w-fit mx-auto"
    >
      <FolderArrowDownIcon className="size-6" />
      ダウンロード
    </button>
  )
}
