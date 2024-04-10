import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { NextResponse } from 'next/server'

const client = new S3Client({
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
  },
  endpoint: process.env.S3_ENDPOINT,
  region: process.env.S3_REGION,
  forcePathStyle: true,
})

export async function POST(request: Request) {
  const body = await request.formData()
  const image = body.get('image') as File
  const arrayBuffer = await image.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const command = new PutObjectCommand({
    ACL: 'private',
    Bucket: process.env.S3_BUCKET,
    ContentType: image.type,
    Key: image.name,
    Body: buffer,
  })
  const response = await client.send(command)
  return NextResponse.json({ response })
}
