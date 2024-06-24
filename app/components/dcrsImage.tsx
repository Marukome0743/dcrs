import { getImage } from "@/app/lib/getImage"
import { PhotoIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import type React from "react"

export async function DcrsImage({
  path,
}: Readonly<{ path: string }>): Promise<React.JSX.Element> {
  const response: Response = await getImage(path)
  const contentType: string = response.headers.get("Content-Type") as string
  const arrayBuffer: ArrayBuffer = await response.arrayBuffer()
  const buffer: Buffer = Buffer.from(arrayBuffer)
  const base64: string = buffer.toString("base64")

  return (
    <>
      <h1 className="flex font-semibold items-center mx-auto text-2xl">
        <PhotoIcon className="mr-2 size-8 text-accent" />
        {path}
      </h1>
      <Image
        src={`data:${contentType};base64,${base64}`}
        id={path}
        width={300}
        height={300}
        className="w-full max-w-lg rounded-lg"
        alt={path}
      />
    </>
  )
}
