import React, { useState, Component } from 'react'
import { FormBuilder, FormRender } from 'react-form-builder-component'
import {Link} from 'react-router-dom'
import './style.css'
import 'react-form-builder-component/dist/index.css'

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
      "type": "text"
    },
    "email": {
      "widget": "input",
      "type": "email"
    }    
  },
  "values": {}
}
const [form, setFormState] = useState([])
export default class FormBuilderApp extends Component {

  constructor(props) {
    super(props);
    this.state = {persons: []};
} 
//const FormBuilderApp = (props) => {
  
  handleFormSubmit= (e) => {
    e.preventDefault()
    // handle form builder property save action
    console.log(form);
  //   for(let formdata of form.ui){
      
  //   console.log(formdata);

  // }
  };
 handleSubmitDummy= (payload) => {
    // handle form submit action
    console.log("Form Submitted");
  };
  onFormBuilderUpdate= (payload) => {
    setFormState(payload)
  };

  render() {
  return( <div className={`formBuilder-wrapper ${this.props.layout}`}>
        <div className="dashboard-header">
             <h2>Form Builder</h2>
             <nav aria-label="breadcrumb">
             <ol className="breadcrumb">
                 <li className="breadcrumb-item">
                <Link className='' to="/dashboard" title="">
                 Dashboard
                 </Link>
                 </li>
                 <li className="breadcrumb-item active" aria-current="page">Form Builder</li>
            </ol>
            </nav>
       </div>
        <div className="dashboard-body pt-4">
        <div className="container-fluid ">
            <div className="row">
              <div className="col-12 col-sm-3 form-Builder-wrapper"><FormBuilder onSave={this.handleFormSubmit} formState={predefinedForm} onChange={this.onFormBuilderUpdate} /></div>
              <div className="col text-muted  preview-form-wrapper ">
                <div className="preview-form">
                <h2>Form Preview</h2>
                <div className="form-preview border p-3">
                  <FormRender {...form}
                    onsubmit={this.handleSubmitDummy} /></div>
                </div>                
              </div>
            </div>
          </div>
       </div>
    </div>
  )
  }
  
}

//  export default FormBuilderApp;