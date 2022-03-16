import React from 'react'
import {Link}  from 'react-router-dom'
import LoginForm from '../../components/admin/Login/LoginForm'
import '../../css/admin.css'
import Logo from '../../images/logo2.png'

var sectionStyle = {
  width: "100%",
  backgroundImage: "url(' https://via.placeholder.com/700 ')",
};

const Login =() => {
  return (
      <>
      <div className="login-wrapper">
        <div className="row no-gutters">
          <div className="col-md-6  login-left-wrapper">
          <div className="login-header">
            <div className="brand">
            <Link to="/home">
            <img src={Logo} alt="" />
            </Link>              
            </div>
            </div>
            <div className="login-left">            
            <div className='section-title'>
              <h2>Admin Login</h2>
            </div>
            <LoginForm />
        </div>
          </div>

          <div className="col-md-6 login-right-wrapper" style={sectionStyle} >
            <div className="login-right">

            </div>
          </div>
        </div>
        
      
      </div>      
      </>    
  )
};

export default Login; 