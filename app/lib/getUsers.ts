import type { User } from '@prisma/client'

export function getUsers(): Promise<{ users: User[] } | null> {
  const baseUrl =
    process.env.NEXT_PUBLIC_VERCEL_URL === 'dcrs.vercel.app'
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : process.env.NEXT_PUBLIC_API_URL

  return fetch(`${baseUrl}/api/users`, { next: { revalidate: 0 } })
    .then((res) => {
      if (!res.ok) {
        return null
      }
      return res.json()
    })
    .catch((error) => {
      throw new Error(error)
    })
}
