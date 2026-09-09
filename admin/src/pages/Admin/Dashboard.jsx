import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import {
  CalendarDays,
  Clock,
  CalendarCheck,
  Stethoscope,
  User,
  UserRound,
  ArrowUpRight,
} from "lucide-react";

const Dashboard = () => {
  const { token, dashboardData, getDashboardData } = useContext(AdminContext);

  useEffect(() => {
    if (token) {
      getDashboardData();
    }
  }, [token]);

  const stats = [
    {
      title: "Doctors",
      value: dashboardData?.totalDoctors || 0,
      icon: Stethoscope,
    },
    {
      title: "Appointments",
      value: dashboardData?.totalAppointments || 0,
      icon: CalendarCheck,
    },
    {
      title: "Patients",
      value: dashboardData?.totalUser || 0,
      icon: User,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-7">
        <h1 className="text-2xl font-semibold text-slate-800">Dashboard</h1>

        <p className="text-sm text-slate-500 mt-1">
          Overview of your MediBook platform
        </p>
      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                  <Icon
                    size={25}
                    strokeWidth={1.7}
                    className="text-slate-600"
                  />
                </div>

                {/* Data */}
                <div>
                  <p className="text-sm text-slate-500">{item.title}</p>

                  <p className="text-2xl font-semibold text-slate-800 mt-1">
                    {item.value}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Latest Appointments */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        {/* Section Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-5 border-b border-slate-200">
          <div>
            <h2 className="text-base font-semibold text-slate-800">
              Latest Appointments
            </h2>

            <p className="text-xs text-slate-400 mt-1">
              Recent appointments booked through MediBook
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <CalendarDays
              size={16}
              strokeWidth={1.7}
              className="text-slate-400"
            />

            <span>{dashboardData?.latestAppointments?.length || 0} recent</span>
          </div>
        </div>

        {/* Table */}
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
              {dashboardData?.latestAppointments?.length > 0 ? (
                dashboardData.latestAppointments.map((data, i) => (
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

export default Dashboard;
