import AuthContext from "../../contexts/AuthContext";
import { useContext, useState } from "react";

export default function PersonalData() {
    const { user } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: user.firstName + " " + user.lastName,
    email: user.email,
    username: user.username
  });

  

  const [tempData, setTempData] = useState({ ...userData });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setTempData({ ...userData });
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    setUserData({ ...tempData });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
   
        <div className="max-w-lg mx-auto mt-10 ml-14  bg-white rounded-lg shadow-md p-8 ">
      <h1 className="text-xl font-bold text-gray-700 mb-4">
        {isEditing ? "Edit Profile" : "User Profile"}
      </h1>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-600 text-sm mb-1">Name</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={tempData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-indigo-200"
            />
          ) : (
            <p className="text-gray-800">{userData.name}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-600 text-sm mb-1">Email</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={tempData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-indigo-200"
            />
          ) : (
            <p className="text-gray-800">{userData.email}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-600 text-sm mb-1">Username</label>
          {isEditing ? (
            <input
              type="text"
              name="username"
              value={tempData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-indigo-200"
            />
          ) : (
            <p className="text-gray-800">{userData.username}</p>
          )}
        </div>
       
      </div>
      <div className="mt-6 flex justify-end space-x-4">
        {isEditing ? (
          <>
            <button
              onClick={handleCancelClick}
              className="px-4 py-2 bg-primary-light text-gray-700 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveClick}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-indigo-700"
            >
              Save
            </button>
          </>
        ) : (
          <button
            onClick={handleEditClick}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-indigo-700"
          >
            Edit
          </button>
        )}
      </div>
  
        
    </div>
//     
  )
}
