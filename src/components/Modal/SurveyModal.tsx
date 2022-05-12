import React from 'react'

import Modal, { ModalProps } from '@mui/material/Modal'
import { Box, Typography } from '@mui/material'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  width: 500,
  height: '60%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const SurveyModal: React.FC<ModalProps> = ({ children, ...rest }) => {
  return (
    <Modal
      {...rest}
      keepMounted
      aria-labelledby='keep-mounted-modal-title'
      aria-describedby='keep-mounted-modal-description'
    >
      <Box sx={style}>{children}</Box>
    </Modal>
  )
}

export default SurveyModal
