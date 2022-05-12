import React, { useCallback, useContext } from 'react'
import { SurveyContext } from './SurveyContext'
import TextField from '../../components/TextField/TextField'
import {
  Grid,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
} from '@mui/material'

import './SurveyForm.css'

export const FirstStepForm: React.FC = () => {
  const { formValues, handleChange, handleHasError } = useContext(SurveyContext)
  const { name, email } = formValues

  React.useEffect(() => {
    handleHasError({ name, email })
  }, [name, email, handleHasError])

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField name='name' value={name} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField name='email' value={email} onChange={handleChange} />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

const ageOptions = ['Under 18', '18 to 25', '25+']
const genders = ['Male', 'Female']
export const SecondStepForm: React.FC = () => {
  const { formValues, handleChange, handleHasError } = useContext(SurveyContext)
  const { age, gender } = formValues

  React.useEffect(() => {
    handleHasError({ age, gender })
  }, [age, gender, handleHasError])

  const handleRadioChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      handleChange(event)
    },
    [handleChange]
  )
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            SelectProps={{ native: true }}
            name='age'
            value={age}
            onChange={handleChange}
          >
            {ageOptions.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <RadioGroup
            row
            name='gender'
            value={gender}
            onChange={handleRadioChange}
          >
            {genders.map((item, index) => (
              <FormControlLabel
                key={index}
                value={item}
                control={<Radio checked={gender.value === item} />}
                label={item}
              />
            ))}
          </RadioGroup>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

const colors = ['red', 'blue', 'purple', 'black']
export const ThirdStepForm: React.FC = () => {
  const { formValues, handleChange, handleCheckboxChange } =
    useContext(SurveyContext)
  const { favoriteBook, favoriteColors } = formValues
  const [selectedColors, setSelectedColor] = React.useState<Set<string>>(
    new Set()
  )

  const handleColorSelect = (
    event: React.ChangeEvent<HTMLInputElement>,
    label: string
  ) => {
    event.preventDefault()
    if (selectedColors.has(label)) {
      selectedColors.delete(label)
    } else {
      const mem = selectedColors.add(label)
      setSelectedColor(mem)
    }
    handleCheckboxChange(event, selectedColors)
  }

  return (
    <React.Fragment>
      <Grid container spacing={2} direction='column'>
        <Grid item xs={6} sm={6}>
          <TextField
            name='favoriteBook'
            value={favoriteBook}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <h4>Select Your Favorite Color</h4>
          <div>
            {colors.map((color) => (
              <FormControlLabel
                key={color}
                control={
                  <Checkbox
                    checked={favoriteColors.checkedboxes?.has(color)}
                    onChange={(event) => handleColorSelect(event, color)}
                    name='favoriteColors'
                    color='primary'
                    required={favoriteColors.required}
                  />
                }
                label={color}
              />
            ))}
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export const SurveySummaryTable: React.FC = () => {
  const { formValues } = useContext(SurveyContext)
  return (
    <div>
      <table>
        <tbody>
          {Object.keys(formValues).map((key) => (
            <tr key={key}>
              <td>
                {formValues[key].label} {formValues[key].required ? '*' : ''}
              </td>
              <td>{formValues[key].value || 'empty'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
