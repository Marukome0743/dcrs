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

async function getUser(url: string) {
  const req = await fetch(`${url}/api/user`)
  return req.json()
}

export default function User() {
  const users = getUser('http://localhost:3000')

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

            <th>ID</th>
            <th>作成日</th>
            <th>氏名</th>
            <th>所属会社</th>
            <th>社員番号</th>
            <th>電話番号</th>
            <th>メールアドレス</th>
            <th>障がい者手帳画像</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>1</th>
            <td>Cy Ganderton</td>
            <td>Quality Control Specialist</td>
            <td>Littel, Schaden and Vandervort</td>
            <td>Canada</td>
            <td>12/16/2020</td>
            <td>Blue</td>
          </tr>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>2</th>
            <td>Hart Hagerty</td>
            <td>Desktop Support Technician</td>
            <td>Zemlak, Daniel and Leannon</td>
            <td>United States</td>
            <td>12/5/2020</td>
            <td>Purple</td>
          </tr>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>3</th>
            <td>Brice Swyre</td>
            <td>Tax Accountant</td>
            <td>Carroll Group</td>
            <td>China</td>
            <td>8/15/2020</td>
            <td>Red</td>
          </tr>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>4</th>
            <td>Marjy Ferencz</td>
            <td>Office Assistant I</td>
            <td>Rowe-Schoen</td>
            <td>Russia</td>
            <td>3/25/2021</td>
            <td>Crimson</td>
          </tr>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>5</th>
            <td>Yancy Tear</td>
            <td>Community Outreach Specialist</td>
            <td>Wyman-Ledner</td>
            <td>Brazil</td>
            <td>5/22/2020</td>
            <td>Indigo</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>ID</th>
            <th>Name</th>
            <th>Job</th>
            <th>company</th>
            <th>location</th>
            <th>Last Login</th>
            <th>Favorite Color</th>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
