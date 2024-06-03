import type { User } from '@prisma/client'

export function getUsers(): Promise<{ users: User[] }> {
  const baseUrl =
    process.env.NEXT_PUBLIC_VERCEL_URL === 'dcrs.vercel.app'
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : process.env.NEXT_PUBLIC_API_URL

  return fetch(`${baseUrl}/api/users`)
    .then((res) => {
      if (!res.ok) {
        return { users: [] }
      }
      return res.json()
    })
    .catch((error) => {
      throw new Error(error)
    })
}
