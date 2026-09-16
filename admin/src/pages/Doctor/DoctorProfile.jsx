import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { profileData, dToken, getProfileData, setProfileData, backendUrl } =
    useContext(DoctorContext);
  console.log("User:", profileData);

  const [formOpen, setFormOpen] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const fees = formData.get("fees");
    const available = formData.get("available");
    const line1 = formData.get("line1");
    const line2 = formData.get("line2");

    const doctorData = {};

    // Fees changed
    if (Number(fees) !== Number(profileData.fees)) {
      doctorData.fees = Number(fees);
    }

    // Availability changed
    if (available !== String(profileData.available)) {
      doctorData.available = available === "true";
    }

    // Address changed
    if (
      line1 !== profileData.address.line1 ||
      line2 !== profileData.address.line2
    ) {
      doctorData.address = {
        line1,
        line2,
      };
    }

    // Nothing changed
    if (Object.keys(doctorData).length === 0) {
      toast.info("No changes were made");
      return;
    }

    try {
      const { data } = await axios.patch(
        backendUrl + "/api/doctor/update-profile",
        doctorData,
        {
          headers: {
            Authorization: `Bearer ${dToken}`,
          },
        },
      );

      if (data.success) {
        toast.success(data.message);
        setProfileData(data.data);
        setFormOpen(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.response?.data);

      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  return (
    profileData && (
      <div className="min-h-[calc(100vh-4rem)] py-2">
        {/* Profile Content */}
        <div className="max-w-5xl mx-auto bg-white border border-slate-200 rounded-xl shadow-sm p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Section */}
            <div className="flex flex-col items-center text-center md:border-r md:border-slate-100 md:pr-8">
              <img
                src={profileData.image}
                alt="doctor image"
                className="w-28 h-28 rounded-full object-cover border border-slate-200"
              />

              <h3 className="text-xl font-semibold text-slate-800 mt-4">
                {profileData.name}
              </h3>

              <p className="text-sm text-slate-500 mt-1">{profileData.email}</p>

              <div className="w-full border-t border-slate-100 my-6" />

              {/* Professional Details */}
              <div className="w-full text-left space-y-5">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Speciality
                  </p>
                  <p className="text-sm font-medium text-slate-700 mt-1">
                    {profileData.speciality}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Degree
                  </p>
                  <p className="text-sm font-medium text-slate-700 mt-1">
                    {profileData.degree}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Experience
                  </p>
                  <p className="text-sm font-medium text-slate-700 mt-1">
                    {profileData.experience}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex flex-col justify-between">
              {/* About */}
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  About
                </p>

                <p className="text-sm text-slate-600 leading-6 mt-2">
                  {profileData.about}
                </p>
              </div>

              {/* Appointment Fee */}
              <div className="mt-6">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Appointment Fee
                </p>

                <p className="text-lg font-semibold text-slate-800 mt-1">
                  ₹{profileData.fees}
                </p>
              </div>

              {/* Address */}
              <div className="mt-6">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Address
                </p>

                <p className="text-sm text-slate-600 leading-6 mt-2">
                  {profileData.address.line1}
                  <br />
                  {profileData.address.line2}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Action */}
          <div className="border-t border-slate-100 mt-8 pt-6 flex justify-center">
            <button
              onClick={() => setFormOpen(true)}
              type="button"
              className="
              px-6 py-2.5
              rounded-lg
              text-sm font-medium
              text-white
              bg-slate-800
              hover:bg-slate-700
              transition
              cursor-pointer
            "
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* form open */}

        {formOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-lg bg-white rounded-xl shadow-lg border border-slate-200">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-slate-800">
                  Update Profile
                </h2>

                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="text-slate-400 hover:text-slate-700 transition cursor-pointer"
                >
                  X
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleUpdateProfile}>
                <div className="p-6 space-y-5">
                  {/* Fees */}
                  <div>
                    <label
                      htmlFor="fees"
                      className="block text-sm font-medium text-slate-700 mb-1.5"
                    >
                      Appointment Fee
                    </label>

                    <input
                      type="number"
                      name="fees"
                      id="fees"
                      defaultValue={profileData.fees}
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-200
                         text-sm text-slate-700 outline-none
                         focus:border-slate-400 focus:ring-1 focus:ring-slate-300"
                    />
                  </div>

                  {/* Availability */}
                  <div>
                    <label
                      htmlFor="available"
                      className="block text-sm font-medium text-slate-700 mb-1.5"
                    >
                      Availability
                    </label>

                    <select
                      name="available"
                      id="available"
                      defaultValue={profileData.available}
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-200
                         text-sm text-slate-700 bg-white outline-none
                         focus:border-slate-400 focus:ring-1 focus:ring-slate-300"
                    >
                      <option value="true">Available</option>
                      <option value="false">Unavailable</option>
                    </select>
                  </div>

                  {/* Address */}
                  <div>
                    <p className="text-sm font-medium text-slate-700 mb-3">
                      Address
                    </p>

                    <div className="space-y-4">
                      {/* Line 1 */}
                      <div>
                        <label
                          htmlFor="line1"
                          className="block text-xs font-medium text-slate-500 mb-1.5"
                        >
                          Line 1
                        </label>

                        <input
                          type="text"
                          name="line1"
                          id="line1"
                          defaultValue={profileData.address.line1}
                          className="w-full px-3 py-2.5 rounded-lg border border-slate-200
                             text-sm text-slate-700 outline-none
                             focus:border-slate-400 focus:ring-1 focus:ring-slate-300"
                        />
                      </div>

                      {/* Line 2 */}
                      <div>
                        <label
                          htmlFor="line2"
                          className="block text-xs font-medium text-slate-500 mb-1.5"
                        >
                          Line 2
                        </label>

                        <input
                          type="text"
                          name="line2"
                          id="line2"
                          defaultValue={profileData.address.line2}
                          className="w-full px-3 py-2.5 rounded-lg border border-slate-200
                             text-sm text-slate-700 outline-none
                             focus:border-slate-400 focus:ring-1 focus:ring-slate-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 px-6 py-4 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setFormOpen(false)}
                    className="px-4 py-2.5 rounded-lg text-sm font-medium
                       text-slate-600 border border-slate-200
                       hover:bg-slate-50 transition cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-lg text-sm font-medium
                       text-white bg-slate-800
                       hover:bg-slate-700 transition cursor-pointer"
                  >
                    Update Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default DoctorProfile;
