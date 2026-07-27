import React from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate()
  return (
    <section className="bg-slate-50">
      <div className="mx-auto flex max-w-7xl flex-col-reverse items-center gap-12 px-6 py-16 md:flex-row md:py-20">
        {/* Left Side */}
        <div className="flex-1 text-center md:text-left">
          <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-600">
            Trusted Healthcare Platform
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight text-slate-900 md:text-6xl">
            Book Appointments with
            <span className="block text-blue-600">Trusted Doctors</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Skip long waiting queues and book appointments with experienced
            doctors through a simple, secure, and hassle-free online platform.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
            <a href="#speciality" className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700">
              Book Appointment
              <ArrowRight size={18} />
            </a>

            <button onClick={() => navigate('/doctors')} className="rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-100">
              Find Doctors
            </button>
          </div>

          {/* Features */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-center gap-2 text-slate-700">
              <CheckCircle2 className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium">
                Easy Online Booking
              </span>
            </div>

            <div className="flex items-center gap-2 text-slate-700">
              <CheckCircle2 className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium">
                Verified Doctors
              </span>
            </div>

            <div className="flex items-center gap-2 text-slate-700">
              <CheckCircle2 className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium">
                Secure Platform
              </span>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-1 justify-center">
          <div className="relative">
            {/* Background Blur */}
            <div className="absolute -inset-4 rounded-full bg-blue-100 blur-3xl opacity-60"></div>

            <img
              src="https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg"
              alt="Doctor"
              className="relative h-[450px] w-auto rounded-3xl object-cover shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;