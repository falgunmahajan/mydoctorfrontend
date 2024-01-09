import { Box, Step, StepButton, Stepper } from '@mui/material';
import React from 'react'
import PatientDetails from './PatientDetails';
import AppointmentDetails from './AppointmentDetails';
import PaymentDetails from './PaymentDetails';

const BookAppointment = () => {
    const steps = ['Patient Details', 'Appointment Details', 'Payment Details'];
    const [activeStep, setActiveStep] = React.useState(0);
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };
      const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      };
      const getStepData=((step:number)=>{
        if(step===0){
            return(
                <PatientDetails next={handleNext}/>
            )
        }
        if(step===1){
            return(
                <AppointmentDetails back={handleBack} next={handleNext}/>
            )
        }
        if(step===2){
            return(
                <PaymentDetails back={handleBack} next={handleNext}/>
            )
        }
      })
  return (
    <>
    <Box sx={{ width: '100%', backgroundColor:"white",p:2 }}>
    <Stepper nonLinear activeStep={activeStep} >
      {steps.map((label, index) => (
        <Step key={label} >
          <StepButton color="inherit" >
            {label}
          </StepButton>
        </Step>
      ))}
    </Stepper>
 
    </Box>
      {getStepData(activeStep)}
      </>
  )
}

export default BookAppointment