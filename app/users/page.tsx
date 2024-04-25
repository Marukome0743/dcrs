import { getUsers } from '@/app/lib/getUsers'
import type { User } from '@prisma/client'
import Link from 'next/link'
import { Suspense } from 'react'

export default function Users() {
  return (
    <div className="overflow-x-auto">
      <table className="table table-xs">
        <thead>
          <TableIndex />
        </thead>
        <Suspense fallback={<Loading />}>
          <Tbody />
        </Suspense>
        <tfoot>
          <TableIndex />
        </tfoot>
      </table>
    </div>
  )
}

function TableIndex() {
  const indexList = [
    'ID',
    '作成日時',
    '氏名',
    '所属会社',
    '社員番号',
    '電話番号',
    'メールアドレス',
    '障がい者手帳画像',
  ]

  return (
    <tr>
      <th>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </th>
      {indexList.map((index) => (
        <th key={index}>{index}</th>
      ))}
    </tr>
  )
}

function Loading() {
  return (
    <tbody>
      <tr className="text-center">
        <th colSpan={9}>データ取得中・・・</th>
      </tr>
    </tbody>
  )
}

async function Tbody() {
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
            <td>{new Date(user.createdAt).toLocaleString('ja-JP')}</td>
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
