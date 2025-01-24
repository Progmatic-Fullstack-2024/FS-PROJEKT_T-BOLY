import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';

import userService from '../../services/userService';

export default function AddNewUserModal({ setIsOpen }) {
  const [userData, setUserData] = useState([]);
  const roleOptions = [
    { value: 'user', label: 'User' },
    { value: 'admin', label: 'Admin' },
    { value: 'guest', label: 'Guest' },
  ];

  const initialValues = {
    firstName: userData?.firstName,
    lastName: userData?.lastName,
    username: userData?.username,
    email: userData?.email,
    role: userData?.role,
  };

  const handleCreate = async (values) => {
    try {
      const formattedValues = {
        ...values,
        role: values.role.value.toUpperCase(),
      };
      await userService.createUser(formattedValues);

      toast.success('User added successfully!');

      setIsOpen(false);
    } catch (error) {
      toast.error('Problem during creating new user', error);
    }
  };
  return (
    <div>
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-screen-lg">
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

          <Formik initialValues={initialValues} onSubmit={handleCreate}>
            {({ setFieldValue }) => (
              <Form className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex flex-col w-2/3">
                    <div>
                      <label className="block text-left text-sm font-medium">First Name</label>
                      <Field name="firstName" className="w-full p-2 border rounded-lg" />
                      <ErrorMessage
                        name="firstName"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-left text-sm font-medium">Last Name</label>
                      <Field name="lastName" className="w-full p-2 border rounded-lg" />
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-left text-sm font-medium">Email</label>
                      <Field name="email" className="w-full p-2 border rounded-lg" />
                      <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                    </div>

                    <div>
                      <label className="block text-left text-sm font-medium">Username</label>
                      <Field name="username" className="w-full p-2 border rounded-lg" />
                      <ErrorMessage
                        name="username"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-left text-sm font-medium">Role</label>

                  <Select
                    defaultValue={initialValues.role}
                    name="colors"
                    options={roleOptions}
                    className="basic-select"
                    classNamePrefix="select"
                    onChange={(selectedOptions) => setFieldValue('role', selectedOptions)}
                  />

                  <ErrorMessage name="role" component="div" className="text-red-500 text-sm" />
                </div>

                <button type="submit" className="bg-primary text-white w-full py-2 rounded-lg">
                  Create a new GAME
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
