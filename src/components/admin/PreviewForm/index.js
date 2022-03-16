import React, { useState, useEffect } from 'react'
import {toast} from 'react-toastify';
import Axios from 'axios'

// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';
import { FormRender } from 'react-form-builder-component'
import {Link, useParams, useHistory} from 'react-router-dom'
import './style.css'
import 'react-form-builder-component/dist/index.css'
toast.configure();

const PreviewFormApp = (props) => {
  const history = useHistory();
  const [formDetails,setForms] = useState([])
  const params = useParams();
  const [form, setFormState] = useState([])
  useEffect(() => {
    fetchForms();
  }, []);
  useEffect(() => {
    setFormState(formDetails)
  }, [formDetails]);
  const fetchForms=async()=>{
    const response=await Axios('http://localhost:3001/api/forms/'+params.id);
    response.data.details.content = JSON.parse(response.data.details.content);
    //console.log(response.data.content.title)
    setForms(response.data.details.content)   
    
  }
  const handleSubmitDummy = (payload) => {
    // handle form submit action
    var details = {
      'form_id': params.id,
      'values': JSON.stringify(payload)
  };
  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
    // handle form builder property save action
   // console.log(form);
    fetch('http://localhost:3001/api/forms/submitPreviewForm', {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
   })
   .then(response => response.json())
   .then(data => 
    toast('Form submited successfully'),
    history.push("/thankyou")
   
   );
  }
  return (
  <div className={`formBuilder-wrapper ${props.layout}`}>
        <div className="dashboard-header">
             <h2>Form Preview</h2>
             <nav aria-label="breadcrumb">
             <ol className="breadcrumb">
                 <li className="breadcrumb-item">                   
                <Link className='' to="/dashboard" title="">
                 Dashboard
                 </Link>
                 </li>
                 <li className="breadcrumb-item active" aria-current="page">{form.title}</li>
            </ol>
            </nav>
       </div>
        <div className="dashboard-body pt-4">
        <div className="container-fluid ">
            <div className="row">
              
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
  )
}

export default PreviewFormApp;