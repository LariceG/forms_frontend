import React, { useState, useEffect } from 'react'
import {toast} from 'react-toastify';
import Axios from 'axios'

// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';
import {  FormRender } from 'react-form-builder-component'
import {Link, useParams, useHistory} from 'react-router-dom'
import './style.css'
import 'react-form-builder-component/dist/index.css'
toast.configure();

const PreviewMultiStepForm = (props) => {
  const history = useHistory();
  const [formDetails,setForms] = useState([])
  const [multiStepforms,setMultiStepForms] = useState([])
  const [nextStepKey,setNextStepKey] = useState([])
  const [nextStepperForm,setNextStepperForm] = useState([])
  const [stepper_id,setFormStepperId] = useState([])
  //const [stepperData,setStepperData] = useState([])
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
    response.data.details.content = JSON.parse(response.data.multi_step_forms[0].content);
    //console.log(response.data.content.title)
    
    var j=0;
    for(let i =0; i < response.data.multi_step_forms.length; i++){
      if(j == 0){
        response.data.multi_step_forms[i].class = 'active';
      }
      response.data.multi_step_forms[i].step = j+1;
      j++;
    }   
    setForms(response.data.details.content)
    setFormStepperId(response.data.multi_step_forms[0]._id);
    setMultiStepForms(response.data.multi_step_forms)   
    var key = 0+1;
    setNextStepperForm(response.data.multi_step_forms[1]);
    setNextStepKey(key);
  }
  const getNextStepDetails =  (e) =>{
   //console.log(nextStepperForm);
    setFormStepperId(nextStepperForm._id);
      const contentDet = JSON.parse(nextStepperForm.content);
      //console.log(contentDet);
      var prevkey = nextStepKey-1;
      multiStepforms[prevkey].class = '';
      var key = nextStepKey+1;
      multiStepforms[nextStepKey].class = 'active';
      //console.log(key);

      setNextStepperForm(multiStepforms[key]);
      setNextStepKey(key);
      setForms(contentDet);
}
  // const multiStepformContent = (value, index) => (e) =>{
  //    // e.preventDefault();
  //     setFormStepperId(value._id);
  //     const contentDet = JSON.parse(value.content);
  //     console.log(contentDet);
      
  //     var key = index+1;
  //     console.log(key);

  //     setNextStepperForm(multiStepforms[key]);
  //     setNextStepKey(key);
  //     setForms(contentDet);
  // }
  const handleSubmitDummy = (payload) => {
  
    var details = {
      'form_id': params.id,
      'stepper_id': stepper_id,
      'values': JSON.stringify(payload)
  };
  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  
    fetch('http://localhost:3001/api/forms/submitPreviewMultiStepForm', {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
   })
   .then(response => response.json())
   .then(data => {
    //console.log(form);
    console.log(nextStepperForm);
    
    
    if(nextStepperForm == undefined){
      toast('Form submited successfully')
      history.push("/thankyou")
    }else{
      console.log(form);
      var elements = document.getElementsByClassName("form-control");

for (var i = 0; i < elements.length; i++) {
    elements[i].value = ""
}
      document.getElementsByClassName("form-control").value = "";
      getNextStepDetails();
      toast('Step submited successfully')
    }
    
   }
   );
  }
  // Multisteps
  // var el = document.querySelectorAll('.steps-wrapper .step');
  // for (let i = 0; i < el.length; i++) {
  //   el[i].onclick = function() {
  //     var c = 0;
  //     while (c < el.length) {
  //       el[c++].className = 'step';
  //     }
  //     el[i].className = 'step active';
  //   };
  // }


  return (
  <div className={`formBuilder-wrapper ${props.layout}`}>
        <div className="dashboard-header">
             <h2>Multi step form preview</h2>
             <nav aria-label="breadcrumb">
             <ol className="breadcrumb">
                 <li className="breadcrumb-item">                   
                <Link className='' to="/dashboard" title="">
                 Dashboard
                 </Link>
                 </li>
                 <li className="breadcrumb-item active" aria-current="page">Multi step form preview</li>
            </ol>
            </nav>
       </div>
        <div className="dashboard-body pt-4">
        <div className="container-fluid ">
        <div className="preview-form-header">
                <div className="steps-wrapper">
                      {
                        
                    multiStepforms && multiStepforms.map(multiStepform=>{
                      return(  
                          <div className={'step step-2  '+ multiStepform.class}>
                          <div className="step-count">
                          {multiStepform.step}</div>
                              <div className="step-title">
                              Step {multiStepform.step}
                                </div>
                          </div>
                    )
                  })
                }      
                  </div>
        </div> 
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

export default PreviewMultiStepForm;