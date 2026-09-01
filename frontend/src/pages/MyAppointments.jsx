import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import axios from "axios";

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);
  const [openHistory, setOpenHistory] = useState(false)

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setAppointments(data?.data);
      } else {
        console.log(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to fetch appointments");
    }
  };

  useEffect(() => {
    getUserAppointments();
  }, [token]);

  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      {/* Heading */}
      <div className="mb-8">
        <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-600">
          My Bookings
        </span>

        <div>
          <div>
            {openHistory ? (
              <div>
                <h1 className="mt-4 text-4xl font-bold text-slate-900">
                  My Appointments
                </h1>

                <p className="mt-2 text-slate-600">
                  View and manage your upcoming doctor appointments.
                </p>
              </div>
            ) : (
              <div>
                <h1 className="mt-4 text-4xl font-bold text-slate-900">
                  My Appointments
                </h1>

                <p className="mt-2 text-slate-600">
                  View and manage your upcoming doctor appointments.
                </p>
              </div>
            )}
          </div>
          <div>
            {openHistory ? (
              <button onClick={() => setOpenHistory(false)}>Bookings</button>
            ) : (
              <button onClick={() => setOpenHistory(true)}>History</button>
            )}
          </div>
        </div>
      </div>

      {appointments.length === 0 ? (
        <div>
          <p>You have no upcoming appointments.</p>
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
                      25 July 2026 • 09:30 AM
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col justify-end gap-3 md:w-52">
                  <button className="rounded-xl bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700">
                    Pay Online
                  </button>

                  <button className="rounded-xl border border-red-200 py-3 font-medium text-red-600 transition hover:bg-red-50">
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
