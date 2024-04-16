import { getBaseUrl } from '@/app/lib/getBaseUrl'

export function getUsers() {
  return fetch(`${getBaseUrl()}/api/user`, {
    next: { revalidate: 0 },
  })
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
