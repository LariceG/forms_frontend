import React, { useEffect, useState } from 'react'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormBuilder, FormRender } from 'react-form-builder-component'
import {Link, useHistory} from 'react-router-dom'
import './style.css'
import 'react-form-builder-component/dist/index.css'
import FormBuilderHeader from '../FormBuilderHeader'
toast.configure();
const predefinedForm = {
  "title": "Title here...",
  "description": "Write form description here...",
  "required": ["email"],
  "properties": {
    "fullname": {
      "title": "Full Name",
      "description": "Enter your Name"
    },
    "email": {
      "title": "Email Address",
      "description": "Enter your Email"      
    }    
  },
  "ui": {
    "fullname": {
      "widget": "input",
      "type": "text",
      "required": "true"
    },
    "email": {
      "widget": "input",
      "type": "email",
      "required": "true"
    }    
  },
  "values": {}
}


const StepperFormBuilder = (props) => {
  const name = "Multi Step Form" ;
  const history = useHistory();
  const [form, setFormState] = useState([])
  // const createStep = (e) => {
  //   e.preventDefault();
  //   if(form_id != ''){
  //   history.push("/form-builder-stepper/"+form_id);
  //   }else{
  //     alert('Sorry, form submit first!');
  //   }
  // };
   const handleFormSubmit = (e) => {
    e.preventDefault()
    var details = {
      'title': form.title,
      'form_type': 'multi_step',
      'description': form.description,
      'content': JSON.stringify(form)
  };
  var formBody = [];
  console.log(form);
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
    // handle form builder property save action
   // console.log(form);
    fetch('http://localhost:3001/api/forms/create', {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
   })
   .then(response => response.json())
   .then(data => 
     //console.log(data)
     //this.setState({ form_id: data.id }),
     
      history.push("/form-builder-stepper/"+data._id),  
      toast('Step created successfully'),
      
      //history.push("/dashboard");
   
   );
  }
  const handleSubmitDummy = (payload) => {
    // handle form submit action
    console.log("Form Submitted");
  }
  const onFormBuilderUpdate = (payload) => {
    setFormState(payload)
  }
  return <>
  <div className={`formBuilder-wrapper ${props.layout}`}>
        <div className="dashboard-header">
             <h2>Multi Step Form</h2>
             <nav aria-label="breadcrumb">
             <ol className="breadcrumb">
                 <li className="breadcrumb-item">                   
                <Link className='' to="/dashboard" title="">
                 Dashboard
                 </Link>
                 </li>
                 <li className="breadcrumb-item active" aria-current="page">{name}</li>
            </ol>
            </nav>
       </div>
        <div className="dashboard-body pt-4">
          <div class="text-right create-step-btn">
        {/* <a href="javascript:void(0);" onClick={createStep} className='btn btn-primary'>
             <i className="ti-layout-accordion-separated"></i> Create step
            </a> */}
            </div>
          <div className="form-navigation">
          <FormBuilderHeader />
          </div>
        <div className="container-fluid ">
            <div className="row">
              <div className="col-12 col-sm-3 form-Builder-wrapper"><FormBuilder onSave={handleFormSubmit} formState={predefinedForm} onChange={onFormBuilderUpdate} /></div>
              <div className="col text-muted  preview-form-wrapper ">
                <div className="preview-form">
                <h2>Form Preview</h2>
                <div className="form-preview border p-3 px-xl-5 py-xl-4">
                  <FormRender {...form}
                    onsubmit={handleSubmitDummy} /></div>
                   
                </div>                
              </div>
            </div>
          </div>
       </div>
    </div>
  </>
  
}

export default StepperFormBuilder;