import React, { useContext, useState } from "react";
import { UserRound, Upload } from "lucide-react";
import { AdminContext } from "../../context/AdminContext";
import {toast} from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {
  const [image, setImage] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { backendUrl, token} = useContext(AdminContext)
  // console.log(backendUrl)
  // console.log(token)
  const handleAddDoctor = async (e) => {
    e.preventDefault();

    try {
      if (!image) {
        return toast.error("Image not selected");
      }

      const formData = new FormData();

      formData.append("image", image);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", fees);
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 }),
      );

      // formData.forEach((val) => {
      //   console.log(val)
      // })

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      // console.log(data)
      if (data.success) {
        toast.success(data.message);
        setImage(false);
        setName("");
        setPassword("");
        setEmail("");
        setAddress1("");
        setAddress2("");
        setFees("");
        setAbout("");
        setSpeciality("");
        setExperience("1 Year");
        setDegree("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Page Heading */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-800">Add Doctor</h1>

        <p className="text-sm text-slate-500 mt-1">
          Add a new doctor to the MediBook system
        </p>
      </div>

      {/* Form Card */}
      <form
        onSubmit={handleAddDoctor}
        className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 sm:p-8"
      >
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8">
          {/* Image Upload */}
          <div>
            <label
              htmlFor="image"
              className="
    relative
    w-full h-52
    rounded-xl
    overflow-hidden
    border-2 border-dashed border-slate-200
    bg-slate-50
    flex flex-col items-center justify-center
    cursor-pointer
    hover:border-slate-400
    transition
  "
            >
              {image ? (
                <>
                  {/* Uploaded Image */}
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Doctor"
                    className=" h-full object-contain"
                  />

                  {/* Hover Overlay */}
                  <div
                    className="
          absolute inset-0
          bg-slate-900/50
          opacity-0
          hover:opacity-100
          transition
          flex items-center justify-center
        "
                  >
                    <div className="flex items-center gap-2 text-white text-sm font-medium">
                      <Upload size={17} strokeWidth={1.8} />
                      Change image
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Upload Icon */}
                  <div
                    className="
          w-12 h-12
          rounded-full
          bg-white
          border border-slate-200
          flex items-center justify-center
          mb-3
        "
                  >
                    <UserRound
                      size={22}
                      strokeWidth={1.7}
                      className="text-slate-500"
                    />
                  </div>

                  {/* Upload Text */}
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600">
                      <Upload size={16} strokeWidth={1.8} />
                      Upload image
                    </div>

                    <p className="text-xs text-slate-400 mt-1">
                      JPG, PNG or JPEG
                    </p>
                  </div>
                </>
              )}
            </label>

            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
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
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
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
                value={fees}
                onChange={(e) => setFees(e.target.value)}
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
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
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
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                placeholder="e.g. MBBS, MD"
                required
                className="input-style"
              />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="mt-8 pt-7 border-t border-slate-100">
          <h3 className="text-base font-medium text-slate-800 mb-4">Address</h3>

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
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
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
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
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
            value={about}
            onChange={(e) => setAbout(e.target.value)}
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
