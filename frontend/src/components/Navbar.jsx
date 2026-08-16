import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, User, X } from "lucide-react";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const {token, setToken} = useContext(AppContext)
  const [userDropDown, setUserDropDown] = useState(false);

  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Doctors", path: "/doctors" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const handleLogout = () => {
    setToken(false)
    localStorage.removeItem('token')
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200/70 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <NavLink
          to="/"
          className="text-2xl font-extrabold tracking-tight text-blue-600"
        >
          Medi<span className="text-slate-900">Book</span>
        </NavLink>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `relative py-2 text-[15px] font-medium transition-all duration-200 ${
                    isActive
                      ? "text-blue-600"
                      : "text-slate-600 hover:text-blue-600"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    <span
                      className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-blue-600 transition-all duration-300 ${
                        isActive ? "w-full" : "w-0"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {token ? (
            <div className="relative hidden md:block">
              {/* User Avatar */}
              <div
                onClick={() => setUserDropDown(!userDropDown)}
                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-blue-100 transition hover:bg-blue-200"
              >
                <User className="h-5 w-5 text-blue-600" />
              </div>

              {/* Dropdown */}
              {userDropDown && (
                <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
                  <ul className="py-2">
                    <li
                      onClick={() => {
                        setUserDropDown(false);
                        navigate("/my-profile");
                      }}
                      className="cursor-pointer px-5 py-3 text-sm text-slate-700 transition hover:bg-slate-100"
                    >
                      My Profile
                    </li>

                    <li
                      onClick={() => {
                        setUserDropDown(false);
                        navigate("/my-appointments");
                      }}
                      className="cursor-pointer px-5 py-3 text-sm text-slate-700 transition hover:bg-slate-100"
                    >
                      My Appointments
                    </li>

                    <hr />

                    <li
                      onClick={handleLogout}
                      className="cursor-pointer px-5 py-3 text-sm text-red-500 transition hover:bg-red-50"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="hidden rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg md:block"
            >
              Create Account
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="rounded-lg p-2 transition hover:bg-gray-100 md:hidden"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`border-t bg-white shadow-lg transition-all duration-300 md:hidden ${
          open
            ? "max-h-screen overflow-y-auto"
            : "max-h-0 overflow-hidden border-none"
        }`}
      >
        <ul className="space-y-2 px-6 py-5">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block rounded-xl px-4 py-3 text-[15px] font-medium transition ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-600 hover:bg-slate-100"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}

          {token ? (
            <>
              <hr className="my-2" />

              <button
                className="w-full rounded-xl px-4 py-3 text-left text-slate-700 transition hover:bg-slate-100"
                onClick={() => {
                  setOpen(false);
                  navigate("/my-profile");
                }}
              >
                My Profile
              </button>

              <button
                className="w-full rounded-xl px-4 py-3 text-left text-slate-700 transition hover:bg-slate-100"
                onClick={() => {
                  setOpen(false);
                  navigate("/my-appointments");
                }}
              >
                My Appointments
              </button>

              <button
                className="w-full rounded-xl px-4 py-3 text-left text-red-500 transition hover:bg-red-50"
                onClick={() => {
                  setOpen(false);
                  // logout logic
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setOpen(false);
                navigate("/login");
              }}
              className="mt-4 w-full rounded-xl bg-blue-600 py-3 font-medium text-white shadow transition hover:bg-blue-700"
            >
              Create Account
            </button>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
