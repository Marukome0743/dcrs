import { expect, test } from 'bun:test'
import { render } from '@testing-library/react'
import Home from './page'

render(<Home />)

test('h1 test', () => {
  const h1 = document.querySelector('h1')
  expect(h1?.getAttribute('class')).toEqual(
    'mt-6 text-center font-extrabold text-3xl text-gray-900',
  )
  expect(h1?.textContent).toEqual('障がい者手帳登録システム')
})

test('p test', () => {
  const p = document.querySelector('p')
  expect(p?.getAttribute('class')).toEqual('text-center text-gray-600')
  expect(p?.textContent).toEqual('Upload and download your images here')
})

test('div test', () => {
  const div = document.querySelectorAll('div')[1]
  expect(div?.getAttribute('class')).toEqual('w-full max-w-md space-y-8')
})

test('Link test', () => {
  const link1 = document.querySelectorAll('a')[0]
  const link2 = document.querySelectorAll('a')[1]
  expect(link1?.getAttribute('class')).toEqual(
    'group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-sm text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
  )
  expect(link1?.textContent).toEqual(
    '[派遣従業員向け]障がい者手帳画像をアップロードします。',
  )
  expect(link1?.getAttribute('href')).toEqual('/register')

  expect(link2?.getAttribute('class')).toEqual(
    'group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-sm text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
  )
  expect(link2?.textContent).toEqual(
    '[労務担当者向け]障がい者手帳画像をダウンロードします。',
  )
  expect(link2?.getAttribute('href')).toEqual('/download')
})
