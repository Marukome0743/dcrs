import { Suspense } from 'react'
import { Tbody } from './components/tbody'

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
    '作成日',
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
