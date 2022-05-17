import { render } from '@testing-library/react'
import LandingStepper from './LandingStepper'

test('<LandingStepper> Should render', () => {
  const container = render(<LandingStepper />)
  const step1 = container.getByText('Identity')
  const step2 = container.getByText('Detail')
  const step3 = container.getByText('Favorites')
  const step4 = container.getByText('Summary')
  expect(step1 && step2 && step3 && step4).toBeInTheDocument()
})

// test('<LandingStepper> Should render', () => {
//   const container = render(<LandingStepper activeStep={4} />)
//   const btnSubmit = container.getByText('Submit')
//   expect(btnSubmit).toBeInTheDocument()
// })
