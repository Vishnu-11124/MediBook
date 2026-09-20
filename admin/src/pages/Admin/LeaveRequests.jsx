import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";
import { CalendarDays } from "lucide-react";

const LeaveRequests = () => {
  const { backendUrl, token } = useContext(AdminContext);

  const [requests, setRequests] = useState([]);
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [historyOpen, setHistoryOpen] = useState(false);

  const getLeaveRequests = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/admin/doctors/leave-requests",
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (data.success) {
        setLeaveHistory(data?.data?.leaveHistory);
        console.log("history", data?.data?.leaveHistory);
        setRequests(data?.data?.leaveRequests);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  const handleLeaveStatus = async (status) => {

  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  useEffect(() => {
    getLeaveRequests();
  }, [token]);

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {historyOpen ? "Leave History" : "Leave Requests"}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            {historyOpen
              ? "View previous doctor leave requests."
              : "Review and manage doctor leave requests."}
          </p>
        </div>

        <button
          onClick={() => setHistoryOpen(!historyOpen)}
          className="
          px-4 py-2
          rounded-lg
          bg-gray-800
          text-sm font-medium text-white
          hover:bg-gray-700
          transition
          cursor-pointer
        "
        >
          {historyOpen ? "Requests" : "History"}
        </button>
      </div>

      <hr className="border-gray-200" />

      {/* Content */}
      {historyOpen ? (
        <div className="mt-6">
          {leaveHistory.length === 0 ? (
            /* History Empty State */
            <div className="bg-white border border-gray-200 rounded-xl min-h-[400px] flex items-center justify-center">
              <div className="text-center px-6">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <CalendarDays
                    size={26}
                    className="text-gray-400"
                    strokeWidth={1.7}
                  />
                </div>

                <h3 className="text-base font-semibold text-gray-800">
                  No leave history
                </h3>

                <p className="text-sm text-gray-500 mt-2 max-w-sm mx-auto">
                  Approved and rejected leave requests will appear here.
                </p>
              </div>
            </div>
          ) : (
            /* History Table */
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        #
                      </th>

                      <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Doctor
                      </th>

                      <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Speciality
                      </th>

                      <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Reason
                      </th>

                      <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Dates
                      </th>

                      <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {leaveHistory.map((data, i) => (
                      <tr
                        key={data._id}
                        className="hover:bg-gray-50/70 transition"
                      >
                        {/* Number */}
                        <td className="px-5 py-4 text-gray-500">{i + 1}</td>

                        {/* Doctor */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={data.doctorId.image}
                              alt="doctor"
                              className="
                              w-9 h-9
                              rounded-full
                              object-cover
                              border border-gray-200
                            "
                            />

                            <p className="font-medium text-gray-800 whitespace-nowrap">
                              {data.doctorId.name}
                            </p>
                          </div>
                        </td>

                        {/* Speciality */}
                        <td className="px-5 py-4 text-gray-600">
                          {data.doctorId.speciality}
                        </td>

                        {/* Reason */}
                        <td className="px-5 py-4 text-gray-600 max-w-[220px]">
                          <p className="truncate" title={data.reason}>
                            {data.reason}
                          </p>
                        </td>

                        {/* Dates */}
                        <td className="px-5 py-4">
                          <div className="flex flex-wrap gap-1.5 min-w-[180px]">
                            {data.dates.map((date, i) => (
                              <span
                                key={i}
                                className="
                                px-2.5 py-1
                                rounded-md
                                bg-gray-100
                                text-xs
                                text-gray-600
                                whitespace-nowrap
                              "
                              >
                                {formatDate(date)}
                              </span>
                            ))}
                          </div>
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
                              data.status === "approved"
                                ? "bg-green-50 text-green-700"
                                : "bg-red-50 text-red-700"
                            }
                          `}
                          >
                            {data.status.charAt(0).toUpperCase() +
                              data.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-6">
          {requests.length === 0 ? (
            /* Pending Empty State */
            <div className="bg-white border border-gray-200 rounded-xl min-h-[400px] flex items-center justify-center">
              <div className="text-center px-6">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <CalendarDays
                    size={26}
                    className="text-gray-400"
                    strokeWidth={1.7}
                  />
                </div>

                <h3 className="text-base font-semibold text-gray-800">
                  No pending leave requests
                </h3>

                <p className="text-sm text-gray-500 mt-2 max-w-sm mx-auto">
                  There are currently no leave requests waiting for your review.
                </p>
              </div>
            </div>
          ) : (
            /* Pending Requests
             Approve / Reject functionality will be added later.
          */
            <div className="space-y-4">
              {requests.map((data) => (
                <div
                  key={data._id}
                  className="
                  bg-white
                  border border-gray-200
                  rounded-xl
                  p-5
                  hover:shadow-sm
                  transition
                "
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                    {/* Doctor */}
                    <div className="flex items-center gap-3 min-w-[220px]">
                      <img
                        src={data.doctorId.image}
                        alt="doctor"
                        className="
                        w-11 h-11
                        rounded-full
                        object-cover
                        border border-gray-200
                      "
                      />

                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          {data.doctorId.name}
                        </p>

                        <p className="text-xs text-gray-500 mt-0.5">
                          {data.doctorId.speciality}
                        </p>
                      </div>
                    </div>

                    {/* Reason */}
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                        Reason
                      </p>

                      <p className="text-sm text-gray-700 mt-1">
                        {data.reason}
                      </p>
                    </div>

                    {/* Dates */}
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                        Leave Dates
                      </p>

                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {data.dates.map((date, i) => (
                          <span
                            key={i}
                            className="
                            px-2.5 py-1
                            rounded-md
                            bg-gray-100
                            text-xs text-gray-600
                          "
                          >
                            {formatDate(date)}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex gap-2">
                      <button onClick={() => handleLeaveStatus('rejected')}>Reject</button>
                      <button onClick={() => handleLeaveStatus('approved')}>Approve</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LeaveRequests;
