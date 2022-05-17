import { fireEvent } from '@storybook/testing-library'
import { cleanup, within, render } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import LandingPage from '../LandingPage/LandingPage'
import { StepsProvider } from '../SurveyContext'

beforeAll(() => {
  jest.useFakeTimers()
})
afterEach(cleanup)

test('LandingPage Loaded', () => {
  const { container, getByRole, getByText } = render(<LandingPage />)
  expect(container).toBeTruthy()
  const button = getByRole('button')
  expect(button).toBeInTheDocument()
  expect(getByText('Start Survey')).toBeInTheDocument()
  act(() => {
    jest.runOnlyPendingTimers()
  })
})

const formAnswer: Record<string, string> = {
  name: 'Yiwen',
  email: 'l.yiwen@gmail.com',
  age: '25+',
  gender: 'Female',
  book: 'Hello World',
  color: 'red, black',
}
test('Submit Form', () => {
  const {
    container,
    getByRole,
    getByPlaceholderText,
    getByText,
    getAllByText,
  } = render(
    <StepsProvider>
      <LandingPage />
    </StepsProvider>
  )
  expect(container).toBeTruthy()
  const button = getByRole('button')
  fireEvent.click(button)

  let nextBtn = getByText('Next')
  let previousBtn = getByText('Previous')

  // First Step
  expect(nextBtn).toBeDisabled()
  expect(previousBtn).toBeDisabled()
  const name = getByPlaceholderText('Enter your name')
  fireEvent.change(name, { target: { value: formAnswer.name } })
  const email = getByPlaceholderText('Enter your email')
  fireEvent.change(email, { target: { value: formAnswer.email } })
  expect(nextBtn).toBeEnabled()
  expect(previousBtn).toBeDisabled()
  fireEvent.click(nextBtn)

  // Second Step
  expect(nextBtn).toBeDisabled()
  expect(previousBtn).toBeEnabled()
  const age = getByPlaceholderText('Select your age')
  fireEvent.change(age, { target: { value: formAnswer.age } })
  const gender = getByText(formAnswer.gender)
  fireEvent.click(gender)
  expect(nextBtn).toBeEnabled()
  expect(previousBtn).toBeEnabled()
  fireEvent.click(nextBtn)

  // Third Step
  expect(nextBtn).toBeEnabled()
  expect(previousBtn).toBeEnabled()
  const book = getByPlaceholderText('Enter your favorite book')
  fireEvent.change(book, { target: { value: formAnswer.book } })
  fireEvent.click(getByText('red'))
  fireEvent.click(getByText('black'))
  expect(nextBtn).toBeEnabled()
  expect(previousBtn).toBeEnabled()
  fireEvent.click(nextBtn)

  // Final Summary
  const table = getByRole('table')
  Object.keys(formAnswer).map((key) => {
    expect(within(table).getByText(formAnswer[key])).toBeInTheDocument()
  })
  expect(previousBtn).toBeEnabled()
  const submitBtn = getAllByText('Submit')[0]
  fireEvent.click(submitBtn)

  // After submit, not able to open survey anymore
  expect(button).toBeDisabled()
})
