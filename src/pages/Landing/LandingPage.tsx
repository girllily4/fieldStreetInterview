import React, { useContext } from 'react'
import './LandingPage.css'

import SurveyButton from '../../components/Button/Button'
import SurveyModal from '../../components/Modal/SurveyModal'
import Stepper from './LandingStepper'
import icon from '../../assets/yieldstreetIcon.png'
import { SurveyContext } from './SurveyContext'

const LandingPage: React.FC = () => {
  const [open, setOpen] = React.useState(false)
  const { hasSubmited } = useContext(SurveyContext)
  const handleOpen = React.useCallback(() => setOpen(true), [setOpen])
  const handleClose = React.useCallback(() => setOpen(false), [setOpen])

  // Auto load the uncompleted Survey after 2 seconds once the page loaded
  React.useEffect(() => {
    if (!hasSubmited) {
      const timer = setTimeout(() => handleOpen(), 2000)
      return () => clearTimeout(timer)
    } else {
      handleClose()
    }
  }, [handleOpen, handleClose, hasSubmited])

  return (
    <div className='container'>
      <img src={icon} alt='img' />
      <SurveyButton
        disabled={hasSubmited}
        variant='outlined'
        onClick={handleOpen}
      >
        Start Survey
      </SurveyButton>
      <SurveyModal open={open} onClose={handleClose}>
        <Stepper />
      </SurveyModal>
    </div>
  )
}

export default LandingPage
