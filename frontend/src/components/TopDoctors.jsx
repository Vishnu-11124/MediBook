import React, { useContext } from "react";

import DoctorCard from "./DoctorCard";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {

  const navigate = useNavigate();
  const {doctors} = useContext(AppContext)

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      {/* Heading */}
      <div className="mx-auto max-w-2xl text-center">
        <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-600">
          Our Doctors
        </span>

        <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
          Top Doctors to Book
        </h2>

        <p className="mt-4 text-slate-600">
          Connect with experienced specialists and book your appointment
          online in just a few clicks.
        </p>
      </div>

      {/* Doctor Cards */}
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {doctors.slice(0, 10).map((doctor) => (
          <DoctorCard key={doctor._id} doctor={doctor} />
        ))}
      </div>

      {/* Button */}
      <div className="mt-12 flex justify-center">
        <button
          onClick={() =>{ navigate("/doctors"); scrollTo(0,0) }}
          className="rounded-full bg-blue-600 px-8 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          View All Doctors
        </button>
      </div>
    </section>
  );
};

export default TopDoctors;