import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/appointment/${doctor._id}`)}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
    >
      {/* Image */}
      <div className="overflow-hidden bg-blue-50">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="h-64 w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="space-y-3 p-5">
        {/* Availability */}
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>

          <p className="text-sm font-medium text-green-600">
            Available
          </p>
        </div>

        {/* Doctor Name */}
        <h3 className="text-lg font-semibold text-slate-900">
          {doctor.name}
        </h3>

        {/* Speciality */}
        <p className="text-sm text-slate-500">
          {doctor.speciality}
        </p>

        {/* CTA
        <button
          className="mt-2 w-full rounded-xl border border-blue-600 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-600 hover:text-white"
        >
          Book Appointment
        </button> */}
      </div>
    </div>
  );
};

export default DoctorCard;