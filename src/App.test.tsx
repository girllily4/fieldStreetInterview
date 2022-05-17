import { render } from '@testing-library/react'
import App from './App'

test('<App> Should render', () => {
  const { container } = render(<App />)
  expect(container).toBeTruthy()
})
