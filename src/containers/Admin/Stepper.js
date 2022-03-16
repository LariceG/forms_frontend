import React from 'react'
import Stepper from '../../components/admin/Stepper'
import Header from '../../components/admin/Header';


export const StepperForm = () => {
  return (
      <>
      <Header/>
      <div className="dashboard-wrapper">      
      <Stepper layout="without-sidebar"/>
      </div>      
      </>
    
  )
}

export default StepperForm;
