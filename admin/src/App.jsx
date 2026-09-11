import React, { useContext } from "react";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Admin/Dashboard";
import AllAppointments from "./pages/Admin/AllAppointments";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorsList from "./pages/Admin/DoctorsList";
import LeaveRequests from "./pages/Admin/LeaveRequests";
import DoctorDetails from "./pages/Admin/DoctorDetails";
import { DoctorContext } from "./context/DoctorContext";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
import DoctorProfile from "./pages/Doctor/DoctorProfile";
import LeaveApplications from "./pages/Doctor/LeaveApplications";

const App = () => {
  const { token } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return token || dToken ? (
    <div className="min-h-screen bg-slate-50">
      <ToastContainer />

      {/* Navbar */}
      <Navbar />

      {/* Sidebar + Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Page Content */}
        <main className="flex-1 min-w-0 p-5 sm:p-8">
          <Routes>
            {/* Admin Route */}
            <Route path="/" element={<></>} />
            <Route path="/admin-dashboard" element={<Dashboard />} />
            <Route path="/all-appointments" element={<AllAppointments />} />
            <Route path="/add-doctor" element={<AddDoctor />} />
            <Route path="/doctor-list" element={<DoctorsList />} />
            <Route path="/leave-requests" element={<LeaveRequests />} />
            <Route path="/doctor-list/:doctorId" element={<DoctorDetails />} />

            {/* Doctor Route */}
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
            <Route
              path="/doctor-appointments"
              element={<DoctorAppointments />}
            />
            <Route path="/doctor-profile" element={<DoctorProfile />} />
            <Route
              path="/doctor-leave-applications"
              element={<LeaveApplications />}
            />
          </Routes>
        </main>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
};

export default App;
