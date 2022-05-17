import React, { ReactNode, useContext } from 'react'
import MuiStepper, { StepperProps } from '@mui/material/Stepper'
import {
  Box,
  Button,
  Step,
  StepLabel,
  StepContent,
  Typography,
} from '@mui/material'
import {
  FirstStepForm,
  SecondStepForm,
  ThirdStepForm,
  SurveySummaryTable,
} from '../SurveyForm/SurveyForm'
import { SurveyContext } from '../SurveyContext'

type StepType = { label: string; comment?: string; content?: ReactNode }
const steps: StepType[] = [
  {
    label: 'Identity',
    comment: 'Name and Email',
    content: <FirstStepForm />,
  },
  { label: 'Detail', comment: 'Age and Gender', content: <SecondStepForm /> },
  {
    label: 'Favorites',
    comment: 'Favorite Book and Favorite Colors',
    content: <ThirdStepForm />,
  },
  {
    label: 'Summary',
    comment: 'Data collected in the survey',
    content: <SurveySummaryTable />,
  },
]
const LandingStepper: React.FC<StepperProps> = (props) => {
  const { activeStep, hasError, handleNext, handleBack, handleSubmit } =
    useContext(SurveyContext)

  const isLastStep = React.useCallback(() => {
    return activeStep === steps.length - 1
  }, [activeStep])

  return (
    <MuiStepper
      {...props}
      activeStep={props.activeStep || activeStep}
      orientation='vertical'
    >
      {steps.map((step) => (
        <Step key={step.label}>
          <StepLabel
            optional={
              isLastStep() ? (
                <Typography variant='caption'>Last Step</Typography>
              ) : (
                <Typography variant='caption'>{step.comment}</Typography>
              )
            }
          >
            {step.label}
          </StepLabel>
          <StepContent>
            <Box sx={{ mb: 2 }}>
              <React.Fragment>
                {step.content}
                <Button
                  disabled={hasError}
                  variant='contained'
                  onClick={isLastStep() ? handleSubmit : handleNext}
                  size='small'
                  sx={{ mt: 2, mr: 2 }}
                >
                  {isLastStep() ? 'Submit' : 'Next'}
                </Button>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  size='small'
                  sx={{ mt: 2, mr: 2 }}
                >
                  Previous
                </Button>
              </React.Fragment>
            </Box>
          </StepContent>
        </Step>
      ))}
    </MuiStepper>
  )
}

export default LandingStepper
