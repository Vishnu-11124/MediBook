import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'

const DoctorDashboard = () => {
  const {dashboardData, getDashboardData, dToken} = useContext(DoctorContext)

  useEffect(() => {
    if(dToken){
      getDashboardData()
    }
  }, [dToken])

  console.log("data",dashboardData)

  return dashboardData && (
    <div>
      
    </div>
  )
}

export default DoctorDashboard
