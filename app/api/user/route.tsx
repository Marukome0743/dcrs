import { prisma } from '@/app/lib/prisma'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const users = await prisma.user.findMany()
  return NextResponse.json({ users })
}

export async function POST(request: Request) {
  const body = await request.json()
  const user = await prisma.user.create({
    data: {
      name: body.name,
      company: body.company,
      employeeId: body.employeeId,
      telephone: body.telephone,
      email: body.email,
      image: 'image',
    },
  })
  return NextResponse.json({ user })
}
