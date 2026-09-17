import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : "",
  );

  const [appointmentsList, setAppointmentsList] = useState([]);
  const [appointmentHistory, setAppointmentHistory] = useState([]);
  const [dashboardData, setDashboardData] = useState(false);
  const [profileData, setProfileData] = useState(false);
  const [leaveList, setLeaveList] = useState([])

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/doctor/appointmentslist",
        { headers: { Authorization: `Bearer ${dToken}` } },
      );
      if (data.success) {
        const appointments = data.data;
        setAppointmentsList(
          appointments.filter(
            (appointment) =>
              appointment.status === "pending" ||
              appointment.status === "confirmed",
          ),
        );

        setAppointmentHistory(
          appointments.filter(
            (appointment) =>
              appointment.status === "completed" ||
              appointment.status === "cancelled",
          ),
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getDashboardData = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/doctor/dashboard-data",
        { headers: { Authorization: `Bearer ${dToken}` } },
      );
      if (data.success) {
        setDashboardData(data?.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getProfileData = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/doctor/doctor-profile",
        { headers: { Authorization: `Bearer ${dToken}` } },
      );
      if (data.success) {
        setProfileData(data?.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getLeaveList = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/doctor/leave-request-list",
        { headers: { Authorization: `Bearer ${dToken}` } },
      );
      if (data.success) {
        setLeaveList(data?.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    backendUrl,
    dToken,
    setDToken,
    appointmentsList,
    getAppointments,
    setAppointmentsList,
    appointmentHistory,
    setAppointmentHistory,
    dashboardData,
    setDashboardData,
    getDashboardData,
    profileData,
    setProfileData,
    getProfileData,
    leaveList,
    getLeaveList
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
