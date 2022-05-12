import React from 'react'

import Button, { ButtonProps } from '@mui/material/Button'
import { styled } from '@mui/material/styles'

const SurveyButtonStyle = styled(Button)({
  padding: '8px 16px',
  border: '2px solid white',
  color: 'white',
  fontWeight: 400,
  '&:hover': {
    border: '2px solid white',
    boxShadow: 'inset 0px 0px 0px 2px white',
    color: 'white',
    fontWeight: 600,
  },
})

const SurveyButton: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return <SurveyButtonStyle {...rest}>{children}</SurveyButtonStyle>
}

export default SurveyButton
