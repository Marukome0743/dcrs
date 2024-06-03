'use client'

import type { Alert } from '@/app/interfaces/alert'
import { FolderArrowDownIcon } from '@heroicons/react/24/solid'
import type React from 'react'
import { useContext } from 'react'
import { AlertContext } from './alertBox'

export function DownloadBtn(): React.JSX.Element {
  const setAlert: React.Dispatch<React.SetStateAction<Alert>> =
    useContext(AlertContext)

  function download(): void {
    const image: HTMLImageElement = document.getElementsByTagName('img')?.[0]
    const link: HTMLAnchorElement = document.createElement('a')
    link.href = image.src
    link.download = image.id
    link.click()

    setAlert({ eventType: 'success', message: 'ダウンロード成功！' })
  }

  return (
    <button
      type="button"
      onClick={download}
      className="[&:not(:hover)]:animate-bounce btn btn-secondary justify-self-end"
    >
      <FolderArrowDownIcon className="size-6" />
      ダウンロード
    </button>
  )
}
