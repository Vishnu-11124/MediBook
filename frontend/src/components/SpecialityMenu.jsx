import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <section id="speciality" className="mx-auto max-w-7xl px-6 py-16">
      {/* Heading */}
      <div className="mx-auto max-w-2xl text-center">
        <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-600">
          Our Specialities
        </span>

        <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
          Find a Doctor by Speciality
        </h2>

        <p className="mt-4 text-slate-600">
          Browse our wide range of medical specialities and connect with
          experienced doctors for the care you need.
        </p>
      </div>

      {/* Speciality Cards */}
      <div className="mt-12 flex gap-6 overflow-x-auto pb-4 scrollbar-hide lg:grid lg:grid-cols-6 lg:overflow-visible">
        {specialityData.map((data, i) => (
          <Link
            onClick={() => scrollTo(0,0)}
            key={i}
            to={`/doctors/${data.speciality}`}
            className="group min-w-[160px] rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-lg"
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 transition group-hover:bg-blue-100">
              <img
                src={data.image}
                alt={data.speciality}
                className="h-14 w-14 object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            <p className="mt-4 text-sm font-semibold leading-5 text-slate-800 break-words">
              {" "}
              {data.speciality}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SpecialityMenu;
