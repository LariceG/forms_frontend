import React from 'react'
import {NavLink}  from 'react-router-dom'
import './style.css'

export const Sidebar = () => {
  return (
    <>
    <div className="sidebar-wrapper">
        <div className="sidebar-content">
        <ul className="nav flex-column">
        <li className="nav-item">
            <h6>Dashboard</h6>
        </li>
        <li className="nav-item">
        <NavLink className='nav-link' to="/form-builder" activeClassName="active" title="">Form Builder</NavLink> 
        </li>
        {/* <li className="nav-item">
            <a className="nav-link" href="javascript:void(0);">Link</a>
        </li>         */}
        </ul>

        {/* <ul className="nav flex-column">
        <li className="nav-item">
            <h6>Business Settings</h6>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="javascript:void(0);">Link</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="javascript:void(0);">Link</a>
        </li>        
        </ul> */}
        </div>
    </div>
    </>
  )
}

export default Sidebar;