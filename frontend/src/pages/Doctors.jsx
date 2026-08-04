import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import DoctorCard from "../components/DoctorCard";

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const specialities = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
  ];

  const applyFilter = () => {
    setFilterDoc(
      speciality
        ? doctors.filter((doc) => doc.speciality === speciality)
        : doctors,
    );
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      {/* Heading */}
      <div className="mb-10">
        <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-600">
          Our Doctors
        </span>

        <h1 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
          Find the Right Specialist
        </h1>

        <p className="mt-3 max-w-2xl text-slate-600">
          Browse our experienced doctors by speciality and choose the one that
          best fits your healthcare needs.
        </p>
      </div>

      {/* Mobile Filter */}
      <div className="mb-6 lg:hidden">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-medium text-slate-700 shadow-sm transition hover:border-blue-600 hover:text-blue-600"
        >
          Filter
          <svg
            className={`h-4 w-4 transition-transform ${
              showFilter ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showFilter && (
          <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
            {specialities.map((item) => (
              <button
                key={item}
                onClick={() => {
                  speciality === item
                    ? navigate("/doctors")
                    : navigate(`/doctors/${item}`);

                  setShowFilter(false);
                }}
                className={`block w-full border-b border-slate-100 px-5 py-3 text-left transition last:border-none ${
                  speciality === item
                    ? "bg-blue-600 text-white"
                    : "hover:bg-slate-50"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-10 lg:flex-row">
        {/* Left Sidebar */}
        <aside className="hidden lg:block lg:w-72">
          {" "}
          <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-5 text-lg font-semibold text-slate-900">
              Specialities
            </h2>

            <div className="space-y-3">
              {specialities.map((item) => (
                <button
                  key={item}
                  onClick={() =>
                    speciality === item
                      ? navigate("/doctors")
                      : navigate(`/doctors/${item}`)
                  }
                  className={`w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition-all duration-200 ${
                    speciality === item
                      ? "bg-blue-600 text-white shadow"
                      : "bg-slate-50 text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Doctors */}
        <main className="flex-1">
          {filterDoc.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filterDoc.map((doctor) => (
                <DoctorCard key={doctor._id} doctor={doctor} />
              ))}
            </div>
          ) : (
            <div className="flex h-72 items-center justify-center rounded-2xl border border-dashed border-slate-300">
              <p className="text-slate-500">
                No doctors available for this speciality.
              </p>
            </div>
          )}
        </main>
      </div>
    </section>
  );
};

export default Doctors;
