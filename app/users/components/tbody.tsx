import { getUsers } from '@/app/lib/getUsers'
import type { User } from '@prisma/client'
import Link from 'next/link'

export async function Tbody() {
  const userData = await getUsers()

  return (
    <tbody>
      {userData ? (
        userData.users.map((user: User) => (
          <tr key={user.id}>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <td>{user.id}</td>
            <td>{String(user.createdAt)}</td>
            <td>{user.name}</td>
            <td>{user.company}</td>
            <td>{user.employeeId}</td>
            <td>{user.telephone}</td>
            <td>{user.email}</td>
            <td>
              <Link href={`/users/${user.image}`} className="link link-primary">
                {user.image}
              </Link>
            </td>
          </tr>
        ))
      ) : (
        <tr className="text-center">
          <th colSpan={9}>対応待ちデータなし</th>
        </tr>
      )}
    </tbody>
  )
}
