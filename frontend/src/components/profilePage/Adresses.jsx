import AuthContext from '../../contexts/AuthContext';
import { useContext, useState } from 'react';
import userService from '../../services/userService';
import { toast } from 'react-toastify';

export default function Adresses() {
  const { user, setUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    adress: user.adress,
    billingAdress: user.billingAdress,
  });

  const [tempData, setTempData] = useState({ ...userData });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setTempData({ ...userData });
    setIsEditing(false);
  };

  const handleSaveClick = async () => {
    try {

      const updatedUser = await userService.updateUser(user.id, tempData);

      setUserData({
        ...userData,
        ...updatedUser,
      });

      setUser({
        ...user,
        ...updatedUser,
      });

      setIsEditing(false);
      toast.success('User data updated successfully!');
    } catch (error) {
      console.error('Error updating user data:', error);
      toast.error('Failed to update user data.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-lg mx-auto mt-10 md:ml-14  bg-white rounded-lg shadow-md p-8 ">
      <h1 className="text-xl font-bold text-gray-700 mb-4">
        {isEditing ? 'Edit Adresses' : 'Adresses'}
      </h1>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-600 text-sm mb-1">Adress</label>
          {isEditing ? (
            <input
              type="text"
              name="adress"
              value={tempData.adress}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-indigo-200"
            />
          ) : (
            <p className="text-gray-800">{userData.adress}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-600 text-sm mb-1">Billing adress</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={tempData.billingAdress}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-indigo-200"
            />
          ) : (
            <p className="text-gray-800">{userData.billingAdress}</p>
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
  );
}
