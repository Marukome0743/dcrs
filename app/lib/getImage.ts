export function getImage(path: Readonly<string>): Promise<Response> {
  const baseUrl: string = process.env.API_URL || "http://localhost:3000"

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
