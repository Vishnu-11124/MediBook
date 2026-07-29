import React from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="overflow-hidden rounded-3xl bg-blue-600">
        <div className="flex flex-col items-center justify-between gap-10 px-8 py-10 md:flex-row md:px-12 md:py-0">
          {/* Left Section */}
          <div className="max-w-xl py-8 text-center md:text-left">
            <span className="rounded-full bg-white/20 px-4 py-1 text-sm font-medium text-blue-100">
              Get Started Today
            </span>

            <h2 className="mt-5 text-3xl font-bold leading-tight text-white md:text-5xl">
              Take the First Step
              <br />
              Towards Better Health
            </h2>

            <p className="mt-5 text-lg leading-8 text-blue-100">
              Create your free account to book appointments with trusted
              doctors anytime, anywhere. It's quick, secure, and hassle-free.
            </p>

            <button
              onClick={() => {
                navigate("/login");
                scrollTo(0, 0);
              }}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3 font-semibold text-blue-600 transition hover:scale-105 hover:bg-slate-100"
            >
              Create Account
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Right Section */}
          <div className="flex justify-center self-end">
            <img
              src="https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg"
              alt="Doctor"
              className="h-[420px] w-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;