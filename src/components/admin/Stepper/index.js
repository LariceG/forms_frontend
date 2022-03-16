import React, { useEffect, useState } from 'react'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormBuilder, FormRender } from 'react-form-builder-component'
import {Link, useHistory, useParams} from 'react-router-dom'
import './style.css'
import 'react-form-builder-component/dist/index.css'
import FormBuilderHeader from '../FormBuilderHeader'
import Axios from 'axios'
toast.configure();
// const predefinedForm = {
//   "title": "Title here...",
//   "description": "Write form description here...",
//   "required": ["email"],
//   "properties": {
//     "fullname": {
//       "title": "Full Name",
//       "description": "Enter your Name"
//     },
//     "email": {
//       "title": "Email Address",
//       "description": "Enter your Email"      
//     }    
//   },
//   "ui": {
//     "fullname": {
//       "widget": "input",
//       "type": "text",
//       "required": "true"
//     },
//     "email": {
//       "widget": "input",
//       "type": "email",
//       "required": "true"
//     }    
//   },
//   "values": {}
// }


const Stepper = (props) => {
  const params = useParams();
  const name = "Multi Step Form" ;
  const history = useHistory();
  const [formDetails,setForms] = useState([])
  const [form_id,setFormId] = useState([])
  const [form, setFormState] = useState({
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
          "required": true
        },
        "email": {
          "widget": "input",
          "type": "email",
          "required": true
        }    
      },
      "values": {}
    })
  const [multiStepforms,setMultiStepForms] = useState([])
  // const [firstSteps,setFirstStep] = useState([])
  // const [firstStepforms,setFormFirstStep] = useState([])
  // const createStep = (e) => {
  //   e.preventDefault();
  //   if(form_id != ''){
  //  // history.push("/form-builder-stepper/"+params.id);
  //  console.log('hi');

  //   }else{
  //     alert('Sorry, form submit first!');
  //   }
  // };
  // const finishForm = (e) => {
  //   e.preventDefault();
  //   if(form_id != ''){
  //   history.push("/dashboard");
  //   }else{
  //     alert('Sorry, atleast create one step!');
  //   }
  // };
  useEffect(() => {
    fetchForms();
  }, []);
  useEffect(() => {
    setFormState(formDetails)
  }, [formDetails]);
  async function fetchForms() {
    const response = await Axios('http://localhost:3001/api/forms/' + params.id);
    response.data.details.content = JSON.parse(response.data.details.content);
    //console.log(response.data.content.title)
    setForms(form);
    var j = 1;
    for (let i = 0; i < response.data.multi_step_forms.length; i++) {
      response.data.multi_step_forms[i].step = j + 1;
      j++;
    }
    setMultiStepForms(response.data.multi_step_forms);
    // setFirstStep(response.data.details);
    // setFormFirstStep(response.data.details.content);
  }
   function handleFormSubmit(e) {
    e.preventDefault();
    var details = {
      'form_id': params.id,
      'title': form.title,
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
    fetch('http://localhost:3001/api/forms/create_stepper', {
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
        setFormId(data._id),
        fetchForms(),
        toast('Step created successfully')
      );
  }
  function handleSubmitDummy(payload) {
    // handle form submit action
    console.log("Form Submitted");
  }
  function onFormBuilderUpdate(payload) {
    // console.log(payload);
    setFormState(payload);
  }
  const deleteStepper = value => (e) =>{
    e.preventDefault();
    if (window.confirm("Are you sure?")) {
      fetch('http://localhost:3001/api/forms/deleteStepper/'+value, {
      method: "GET"
   })
  .then(response => {
    fetchForms();
      toast('Stepper deleted successfully')

});
}
}
  var el = document.querySelectorAll('.steps-wrapper .step');
  for (let i = 0; i < el.length; i++) {
    el[i].onclick = function() {
      var c = 0;
      while (c < el.length) {
        el[c++].className = 'step';
      }
      el[i].className = 'step active';
    };
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
        {/* <a href="javascript:void(0);" onClick={createStep} className='btn btn-dark mr-2'>
             <i className="ti-layout-accordion-separated"></i> Create new step
            </a> */}
            {/* <a href="javascript:void(0);" onClick={finishForm}  className='btn btn-primary'>
             <i className="ti-check"></i> Publish Form
            </a> */}
            </div>
          <div className="form-navigation">
          
          </div>
        <div className="container-fluid ">
        <div className="preview-form-header">
                <div className="steps-wrapper no-psudo">
                      {/* <div className="step active">
                        
                            <div class="dashboard-item ">
                            <div class="action-btn-wrapper"><button class="btn btn-sm del_btn btn-danger"> <i class="ti-trash"></i> </button></div>
                              <div class="dashboard-item-icon"><i class="ti-layout-accordion-separated"></i></div><div class="dashboard-item-content"><h6>{firstSteps.title}</h6><p>{firstSteps.description}</p>
                            
                            </div></div>
                          </div> */}
                      {
                        
                    multiStepforms && multiStepforms.map(multiStepform=>{
                      return(  
                          <div className="step">
                             
                            <div class="dashboard-item ">
                            <div class="action-btn-wrapper"><button class="btn btn-sm del_btn btn-danger" onClick={deleteStepper(multiStepform._id)}> <i class="ti-trash"></i> </button></div>
                              <div class="dashboard-item-icon"><i class="ti-layout-accordion-separated"></i></div><div class="dashboard-item-content"><h6>{multiStepform.title}</h6><p>{multiStepform.description}</p>
                 
                            </div></div>
                          </div>
                    )
                  })
                }      
                  </div>
                </div> 
               
            <div className="row">
              <div className="col-12 col-sm-3 form-Builder-wrapper">
                <FormBuilder onSave={handleFormSubmit} formState={form} onChange={onFormBuilderUpdate} />
              </div>
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

export default Stepper;