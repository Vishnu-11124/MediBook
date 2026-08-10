
import React from "react";
import { UserRound, Upload } from "lucide-react";

const AddDoctor = () => {
  return (
    <div className="max-w-6xl mx-auto">

      {/* Page Heading */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-800">
          Add Doctor
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          Add a new doctor to the MediBook system
        </p>
      </div>

      {/* Form Card */}
      <form className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 sm:p-8">

        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8">

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Doctor Image
            </label>

            <label
              htmlFor="image"
              className="
                w-full h-52
                border-2 border-dashed border-slate-200
                rounded-xl
                bg-slate-50
                flex flex-col items-center justify-center
                cursor-pointer
                hover:border-slate-400
                hover:bg-slate-100
                transition
              "
            >
              <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center mb-3">
                <UserRound
                  size={22}
                  strokeWidth={1.7}
                  className="text-slate-500"
                />
              </div>

              <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600">
                <Upload size={16} strokeWidth={1.8} />
                Upload image
              </div>

              <p className="text-xs text-slate-400 mt-1">
                JPG, PNG or JPEG
              </p>
            </label>

            <input
              type="file"
              id="image"
              hidden
              accept="image/*"
            />
          </div>

          {/* Doctor Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Doctor Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Doctor Name
              </label>

              <input
                type="text"
                id="name"
                placeholder="Doctor's name"
                required
                className="input-style"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Email Address
              </label>

              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter email address"
                required
                className="input-style"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Password
              </label>

              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter password"
                required
                className="input-style"
              />
            </div>

            {/* Experience */}
            <div>
              <label
                htmlFor="experience"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Experience
              </label>

              <select
                name="experience"
                id="experience"
                className="input-style"
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Years">2 Years</option>
                <option value="3 Years">3 Years</option>
                <option value="4 Years">4 Years</option>
                <option value="5 Years">5 Years</option>
                <option value="6 Years">6 Years</option>
                <option value="7 Years">7 Years</option>
                <option value="8 Years">8 Years</option>
                <option value="9 Years">9 Years</option>
                <option value="10 Years">10 Years</option>
              </select>
            </div>

            {/* Fees */}
            <div>
              <label
                htmlFor="fees"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Consultation Fees
              </label>

              <input
                type="number"
                id="fees"
                placeholder="Enter consultation fees"
                required
                className="input-style"
              />
            </div>

            {/* Speciality */}
            <div>
              <label
                htmlFor="speciality"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Speciality
              </label>

              <input
                type="text"
                id="speciality"
                placeholder="e.g. Cardiologist"
                required
                className="input-style"
              />
            </div>

            {/* Education */}
            <div className="md:col-span-2">
              <label
                htmlFor="education"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Education
              </label>

              <input
                type="text"
                id="education"
                placeholder="e.g. MBBS, MD"
                required
                className="input-style"
              />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="mt-8 pt-7 border-t border-slate-100">

          <h3 className="text-base font-medium text-slate-800 mb-4">
            Address
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>
              <label
                htmlFor="address1"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Address Line 1
              </label>

              <input
                type="text"
                id="address1"
                placeholder="Street / Building"
                required
                className="input-style"
              />
            </div>

            <div>
              <label
                htmlFor="address2"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Address Line 2
              </label>

              <input
                type="text"
                id="address2"
                placeholder="City / District"
                required
                className="input-style"
              />
            </div>
          </div>
        </div>

        {/* About */}
        <div className="mt-8 pt-7 border-t border-slate-100">

          <label
            htmlFor="about"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            About Doctor
          </label>

          <textarea
            name="about"
            id="about"
            placeholder="Write a short description about the doctor..."
            rows={5}
            required
            className="input-style resize-none"
          />
        </div>

        {/* Button */}
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className="
              px-6 py-3
              rounded-lg
              bg-slate-800
              text-white
              text-sm
              font-medium
              hover:bg-slate-700
              transition
              cursor-pointer
            "
          >
            Add Doctor
          </button>
        </div>

      </form>

      {/* Reusable input styles */}
      <style>
        {`
          .input-style {
            width: 100%;
            padding: 0.7rem 0.9rem;
            border: 1px solid rgb(226 232 240);
            border-radius: 0.5rem;
            outline: none;
            font-size: 0.875rem;
            color: rgb(51 65 85);
            background-color: white;
            transition: all 0.2s;
          }

          .input-style::placeholder {
            color: rgb(148 163 184);
          }

          .input-style:focus {
            border-color: rgb(148 163 184);
            box-shadow: 0 0 0 3px rgb(241 245 249);
          }
        `}
      </style>
    </div>
  );
};

export default AddDoctor;
