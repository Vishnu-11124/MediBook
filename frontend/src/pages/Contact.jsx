import React from "react";
import { Mail, MapPin, Phone, ArrowRight } from "lucide-react";

const Contact = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      {/* Heading */}
      <div className="text-center">
        <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-600">
          Contact Us
        </span>

        <h1 className="mt-4 text-4xl font-bold text-slate-900">
          We'd Love to
          <span className="block text-blue-600">Hear From You</span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          Have questions, feedback, or need assistance? Our team is here to
          help you with everything related to MediBook.
        </p>
      </div>

      {/* Content */}
      <div className="mt-16 flex flex-col items-center gap-12 lg:flex-row">
        {/* Image */}
        <div className="flex-1">
          <img
            src="https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg"
            alt="Customer Support"
            className="w-full rounded-3xl object-cover shadow-lg"
          />
        </div>

        {/* Contact Details */}
        <div className="flex-1 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-slate-900">
            Get in Touch
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Whether you're looking for support or simply want to learn more
            about MediBook, we're always happy to help.
          </p>

          <div className="mt-8 space-y-6">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-blue-100 p-3">
                <MapPin className="text-blue-600" size={22} />
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  Our Office
                </h3>

                <p className="mt-1 text-slate-600">
                  123 Main Street
                  <br />
                  City, State 12345
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-full bg-blue-100 p-3">
                <Phone className="text-blue-600" size={22} />
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  Phone
                </h3>

                <p className="mt-1 text-slate-600">
                  +1 (555) 123-4567
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-full bg-blue-100 p-3">
                <Mail className="text-blue-600" size={22} />
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  Email
                </h3>

                <p className="mt-1 text-slate-600">
                  support@medibook.com
                </p>
              </div>
            </div>
          </div>

          {/* Careers */}
          <div className="mt-10 rounded-2xl bg-blue-50 p-6">
            <h3 className="text-xl font-semibold text-slate-900">
              Careers at MediBook
            </h3>

            <p className="mt-3 leading-7 text-slate-600">
              Passionate about technology and healthcare? Join our team and
              help us build better digital healthcare experiences.
            </p>

            <button className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700">
              Explore Careers
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;