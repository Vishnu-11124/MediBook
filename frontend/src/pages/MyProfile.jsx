import React, { useState } from 'react'

const MyProfile = () => {
  const [userData, setUserData] = useState({
  name: "Alex Johnson",
  image: "https://randomuser.me/api/portraits/men/32.jpg",
  email: "alex.johnson@example.com",
  phone: "+1 (555) 123-4567",
  address: {
    line1: "742 Evergreen Terrace",
    line2: "Springfield, IL 62704"
  },
  gender: "Male",
  dob: "1995-06-18"
});

  const [isEdit, setIsEdit] = useState(false)

  return (
    <div>
      {/* profile info */}
      <div>
        <h2>My Profile</h2>

        <div>
          <div>
            <img src={userData.image} alt="user image" />
            <p>{userData.name}</p>
          </div>
          <div>
            <p>Email: {userData.email}</p>
            <p>Phone: {userData.phone}</p>
            <p>Address: {userData.address.line1}, {userData.address.line2}</p>
            <p>Gender: {userData.gender}</p>
            <p>Date of Birth: {userData.dob}</p>
          </div>
          <div>
            <button onClick={() => setIsEdit(!isEdit)}>
              {isEdit ? 'Cancel' : 'Edit Profile'}
            </button>
            <button>Update Profile</button>
          </div>
        </div>
      </div>

      {/* edit profile form */}
      {
        isEdit && (
          <div>
            <div>
              <img src={userData.image} alt="" />
            </div>
            <div>
              <label htmlFor="name">Name</label>
              <input type="text" id='name' value={userData.name} onChange={(e) => setUserData({...userData, name: e.target.value})} />
            </div>
            <div>
              <label htmlFor="phone">Phone</label>
              <input type="text" id='phone' value={userData.phone} onChange={(e) => setUserData({...userData, phone: e.target.value})} />
            </div>
            <div>
              <label htmlFor="address1">Address Line 1</label>
              <input type="text" id='address1' value={userData.address.line1} onChange={(e) => setUserData({...userData, address: {...userData.address, line1: e.target.value}})} />
            </div>
            <div>
              <label htmlFor="address2">Address Line 2</label>
              <input type="text" id='address2' value={userData.address.line2} onChange={(e) => setUserData({...userData, address: {...userData.address, line2: e.target.value}})} />
            </div>
            <div>
              <label htmlFor="gender">Gender</label>
              <select id='gender' value={userData.gender} onChange={(e) => setUserData({...userData, gender: e.target.value})}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="dob">Date of Birth</label>
              <input type="date" id='dob' value={userData.dob} onChange={(e) => setUserData({...userData, dob: e.target.value})} />
            </div>
            <div>
              <button onClick={() => setIsEdit(false)}>Save Changes</button>
              <button onClick={() => setIsEdit(false)}>Cancel</button>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default MyProfile
