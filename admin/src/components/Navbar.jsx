
import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { LogOut, UserRound } from "lucide-react";

const Navbar = () => {
  const { token, setToken } = useContext(AdminContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="relative h-16 bg-white border-b border-slate-200 flex items-center justify-between px-5 sm:px-8">

      {/* Left - Admin */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center">
          <UserRound
            size={18}
            strokeWidth={1.8}
            className="text-slate-600"
          />
        </div>

        <div>
          <p className="text-sm font-medium text-slate-700">
            {token ? 'Admin' : 'Doctor'}
          </p>

        </div>
      </div>

      {/* Center - Logo */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <h1 className="text-xl sm:text-3xl font-bold text-slate-800">
          MediBook
        </h1>
      </div>

      {/* Right - Logout */}
      <button
        onClick={handleLogout}
        className="
          flex items-center gap-2
          text-md font-medium
          text-slate-800
          hover:text-red-800
          transition
          cursor-pointer
        "
      >
        <LogOut size={17} strokeWidth={1.8} />

        <span className="hidden sm:block">
          Logout
        </span>
      </button>

    </nav>
  );
};

export default Navbar;

