import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import {Link}  from 'react-router-dom'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
export const DashboardContent = (props) => {
  const [forms,setForms] = useState([])
  const [multiStepforms,setMultiStepForms] = useState([])
  useEffect(() => {
    fetchForms();
  }, []);
  useEffect(() => {
    // console.log(forms)
    // console.log(multiStepforms)
  }, [forms]);
  const fetchForms=async()=>{
    const response=await Axios('http://localhost:3001/api/forms');
    setForms(response.data.simple_forms)   
    setMultiStepForms(response.data.multi_step_forms)   
  }
  const deleteForm = value => (e) =>{
    e.preventDefault();
    if (window.confirm("Are you sure?")) {
      fetch('http://localhost:3001/api/forms/delete/'+value, {
      method: "GET"
   })
  .then(response => {
    fetchForms();
      toast('Form deleted successfully')

});
      
    }
  };
  return (
    
    <div className={`dashboard-content-wrapper ${props.layout}`} >
      <div className="container">
      <div className="dashboard-header">
            <h2>Dashboard</h2>
            <Link to="/form-builder" className='btn btn-primary'>
             <i className="ti-layout-accordion-separated"></i> Create new form
            </Link>
        </div>
        <div className="dashboard-body pt-4">

          <div className="tabs-wrapper">
          {/* <!-- Nav tabs --> */}
          <Tabs defaultActiveKey="simpleFormTab" id="uncontrolled-tab-example" className="mb-4">
          <Tab eventKey="simpleFormTab" title=" Simple Forms">
          {/* <h2>Simple Forms</h2>   */}
          <div className="row"> 
          {
            forms && forms.map(form=>{
              return(  
            <div key="{form._id}" className="col-md-4">
              <div className='dashboard-item mb-4'> 
                <div className="dashboard-item-icon">                  
                  <i className='ti-layout-accordion-separated'></i>
                </div>
                <div className="dashboard-item-content">
                  <h5>{form.title}</h5>
                  <p>{form.description}</p>
                  <div className="action-btn-wrapper">
                  <Link to={`/forms/${form._id}`} target="_blank" className="btn btn-sm preview_btn btn-dark"> <i className="ti-eye"></i> &nbsp;Preview</Link>
                    
                    {/* <button className="btn btn-sm edit_btn btn-primary"> <i className="ti-pencil"></i> &nbsp;Edit </button> */}
                    <button className="btn btn-sm del_btn btn-danger" onClick={deleteForm(form._id)}> <i className="ti-trash"></i> &nbsp;Delete </button>
                  </div>
                </div>
               </div>
            </div>
              )
            })
          }
          </div>
          </Tab>
          <Tab eventKey="multiFormTab" title="Multi Step Forms">
          {/* <h2>Multi Step Forms</h2>   */}
          <div className="row">
          {
            multiStepforms && multiStepforms.map(multiStepform=>{
              return(  
            <div key="{multiStepforms._id}" className="col-md-4">
              <div className='dashboard-item mb-4'> 
                <div className="dashboard-item-icon">                  
                  <i className='ti-layout-accordion-separated'></i>
                </div>
                <div className="dashboard-item-content">
                  <h5>{multiStepform.title}</h5>
                  <p>{multiStepform.description}</p>
                  <div className="action-btn-wrapper">
                  <Link to={`/multi-step-forms/${multiStepform._id}`} target="_blank" className="btn btn-sm preview_btn btn-dark"> <i className="ti-eye"></i> &nbsp;Preview</Link>
                    
                    {/* <button className="btn btn-sm edit_btn btn-primary"> <i className="ti-pencil"></i> &nbsp;Edit </button> */}
                    <button className="btn btn-sm del_btn btn-danger" onClick={deleteForm(multiStepform._id)}> <i className="ti-trash"></i> &nbsp;Delete </button>
                  </div>
                </div>
               </div>
            </div>
              )
            })
          }
           </div> 
          </Tab>          
        </Tabs>
          





         

          
          
          </div>
          
        </div>
      </div>
        
    </div>
  )
};

export default DashboardContent;
