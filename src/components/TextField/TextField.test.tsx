import { screen, render, fireEvent } from '@testing-library/react'
import TextField from './TextField'

test('<TextField> Should Render', () => {
  const props = {
    name: 'tfName',
    placeholder: 'tfPlaceholder',
    label: 'tfLabel',
    defaultValue: 'hello',
    onChange: jest.fn(),
  }
  const container = render(<TextField {...props} data-testid='test1' />)
  const textfield = container.getByTestId('test1')
  expect(textfield).toBeTruthy()
})

test('<TextField> value is able to be change', () => {
  const props = {
    name: 'tfName',
    placeholder: 'tfPlaceholder',
    label: 'tfLabel',
    defaultValue: 'hello',
    onChange: jest.fn(),
  }
  const container = render(<TextField {...props} data-testid='test1' />)
  const input = container.getByDisplayValue(
    props.defaultValue
  ) as HTMLInputElement
  fireEvent.change(input, { target: { value: '33' } })
  expect(props.onChange).toBeCalled()
  expect(input.value).toBe('33')
})
