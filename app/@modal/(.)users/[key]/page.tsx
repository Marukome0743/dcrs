import { ImagePreview } from "@/app/components/layout/imagePreview"
import type React from "react"
import { Suspense } from "react"
import { Modal } from "./modal"

export default function ImageModal({
  params: { key },
}: Readonly<{
  params: { key: string }
}>): React.JSX.Element {
  return (
    <Modal>
      <Suspense fallback={<Skelton />}>
        <ImagePreview path={key} />
      </Suspense>
    </Modal>
  )
}

function Skelton(): React.JSX.Element {
  return (
    <>
      <h1 className="mx-auto">
        <p className="skeleton h-6 w-32" />
      </h1>
      <div className="skeleton h-64 w-full" />
    </>
  )
}
