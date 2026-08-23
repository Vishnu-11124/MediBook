import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const DoctorDetails = () => {
  const { token, backendUrl } = useContext(AdminContext);

  const { doctorId } = useParams();

  const [doctorData, setDoctorData] = useState(null);
  const [availability, setAvailability] = useState(null);

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
      <div>
        <h1>doctor</h1>
      </div>
    )
  );
};

export default DoctorDetails;
