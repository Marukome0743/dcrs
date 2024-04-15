import { client } from '@/app/lib/s3client'
import { GetObjectCommand } from '@aws-sdk/client-s3'

export async function GET(
  _request: Request,
  { params }: { params: { key: string } },
) {
  const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: params.key,
  })
  const response = await client.send(command)
  const contentType = response.ContentType as string

  return new Response(response.Body as BodyInit, {
    status: 200,
    headers: {
      'Content-Type': contentType,
    },
  })
}
