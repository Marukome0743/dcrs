'use server'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

// ファイルupload用一時URL取得
export async function getServerUrl(key: string) {
  const client = new S3Client({
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
    },
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.S3_REGION,
    forcePathStyle: true,
  })

  const command = new PutObjectCommand({
    ACL: 'private',
    Key: key,
    Bucket: process.env.S3_BUCKET,
  })
  const url = await getSignedUrl(client, command, { expiresIn: 300 }) //expiresInは適当。
  return url
}
