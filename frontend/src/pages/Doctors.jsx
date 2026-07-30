import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import DoctorCard from "../components/DoctorCard";

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);

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
        : doctors
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
          Browse our experienced doctors by speciality and choose the one
          that best fits your healthcare needs.
        </p>
      </div>

      <div className="flex flex-col gap-10 lg:flex-row">
        {/* Left Sidebar */}
        <aside className="lg:w-72">
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