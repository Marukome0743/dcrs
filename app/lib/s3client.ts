import { S3Client } from '@aws-sdk/client-s3'

export const client = new S3Client({
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
  },
  region: 'ap-northeast-1',
})
