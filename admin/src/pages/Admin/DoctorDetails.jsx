import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {X} from 'lucide-react'

const DoctorDetails = () => {
  const { token, backendUrl } = useContext(AdminContext);

  const { doctorId } = useParams();
  const navigate = useNavigate();

  const [doctorData, setDoctorData] = useState(null);
  const [availability, setAvailability] = useState(null);
  const [formOpen, setFormOpen] = useState(false)

  const getDoctorDetails = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + `/api/admin/doctors/${doctorId}/doctor-details`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.success) {
        // console.log("data:", availability);
        setDoctorData(data?.data?.doctorData);
        setAvailability(data?.data?.availability);
      } else {
        toast.error(data.message);
        console.log("Error:", data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log("Error:", error.message);
    }
  };

  useEffect(() => {
    getDoctorDetails();
  }, [doctorId, token]);

  return (
    doctorData && (
      <div className="w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <button
            onClick={() => navigate("/doctor-list")}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition"
          >
            ← Back to Doctors
          </button>
        </div>

        <hr className="border-gray-200 mb-6" />

        {/* Main Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* ================= Doctor Details ================= */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            {/* Profile Header */}
            <div className="p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5">
              {/* Doctor Image */}
              <div className="w-28 h-28 sm:w-32 sm:h-32 shrink-0">
                <img
                  src={doctorData.image}
                  alt={doctorData.name}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              {/* Basic Information */}
              <div className="text-center sm:text-left">
                <h2 className="text-xl font-semibold text-gray-800">
                  {doctorData.name}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {doctorData.speciality}
                </p>

                <div className="flex items-center justify-center sm:justify-start gap-2 mt-3">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      doctorData.available ? "bg-green-500" : "bg-gray-400"
                    }`}
                  />

                  <span className="text-sm text-gray-600">
                    {doctorData.available ? "Available" : "Not available"}
                  </span>
                </div>
              </div>
            </div>

            {/* Doctor Information */}
            <div className="border-t border-gray-100 px-6 py-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-4">
                Professional Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-400">Degree</p>

                  <p className="text-sm text-gray-700 mt-1">
                    {doctorData.degree}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">Experience</p>

                  <p className="text-sm text-gray-700 mt-1">
                    {doctorData.experience}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">Consultation Fee</p>

                  <p className="text-sm text-gray-700 mt-1">
                    ₹{doctorData.fees}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">Email</p>

                  <p className="text-sm text-gray-700 mt-1 break-all">
                    {doctorData.email}
                  </p>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="border-t border-gray-100 px-6 py-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">
                About Doctor
              </h3>

              <p className="text-sm text-gray-500 leading-6">
                {doctorData.about}
              </p>
            </div>
          </div>

          {/* ================= Availability ================= */}
          <div className="bg-white border border-gray-200 rounded-xl">
            {availability ? (
              <div>
                {/* Your availability UI will go here */}
                <p className="p-6">Doctor availability</p>
              </div>
            ) : (
              <div className="min-h-[300px] flex flex-col items-center justify-center text-center p-6">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <span className="text-xl">+</span>
                </div>

                <h3 className="text-base font-semibold text-gray-800">
                  Availability not configured
                </h3>

                <p className="text-sm text-gray-500 mt-2 max-w-xs">
                  Add the doctor's weekly working hours to allow appointments to
                  be scheduled.
                </p>

                <button onClick={() => setFormOpen(open)} className="mt-5 px-5 py-2.5 rounded-lg bg-gray-900 text-white text-sm hover:bg-gray-800 transition">
                  Add Availability
                </button>
              </div>
            )}
          </div>
        </div>
        {
          formOpen && 
          <div>
            <div>
              <h2>Doctor Availability</h2>
              <div>
                <X onClick={() => setFormOpen(false)} />
              </div>
            </div>
            {/* form content */}
          </div>
        }
      </div>
    )
  );
};

export default DoctorDetails;
