import { ComponentMeta } from '@storybook/react'
import TextField from './TextField'

export default {
  title: 'Components/TextField',
  component: TextField,
} as ComponentMeta<typeof TextField>

export const SurveyTextField = () => {
  const props = {
    name: 'name',
    label: 'name',
    placeholder: 'Enter your name',
  }
  return <TextField {...props} style={{ width: 300 }} />
}
