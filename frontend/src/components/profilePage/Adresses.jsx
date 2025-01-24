import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import AuthContext from '../../contexts/AuthContext';
import userService from '../../services/userService';

export default function Adresses() {
  const { user, setUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [billingAdressEqual, setBillingAdressEqual] = useState(true);

  const adressValidationSchema = yup.object({
    country: yup.string().required('Country is required'),
    city: yup.string().required('City is required'),
    'postal code': yup.string().required('postal code is required'),
    street: yup.string().required('Street is requires'),
    'house number': yup.string().required('House number is requires'),
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = (resetForm) => {
    resetForm();
    setIsEditing(false);
  };

  const handleCheckboxChange = (event) => {
    setBillingAdressEqual(event.target.checked);
  };

  const handleSaveClick = async (values, resetForm, setFieldValue) => {
    try {
      const adress = [
        values.country,
        values.city,
        values['postal code'],
        values.street,
        values['house number'],
      ].join(', ');
      let billingAdress = [
        values.billingCountry,
        values.billingCity,
        values.billingPostalCode,
        values.billingStreet,
        values.billingHouseNumber,
      ].join(', ');

      if (billingAdressEqual) {
        billingAdress = [
          values.country,
          values.city,
          values['postal code'],
          values.street,
          values['house number'],
        ].join(', ');
      }

      if (billingAdressEqual) {
        setFieldValue('billingCountry', values.country);
        setFieldValue('billingCity', values.city);
        setFieldValue('billingPostalCode', values['postal code']);
        setFieldValue('billingStreet', values.street);
        setFieldValue('billingHouseNumber', values['house number']);
      }

      if (billingAdressEqual) {
        billingAdress = adress;
      }
      const response = await userService.updateUser(user.id, {
        adress,
        billingAdress,
      });

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
      resetForm();
    } catch (error) {
      toast.error('Failed to update user data.');
    }
  };

  return (
    <div className="mx-auto w-full bg-white rounded-lg shadow-md p-8">
      <h1 className="text-xl font-bold text-gray-700 mb-4">
        {isEditing ? 'Edit Addresses' : 'Addresses'}
      </h1>

      <Formik
        initialValues={{
          country: user.adress?.split(', ')[0] || '',
          city: user.adress?.split(', ')[1] || '',
          'postal code': user.adress?.split(', ')[2] || '',
          street: user.adress?.split(', ')[3] || '',
          'house number': user?.adress?.split(', ')[4] || '',
          billingCountry: user?.billingAdress?.split(', ')[0] || '',
          billingCity: user?.billingAdress?.split(', ')[1] || '',
          billingPostalCode: user?.billingAdress?.split(', ')[2] || '',
          billingStreet: user?.billingAdress?.split(', ')[3] || '',
          billingHouseNumber: user?.billingAdress?.split(', ')[4] || '',
        }}
        validationSchema={adressValidationSchema}
        enableReinitialize
        onSubmit={(values, { resetForm, setFieldValue }) =>
          handleSaveClick(values, resetForm, setFieldValue)
        }
      >
        {({ resetForm, setFieldValue, values }) => (
          <Form>
            <div className="space-y-4">
              <div>
                <label className="text-xl font-bold text-gray-700 mb-4">Address</label>
                {isEditing ? (
                  <>
                    <div>
                      <label className="block text-gray-600 text-sm mb-1">Country</label>
                      <Field
                        name="country"
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-indigo-200"
                      />
                      <ErrorMessage name="country" component="div" className="text-red-500" />
                    </div>

                    <div>
                      <label className="block text-gray-600 text-sm mb-1">City</label>
                      <Field
                        type="text"
                        name="city"
                        className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-indigo-200"
                      />
                      <ErrorMessage name="city" component="div" className="text-red-500" />
                    </div>

                    <div>
                      <label className="block text-gray-600 text-sm mb-1">Postal Code</label>
                      <Field
                        type="text"
                        name="postal code"
                        className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-indigo-200"
                      />
                      <ErrorMessage name="postal code" component="div" className="text-red-500" />
                    </div>

                    <div>
                      <label className="block text-gray-600 text-sm mb-1">Street</label>
                      <Field
                        type="text"
                        name="street"
                        className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-indigo-200"
                      />
                      <ErrorMessage name="street" component="div" className="text-red-500" />
                    </div>

                    <div>
                      <label className="block text-gray-600 text-sm mb-1">House Number</label>
                      <Field
                        type="text"
                        name="house number"
                        className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-indigo-200"
                      />
                      <ErrorMessage name="house number" component="div" className="text-red-500" />
                    </div>
                  </>
                ) : (
                  <p className="text-gray-800">{user.adress}</p>
                )}
              </div>

              <div>
                <label className="text-xl font-bold text-gray-700 mb-4">Billing Address</label>
                {isEditing ? (
                  <>
                    <div className="flex m-4">
                      <div className="flex items-center h-5">
                        <input
                          id="billingAdressCheckbox"
                          type="checkbox"
                          checked={billingAdressEqual}
                          onChange={(e) => handleCheckboxChange(e, setFieldValue, values)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </div>
                      <div className="ms-2 text-sm">
                        <label htmlFor="helper-checkbox" className="text-gray-600 text-sm mb-1">
                          My billing address is the same
                        </label>
                      </div>
                    </div>
                    {!billingAdressEqual && (
                      <>
                        <div>
                          <label className="block text-gray-600 text-sm mb-1">
                            Billing Country
                          </label>
                          <Field
                            type="text"
                            name="billingCountry"
                            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-indigo-200"
                          />
                          <ErrorMessage
                            name="billingCountry"
                            component="div"
                            className="text-red-500"
                          />
                        </div>

                        <div>
                          <label className="block text-gray-600 text-sm mb-1">Billing City</label>
                          <Field
                            type="text"
                            name="billingCity"
                            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-indigo-200"
                          />
                          <ErrorMessage
                            name="billingCity"
                            component="div"
                            className="text-red-500"
                          />
                        </div>

                        <div>
                          <label className="block text-gray-600 text-sm mb-1">
                            Billing Postal Code
                          </label>
                          <Field
                            type="text"
                            name="billingPostalCode"
                            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-indigo-200"
                          />
                          <ErrorMessage
                            name="billingPostalCode"
                            component="div"
                            className="text-red-500"
                          />
                        </div>

                        <div>
                          <label className="block text-gray-600 text-sm mb-1">Billing Street</label>
                          <Field
                            type="text"
                            name="billingStreet"
                            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-indigo-200"
                          />
                          <ErrorMessage
                            name="billingStreet"
                            component="div"
                            className="text-red-500"
                          />
                        </div>

                        <div>
                          <label className="block text-gray-600 text-sm mb-1">
                            Billing House Number
                          </label>
                          <Field
                            type="text"
                            name="billingHouseNumber"
                            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-indigo-200"
                          />
                          <ErrorMessage
                            name="billingHouseNumber"
                            component="div"
                            className="text-red-500"
                          />
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <p className="text-gray-800">{user.billingAdress}</p>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
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
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-indigo-700"
                  >
                    Save
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={handleEditClick}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-indigo-700"
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
