import { DcrsImage } from '@/app/components/dcrsImage'
import type React from 'react'
import { Suspense } from 'react'
import { Modal } from './modal'

export default function ImageModal({
  params: { key },
}: {
  params: { key: string }
}): React.JSX.Element {
  return (
    <Modal>
      <Suspense fallback={<Skelton />}>
        <DcrsImage path={key} />
      </Suspense>
    </Modal>
  )
}

function Skelton(): React.JSX.Element {
  return (
    <>
      <h1>
        <p className="skeleton h-6 w-32" />
      </h1>
      <div className="skeleton h-64 w-full" />
    </>
  )
}
