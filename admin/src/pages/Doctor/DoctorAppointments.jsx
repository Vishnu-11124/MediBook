import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";
import { useState } from "react";

const DoctorAppointments = () => {
  const { appointmentsList, dToken, getAppointments, appointmentHistory } =
    useContext(DoctorContext);

  const [history, setHistory] = useState(false);

  console.log("data:", appointmentsList);
  console.log("History:", appointmentHistory);

  const ageCalculator = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    appointmentsList && (
      <div className="w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h3 className="text-2xl font-semibold text-slate-800">
              {history ? "Appointment History" : "Upcoming Appointments"}
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              {history
                ? "View your previous patient appointments"
                : "View and manage your upcoming appointments"}
            </p>
          </div>

          <button
            onClick={() => setHistory(!history)}
            type="button"
            className="
            flex items-center justify-center
            px-4 py-2.5
            text-white
            border border-slate-200
            rounded-lg
            text-sm font-medium
            bg-slate-700
            transition
            cursor-pointer
          "
          >
            {history ? "Appointments" : "History"}
          </button>
        </div>

        <hr className="border-slate-200 mb-6" />

        <div>
          {history ? (
            // history
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[850px]">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                        #
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                        Patient
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                        Slot Date
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                        Slot Time
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                        Gender
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                        Age
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {appointmentHistory.map((data, i) => (
                      <tr
                        key={data._id}
                        className="hover:bg-slate-50/70 transition"
                      >
                        {/* Number */}
                        <td className="px-5 py-4 text-sm text-slate-500">
                          {i + 1}
                        </td>

                        {/* Patient */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={data.userId.image}
                              alt="patient image"
                              className="w-10 h-10 rounded-full object-cover"
                            />

                            <p className="text-sm font-medium text-slate-700">
                              {data.userId.name}
                            </p>
                          </div>
                        </td>

                        {/* Date */}
                        <td className="px-5 py-4 text-sm text-slate-600">
                          {data.slotDate}
                        </td>

                        {/* Time */}
                        <td className="px-5 py-4 text-sm text-slate-600">
                          {data.slotTime}
                        </td>

                        {/* Gender */}
                        <td className="px-5 py-4 text-sm text-slate-600">
                          {data.userId.gender}
                        </td>

                        {/* Age */}
                        <td className="px-5 py-4 text-sm text-slate-600">
                          {ageCalculator(data.userId.dob)}
                        </td>

                        {/* Status */}
                        <td className="px-5 py-4">
                          <span
                            className={`
                            inline-flex items-center
                            px-2.5 py-1
                            rounded-full
                            text-xs font-medium
                            ${
                              data.status === "completed"
                                ? "bg-emerald-50 text-emerald-700"
                                : data.status === "cancelled"
                                  ? "bg-red-50 text-red-700"
                                  : data.status === "confirmed"
                                    ? "bg-blue-50 text-blue-700"
                                    : "bg-amber-50 text-amber-700"
                            }
                          `}
                          >
                            {data.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            // current appointments
            <div></div>
          )}
        </div>
      </div>
    )
  );
};

export default DoctorAppointments;
