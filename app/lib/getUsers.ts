import type { User } from "@prisma/client"

export function getUsers(): Promise<{ users: User[] }> {
  const baseUrl = process.env.API_URL || "http://localhost:3000"

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
