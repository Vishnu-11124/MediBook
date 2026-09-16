import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'

const DoctorProfile = () => {
  const {profileData, dToken, getProfileData, setProfileData, backendUrl} = useContext(DoctorContext)
  console.log("User:", profileData)

  useEffect(() => {
    if(dToken){
      getProfileData()
    }
  },[dToken])
  
  return (
    <div>
      
    </div>
  )
}

export default DoctorProfile
