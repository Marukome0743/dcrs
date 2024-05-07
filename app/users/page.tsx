import { getUsers } from '@/app/lib/getUsers'
import {
  BuildingOffice2Icon,
  ClockIcon,
  EnvelopeIcon,
  IdentificationIcon,
  PhoneIcon,
  PhotoIcon,
  TagIcon,
  UserIcon,
} from '@heroicons/react/24/solid'
import type { User } from '@prisma/client'
import Link from 'next/link'
import type React from 'react'
import { Suspense } from 'react'
import { Pagination } from '../components/pagination'
import type { TableHeader } from '../interfaces/tableHeader'

const indexList: TableHeader[] = [
  {
    name: 'ID',
    icon: TagIcon,
    color: 'text-warning',
  },
  {
    name: '作成日時',
    icon: ClockIcon,
    color: 'text-primary',
  },
  {
    name: '氏名',
    icon: UserIcon,
    color: 'text-error',
  },
  {
    name: '所属会社',
    icon: BuildingOffice2Icon,
    color: 'text-accent',
  },
  {
    name: '社員番号',
    icon: IdentificationIcon,
    color: 'text-success',
  },
  {
    name: '電話番号',
    icon: PhoneIcon,
    color: 'text-warning',
  },
  {
    name: 'メールアドレス',
    icon: EnvelopeIcon,
    color: 'text-info',
  },
  {
    name: '障がい者手帳画像',
    icon: PhotoIcon,
    color: 'text-secondary',
  },
] as const

export default function Users(): React.JSX.Element {
  return (
    <>
      <div className="max-w-full overflow-x-auto">
        <table className="table table-xs table-pin-rows table-pin-cols table-zebra text-center">
          <thead>
            <TableIndex />
          </thead>
          <tbody>
            <Suspense fallback={<Loading />}>
              <Tbody />
            </Suspense>
          </tbody>
          <tfoot>
            <TableIndex />
          </tfoot>
        </table>
      </div>
      <Pagination />
    </>
  )
}

function TableIndex(): React.JSX.Element {
  return (
    <tr>
      <Checkbox />
      {indexList.map((index) => (
        <td key={index.name}>
          <index.icon className={`inline mr-1 size-4 ${index.color}`} />
          {index.name}
        </td>
      ))}
      <Checkbox />
    </tr>
  )
}

function Checkbox(): React.JSX.Element {
  return (
    <th>
      <label>
        <input type="checkbox" className="checkbox" />
      </label>
    </th>
  )
}

function Loading(): React.JSX.Element {
  return (
    <tr>
      <Checkbox />
      {indexList.map((index) => (
        <td key={index.name}>
          <p className="skeleton h-4 w-full text-transparent" />
        </td>
      ))}
      <Checkbox />
    </tr>
  )
}

async function Tbody(): Promise<React.JSX.Element> {
  const userData = (await getUsers()) as { users: User[] }

  return (
    <>
      {userData ? (
        userData.users.map((user: User) => (
          <tr key={user.id} className="hover">
            <Checkbox />
            <td>{user.id}</td>
            <td>{new Date(user.createdAt).toLocaleString('ja-JP')}</td>
            <td>{user.name}</td>
            <td>{user.company}</td>
            <td>{user.employeeId}</td>
            <td>
              <Link
                href={`tel:${user.telephone}`}
                className="link link-primary"
              >
                {user.telephone}
              </Link>
            </td>
            <td>
              <Link href={`mailto:${user.email}`} className="link link-primary">
                {user.email}
              </Link>
            </td>
            <td>
              <Link href={`/users/${user.image}`} className="link link-primary">
                {user.image}
              </Link>
            </td>
            <Checkbox />
          </tr>
        ))
      ) : (
        <tr>
          <th colSpan={9}>対応待ちデータなし</th>
        </tr>
      )}
    </>
  )
}
