import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import DoctorCard from "./DoctorCard";

const RelatedDoctors = ({ docId, speciality }) => {
  const { doctors } = useContext(AppContext);

  const [relatedDoc, setRelatedDoc] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );

      setRelatedDoc(doctorsData);
    }
  }, [doctors, speciality, docId]);

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      {/* Heading */}
      <div className="text-center">
        <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-600">
          More Doctors
        </span>

        <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
          Related Doctors
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-slate-600">
          Discover more experienced{" "}
          <span className="font-semibold text-blue-600">
            {speciality}
          </span>{" "}
          doctors available for appointment.
        </p>
      </div>

      {/* Doctor Cards */}
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {relatedDoc.slice(0, 5).map((doc) => (
          <DoctorCard key={doc._id} doctor={doc} />
        ))}
      </div>

      {/* Empty State */}
      {relatedDoc.length === 0 && (
        <div className="mt-12 rounded-2xl border border-dashed border-slate-300 py-16 text-center">
          <h3 className="text-lg font-semibold text-slate-700">
            No Related Doctors
          </h3>

          <p className="mt-2 text-slate-500">
            There are no other doctors available in this speciality.
          </p>
        </div>
      )}
    </section>
  );
};

export default RelatedDoctors;