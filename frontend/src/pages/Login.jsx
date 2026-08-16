import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from 'axios'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const { backendUrl, token, setToken } = useContext(AppContext)
  const navigate = useNavigate()
  const [state, setState] = useState("Sign Up");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if( state === 'Sign Up'){
        const {data} = await axios.post(backendUrl + '/api/user/register', {name, password, email})
        if(data.success){
          localStorage.setItem('token', data.data.token)
          setToken(data.data.token)
        }else{
          toast.error(data.message)
        }
      }else{
        const {data} = await axios.post(backendUrl + '/api/user/login', {password, email})
        if(data.success){
          localStorage.setItem('token', data.data.token)
          setToken(data.data.token)
        }else{
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  useEffect(()=> {
    if(token) {
      navigate('/')
    }
  },[token])

  return (
    <section className="mx-auto flex min-h-[85vh] max-w-7xl items-center px-6 py-12">
      <div className="grid w-full items-center gap-12 lg:grid-cols-2">
        {/* Left */}
        <div className="hidden lg:block">
          <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-600">
            Welcome to MediBook
          </span>

          {/* <h1 className="mt-6 text-5xl font-bold leading-tight text-slate-900">
            Book Doctor
            <span className="block text-blue-600">
              Appointments Easily.
            </span>
          </h1> */}

          <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">
            Join thousands of patients using MediBook to find trusted
            doctors and schedule appointments online in just a few clicks.
          </p>

          <img
            src="https://images.pexels.com/photos/6129042/pexels-photo-6129042.jpeg"
            alt="Doctor"
            className="mt-10 w-full rounded-3xl object-cover shadow-lg"
          />
        </div>

        {/* Form */}
        <div className="mx-auto w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-slate-900">
            {state === "Sign Up"
              ? "Create Account"
              : "Welcome Back"}
          </h2>

          <p className="mt-2 text-slate-500">
            Please{" "}
            {state === "Sign Up"
              ? "create your account"
              : "sign in"}{" "}
            to continue.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {state === "Sign Up" && (
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
                />
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              {state === "Sign Up"
                ? "Create Account"
                : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-slate-600">
            {state === "Sign Up"
              ? "Already have an account?"
              : "Don't have an account?"}{" "}
            <button
              type="submit"
              onClick={() =>
                setState(
                  state === "Sign Up"
                    ? "Sign In"
                    : "Sign Up"
                )
              }
              className="font-semibold text-blue-600 hover:underline"
            >
              {state === "Sign Up"
                ? "Sign In"
                : "Create Account"}
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;