export function getImage(key: string) {
  const baseUrl =
    process.env.NEXT_PUBLIC_VERCEL_URL === 'dcrs.vercel.app'
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : process.env.NEXT_PUBLIC_API_URL

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
