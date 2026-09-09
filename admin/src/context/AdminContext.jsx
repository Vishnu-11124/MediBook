import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : "",
  );
  const [doctors, setDoctors] = useState([]);
  const [appointmentsList, setAppointmentsList] = useState([]);
  const [dashboardData, setDashboardData] = useState(false)
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/all-doctors", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        setDoctors(data?.data);
        console.log(data?.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/admin/all-appointments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.success) {
        setAppointmentsList(data?.data);
      } else {
        toast.error(data.message);
        console.log(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  const getDashboardData = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/admin/dashboard-data",
        { headers: { Authorization: `Bearer ${token}` } },
      );
      console.log("dashboard data", data);
      if (data.success) {
        setDashboardData(data?.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const value = {
    token,
    setToken,
    backendUrl,
    doctors,
    getAllDoctors,
    appointmentsList,
    setAppointmentsList,
    getAllAppointments,
    dashboardData,
    getDashboardData
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
