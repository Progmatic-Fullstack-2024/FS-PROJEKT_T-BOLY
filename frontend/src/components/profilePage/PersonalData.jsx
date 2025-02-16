import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useContext, useEffect, useState, useRef } from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import { HiOutlineDocumentPlus } from 'react-icons/hi2';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import AuthContext from '../../contexts/AuthContext';
import LanguageContext from '../../contexts/LanguageContext';
import userService from '../../services/userService';

export default function PersonalData() {
  const { t } = useContext(LanguageContext);
  const { user, setUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [usernames, setUsernames] = useState([]);
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
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

        localStorage.setItem('token', token);

        setUser({
          ...user,
          ...updatedUser,
        });

        setIsEditing(false);
      } else {
        toast.error(`Failed to update user data, ${response.message.response.data.error}`);
      }
    } catch (error) {
      toast.error(`Failed to update user data.`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSavePictureUpload = async () => {
    if (!image) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('image', image);

    try {
      const { updatedUser, token } = await userService.updateProfilePictureUrl(formData);
      setUser(updatedUser);
      localStorage.setItem('token', token);
    } catch (error) {
      toast.error('Error uploading image');
    } finally {
      setIsLoading(false);
      setShowConfirmation(false);
      setImage(null);
      setPreviewImage(null);
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
  };

  const handleInputChange = async (e) => {
    const newImage = e.target.files[0];
    setImage(newImage);
    setPreviewImage(URL.createObjectURL(newImage));
    setShowConfirmation(true);
  };

  const handleCancelPictureUpload = () => {
    setImage(null);
    setPreviewImage(null);
    setShowConfirmation(false);
  };

  return (
    <div className="mx-auto w-full bg-white rounded-lg shadow-md p-8 dark:bg-gray-700">
      <h1 className="text-xl font-bold text-gray-700 mb-4 dark:text-primary">
        {isEditing ? t('edit profile') : t('user profile')}
      </h1>
      <div className="flex flex-col lg:flex-row md:flex-row ">
        <button
          disabled={isEditing}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          type="button"
          onClick={handlePictureUpload}
          className="border w-32 h-32 mx-auto md:ml-0 md:mr-8 my-5 md:my-0 rounded-full overflow-hidden flex items-center justify-center bg-gray-50 hover:bg-gray-100 md:w-80 md:h-80 md:rounded dark:bg-gray-600 dark:hover:bg-gray-500 dark:border-primary dark:text-primary" 
        >
          {isLoading && !isEditing && (
            <div className="animate-spin border-4 border-gray-300 border-t-gray-800 rounded-full w-16 h-16 dark:border-primary dark:border-t-primary" />
          )}

          {!isLoading && previewImage && (
            <img alt="" src={previewImage} className="w-full h-full object-cover" />
          )}

          {!isLoading && !previewImage && user?.profilePictureUrl && (
            <img alt="" src={user.profilePictureUrl} className="w-full h-full object-cover" />
          )}

          {!isLoading && !previewImage && !user?.profilePictureUrl && (
            <BsPersonCircle className="w-40 h-40" />
          )}

          {isHovered && !isLoading && !isEditing && (
            <div className="absolute flex items-center justify-center bg-black bg-opacity-50 w-36 h-36 rounded-full md:w-80 md:h-80 md:rounded ">
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
        {showConfirmation && !isLoading && (
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg">
              <img alt="" src={previewImage} className="w-60 h-60 rounded" />
              <p className="mb-4 text-lg font-semibold">
                {t('would you like to save this picture')}
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleCancelPictureUpload}
                  className="px-4 py-2 bg-primary-light text-gray-700 rounded-lg hover:bg-gray-400"
                  type="button"
                >
                  {t('cancel')}
                </button>
                <button
                  onClick={handleSavePictureUpload}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90"
                  type="button"
                >
                  {t('save')}
                </button>
              </div>
            </div>
          </div>
        )}
        {isEditing ? (
          <Formik
            initialValues={initialValues}
            onSubmit={handleSave}
            validationSchema={personalDataValidationSchema}
          >
            {({ isSubmitting }) => (
              <Form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-500 text-sm mb-1">{t('first name')}</label>
                    <Field
                      name="firstName"
                      type="text"
                      className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-primary-light"
                    />
                    <ErrorMessage name="firstName" component="div" className="text-red-500" />
                  </div>

                  <div>
                    <label className="block text-gray-600 text-sm mb-1">{t('last name')}</label>
                    <Field
                      name="lastName"
                      type="text"
                      className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-primary-light"
                    />
                    <ErrorMessage name="lastName" component="div" className="text-red-500" />
                  </div>

                  <div>
                    <label className="block text-gray-600 text-sm mb-1">{t('username')}</label>
                    <Field
                      name="username"
                      type="text"
                      className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-primary-light"
                    />
                    <ErrorMessage name="username" component="div" className="text-red-500" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-600 text-sm mb-1">{t('email')}</label>
                    <Field
                      name="email"
                      type="email"
                      className="w-full px-4 py-2 border rounded-lg text-gray-700 bg-gray-100 focus:outline-none"
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 text-sm mb-1">{t('birthday')}</label>
                    <Field
                      name="birthDate"
                      type="date"
                      className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-primary-light"
                    />
                    <ErrorMessage name="birthDate" component="div" className="text-red-500" />
                  </div>
                </div>

                <div className="md:col-span-2 mt-6 ml-auto lg:w-1/2 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={handleCancelClick}
                    className="px-4 py-2 lg:w-1/3 bg-primary-light text-gray-700 rounded-lg hover:bg-gray-400"
                  >
                    {t('cancel')}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 lg:w-1/2 bg-primary text-white rounded-lg hover:bg-opacity-90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? t('saving') : t('save')}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-600 text-sm mb-1 dark:text-orange-600">{t('name')}</label>
              <p className="text-gray-800 dark:text-primary">{`${user?.firstName} ${user?.lastName}`}</p>
            </div>
            <div>
              <label className="block text-gray-600 text-sm mb-1 dark:text-orange-600">{t('email')}</label>
              <p className="text-gray-800 dark:text-primary">{user?.email}</p>
            </div>
            <div>
              <label className="block text-gray-600 text-sm mb-1 dark:text-orange-600">{t('username')}</label>
              <p className="text-gray-800 dark:text-primary">{user?.username}</p>
            </div>
            <div>
              <label className="block text-gray-600 text-sm mb-1 dark:text-orange-600">{t('birthday')}</label>
              <p className="text-gray-800 dark:text-primary">{new Date(user?.birthDate).toLocaleDateString()}</p>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={handleEditClick}
                className="px-4 py-2 mt-4 w-full bg-primary text-white rounded-lg hover:bg-opacity-90"
              >
                {t('edit')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
