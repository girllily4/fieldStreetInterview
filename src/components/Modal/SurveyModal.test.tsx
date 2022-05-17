import { render, screen } from '@testing-library/react'
import Modal from './SurveyModal'

test('<Modal> Should render with context', () => {
  render(
    <Modal open>
      <h1>hello</h1>
    </Modal>
  )
  const content = screen.getByText(/hello/i)
  expect(content).toBeInTheDocument()
})
