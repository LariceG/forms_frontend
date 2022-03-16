import React from 'react'
import FormBuilderApp from '../../components/admin/FormBuilder'
import Header from '../../components/admin/Header';
import 'react-form-builder-component/dist/index.css'


export const FormBuild = () => {
  return (
      <>
      <Header/>
      <div className="dashboard-wrapper">      
      <FormBuilderApp layout="without-sidebar"/>
      </div>      
      </>    
  )
}

export default FormBuild;
