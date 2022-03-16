import React from 'react'
import {NavLink} from 'react-router-dom'
import './style.css'

const FormBuilderHeader = () => {  

  return <>
  <div className="row">
    <div className="col-lg-4 col-xl-3 pr-lg-0">
    <div className="formBuilderHeader">
  <ul class="nav nav-pills nav-justified">            
            <NavLink className='nav-link' to="/form-builder" activeClassName="active" title="">Simple Form</NavLink>
            <NavLink className='nav-link' to="/stepper-form-builder" activeClassName="active" title="">Multi Step Form</NavLink>            
          </ul>
  </div>   
    </div>
    </div>       
  </>
  
}

export default FormBuilderHeader;