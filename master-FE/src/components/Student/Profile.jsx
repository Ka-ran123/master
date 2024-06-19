import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { changeProfileImageApi } from "../../services/apiCall";
import { Toaster, toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import useAuth from "../context/AuthProvider";

function Profile() {
  const { user,setUserData } = useAuth();
 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleEditImageClick = () => {
    setIsModalOpen(true);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
  };

  const handleSave = async () => {
    if (selectedFile) {
      try {
        const response = await changeProfileImageApi(selectedFile);
        toast.success(response.data.message);
        setUserData({ ...user, image: response.data.image });
        setIsModalOpen(false);
      } catch (error) {
        console.log(`error :-  , ${error}`);
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <section className="bg-gradient-to-r from-indigo-300 to-purple-300 min-h-screen p-8">
      <Toaster position="top-right" />
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 flex items-center justify-around relative">
        {/* Profile Image Container */}
        <div className="relative">
          {user.image && (
            <img
              src={user.image}
              alt="Profile"
              className="w-48 h-48 object-cover rounded-full mr-6"
            />
          )}
          <button
            className="absolute bottom-2 right-2 bg-gray-800 text-white p-1 rounded-full hover:bg-gray-600"
            onClick={handleEditImageClick}
          >
            <FaEdit />
          </button>
        </div>

        {/* Profile Information */}
        <div>
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col">
              <span className="font-semibold text-gray-700">Name:</span>
              <span className="text-gray-900">{user.name}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-700">Email:</span>
              <span className="text-gray-900">{user.email}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-700">Gender:</span>
              <span className="text-gray-900">{user.gender}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-700">Phone:</span>
              <span className="text-gray-900">{user.phone}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-700">Address:</span>
              <span className="text-gray-900">{user.address}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-700">Department:</span>
              <span className="text-gray-900">
                {user.department ? user.department.toUpperCase() : ""}
              </span>
            </div>
          </div>
          <Link
            // to={{
            //   pathname: "/editprofile",
            //   state: { user } // pass user to editprofile page
            // }}
            to={`/editprofile`}
            state={{ user }}
            className="block text-center mt-6 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-500 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Edit Profile
          </Link>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Edit Profile Image</h2>
            <input type="file" onChange={handleFileChange} className="mb-4" />
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-500"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Profile;
