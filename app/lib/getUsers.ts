import type { User } from "@/app/lib/schema"

export function getUsers(): Promise<{ getUsers: User[] }> {
  const baseUrl = process.env.API_URL || "http://localhost:3000"

  return fetch(`${baseUrl}/api/users`)
    .then((res) => {
      if (!res.ok) {
        return { getUsers: [] }
      }
      return res.json()
    })
    .catch((error) => {
      throw new Error(error)
    })
}
