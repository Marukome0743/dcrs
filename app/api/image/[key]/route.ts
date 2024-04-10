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
  return Response.json({ response })
}
