import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-4">
        {/* Logo & Description */}
        <div className="lg:col-span-2">
          <NavLink
            to="/"
            className="text-3xl font-extrabold tracking-tight text-blue-600"
          >
            Medi<span className="text-slate-900">Book</span>
          </NavLink>

          <p className="mt-5 max-w-md leading-7 text-slate-600">
            MediBook is a hospital appointment booking platform that connects
            patients with trusted doctors through a simple, secure, and
            hassle-free online experience.
          </p>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Company</h3>

          <ul className="mt-5 space-y-3">
            <li>
              <NavLink
                to="/"
                className="text-slate-600 transition hover:text-blue-600"
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/about"
                className="text-slate-600 transition hover:text-blue-600"
              >
                About Us
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/contact"
                className="text-slate-600 transition hover:text-blue-600"
              >
                Contact
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/privacy-policy"
                className="text-slate-600 transition hover:text-blue-600"
              >
                Privacy Policy
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Get in Touch
          </h3>

          <ul className="mt-5 space-y-4">
            <li className="flex items-center gap-3 text-slate-600">
              <Phone size={18} className="text-blue-600" />
              <span>+91 98765 43210</span>
            </li>

            <li className="flex items-center gap-3 text-slate-600">
              <Mail size={18} className="text-blue-600" />
              <span>support@medibook.com</span>
            </li>

            <li className="flex items-center gap-3 text-slate-600">
              <MapPin size={18} className="text-blue-600" />
              <span>Kerala, India</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-200">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-slate-500 md:flex-row">
          <p>© 2026 MediBook. All rights reserved.</p>

          <div className="flex gap-6">
            <NavLink
              to="/terms"
              className="transition hover:text-blue-600"
            >
              Terms
            </NavLink>

            <NavLink
              to="/privacy-policy"
              className="transition hover:text-blue-600"
            >
              Privacy
            </NavLink>

            <NavLink
              to="/contact"
              className="transition hover:text-blue-600"
            >
              Support
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;