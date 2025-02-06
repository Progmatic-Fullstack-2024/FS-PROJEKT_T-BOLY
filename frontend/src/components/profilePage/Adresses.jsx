import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import AuthContext from '../../contexts/AuthContext';
import userService from '../../services/userService';

export default function Addresses() {
  const { user, setUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [billingAddressEqual, setBillingAddressEqual] = useState(true);

  const addressValidationSchema = yup.object({
    country: yup.string().required('Country is required'),
    city: yup.string().required('City is required'),
    postalCode: yup.string().required('Postal code is required'),
    street: yup.string().required('Street is required'),
    houseNumber: yup.string().required('House number is required'),
  });

  const handleEditClick = () => setIsEditing(true);

  const handleCancelClick = (resetForm) => {
    resetForm();
    setIsEditing(false);
  };

  const handleCheckboxChange = () => setBillingAddressEqual(!billingAddressEqual);

  const handleSaveClick = async (values, resetForm, setFieldValue) => {
    try {
      const address = `${values.country}, ${values.city}, ${values.postalCode}, ${values.street}, ${values.houseNumber}`;
      const billingAddress = billingAddressEqual
        ? address
        : `${values.billingCountry}, ${values.billingCity}, ${values.billingPostalCode}, ${values.billingStreet}, ${values.billingHouseNumber}`;

      if (billingAddressEqual) {
        setFieldValue('billingCountry', values.country);
        setFieldValue('billingCity', values.city);
        setFieldValue('billingPostalCode', values.postalCode);
        setFieldValue('billingStreet', values.street);
        setFieldValue('billingHouseNumber', values.houseNumber);
      }

      const response = await userService.updateUser(user.id, { address, billingAddress });

      if (response?.updatedUser && response.token) {
        setUser({ ...user, ...response.updatedUser });
        localStorage.setItem('token', response.token);
        setIsEditing(false);
        toast.success('User data updated successfully!');
      } else {
        toast.error('Failed to update user data.');
      }
      resetForm();
    } catch (error) {
      toast.error('Failed to update user data.');
    }
  };

  return (
    <div className="mx-auto w-full h-full bg-white rounded-2xl shadow-lg px-12 py-8">
      <h1 className="text-2xl font-semibold text-gray-800 mb-8">Manage Addresses</h1>

      <Formik
        initialValues={{
          country: user.address?.split(', ')[0] || '',
          city: user.address?.split(', ')[1] || '',
          postalCode: user.address?.split(', ')[2] || '',
          street: user.address?.split(', ')[3] || '',
          houseNumber: user.address?.split(', ')[4] || '',
          billingCountry: user.billingAddress?.split(', ')[0] || '',
          billingCity: user.billingAddress?.split(', ')[1] || '',
          billingPostalCode: user.billingAddress?.split(', ')[2] || '',
          billingStreet: user.billingAddress?.split(', ')[3] || '',
          billingHouseNumber: user.billingAddress?.split(', ')[4] || '',
        }}
        validationSchema={addressValidationSchema}
        enableReinitialize
        onSubmit={(values, { resetForm, setFieldValue }) =>
          handleSaveClick(values, resetForm, setFieldValue)
        }
      >
        {({ resetForm }) => (
          <Form className="space-y-5">
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Main Address</h2>
              {isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Country</label>
                    <Field
                      name="country"
                      type="text"
                      className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-indigo-300"
                    />
                    <ErrorMessage name="country" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">City</label>
                    <Field
                      name="city"
                      type="text"
                      className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-indigo-300"
                    />
                    <ErrorMessage name="city" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Postal Code</label>
                    <Field
                      name="postalCode"
                      type="text"
                      className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-indigo-300"
                    />
                    <ErrorMessage
                      name="postalCode"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Street</label>
                    <Field
                      name="street"
                      type="text"
                      className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-indigo-300"
                    />
                    <ErrorMessage name="street" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">House Number</label>
                    <Field
                      name="houseNumber"
                      type="text"
                      className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-indigo-300"
                    />
                    <ErrorMessage
                      name="houseNumber"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
              ) : (
                <p className="text-gray-800">
                  {user.address ? user.address : 'No main address has been added yet.'}
                </p>
              )}
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Billing Address</h2>
              {isEditing ? (
                <>
                  <div className="flex items-center space-x-2 mb-4">
                    <input
                      type="checkbox"
                      id="billingAddressCheckbox"
                      checked={billingAddressEqual}
                      onChange={handleCheckboxChange}
                      className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <label htmlFor="billingAddressCheckbox" className="text-sm text-gray-600">
                      Same as main address
                    </label>
                  </div>

                  {!billingAddressEqual && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Billing Country</label>
                        <Field
                          name="billingCountry"
                          type="text"
                          className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-indigo-300"
                        />
                        <ErrorMessage
                          name="billingCountry"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Billing City</label>
                        <Field
                          name="billingCity"
                          type="text"
                          className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-indigo-300"
                        />
                        <ErrorMessage
                          name="billingCity"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-600 mb-1">
                          Billing Postal Code
                        </label>
                        <Field
                          name="billingPostalCode"
                          type="text"
                          className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-indigo-300"
                        />
                        <ErrorMessage
                          name="billingPostalCode"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Billing Street</label>
                        <Field
                          name="billingStreet"
                          type="text"
                          className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-indigo-300"
                        />
                        <ErrorMessage
                          name="billingStreet"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-600 mb-1">
                          Billing House Number
                        </label>
                        <Field
                          name="billingHouseNumber"
                          type="text"
                          className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-indigo-300"
                        />
                        <ErrorMessage
                          name="billingHouseNumber"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-gray-800">
                  {user.billingAddress
                    ? user.billingAddress
                    : 'No billing address has been added yet.'}
                </p>
              )}
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={() => handleCancelClick(resetForm)}
                    className="px-4 py-2 bg-primary-light text-gray-700 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90"
                  >
                    Save
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={handleEditClick}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90"
                >
                  Edit
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
