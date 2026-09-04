import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import axios from "axios";
import { CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext);
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [historyAppointments, setHistoryAppointments] = useState([]);
  const [openHistory, setOpenHistory] = useState(false);

  console.log("data:", historyAppointments)
  const getAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const appointments = data.data;
      console.log(data.data)

      setAppointments(
        appointments.filter(
          (appointment) =>
            appointment.status === "pending" ||
            appointment.status === "confirmed",
        ),
      );

      setHistoryAppointments(
        appointments.filter(
          (appointment) =>
            appointment.status === "completed" ||
            appointment.status === "cancelled",
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.put(
        backendUrl + "/api/user/appointments/cancel-appointment",
        { appointmentId },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        console.log(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAppointments();
  }, [token]);

  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      {/* Heading */}
      <div className="mb-8">
        <span className="inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-600">
          My Bookings
        </span>

        <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          {/* Heading */}
          <div>
            <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              {openHistory ? "Appointment History" : "My Appointments"}
            </h1>

            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              {openHistory
                ? "View your previous doctor appointments."
                : "View and manage your upcoming doctor appointments."}
            </p>
          </div>

          {/* Toggle button */}
          <button
            onClick={() => setOpenHistory(!openHistory)}
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-blue-100 transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-100"
          >
            {openHistory ? "View Bookings" : "View History"}
          </button>
        </div>
      </div>

      {appointments.length === 0 && !openHistory ? (
        <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-white rounded-xl border border-gray-100">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-50 mb-4">
            <CalendarDays className="w-7 h-7 text-gray-400" />
          </div>

          <h2 className="text-lg font-medium text-gray-800">
            No appointments found
          </h2>

          <p className="text-sm text-gray-500 mt-2 max-w-sm">
            You don't have any upcoming appointments. Book an appointment with a
            doctor to get started.
          </p>

          <button
            onClick={() => navigate("/doctors")}
            className="mt-6 px-6 py-2.5 text-sm text-white bg-black rounded-lg hover:bg-primary/90 transition"
          >
            Book an Appointment
          </button>
        </div>
      ) : openHistory ? (
        <div className="space-y-6">
          {historyAppointments.map((doc) => (
            <div
              key={doc._id}
              className="rounded-3xl border border-slate-200 bg-white p-6 transition hover:border-blue-200 hover:shadow-md"
            >
              <div className="flex items-center gap-6">
                {/* Doctor Image - Left */}
                <div className="shrink-0">
                  <img
                    src={doc.doctorId.image}
                    alt={doc.doctorId.name}
                    className="h-32 w-32 rounded-2xl bg-blue-50 object-cover"
                  />
                </div>

                {/* Details - Right */}
                <div className="flex flex-1 flex-col gap-2">
                  {/* Doctor Name */}
                  <h2 className="text-xl font-bold text-slate-900">
                    {doc.doctorId.name}
                  </h2>

                  {/* Speciality */}
                  <p className="font-medium text-blue-600">
                    {doc.doctorId.speciality}
                  </p>

                  {/* Appointment Date */}
                  <p className="mt-2 text-sm text-slate-600">
                    <span className="font-semibold text-slate-800">
                      Appointment Date:
                    </span>{" "}
                    {doc.slotDate}
                  </p>

                  {/* Status */}
                  <span
                    className={`mt-1 w-fit rounded-full px-3 py-1 text-xs font-medium ${
                      doc.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {doc.status === "completed"
                      ? "Appointment Completed"
                      : "Appointment Cancelled"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {appointments.map((doc) => (
            <div
              key={doc.doctorId._id}
              className="rounded-3xl border border-slate-200 bg-white p-6 transition hover:border-blue-200 hover:shadow-md"
            >
              <div className="flex flex-col gap-6 md:flex-row">
                {/* Doctor Image */}
                <div className="flex justify-center md:block">
                  <img
                    src={doc.doctorId.image}
                    alt={doc.doctorIdname}
                    className="h-40 w-40 rounded-2xl bg-blue-50 object-cover"
                  />
                </div>

                {/* Doctor Details */}
                <div className="flex-1">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold text-slate-900">
                      {doc.doctorId.name}
                    </h2>

                    <p className="font-medium text-blue-600">
                      {doc.doctorId.speciality}
                    </p>

                    <span className="w-fit rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                      Appointment Confirmed
                    </span>
                  </div>

                  {/* <div className="mt-6 space-y-2 text-slate-600">
                  <p className="font-semibold text-slate-900">Clinic Address</p>

                  <p>{doc.address.line1}</p>

                  <p>{doc.address.line2}</p>
                </div> */}

                  <div className="mt-6 rounded-xl bg-slate-50 px-4 py-3">
                    <p className="text-sm text-slate-600">
                      <span className="font-semibold text-slate-900">
                        Appointment
                      </span>
                    </p>

                    <p className="mt-1 font-medium text-slate-800">
                      {doc.slotDate} <span className="mx-2">|</span> {doc.slotTime}
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col justify-end gap-3 md:w-52">
                  <button className="rounded-xl bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700">
                    Pay Online
                  </button>

                  <button
                  onClick={() => cancelAppointment(doc._id)}
                   className="rounded-xl border border-red-200 py-3 font-medium text-red-600 transition hover:bg-red-50">
                    Cancel Appointment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyAppointments;
