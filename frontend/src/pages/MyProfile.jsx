import React, { useState } from "react";

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Alex Johnson",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    address: {
      line1: "742 Evergreen Terrace",
      line2: "Springfield, IL 62704",
    },
    gender: "Male",
    dob: "1995-06-18",
  });

  const [isEdit, setIsEdit] = useState(false);

  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      {/* Heading */}
      <div className="mb-10">
        <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-600">
          My Account
        </span>

        <h1 className="mt-4 text-4xl font-bold text-slate-900">
          My Profile
        </h1>

        <p className="mt-3 text-slate-600">
          Manage your personal information and keep your profile up to date.
        </p>
      </div>

      {/* Profile Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-10 lg:flex-row">
          {/* Left */}
          <div className="flex flex-col items-center lg:w-72">
            <img
              src={userData.image}
              alt={userData.name}
              className="h-44 w-44 rounded-full border-4 border-blue-100 object-cover"
            />

            <h2 className="mt-5 text-2xl font-bold text-slate-900">
              {userData.name}
            </h2>

            <p className="mt-1 text-slate-500">
              MediBook Member
            </p>

            {isEdit && (
              <button className="mt-6 rounded-xl border border-slate-300 px-5 py-2 text-sm font-medium transition hover:bg-slate-100">
                Change Photo
              </button>
            )}
          </div>

          {/* Right */}
          <div className="flex-1">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-500">
                  Full Name
                </label>

                {isEdit ? (
                  <input
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
                    value={userData.name}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        name: e.target.value,
                      })
                    }
                  />
                ) : (
                  <p className="font-medium text-slate-900">
                    {userData.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-500">
                  Email
                </label>

                <p className="font-medium text-slate-900">
                  {userData.email}
                </p>
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-500">
                  Phone
                </label>

                {isEdit ? (
                  <input
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
                    value={userData.phone}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        phone: e.target.value,
                      })
                    }
                  />
                ) : (
                  <p className="font-medium text-slate-900">
                    {userData.phone}
                  </p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-500">
                  Gender
                </label>

                {isEdit ? (
                  <select
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
                    value={userData.gender}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        gender: e.target.value,
                      })
                    }
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                ) : (
                  <p className="font-medium text-slate-900">
                    {userData.gender}
                  </p>
                )}
              </div>

              {/* DOB */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-500">
                  Date of Birth
                </label>

                {isEdit ? (
                  <input
                    type="date"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
                    value={userData.dob}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        dob: e.target.value,
                      })
                    }
                  />
                ) : (
                  <p className="font-medium text-slate-900">
                    {userData.dob}
                  </p>
                )}
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-500">
                  Address
                </label>

                {isEdit ? (
                  <div className="space-y-3">
                    <input
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
                      value={userData.address.line1}
                      placeholder="Address Line 1"
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          address: {
                            ...userData.address,
                            line1: e.target.value,
                          },
                        })
                      }
                    />

                    <input
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
                      value={userData.address.line2}
                      placeholder="Address Line 2"
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          address: {
                            ...userData.address,
                            line2: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                ) : (
                  <p className="font-medium text-slate-900">
                    {userData.address.line1}
                    <br />
                    {userData.address.line2}
                  </p>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">
              <button
                onClick={() => setIsEdit(!isEdit)}
                className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
              >
                {isEdit ? "Save Changes" : "Edit Profile"}
              </button>

              {isEdit && (
                <button
                  onClick={() => setIsEdit(false)}
                  className="rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyProfile;