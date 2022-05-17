import { ComponentMeta } from '@storybook/react'
import Button from './Button'

export default {
  title: 'Components/Button',
  component: Button,
} as ComponentMeta<typeof Button>

export const SurveyButton = () => (
  <Button style={{ background: '#000000' }}>Start Survey</Button>
)
