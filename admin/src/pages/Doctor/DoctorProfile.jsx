import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorProfile = () => {
  const { profileData, dToken, getProfileData, setProfileData, backendUrl } =
    useContext(DoctorContext);
  console.log("User:", profileData);

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
      </div>
    )
  );
};

export default DoctorProfile;
