import React, { createContext, ReactNode, useReducer } from 'react'

const nameRegex = /^[A-Z ]+$/i
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

export interface FieldProps {
  label?: string
  placeholder?: string
  value?: string | boolean
  checkedboxes?: Set<string>
  error?: string
  required?: boolean
  validate?: RegExp
  helperText?: string
}
type FieldValidationSchema = Record<string, FieldProps>
const initialValues: FieldValidationSchema = {
  name: {
    label: 'Name',
    placeholder: 'Enter your name',
    value: '',
    error: '',
    required: true,
    validate: nameRegex,
    helperText: 'Name field accepts text only',
  },
  email: {
    label: 'Email',
    placeholder: 'Enter your email',
    value: '',
    error: '',
    required: true,
    validate: emailRegex,
    helperText: 'Please enter a valid email address',
  },
  age: {
    label: 'Age',
    placeholder: 'Select your age',
    value: '',
    error: '',
  },
  gender: {
    label: 'Gender',
    placeholder: 'Choose your gender',
    value: '',
    error: '',
    required: true,
  },
  favoriteBook: {
    label: 'Favorite Book',
    placeholder: 'Enter your favorite book',
    value: '',
    error: '',
  },
  favoriteColors: {
    label: 'Favorite Colors',
    placeholder: 'Select your favorite Colors',
    value: '',
    checkedboxes: new Set(),
    error: '',
  },
}

type ContextProps = {
  hasError: boolean
  hasSubmited: boolean
  activeStep: number
  formValues: FieldValidationSchema
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    checkedValue?: string
  ) => void
  handleCheckboxChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    checkedBoxes: Set<string>
  ) => void
  handleBack: () => void
  handleNext: () => void
  handleSubmit: () => void
  handleHasError: (formValues: FieldValidationSchema) => void
}

export const SurveyContext = createContext<ContextProps>({
  activeStep: 0,
  hasError: false,
  hasSubmited: false,
  formValues: initialValues,
  handleChange() {},
  handleCheckboxChange() {},
  handleBack() {},
  handleNext() {},
  handleSubmit() {},
  handleHasError() {},
})

interface ProviderProps {
  children: ReactNode
}

type State = {
  activeStep: number
  hasError: boolean
  hasSubmited: boolean
  formValues: FieldValidationSchema
}

type Action =
  | { type: 'next' }
  | { type: 'back' }
  | { type: 'submit' }
  | { type: 'form-value'; name: string; fieldValue: string }
  | { type: 'form-checkedbox'; name: string; checkedBoxes: Set<string> }
  | { type: 'form-error'; name: string; error: string }
  | { type: 'form-has-error'; hasError: boolean }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'next':
      return {
        ...state,
        activeStep: state.activeStep + 1,
      }
    case 'back':
      return {
        ...state,
        activeStep: state.activeStep - 1,
      }
    case 'submit':
      return {
        ...state,
        hasSubmited: true,
      }
    case 'form-value':
      return {
        ...state,
        formValues: {
          ...state.formValues,
          [action.name]: {
            ...state.formValues[action.name],
            value: action.fieldValue,
          },
        },
      }
    case 'form-checkedbox':
      const mem = Array.from(action.checkedBoxes).join(', ')
      return {
        ...state,
        formValues: {
          ...state.formValues,
          [action.name]: {
            ...state.formValues[action.name],
            checkedboxes: action.checkedBoxes,
            value: mem,
          },
        },
      }
    case 'form-error':
      return {
        ...state,
        formValues: {
          ...state.formValues,
          [action.name]: {
            ...state.formValues[action.name],
            error: action.error,
          },
        },
      }
    case 'form-has-error':
      return {
        ...state,
        hasError: action.hasError,
      }
    default:
      return state
  }
}

export const StepsProvider = ({ children }: ProviderProps) => {
  const [{ activeStep, hasError, hasSubmited, formValues }, dispatch] =
    useReducer(reducer, {
      activeStep: 0,
      hasError: false,
      hasSubmited: false,
      formValues: initialValues,
    })

  const handleNext = () => {
    dispatch({ type: 'next' })
  }

  const handleBack = () => {
    dispatch({ type: 'back' })
  }

  const handleSubmit = () => {
    dispatch({ type: 'submit' })
  }

  // Return error when there's error or the required form didn't fill up
  const handleHasError = React.useCallback(
    (formValues: FieldValidationSchema) => {
      const hasError = Object.keys(formValues).some((key) => {
        const { required, value, error } = formValues[key]
        return error || (required && !value)
      })
      dispatch({ type: 'form-has-error', hasError })
    },
    []
  )

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checkedBoxes: Set<string>
  ) => {
    const { type, name } = event.target
    if (type === 'checkbox')
      dispatch({ type: 'form-checkedbox', name, checkedBoxes })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value: fieldValue } = event.target
    dispatch({ type: 'form-value', name, fieldValue })

    const fieldName = initialValues[name]
    if (!fieldName) return
    const { required, validate, helperText } = fieldName
    const errorMessage = fieldValue
      ? validate?.test(fieldValue)
        ? ''
        : helperText
      : required
      ? 'This field is Required'
      : ''
    dispatch({ type: 'form-error', name, error: errorMessage || '' })
  }

  return (
    <SurveyContext.Provider
      value={{
        activeStep,
        hasError,
        hasSubmited,
        formValues,
        handleChange,
        handleCheckboxChange,
        handleNext,
        handleBack,
        handleSubmit,
        handleHasError,
      }}
    >
      <div>{children}</div>
    </SurveyContext.Provider>
  )
}
