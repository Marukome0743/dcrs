import { getImage } from '@/app/lib/getImage'
import Image from 'next/image'
import type React from 'react'

export async function DcrsImage({
  path,
}: { path: string }): Promise<React.JSX.Element> {
  const response = (await getImage(path)) as Response
  const contentType = response.headers.get('Content-Type') as string
  const arrayBuffer: ArrayBuffer = await response.arrayBuffer()
  const buffer: Buffer = Buffer.from(arrayBuffer)
  const base64: string = buffer.toString('base64')

  return (
    <>
      <h1 className="font-semibold text-2xl">{path}</h1>
      <Image
        src={`data:${contentType};base64,${base64}`}
        id={path}
        width={300}
        height={300}
        className="w-full max-w-lg rounded-lg"
        alt="障がい者手帳画像"
      />
    </>
  )
}
