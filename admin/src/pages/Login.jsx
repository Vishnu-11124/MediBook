import React, { useContext, useState } from "react";
import { ShieldCheck, Stethoscope } from "lucide-react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setToken, backendUrl } = useContext(AdminContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("token", data.data.token);
          setToken(data.data.token);
        }
      } else {
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
          {/* Icon */}
          <div className="flex justify-center mb-5">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
              {state === "Admin" ? (
                <ShieldCheck
                  size={24}
                  strokeWidth={1.8}
                  className="text-slate-700"
                />
              ) : (
                <Stethoscope
                  size={24}
                  strokeWidth={1.8}
                  className="text-slate-700"
                />
              )}
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-7">
            <h2 className="text-2xl font-semibold text-slate-800">
              {state} Login
            </h2>

            <p className="text-sm text-slate-500 mt-2">
              Sign in to access your {state.toLowerCase()} dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmitHandler} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                  w-full px-4 py-3
                  rounded-lg
                  border border-slate-200
                  bg-white
                  text-sm text-slate-700
                  placeholder:text-slate-400
                  outline-none
                  transition
                  focus:border-slate-400
                  focus:ring-2
                  focus:ring-slate-100
                "
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="
                  w-full px-4 py-3
                  rounded-lg
                  border border-slate-200
                  bg-white
                  text-sm text-slate-700
                  placeholder:text-slate-400
                  outline-none
                  transition
                  focus:border-slate-400
                  focus:ring-2
                  focus:ring-slate-100
                "
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="
                w-full
                bg-slate-800
                text-white
                py-3
                rounded-lg
                text-sm
                font-medium
                hover:bg-slate-700
                transition
                cursor-pointer
              "
            >
              Login
            </button>
          </form>

          {/* Switch Login */}
          <div className="text-center mt-6 text-sm text-slate-500">
            {state === "Admin" ? (
              <>
                Are you a doctor?{" "}
                <span
                  onClick={() => setState("Doctor")}
                  className="
                    text-slate-800
                    font-medium
                    cursor-pointer
                    hover:underline
                  "
                >
                  Doctor Login
                </span>
              </>
            ) : (
              <>
                Are you an admin?{" "}
                <span
                  onClick={() => setState("Admin")}
                  className="
                    text-slate-800
                    font-medium
                    cursor-pointer
                    hover:underline
                  "
                >
                  Admin Login
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
