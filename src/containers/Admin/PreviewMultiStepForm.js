import React from 'react'
import PreviewMultiStepForm from '../../components/admin/PreviewMultiStepForm'
import Header from '../../components/admin/Header';
import 'react-form-builder-component/dist/index.css'


export const PreviewMultiStep = () => {
  return (
      <>
      <Header/>
      <div className="dashboard-wrapper">      
      <PreviewMultiStepForm layout="without-sidebar"/>
      </div>
      
      </>
    
  )
}

export default PreviewMultiStep;
