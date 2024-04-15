export function getImage(key: string) {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/image/${key}`, {
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
