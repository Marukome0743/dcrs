import { prisma } from '@/app/lib/prisma'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const users = await prisma.user.findMany()
  return NextResponse.json({ users })
}

export async function POST(request: Request) {
  const body = await request.formData()
  const image = body.get('image') as File

  const user = await prisma.user.create({
    data: {
      name: body.get('name') as string,
      company: body.get('company') as string,
      employeeId: body.get('employeeId') as string,
      telephone: body.get('telephone') as string,
      email: body.get('email') as string,
      image: image.name,
    },
  })
  return NextResponse.json({ user })
}
