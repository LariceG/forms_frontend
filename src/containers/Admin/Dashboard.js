import React from 'react'
import Header from '../../components/admin/Header'
import Sidebar from '../../components/admin/Sidebar'
import DashboardContent from '../../components/admin/DashboardContent'

export const Dashboard = () => {
  return (
      <>
      <Header />
      <div className="dashboard-wrapper">
      <Sidebar />
      <DashboardContent layout="with-sidebar"/>
      </div>      
      </>    
  )
}

export default Dashboard;
