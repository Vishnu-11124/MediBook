import React, { useContext, useState } from "react";
import { Camera } from "lucide-react";
import { AppContext } from "../context/AppContext";

const MyProfile = () => {
  const { userData, setUserData } = useContext(AppContext);

  // console.log(userData)
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  return userData && (
    <section className="mx-auto max-w-2xl px-4 py-4">
      <div className="rounded-2xl border border-slate-200 bg-slate-100 p-5 shadow-sm">
        {/* Header */}
        <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
          <div className="relative shrink-0">
            <img
              src={image ? URL.createObjectURL(image) : userData.image}
              alt={userData.name}
              className="h-20 w-20 rounded-full border-2 border-blue-100 object-cover"
            />

            {isEdit && (
              <>
                <label
                  htmlFor="profile-image"
                  className="absolute bottom-0 right-0 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-blue-600 text-white shadow"
                >
                  <Camera size={14} />
                </label>

                <input
                  id="profile-image"
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setImage(e.target.files[0]);
                    }
                  }}
                />
              </>
            )}
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-xl font-semibold text-slate-900">
              {userData.name}
            </h2>

            <p className="truncate text-sm text-slate-500">{userData.email}</p>
          </div>
        </div>

        {/* Information */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-4 py-5 sm:grid-cols-2">
          {/* Name */}
          <div>
            <label className="text-xs font-medium text-slate-500">
              Full Name
            </label>

            {isEdit ? (
              <input
                type="text"
                value={userData.name}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    name: e.target.value,
                  })
                }
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
              />
            ) : (
              <p className="mt-1 text-sm font-medium text-slate-900">
                {userData.name}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="text-xs font-medium text-slate-500">
              Phone Number
            </label>

            {isEdit ? (
              <input
                type="text"
                value={userData.phone}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    phone: e.target.value,
                  })
                }
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
              />
            ) : (
              <p className="mt-1 text-sm font-medium text-slate-900">
                {userData.phone}
              </p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="text-xs font-medium text-slate-500">Gender</label>

            {isEdit ? (
              <select
                value={userData.gender}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    gender: e.target.value,
                  })
                }
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            ) : (
              <p className="mt-1 text-sm font-medium text-slate-900">
                {userData.gender}
              </p>
            )}
          </div>

          {/* DOB */}
          <div>
            <label className="text-xs font-medium text-slate-500">
              Date of Birth
            </label>

            {isEdit ? (
              <input
                type="date"
                value={userData.dob}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    dob: e.target.value,
                  })
                }
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
              />
            ) : (
              <p className="mt-1 text-sm font-medium text-slate-900">
                {userData.dob}
              </p>
            )}
          </div>

          {/* Address */}
          <div className="sm:col-span-2">
            <label className="text-xs font-medium text-slate-500">
              Address
            </label>

            {isEdit ? (
              <div className="mt-1 grid grid-cols-1 gap-2 sm:grid-cols-2">
                <input
                  type="text"
                  value={userData.address?.line1 || " "}
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
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                />

                <input
                  type="text"
                  value={userData.address?.line2 || " "}
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
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                />
              </div>
            ) : (
              <p className="mt-1 text-sm font-medium leading-5 text-slate-900">
                {userData.address?.line1 || " "}
                <br />
                {userData.address?.line2 || " "}
              </p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
          {isEdit ? (
            <>
              <button
                onClick={() => {
                  setIsEdit(false);
                  setImage(false);
                }}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
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
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Save Changes
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
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
