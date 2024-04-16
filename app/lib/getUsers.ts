export function getUsers() {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
    next: { revalidate: 300 },
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
