import React, { useState, useEffect } from 'react'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link, useHistory} from 'react-router-dom'
import { ReactFormBuilder, FormElementsEdit, ReactFormGenerator } from 'react-form-builder2';
import Modal from 'react-bootstrap/Modal';

import Button from 'react-bootstrap/Button';
import 'react-form-builder2/dist/app.css';
import './style.css'
import 'react-form-builder-component/dist/index.css'
import FormBuilderHeader from '../FormBuilderHeader'
toast.configure();

const items = [{
  key: 'Header',
  name: 'Header Text',
  icon: 'fa fa-header',
  static: true,
  content: 'Placeholder Text...'
},
{
  key: 'Paragraph',
  name: 'Paragraph',
  static: true,
  icon: 'fa fa-paragraph',
  content: 'Placeholder Text...'
}];

const FormBuilderApp = (props) => {
  const [form, setFormState] = useState([])
  const [formData, setFormStateData] = useState([])
  const history = useHistory();
  const [show, setShow] = useState(false);
  useState(() => {
    setFormState([{"id":"2A359B61-9545-407B-9D25-66FCBF051594","element":"Header","text":"Header Text","static":true,"required":false,"bold":true,"italic":true,"content":"First demo form ","canHavePageBreakBefore":true,"canHaveAlternateForm":true,"canHaveDisplayHorizontal":true,"canHaveOptionCorrect":true,"canHaveOptionValue":true,"canPopulateFromApi":true,"dirty":false},{"id":"A6A0A5B0-A528-47C3-8B16-F4BFCB7F795C","element":"TextInput","text":"Text Input","required":true,"canHaveAnswer":true,"canHavePageBreakBefore":true,"canHaveAlternateForm":true,"canHaveDisplayHorizontal":true,"canHaveOptionCorrect":true,"canHaveOptionValue":true,"canPopulateFromApi":true,"field_name":"text_input_C5B1950F-03E7-46F3-8E9D-A5FEF76293A2","label":"Username ","dirty":false},{"id":"B08ECB9E-676C-4704-BCBD-C3B7940CEB45","element":"NumberInput","text":"Number Input","required":true,"canHaveAnswer":true,"canHavePageBreakBefore":true,"canHaveAlternateForm":true,"canHaveDisplayHorizontal":true,"canHaveOptionCorrect":true,"canHaveOptionValue":true,"canPopulateFromApi":true,"field_name":"number_input_245540CA-E0EF-4035-B28D-2CBBC6D73741","label":"Phone number ","dirty":false}])
  }, []);
    
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
const publishForm = () => {
  console.log(formData.task_data);
  var details = {
    // 'title': form.title,
    // 'description': form.description,
    'form_type': 'simple',
    'content': JSON.stringify(formData.task_data)
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
//    console.log(form);
  fetch('http://localhost:3001/api/forms/create', {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: formBody
 })
.then(response => {
    console.log(response.json());
    toast('Form created successfully')
    history.push("/dashboard");

});
}
  const handleUpdate = (payload) => {
    // handle form submit action
    
    setFormState(payload)
    console.log(payload);
    console.log("Form Submitted");
  }
  
  const handlePreviewSubmit = (payload) => {
    // handle form submit action
    console.log(payload);
    console.log("Form Submitted");
  }
  const handleSubmit = (payload) => {
    // handle form submit action
    setFormState(payload.task_data)
    console.log(payload);
    console.log("User Form Submitted");
  }
  
  return <>
  <div className={`formBuilder-wrapper ${props.layout}`}>
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
          <div className="form-navigation">
            <FormBuilderHeader />
          </div>
        <div className="container-fluid ">
            <div className="row">
              <div class="col-md-12">
              <Button variant="primary btn-sm" onClick={handleShow}>
        Preview Form
      </Button>
      &nbsp;&nbsp;
      <Button variant="primary btn-sm" onClick={publishForm}>
        Publish Form
      </Button>
              <ReactFormBuilder
                      edit 
                      data={form}
                      customToolbarItems={items}
                      onChange={handleUpdate}
                      onSubmit={handleSubmit}
                      onPost={handleSubmit}
                  />
                </div>
             
            </div>
          </div>
       </div>
       <Modal show={show} onHide={handleClose} class="modal-lg">
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <ReactFormGenerator
    data={form}
    onSubmit={handlePreviewSubmit}
    submitButton={<button type={"submit"} className={"btn btn-primary"}>Submit</button>}
/>
          </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
         
        </Modal.Footer>
      </Modal>
    </div>
  </>
  
}

export default FormBuilderApp;