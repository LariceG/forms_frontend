import React from 'react'
import PreviewFormApp from '../../components/admin/PreviewForm'
import Header from '../../components/admin/Header';
import 'react-form-builder-component/dist/index.css'


export const PreviewForm = () => {
  return (
      <>
      <Header/>
      <div className="dashboard-wrapper">      
      <PreviewFormApp layout="without-sidebar"/>
      </div>      
      </>
    
  )
}

export default PreviewForm;
