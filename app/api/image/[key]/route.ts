import { client } from "@/app/lib/s3client"
import {
  GetObjectCommand,
  type GetObjectCommandOutput,
} from "@aws-sdk/client-s3"

export async function GET(
  _request: Request,
  { params }: { params: { key: string } },
): Promise<Response> {
  const command: GetObjectCommand = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET || "dcrs-test",
    Key: params.key,
  })
  const response: GetObjectCommandOutput = await client.send(command)
  const contentType: string = response.ContentType as string

  return new Response(response.Body as BodyInit, {
    status: 200,
    headers: {
      "Content-Type": contentType,
    },
  })
}
