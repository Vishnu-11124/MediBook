import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import DoctorCard from '../components/DoctorCard'

const Doctors = () => {

  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])

  const { doctors } = useContext(AppContext)

  const applyFilter = () => {
  setFilterDoc(
    speciality
      ? doctors.filter((doc) => doc.speciality === speciality)
      : doctors
  );
};

  useEffect(() => {
    applyFilter()
  },[doctors,speciality])


  return (
    <div>
      <p>Browse through the doctors specialist.</p>
      <div>
        <div>
          <p>General physician</p>
          <p>Gynecologist</p>
          <p>Dermatologist</p>
          <p>Pediatricians</p>
          <p>Neurologist</p>
          <p>Gastroenterologist</p>
        </div>
        <div>
          {
            filterDoc.map((doctor) => (
              <DoctorCard key={doctor._id} doctor={doctor} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Doctors
