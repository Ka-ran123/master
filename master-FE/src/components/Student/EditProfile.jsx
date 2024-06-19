// EditProfile.js

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateStudentProfileApi } from "../../services/apiCall";
import { Toaster, toast } from "react-hot-toast";

function EditProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const initialProfileData = location.state?.profileData || {};
  const [profileData, setProfileData] = useState(initialProfileData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await updateStudentProfileApi(profileData);
      console.log("Updated Profile Data:", response);
      toast.success(response.data.message);
      setTimeout(() => navigate("/profile"), 1000);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="bg-gradient-to-r from-indigo-300 to-purple-300 min-h-screen p-8">
      <Toaster position="top-right" />
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4">Edit Profile</h1>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Name:</label>
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleInputChange}
              className="border p-2 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleInputChange}
              className="border p-2 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Gender:</label>
            <input
              type="text"
              name="gender"
              value={profileData.gender}
              onChange={handleInputChange}
              className="border p-2 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Phone:</label>
            <input
              type="text"
              name="phone"
              value={profileData.phone}
              onChange={handleInputChange}
              className="border p-2 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Address:</label>
            <input
              type="text"
              name="address"
              value={profileData.address}
              onChange={handleInputChange}
              className="border p-2 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Department:</label>
            <input
              type="text"
              name="department"
              value={profileData.department}
              onChange={handleInputChange}
              className="border p-2 rounded"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-500"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EditProfile;
