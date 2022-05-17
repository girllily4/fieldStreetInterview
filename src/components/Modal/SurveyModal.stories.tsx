import React from 'react'
import { ComponentMeta } from '@storybook/react'
import Modal from './SurveyModal'

export default {
  title: 'Components/SurveyModal',
  component: Modal,
} as ComponentMeta<typeof SurveyModal>

export const SurveyModal = () => {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)}>open</button>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false)
        }}
        style={{ background: '#000000' }}
      >
        <h1>Here's new Survey</h1>
      </Modal>
    </>
  )
}
