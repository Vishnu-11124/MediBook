import React, { useState } from "react";
import { Camera } from "lucide-react";

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
  const [image, setImage] = useState(false);

  return (
    <section className="mx-auto max-w-3xl px-6 pb-10 pt-2">
      {/* Heading */}
      {/* <div className="text-center">
        <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-600">
          My Account
        </span>

        <h1 className="mt-4 text-4xl font-bold text-slate-900">My Profile</h1>
      </div> */}

      {/* Card */}
      <div className="mt-10 rounded-3xl bg-gray-300 border border-slate-200 p-8">
        {/* Avatar */}
        {/* Avatar */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={image ? URL.createObjectURL(image) : userData.image}
              alt={userData.name}
              className="h-32 w-32 rounded-full border-4 border-blue-100 object-cover"
            />

            {isEdit && (
              <>
                <label
                  htmlFor="profile-image"
                  className="absolute bottom-1 right-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-blue-600 text-white shadow-md transition hover:bg-blue-700"
                >
                  <Camera size={18} />
                </label>

                <input
                  id="profile-image"
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setImage(e.target.files[0]);
                    }
                  }}
                />
              </>
            )}
          </div>

          <h2 className="mt-5 text-2xl font-bold text-slate-900">
            {userData.name}
          </h2>

          <p className="mt-1 text-slate-500">{userData.email}</p>

          {/* <span className="mt-3 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
            Verified Patient
          </span> */}
        </div>

        {/* Information */}
        <div className="mt-10 space-y-6">
          {/* Name */}
          <div>
            <label className="text-sm font-medium text-slate-500">
              Full Name
            </label>

            {isEdit ? (
              <input
                type="text"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
              />
            ) : (
              <p className="mt-2 font-medium text-slate-900">{userData.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-slate-500">Email</label>

            <p className="mt-2 font-medium text-slate-900">{userData.email}</p>
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-medium text-slate-500">
              Phone Number
            </label>

            {isEdit ? (
              <input
                type="text"
                value={userData.phone}
                onChange={(e) =>
                  setUserData({ ...userData, phone: e.target.value })
                }
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
              />
            ) : (
              <p className="mt-2 font-medium text-slate-900">
                {userData.phone}
              </p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="text-sm font-medium text-slate-500">Gender</label>

            {isEdit ? (
              <select
                value={userData.gender}
                onChange={(e) =>
                  setUserData({ ...userData, gender: e.target.value })
                }
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            ) : (
              <p className="mt-2 font-medium text-slate-900">
                {userData.gender}
              </p>
            )}
          </div>

          {/* DOB */}
          <div>
            <label className="text-sm font-medium text-slate-500">
              Date of Birth
            </label>

            {isEdit ? (
              <input
                type="date"
                value={userData.dob}
                onChange={(e) =>
                  setUserData({ ...userData, dob: e.target.value })
                }
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
              />
            ) : (
              <p className="mt-2 font-medium text-slate-900">{userData.dob}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="text-sm font-medium text-slate-500">
              Address
            </label>

            {isEdit ? (
              <div className="mt-2 space-y-3">
                <input
                  type="text"
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
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
                />

                <input
                  type="text"
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
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
                />
              </div>
            ) : (
              <p className="mt-2 font-medium text-slate-900">
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-10 flex justify-center gap-4">
          {isEdit ? (
            <>
              <button
                onClick={() => {
                  setIsEdit(false);
                  setImage(false);
                }}
                className="rounded-xl border border-slate-300 px-6 py-3 font-medium hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  if (image) {
                    setUserData((prev) => ({
                      ...prev,
                      image: URL.createObjectURL(image),
                    }));
                  }

                  setImage(false);
                  setIsEdit(false);
                }}
                className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
              >
                Save Changes
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="rounded-xl bg-blue-600 px-8 py-3 font-medium text-white hover:bg-blue-700"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default MyProfile;
