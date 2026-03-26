import { storageClient } from "@/app/lib/storage"
import { db, handicap, type NewUser, type User } from "@/app/lib/schema"

export async function GET(): Promise<Response> {
  const getUsers: User[] = await db.select().from(handicap)
  return Response.json({ getUsers })
}

export async function POST(request: Readonly<Request>): Promise<Response> {
  const body: FormData = await request.formData()
  const image: File = body.get("image") as File
  const key = `${body.get("employeeId")}.${image.name.split(".").pop()}`

  const arrayBuffer: ArrayBuffer = await image.arrayBuffer()
  const buffer: Buffer = Buffer.from(arrayBuffer)
  const response = await storageClient.upload({
    key,
    body: buffer,
    contentType: image.type,
  })
  if (!response.url) {
    return Response.json({ error: "Upload failed" }, { status: 500 })
  }

  const newUser: NewUser = {
    name: body.get("name") as string,
    company: body.get("company") as string,
    employeeId: body.get("employeeId") as string,
    telephone: body.get("telephone") as string,
    email: body.get("email") as string,
    image: key,
  }
  const insertUser: User[] = await db
    .insert(handicap)
    .values(newUser)
    .returning()
    .then((users) => users)
    .catch((error) => error)

  if (insertUser instanceof Error) {
    await storageClient.delete(newUser.image)
    return Response.json({ error: insertUser.message }, { status: 500 })
  }
  return Response.json({ insertUser })
}
