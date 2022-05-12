// src/__test__/config/importJestDOM.ts
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
// import Button from './Button'

test('Test the Button', () => {
  const { getByText } = render(<button>Hello</button>)
  expect(getByText('Hello')).toBe(true)
})
