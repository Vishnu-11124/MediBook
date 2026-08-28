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

  const [leaveRequests, setLeaveRequests] = useState([]);

  const getLeaveRequests = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/admin/doctors/leave-requests",
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (data.success) {
        setLeaveRequests(data?.data);
        // console.log(leaveRequests)
      } else {
        toast.error(data.message);
      }
      // console.log(data?.data)
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
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
            Leave Requests
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Review and manage doctor leave requests.
          </p>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Content */}
      <div className="mt-6">
        {leaveRequests.length === 0 ? (
          /* Empty State */
          <div className="bg-white border border-gray-200 rounded-xl min-h-[400px] flex items-center justify-center">
            <div className="text-center px-6">
              {/* Icon */}
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <CalendarDays size={26} className="text-gray-400" />
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
          /* Requests - We'll work on this later */
          <div>
            <p>The new leave requests</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveRequests;
