import React from 'react'
import StepperFormBuilder from '../../components/admin/StepperFormBuilder'
import Header from '../../components/admin/Header';


export const StepperFormBuild = () => {
  return (
      <>
      <Header/>
      <div className="dashboard-wrapper">      
      <StepperFormBuilder layout="without-sidebar"/>
      </div>      
      </>
    
  )
}

export default StepperFormBuild;
