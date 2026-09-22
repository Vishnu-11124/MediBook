import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { CalendarDays, Plus } from "lucide-react";

const AddLeave = () => {
  const { token, backendUrl } = useContext(AdminContext);

  const [leaveList, setLeaveList] = useState([]);

  const getLeaveApprovedList = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/admin/approved-leave-list",
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (data.success) {
        setLeaveList(data?.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleAddLeaveDates = async (requestId) => {
    try {
      const { data } = await axios.patch(
        backendUrl + "/api/admin/approved-leave-list/add-leave",
        {requestId},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getLeaveApprovedList();
    }
  }, [token]);

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-gray-800">Manage Leaves</h2>

        <p className="text-sm text-gray-500 mt-1">
          Add approved doctor leave dates to their availability.
        </p>
      </div>

      <hr className="border-gray-200" />

      {/* Leave List */}
      <div className="mt-6">
        {leaveList.length === 0 ? (
          /* Empty State */
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
                No approved leave requests
              </h3>

              <p className="text-sm text-gray-500 mt-2 max-w-sm mx-auto">
                Approved doctor leave requests will appear here.
              </p>
            </div>
          </div>
        ) : (
          /* Leave Table */
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
                      Leave Dates
                    </th>

                    <th className="px-5 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {leaveList.map((data, i) => (
                    <tr
                      key={data._id}
                      className="hover:bg-gray-50/70 transition"
                    >
                      {/* Number */}
                      <td className="px-5 py-4 text-gray-500">{i + 1}</td>

                      {/* Doctor */}
                      <td className="px-5 py-5">
                        <div className="flex items-center gap-3">
                          <img
                            src={data.doctorId.image}
                            alt="doctor"
                            className="
        w-12 h-12
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
                      <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
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
                          {data.dates.map((date, index) => (
                            <span
                              key={index}
                              className="
                              px-2.5 py-1
                              rounded-md
                              bg-gray-100
                              text-xs text-gray-600
                              whitespace-nowrap
                            "
                            >
                              {formatDate(date)}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Action */}
                      <td className="px-5 py-4 text-center">
                        <button
                        onClick={() => handleAddLeaveDates(data._id)}
                          type="button"
                          className="
                          inline-flex items-center gap-1.5
                          px-3.5 py-2
                          rounded-lg
                          bg-gray-800
                          text-xs font-medium text-white
                          hover:bg-gray-700
                          transition
                          cursor-pointer
                          whitespace-nowrap
                        "
                        >
                          <Plus size={15} strokeWidth={1.8} />
                          Add Leave
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddLeave;
