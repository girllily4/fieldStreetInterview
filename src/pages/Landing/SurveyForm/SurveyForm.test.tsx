import {
  cleanup,
  fireEvent,
  screen,
  waitFor,
  getByPlaceholderText,
  getByText,
  render,
  getAllByRole,
} from '@testing-library/react'
import { createContext, useContext } from 'react'
import { StepsProvider, SurveyContext } from '../SurveyContext'
import {
  FirstStepForm,
  SecondStepForm,
  ThirdStepForm,
  SurveySummaryTable,
} from './SurveyForm'

afterEach(cleanup)
function renderWithProvider(children: any) {
  return render(<StepsProvider>{children}</StepsProvider>)
}

describe('<SurveyForm> - <FirstStepForm>', () => {
  it('<FirstStepForm> Should Render', () => {
    const { container } = renderWithProvider(<FirstStepForm />)
    expect(container).toBeTruthy()
  })
  it('<FirstSurveyForm> Name Text Field - Error', async () => {
    const { getByPlaceholderText, getByText } = renderWithProvider(
      <FirstStepForm />
    )
    const name = getByPlaceholderText('Enter your name') as HTMLInputElement
    fireEvent.change(name, { target: { value: 'name123' } })
    await waitFor(() =>
      expect(getByText('Name field accepts text only')).toBeInTheDocument()
    )
  })
  it('<FirstSurveyForm> Email Text Field - Error', async () => {
    const { getByPlaceholderText, getByText } = renderWithProvider(
      <FirstStepForm />
    )
    const email = getByPlaceholderText('Enter your email') as HTMLInputElement
    fireEvent.change(email, { target: { value: 'name123' } })
    await waitFor(() =>
      expect(
        getByText('Please enter a valid email address')
      ).toBeInTheDocument()
    )
  })
})

describe('<SurveyForm> - <SecondStepForm>', () => {
  it('<SecondStepForm> Should Render', async () => {
    const { container } = renderWithProvider(<SecondStepForm />)
    expect(container).toBeTruthy()
  })
  it('<SecondStepForm> Age Selector - should render', async () => {
    const { getByPlaceholderText } = renderWithProvider(<SecondStepForm />)
    const age = getByPlaceholderText('Select your age') as HTMLSelectElement
    fireEvent.change(age, { target: { value: 'Under 18' } })
  })
  it('<SecondStepForm> gender Selector - should render', async () => {
    const { getByText } = renderWithProvider(<SecondStepForm />)
    const female = getByText('Female')
    fireEvent.click(female)
  })
})

describe('<SurveyForm> - <ThirdStepForm>', () => {
  it('<ThirdStepForm> Should Render', () => {
    const { container } = renderWithProvider(<ThirdStepForm />)
    expect(container).toBeTruthy()
  })
  it('<ThirdStepForm> Favorite Book - should editable', () => {
    const { getByPlaceholderText } = renderWithProvider(<ThirdStepForm />)
    const age = getByPlaceholderText(
      'Enter your favorite book'
    ) as HTMLSelectElement
    fireEvent.change(age, { target: { value: 'Hello World' } })
    expect(age).toBeInTheDocument()
  })
  it('<ThirdStepForm> Favorite color - could multiple choose', async () => {
    const { getByText } = renderWithProvider(<ThirdStepForm />)
    const red = getByText('red') as HTMLInputElement
    const black = getByText('black') as HTMLInputElement
    fireEvent.click(red)
    fireEvent.click(black)
    fireEvent.click(red)
  })
})

test('<SurveyForm> Final Summary Should Render', () => {
  const { container } = render(<SurveySummaryTable />)
  expect(container).toBeTruthy()
})
