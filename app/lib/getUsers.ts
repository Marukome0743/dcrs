export function getUsers() {
  const baseUrl =
    process.env.VERCEL_URL === '*.vercel.app'
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXT_PUBLIC_API_URL

  return fetch(`${baseUrl}/api/user`, {
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
