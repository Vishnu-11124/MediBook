import React, { useState } from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";
import { CalendarPlus } from "lucide-react";

const LeaveApplications = () => {
  const { dToken, backendUrl, leaveList, getLeaveList } =
    useContext(DoctorContext);

  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    if (dToken) {
      getLeaveList();
    }
  }, [dToken]);

  return (
    <div className="min-h-[calc(100vh-4rem)] py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-slate-800">
            Leave Request
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Manage your leave requests
          </p>
        </div>

        <button
          type="button"
          className="px-4 py-2 rounded-lg border border-slate-200
                   text-sm font-medium text-slate-600
                   hover:bg-slate-50 transition cursor-pointer"
        >
          History
        </button>
      </div>

      {/* Pending Requests */}
      <div className="space-y-4">
        {leaveList
          .filter((item) => item.status === "pending")
          .map((data) => (
            <div
              key={data._id}
              className="bg-white border border-slate-200 rounded-xl
                       shadow-sm p-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {/* Reason */}
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Reason
                  </p>
                  <p className="text-sm text-slate-700 mt-1">{data.reason}</p>
                </div>

                {/* Dates */}
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Dates
                  </p>
                  <p className="text-sm text-slate-700 mt-1">{data.dates}</p>
                </div>

                {/* Status */}
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Status
                  </p>

                  <span
                    className="inline-flex items-center mt-1 px-2.5 py-1
                             rounded-full text-xs font-medium
                             bg-amber-50 text-amber-700"
                  >
                    Pending
                  </span>
                </div>
              </div>
            </div>
          ))}

        {/* Empty State */}
        {leaveList.filter((item) => item.status === "pending").length === 0 && (
          <div
            className="bg-white border border-slate-200 rounded-xl
                     p-10 text-center shadow-sm"
          >
            <p className="text-sm text-slate-500">No pending leave requests</p>
          </div>
        )}
      </div>

      {/* Apply Leave */}
      <div
        className="mt-6 bg-white border border-slate-200 rounded-xl
             shadow-sm p-8"
      >
        <div className="flex flex-col items-center justify-center text-center">
          {/* Icon */}
          <div
            className="w-12 h-12 rounded-full bg-slate-100
                 flex items-center justify-center mb-4"
          >
            <CalendarPlus
              size={22}
              strokeWidth={1.7}
              className="text-slate-600"
            />
          </div>

          {/* Content */}
          <h3 className="text-lg font-semibold text-slate-800">
            Apply for Leave
          </h3>

          <p className="text-sm text-slate-500 mt-1 max-w-md">
            Need time off? Submit a leave request for approval.
          </p>

          {/* Button */}
          <button
            type="button"
            onClick={() => setFormOpen(true)}
            className="mt-5 px-6 py-2.5 rounded-lg
                 bg-slate-800 text-sm font-medium text-white
                 hover:bg-slate-700 transition cursor-pointer"
          >
            New Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaveApplications;
