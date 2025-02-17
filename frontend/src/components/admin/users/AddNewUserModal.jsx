import emailjs from 'emailjs-com';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Select from 'react-select';
import { toast } from 'react-toastify';

import { VITE_PUBLIC_KEY, VITE_SERVICE_ID, VITE_TEMPLATE_ID } from '../../../constants/constants';
import userService from '../../../services/userService';
import { nwUserValidationSchemaByAdmin } from '../../../validations/newUserByAdmin.validation';

export default function AddNewUserModal({ setIsOpen }) {
  const roleOptions = [
    { value: 'user', label: 'User' },
    { value: 'admin', label: 'Admin' },
    { value: 'guest', label: 'Guest' },
  ];

  const initialValues = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    role: '',
  };

  const sendEmail = async (formData) => {
    try {
      const response = await emailjs.send(
        VITE_SERVICE_ID,
        VITE_TEMPLATE_ID,
        formData,
        VITE_PUBLIC_KEY,
      );
      return response;
    } catch (error) {
      toast.error('Failed to send email:', error);
      throw error;
    }
  };

  const handleCreate = async (values) => {
    try {
      const formattedValues = {
        ...values,
        role: values.role.value.toUpperCase(),
      };
      const response = await userService.createUser(formattedValues);
      if (response) toast.success('User added successfully!');
      sendEmail({
        email: formattedValues.email,
        user_name: formattedValues.firstName,
        message: `Hello ${formattedValues.firstName}, your account has been created successfully!`,
      });

      setIsOpen(false);
    } catch (error) {
      toast.error('Problem during creating new user');
    }
  };
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 ">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 dark:bg-gray-700 dark:border-primary dark:text-primary dark:border-2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-orange-500">Create new USER</h2>

          <button
            type="button"
            className="text-gray-500 hover:text-black"
            onClick={() => setIsOpen(false)}
          >
            ✖
          </button>
        </div>

        <Formik
          initialValues={initialValues}
          onSubmit={handleCreate}
          validationSchema={nwUserValidationSchemaByAdmin}
        >
          {({ setFieldValue }) => (
            <Form className="flex flex-row w-full">
              <div className="flex flex-col justify-between items-center mb-4 w-full">
                <div className="w-full">
                  <label className="block text-left text-sm font-medium  w-full">First Name</label>
                  <Field
                    name="firstName"
                    className="block w-full p-2 border rounded-lg dark:bg-gray-600 dark:border-primary dark:border-2"
                  />
                  <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="w-full">
                  <label className="block text-left text-sm font-medium">Last Name</label>
                  <Field
                    name="lastName"
                    className="w-full p-2 border rounded-lg dark:bg-gray-600 dark:border-primary dark:border-2"
                  />
                  <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="w-full">
                  <label className="block text-left text-sm font-medium">Email</label>
                  <Field
                    name="email"
                    className="w-full p-2 border rounded-lg dark:bg-gray-600 dark:border-primary dark:border-2"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="w-full">
                  <label className="block text-left text-sm font-medium">Username</label>
                  <Field
                    name="username"
                    className="w-full p-2 border rounded-lg dark:bg-gray-600 dark:border-primary dark:border-2"
                  />
                  <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="w-full  mb-4">
                  <label className="block text-left text-sm font-medium">Role</label>

                  <Select
                    defaultValue={initialValues.role}
                    name="colors"
                    options={roleOptions}
                    className="blockya basic-select"
                    classNamePrefix="select dark:bg-gray-600 dark:border-primary dark:text-primary"
                    onChange={(selectedOptions) => setFieldValue('role', selectedOptions)}
                  />

                  <ErrorMessage name="role" component="div" className="text-red-500 text-sm" />
                </div>
                <button
                  type="submit"
                  className="block bg-primary text-white w-full  p-2 rounded-lg"
                >
                  Create a new USER
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
