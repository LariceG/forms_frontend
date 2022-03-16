import React from 'react'
import Header from '../../components/admin/Header';
import {Link} from 'react-router-dom'
import 'react-form-builder-component/dist/index.css'


export const Thankyou = () => {
  return (
      <>
      <Header/>
      <div className="dashboard-wrapper d-block">      
          {/* Thankyou starts */}
          <div className="thankyou-wrapper">
            <div className="container">
                <div className="row">
                    <div className="col-6 offset-md-3">
                          <div className="card">
                            <div className="card-body">
                                <div className="thankyou-icon">                                  
                                  <i className="ti-check"></i>
                                  </div>
                                  <div className="thankyou-text">                                  
                                  <h2>Thankyou !</h2>
                                  <p>Your form has been submitted successfully.</p>
                                  <br />
                                  <Link to="/dashboard" className="btn btn-outline-secondary "> <i className='ti-arrow-left'></i> &nbsp; Back to Dashboard</Link>
                                  <br />
                                  </div>
                              </div>
                          </div>
                    </div>
                  </div>
              </div>
            </div>
      </div>      
      </>
    
  )
}

export default Thankyou;
