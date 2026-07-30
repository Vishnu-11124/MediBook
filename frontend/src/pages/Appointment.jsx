import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Appointment = () => {
  const {docId} = useParams()
  const {doctors} = useContext(AppContext)
  const [docInfo, setDocInfo] = useState(null)

  const [docSlot, setDocSlot] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const currentDoctor = async () => {
    setDocInfo(doctors.find(doc => doc._id === docId))
  }

  const getAvailableSlots = async () => {
    setDocSlot([])

    let today = new Date()

    for(let i = 0; i<7; i++){
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21,0,0,0)

      if(today.getDate() === currentDate.getDate()){
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10 )
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []

      while(currentDate < endTime){
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime
        })

        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      setDocSlot(prev => ([...prev, timeSlots]))
    }
  }

  useEffect(() => {
    currentDoctor()
  },[docId, doctors])

  useEffect(() => {
    getAvailableSlots()
  }, [docInfo])

  useEffect(() => {
    console.log(docSlot)
  }, [docSlot])

  return docInfo && (
    <div>
      {/* doctor info */}
      <div>
        <div>
          <img src={docInfo.image} alt="" />
        </div>

        <div>
          <p>{docInfo.name}</p>
          <div>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <span>{docInfo.experience}</span>
          </div>

          <div>
            <p>About</p>
            <p>{docInfo.about}</p>
          </div>
          <p>Appointment fee: <span>{docInfo.fees}</span></p>
        </div>
      </div>

    </div>
  )
}

export default Appointment
