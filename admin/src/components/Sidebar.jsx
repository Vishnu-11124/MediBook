import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import { NavLink } from "react-router-dom";
import {
  Calendar,
  Home,
  Plus,
  Users,
  CalendarClock,
  CircleUserRound,
} from "lucide-react";

const Sidebar = () => {
  const { token } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  const adminMenuItems = [
    {
      name: "Dashboard",
      path: "/admin-dashboard",
      icon: Home,
    },
    {
      name: "Appointments",
      path: "/all-appointments",
      icon: Calendar,
    },
    {
      name: "Add Doctor",
      path: "/add-doctor",
      icon: Plus,
    },
    {
      name: "Doctors List",
      path: "/doctor-list",
      icon: Users,
    },
    {
      name: "Leave Requests",
      path: "/leave-requests",
      icon: CalendarClock,
    },
  ];

  const doctorMenuItems = [
    {
      name: "Dashboard",
      path: "/doctor-dashboard",
      icon: Home,
    },
    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: Calendar,
    },
    {
      name: "Profile",
      path: "/doctor-profile",
      icon: CircleUserRound,
    },
    {
      name: "Leave Requests",
      path: "/doctor-leave-applications",
      icon: CalendarClock,
    },
  ];

  // Select menu based on logged-in user
  const menuItems = token ? adminMenuItems : dToken ? doctorMenuItems : [];

  const sectionTitle = token ? "Management" : dToken ? "Doctor Panel" : "";

  return (
    <aside className="w-64 min-h-[calc(100vh-4rem)] bg-white border-r border-slate-200">
      {(token || dToken) && (
        <div className="p-4">
          {/* Section title */}
          <p className="px-3 mb-3 text-xs font-medium uppercase tracking-wider text-slate-400">
            {sectionTitle}
          </p>

          {/* Navigation */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                      isActive
                        ? "bg-slate-100 text-slate-800"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                    }`
                  }
                >
                  <Icon size={19} strokeWidth={1.8} />

                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
