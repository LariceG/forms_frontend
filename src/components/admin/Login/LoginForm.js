import React, {Component} from 'react'
import '../../../css/style.css'
import './style.css'


class LoginForm extends Component{
  // Login form
state = {
  email: '',
  pass: '',
  error: {}
};

changeHandler = (e) => {
  const error = this.state.error;
  error[e.target.name] = ''

  this.setState({
      [e.target.name]: e.target.value,
      error
  })
};

subimtHandler = (e) => {
  e.preventDefault();
  //var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const {
      email,
      pass,
      error } = this.state;

  if (email === '') {
      error.email = "Please enter your email";
  }
  // if(email.match(mailformat))
  // {
  //   error.email = "Please enter valid email";
  // }
  if (pass === '') {
      error.pass = "Please enter your password";
  }
  if (error) {
      this.setState({
          error
      })
  };
  if (error.email === '' && error.pass === '') {
      this.setState({        
          email: '',
          pass: '',
          error: {}
      })
      console.log("success");
  }
};

render(){
  const {
      error } = this.state;

  return (
    <div className="login-form-wrapper">
      <div className="login-form">
        <form action="#" className='form' onSubmit={this.subimtHandler}>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                
                <input type="text" name="email" id="" onChange={this.changeHandler} className="form-control" placeholder=' Email Address' />
                <p className='error'>{error.email ? error.email : ''}</p>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group ">
                
                <input type="password" name="pass" onChange={this.changeHandler} className="form-control" placeholder='Password' />
                <p className='error'>{error.pass ? error.pass : ''}</p>
              </div>
            </div>
            {/* spacing */}
            <div className="py-2">&nbsp;</div>
            {/* spacing */}
            <div className="col-md-12">              
                <button type="submit" className="theme-btn btn-block">Login Now</button>            
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
}


export default LoginForm;