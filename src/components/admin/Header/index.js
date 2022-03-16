import React from 'react'
import {Link}  from 'react-router-dom'
import Logo from '../../../images/logo.png'
import './style.css'



function userSide(e){
    e.preventDefault();
    console.log('You opened userSide');
    var userside = document.getElementById("userSide");
    var backDrop = document.getElementById("backDrop");
    userside.classList.add("open");
    backDrop.classList.add("active");
};

function closeUserSide(e){
    e.preventDefault();
    console.log('You Closed userSide');
    var userside = document.getElementById("userSide");
    var backDrop = document.getElementById("backDrop");
    userside.classList.remove("open");
    backDrop.classList.remove("active");
};

export const Header = () => {

  return (
      <>
    <header>
        <nav className="navbar navbar-expand-md bg-dark navbar-dark">        
        <Link className='navbar-brand' to="/dashboard" title=""><img src={Logo} alt=""/></Link>       
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span className="navbar-toggler-icon"></span>
        </button>        
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
            {/* <ul className="navbar-nav">
            <li className="nav-item">
            <Link className='nav-link' to="/dashboard" title="">Campaigns</Link>               
            </li>
            <li className="nav-item">
            <Link className='nav-link' to="/dashboard" title="">Business Settings</Link>
            </li>            
            </ul> */}
            <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <a className="nav-link user-profile" href="/" onClick={userSide} > <span className=""> <i className="ti-bag"></i> </span> John Doe</a>
            </li>                    
            </ul> 
        </div>
        </nav>
    </header>
    {/* Userside starts */}
    <div id="backDrop"></div>
    <div className="userside" id='userSide'>
        <div className="userside-header">
            <div className="text-right">
                <a href="/" onClick={closeUserSide} id="closeSide" > <i className='ti-close'></i> </a>
            </div>
        </div>
        <div className="userside-body">
        <ul className="nav flex-column">
        <li className="nav-item">
            <h6 className='pl-3'>Settings</h6>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="#">Profile Settings</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="#">Logout</a>
        </li>        
        </ul>
        </div>
        <div className="userside-footer">
            
        </div>
    </div>
    {/* Userside ends */}
    </>
  )
}

export default Header;