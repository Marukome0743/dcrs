import { getImage } from '@/app/lib/getImage'
import Image from 'next/image'

export default async function ImagePage({
  params: { key },
}: {
  params: { key: string }
}) {
  const response = (await getImage(key)) as Response
  const contentType = response.headers.get('Content-Type')
  const arrayBuffer = await response.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const base64 = buffer.toString('base64')

  return (
    <Image
      src={`data:${contentType};base64,${base64}`}
      width={300}
      height={300}
      alt={key}
    />
  )
}
