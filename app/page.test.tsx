import { expect, test } from 'bun:test'
import { render } from '@testing-library/react'
import Home from './page'

render(<Home />)

test('h1 test', () => {
  const h1 = document.querySelector('h1')
  expect(h1?.getAttribute('class')).toEqual(
    'text-center font-extrabold text-3xl leading-normal',
  )
  expect(h1?.textContent).toEqual('障がい者手帳登録システム')
})

test('Link test', () => {
  const link1 = document.querySelectorAll('a')[0]
  const link2 = document.querySelectorAll('a')[1]
  expect(link1?.getAttribute('class')).toEqual(
    'btn btn-primary hover:scale-110',
  )
  expect(link1?.textContent).toEqual('障がい者手帳画像を提出')
  expect(link1?.getAttribute('href')).toEqual('/register')

  expect(link2?.getAttribute('class')).toEqual(
    'indicator btn btn-secondary hover:scale-110',
  )
  expect(link2?.textContent).toEqual('登録データ一覧')
  expect(link2?.getAttribute('href')).toEqual('/users')
})
