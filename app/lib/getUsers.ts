export function getUsers() {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
    cache: 'no-store',
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
