import type { User } from '@prisma/client'

const TABLE_HEADER = [
  'ID',
  '作成日',
  '氏名',
  '所属会社',
  '社員番号',
  '電話番号',
  'メールアドレス',
  '障がい者手帳画像',
]

async function getUsers() {
  const req = await fetch(`${process.env.API_URL}/api/user`)
  return req.json()
}

export default async function Users() {
  const userData = await getUsers()

  return (
    <div className="overflow-x-auto">
      <table className="table table-xs">
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            {TABLE_HEADER.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {userData.users.map((user: User) => (
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
              <td>{user.image}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            {TABLE_HEADER.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
