import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DoctorsList = () => {
  const { doctors, getAllDoctors, token } = useContext(AdminContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      getAllDoctors();
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-800 sm:text-2xl">
            All Doctors
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage doctors and their availability
          </p>
        </div>

        <div className="rounded-lg bg-white px-4 py-2 shadow-sm">
          <p className="text-xs text-gray-500">Total Doctors</p>
          <p className="text-lg font-semibold text-gray-800">
            {doctors.length}
          </p>
        </div>
      </div>

      {/* Doctors Grid */}
      {doctors.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {doctors.map((doctor) => (
            <div
              onClick={() => {
                navigate(`/doctor-list/${doctor?._id}`);
              }}
              key={doctor?._id}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:shadow-md"
            >
              {/* Doctor Image */}
              <div className="flex justify-center bg-gray-100 px-4 pt-4">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="h-48 w-full object-contain"
                />
              </div>

              {/* Doctor Details */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-semibold text-gray-800">
                      {doctor.name}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      {doctor.speciality}
                    </p>
                  </div>

                  {/* Availability */}
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        doctor.available ? "bg-green-500" : "bg-gray-400"
                      }`}
                    />

                    <span
                      className={`text-xs font-medium ${
                        doctor.available ? "text-green-600" : "text-gray-500"
                      }`}
                    >
                      {doctor.available ? "Available" : "Unavailable"}
                    </span>
                  </div>
                </div>

                {/* Information */}
                <div className="mt-4 grid grid-cols-2 gap-3 border-y border-gray-100 py-3">
                  <div>
                    <p className="text-xs text-gray-400">Degree</p>
                    <p className="mt-1 text-sm font-medium text-gray-700">
                      {doctor.degree}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">Experience</p>
                    <p className="mt-1 text-sm font-medium text-gray-700">
                      {doctor.experience}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white py-16 text-center">
          <p className="text-gray-500">No doctors found.</p>
        </div>
      )}
    </div>
  );
};

export default DoctorsList;
