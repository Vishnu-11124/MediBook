import React from "react";

const About = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      {/* Heading */}
      <div className="text-center">
        <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-600">
          About MediBook
        </span>

        <h1 className="mt-4 text-4xl font-bold text-slate-900">
          Your Trusted Healthcare
          <span className="block text-blue-600">Appointment Platform</span>
        </h1>

        <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
          MediBook simplifies the way patients connect with doctors by
          providing a secure, fast, and convenient online appointment booking
          experience.
        </p>
      </div>

      {/* About Section */}
      <div className="mt-16 flex flex-col items-center gap-12 lg:flex-row">
        {/* Image */}
        <div className="flex-1">
          <img
            src="https://images.pexels.com/photos/8376233/pexels-photo-8376233.jpeg"
            alt="Healthcare Team"
            className="w-full rounded-3xl object-cover shadow-lg"
          />
        </div>

        {/* Content */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-slate-900">
            Making Healthcare Accessible
          </h2>

          <p className="mt-6 leading-8 text-slate-600">
            MediBook was created with one goal in mind — to make booking a
            doctor's appointment simple and stress-free. Instead of waiting in
            long queues or making multiple phone calls, patients can quickly
            find experienced doctors, view their availability, and book an
            appointment online.
          </p>

          <p className="mt-5 leading-8 text-slate-600">
            Our platform focuses on creating a seamless experience for both
            patients and healthcare providers while ensuring reliability,
            transparency, and convenience.
          </p>

          <div className="mt-8 rounded-2xl bg-blue-50 p-6">
            <h3 className="text-xl font-semibold text-slate-900">
              Our Vision
            </h3>

            <p className="mt-3 leading-7 text-slate-600">
              To become a trusted digital healthcare platform where patients
              can easily connect with qualified doctors and receive quality
              healthcare without unnecessary delays.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="mt-20 text-center">
        <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-600">
          Why Choose Us
        </span>

        <h2 className="mt-4 text-3xl font-bold text-slate-900">
          Healthcare Made Simple
        </h2>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {/* Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-lg">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-2xl">
            ⚡
          </div>

          <h3 className="mt-6 text-xl font-semibold text-slate-900">
            Efficiency
          </h3>

          <p className="mt-4 leading-7 text-slate-600">
            Book appointments within minutes without long waiting times or
            unnecessary paperwork.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-lg">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-2xl">
            📅
          </div>

          <h3 className="mt-6 text-xl font-semibold text-slate-900">
            Convenience
          </h3>

          <p className="mt-4 leading-7 text-slate-600">
            Access trusted doctors, view available slots, and book
            appointments anytime, anywhere.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-lg">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-2xl">
            ❤️
          </div>

          <h3 className="mt-6 text-xl font-semibold text-slate-900">
            Personalized Care
          </h3>

          <p className="mt-4 leading-7 text-slate-600">
            Find the right specialist based on your healthcare needs and enjoy
            a patient-focused booking experience.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;