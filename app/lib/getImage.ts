export function getImage(path: string): Promise<Response> {
  const baseUrl =
    process.env.NEXT_PUBLIC_VERCEL_URL === 'dcrs.vercel.app'
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : process.env.NEXT_PUBLIC_API_URL

  return fetch(`${baseUrl}/api/image/${path}`)
    .then((res) => {
      if (!res.ok) {
        return new Response(null)
      }
      return res
    })
    .catch((error) => {
      throw new Error(error)
    })
}
