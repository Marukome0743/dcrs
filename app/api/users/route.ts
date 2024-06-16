import { TEST_BUCKET } from "@/app/lib/constant"
import { client } from "@/app/lib/s3client"
import { type NewUser, type User, db, users } from "@/app/lib/schema"
import {
  PutObjectCommand,
  type PutObjectCommandOutput,
} from "@aws-sdk/client-s3"

export async function GET(): Promise<Response> {
  const getUsers: User[] = await db.select().from(users)
  return Response.json({ getUsers })
}

export async function POST(request: Request): Promise<Response> {
  const body: FormData = await request.formData()
  const response: Response = await postImage(body)
  if (response.status !== 200) {
    return response
  }

  const image: File = body.get("image") as File
  const newUser: NewUser = {
    name: body.get("name") as string,
    company: body.get("company") as string,
    employeeId: body.get("employeeId") as string,
    telephone: body.get("telephone") as string,
    email: body.get("email") as string,
    image: `${body.get("employeeId")}.${image.name.split(".").pop()}`,
  }
  const insertUser: User[] = await db.insert(users).values(newUser).returning()
  return Response.json({ insertUser })
}

async function postImage(body: FormData): Promise<Response> {
  const image: File = body.get("image") as File
  const arrayBuffer: ArrayBuffer = await image.arrayBuffer()
  const buffer: Buffer = Buffer.from(arrayBuffer)

  const command: PutObjectCommand = new PutObjectCommand({
    ACL: "private",
    Bucket: process.env.S3_BUCKET || TEST_BUCKET,
    ContentType: image.type,
    Key: `${body.get("employeeId")}.${image.name.split(".").pop()}`,
    Body: buffer,
  })
  const response: PutObjectCommandOutput = await client.send(command)
  return Response.json({ response })
}
