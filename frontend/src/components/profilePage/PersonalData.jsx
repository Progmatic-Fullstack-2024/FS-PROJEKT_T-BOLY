import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useContext, useEffect, useState, useRef } from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import { HiOutlineDocumentPlus } from 'react-icons/hi2';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import AuthContext from '../../contexts/AuthContext';
import userService from '../../services/userService';

export default function PersonalData() {
  const { user, setUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [usernames, setUsernames] = useState([]);
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
    const fetchUsernames = async () => {
      if (user?.username) {
        const data = await userService.listUsernames();
        setUsernames(data);
      }
    };
    fetchUsernames();
  }, [user]);

  const initialValues = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    name: `${user?.firstName} ${user?.lastName}` || '',
    email: user?.email,
    username: user?.username,
    birthDate: user?.birthDate?.split('T')[0] || '',
    profilePictureUrl: user?.profilePictureUrl || '',
  };

  const personalDataValidationSchema = yup.object({
    firstName: yup.string().required('FirstName is required'),
    lastName: yup.string().required('LastName is required'),
    username: yup
      .string()
      .required('Username is required')
      .notOneOf(usernames, 'Username is already taken'),
    email: yup.string().email('Invalid email format').required('Email is required'),
  });

  const handleSave = async (values, { setSubmitting }) => {
    try {
      const formattedValues = {
        ...values,
        birthDate: values.birthDate ? new Date(values.birthDate).toISOString() : null,
      };

      const response = await userService.updateUser(user.id, formattedValues);

      if (response && response.updatedUser && response.token) {
        const { updatedUser, token } = response;

        setUser({
          ...user,
          ...updatedUser,
        });

        localStorage.setItem('token', token);

        setIsEditing(false);
        toast.success('User data updated successfully!');
      } else {
        toast.error('Failed to update user data: Response is invalid.');
      }
    } catch (error) {
      toast.error('Failed to update user data.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handlePictureUpload = async () => {
    fileInputRef.current.click();
    const formData = new FormData();
    formData.append('image', image);

    const { user, token } = await userService.updateProfilePictureUrl(formData);
    localStorage.setItem('token', token);
  };

  const handleInputChange = (e) => {
    const newImage = e.target.files[0];
    setImage(newImage);
  };

  return (
    <div className="mx-auto w-full bg-white rounded-lg shadow-md p-8">
      <h1 className="text-xl font-bold text-gray-700 mb-4">
        {isEditing ? 'Edit Profile' : 'User Profile'}
      </h1>
      <div className="flex">
        <button
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          type="button"
          onClick={handlePictureUpload}
          className=" border w-80 h-80 mr-8 rounded overflow-hidden flex items-center justify-center bg-gray-50 hover:bg-gray-100"
        >
          {image || user?.profilePictureUrl ? (
            <img
              alt=""
              src={image ? URL.createObjectURL(image) : user?.profilePictureUrl}
              className="w-full h-full object-cover"
            />
          ) : (
            <BsPersonCircle className="w-40 h-40" />
          )}
          {isHovered && (
            <div className="absolute  flex items-center justify-center bg-black bg-opacity-50 w-80 h-80">
              <span className="text-white text-2xl font-bold">
                <HiOutlineDocumentPlus />
              </span>
            </div>
          )}
        </button>
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={(e) => handleInputChange(e)}
        />
        {isEditing ? (
          <Formik
            initialValues={initialValues}
            onSubmit={handleSave}
            validationSchema={personalDataValidationSchema}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form className="space-y-4 ">
                <div>
                  <label className="block text-gray-500 text-sm mb-1">First Name</label>
                  <Field
                    name="firstName"
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-indigo-200"
                  />
                  <ErrorMessage name="firstName" component="div" className="text-red-500" />
                </div>

                <div>
                  <label className="block text-gray-600 text-sm mb-1">Last Name</label>
                  <Field
                    name="lastName"
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-indigo-200"
                  />
                  <ErrorMessage name="lastName" component="div" className="text-red-500" />
                </div>

                <div>
                  <label className="block text-gray-600 text-sm mb-1">Username</label>
                  <Field
                    name="username"
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-indigo-200"
                  />
                  <ErrorMessage name="username" component="div" className="text-red-500" />
                </div>

                <div>
                  <label className="block text-gray-600 text-sm mb-1">Email</label>
                  <Field
                    name="email"
                    type="email"
                    className="w-full px-4 py-2 border rounded-lg text-gray-700 bg-gray-100 focus:outline-none"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-gray-600 text-sm mb-1">Birthday</label>
                  <Field
                    name="birthDate"
                    type="date"
                    className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-indigo-200"
                  />
                  <ErrorMessage name="birthDate" component="div" className="text-red-500" />
                </div>

                <div>
                  <label className="block text-gray-600 text-sm mb-1">Profile Picture</label>
                  <input
                    type="file"
                    onChange={(e) => setFieldValue('profilePictureUrl', e.target.files[0])}
                    className="w-full"
                  />
                </div>

                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={handleCancelClick}
                    className="px-4 py-2 bg-primary-light text-gray-700 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-indigo-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-600 text-sm mb-1">Name</label>
              <p className="text-gray-800">{`${user?.firstName} ${user?.lastName}`}</p>
            </div>
            <div>
              <label className="block text-gray-600 text-sm mb-1">Email</label>
              <p className="text-gray-800">{user?.email}</p>
            </div>
            <div>
              <label className="block text-gray-600 text-sm mb-1">Username</label>
              <p className="text-gray-800">{user?.username}</p>
            </div>
            <div>
              <label className="block text-gray-600 text-sm mb-1">Birthday</label>
              <p className="text-gray-800">{new Date(user?.birthDate).toLocaleDateString()}</p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={handleEditClick}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-indigo-700"
              >
                Edit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
