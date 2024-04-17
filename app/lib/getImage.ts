import { getBaseUrl } from '@/app/lib/getBaseUrl'

export function getImage(key: string) {
  const baseUrl = getBaseUrl()

  return fetch(`${baseUrl}/api/image/${key}`, {
    next: { revalidate: 300 },
  })
    .then((res) => {
      if (!res.ok) {
        return null
      }
      return res
    })
    .catch((error) => {
      throw new Error(error)
    })
}
