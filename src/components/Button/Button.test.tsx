import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import Button from './Button'

afterEach(cleanup)

test('<Button> Should render a clickable active button', () => {
  // Render Button
  const buttonOnClick = jest.fn()
  render(<Button onClick={buttonOnClick}>Hello</Button>)
  const button = screen.getByRole('button')

  // Chect the button render with children content
  expect(button).toHaveTextContent('Hello')

  fireEvent.click(button)
  expect(buttonOnClick).toBeCalled()
})

test('<Button> Should disable', () => {
  const buttonOnClick = jest.fn()
  render(
    <Button onClick={buttonOnClick} disabled>
      Hello
    </Button>
  )
  const disabledBtn = screen.getByRole('button')

  expect(disabledBtn).toHaveTextContent('Hello')
  expect(disabledBtn).toBeDisabled()

  fireEvent.click(disabledBtn)
  expect(buttonOnClick).toBeCalledTimes(0)
})
