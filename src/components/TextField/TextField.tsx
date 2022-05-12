import React from 'react'
import { FieldProps } from '../../pages/Landing/SurveyContext'
import MuiTextField, { TextFieldProps } from '@mui/material/TextField'

type Props = TextFieldProps & {
  value?: FieldProps
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const TextField: React.FC<Props> = ({ value, variant, ...props }) => {
  return (
    <MuiTextField
      {...props}
      fullWidth
      label={value?.label}
      placeholder={value?.placeholder}
      value={value?.value}
      error={!!value?.error}
      helperText={value?.error}
      required={value?.required}
      size='small'
    />
  )
}

export default TextField
