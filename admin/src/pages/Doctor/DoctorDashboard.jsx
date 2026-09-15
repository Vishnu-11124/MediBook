import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { CalendarDays, CircleDollarSign, UsersRound } from "lucide-react";

const DoctorDashboard = () => {
  const { dashboardData, getDashboardData, dToken } = useContext(DoctorContext);

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
      getDashboardData();
    }
  }, [dToken]);

  return (
    dashboardData && (
      <div className="w-full">
        {/* Header */}
        <div className="mb-7">
          <h2 className="text-2xl font-semibold text-slate-800">Dashboard</h2>

          <p className="text-sm text-slate-500 mt-1">
            Overview of your appointments, patients and earnings
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {/* Patients */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                <UsersRound
                  size={25}
                  strokeWidth={1.7}
                  className="text-slate-600"
                />
              </div>

              <div>
                <p className="text-sm text-slate-500">Patients</p>

                <span className="text-2xl font-semibold text-slate-800 mt-1 block">
                  {dashboardData.patients}
                </span>
              </div>
            </div>
          </div>

          {/* Earnings */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                <CircleDollarSign
                  size={25}
                  strokeWidth={1.7}
                  className="text-slate-600"
                />
              </div>

              <div>
                <p className="text-sm text-slate-500">Earnings</p>

                <span className="text-2xl font-semibold text-slate-800 mt-1 block">
                  ₹{dashboardData.earnings}
                </span>
              </div>
            </div>
          </div>

          {/* Appointments */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                <CalendarDays
                  size={25}
                  strokeWidth={1.7}
                  className="text-slate-600"
                />
              </div>

              <div>
                <p className="text-sm text-slate-500">Appointments</p>

                <span className="text-2xl font-semibold text-slate-800 mt-1 block">
                  {dashboardData.appointments}
                </span>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-slate-200 mb-7" />

        {/* Latest Appointments */}
        <div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-slate-800">
              Latest Appointments
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Recent appointments booked with you
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                      #
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                      Patient
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                      Date & Time
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                      Age
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                      Payment
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {dashboardData.latestAppointments.map((item, i) => (
                    <tr
                      key={item._id}
                      className="hover:bg-slate-50/70 transition"
                    >
                      <td className="px-5 py-4 text-sm text-slate-500">
                        {i + 1}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.userId.image}
                            alt="patient image"
                            className="w-10 h-10 rounded-full object-cover"
                          />

                          <p className="text-sm font-medium text-slate-700">
                            {item.userId.name}
                          </p>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-slate-700">
                            {item.slotDate}
                          </span>

                          <span className="text-xs text-slate-500 mt-0.5">
                            {item.slotTime}
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {ageCalculator(item.userId.dob)}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`
                            inline-flex items-center
                            px-2.5 py-1
                            rounded-full
                            text-xs font-medium
                            ${
                              item.paymentStatus === "paid"
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-amber-50 text-amber-700"
                            }
                          `}
                        >
                          {item.paymentStatus === "paid" ? "Paid" : "Pending"}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`
                            inline-flex items-center
                            px-2.5 py-1
                            rounded-full
                            text-xs font-medium
                            ${
                              item.status === "completed"
                                ? "bg-emerald-50 text-emerald-700"
                                : item.status === "cancelled"
                                  ? "bg-red-50 text-red-700"
                                  : item.status === "confirmed"
                                    ? "bg-blue-50 text-blue-700"
                                    : "bg-amber-50 text-amber-700"
                            }
                          `}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorDashboard;
