import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { CalendarDays, Clock, UserRound, Stethoscope } from "lucide-react";

const AllAppointments = () => {
  const { appointmentsList, token, getAllAppointments } =
    useContext(AdminContext);

  useEffect(() => {
    if (token) {
      getAllAppointments();
    }
  }, [token]);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">
            All Appointments
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            View all appointments booked through MediBook
          </p>
        </div>

        {/* Appointment Count */}
        <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm">
          <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center">
            <CalendarDays
              size={18}
              strokeWidth={1.7}
              className="text-slate-600"
            />
          </div>

          <div>
            <p className="text-xs text-slate-400">Total Appointments</p>

            <p className="text-lg font-semibold text-slate-800 leading-tight">
              {appointmentsList.length}
            </p>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px]">
            {/* Table Header */}
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  #
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Doctor
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Speciality
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Patient
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Date
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Time
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-100">
              {appointmentsList.length > 0 ? (
                appointmentsList.map((data, i) => (
                  <tr
                    key={data._id || i}
                    className="hover:bg-slate-50/70 transition"
                  >
                    {/* Number */}
                    <td className="px-5 py-4 text-sm text-slate-400">
                      {i + 1}
                    </td>

                    {/* Doctor */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                          <Stethoscope
                            size={17}
                            strokeWidth={1.7}
                            className="text-slate-500"
                          />
                        </div>

                        <p className="text-sm font-medium text-slate-700">
                          {data.doctorId?.name}
                        </p>
                      </div>
                    </td>

                    {/* Speciality */}
                    <td className="px-5 py-4">
                      <span className="text-sm text-slate-500">
                        {data.doctorId?.speciality}
                      </span>
                    </td>

                    {/* Patient */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <UserRound
                          size={16}
                          strokeWidth={1.7}
                          className="text-slate-400"
                        />

                        <span className="text-sm font-medium text-slate-700">
                          {data.userId?.name}
                        </span>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <CalendarDays
                          size={16}
                          strokeWidth={1.7}
                          className="text-slate-400"
                        />
                        {data.slotDate}
                      </div>
                    </td>

                    {/* Time */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Clock
                          size={16}
                          strokeWidth={1.7}
                          className="text-slate-400"
                        />
                        {data.slotTime}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          data.status === "completed"
                            ? "bg-slate-100 text-slate-700"
                            : data.status === "cancelled"
                              ? "bg-slate-100 text-slate-400"
                              : "bg-slate-50 text-slate-500 border border-slate-200"
                        }`}
                      >
                        {data.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-5 py-16 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                        <CalendarDays
                          size={22}
                          strokeWidth={1.7}
                          className="text-slate-400"
                        />
                      </div>

                      <p className="text-sm font-medium text-slate-600">
                        No appointments found
                      </p>

                      <p className="text-xs text-slate-400 mt-1">
                        Appointments will appear here once they are booked.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllAppointments;
