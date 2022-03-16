import React, { useState } from 'react'
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
  const history = useHistory();
  const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
  
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
              <ReactFormBuilder
                      edit 
                      data={form}
                      //toolbarItems={items}
                      customToolbarItems={items}
                      onChange={handleUpdate}
                      onSubmit={handleSubmit}
                      onPost={handleSubmit}
                      renderEditForm={props => <FormElementsEdit {...props}/>}
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
    toolbarItems={items}
    onChange={handleUpdate}
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