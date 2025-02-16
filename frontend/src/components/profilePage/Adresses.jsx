import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import AuthContext from '../../contexts/AuthContext';
import LanguageContext from '../../contexts/LanguageContext.jsx';
import userService from '../../services/userService';

export default function Adresses() {
  const { user, setUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [billingAdressEqual, setBillingAdressEqual] = useState(true);
  const { t } = useContext(LanguageContext);

  const adressValidationSchema = yup.object({
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

  const handleCheckboxChange = () => setBillingAdressEqual(!billingAdressEqual);

  const handleSaveClick = async (values, resetForm, setFieldValue) => {
    try {
      const adress = `${values.country}, ${values.city}, ${values.postalCode}, ${values.street}, ${values.houseNumber}`;
      const billingAdress = billingAdressEqual
        ? adress
        : `${values.billingCountry}, ${values.billingCity}, ${values.billingPostalCode}, ${values.billingStreet}, ${values.billingHouseNumber}`;

      if (billingAdressEqual) {
        setFieldValue('billingCountry', values.country);
        setFieldValue('billingCity', values.city);
        setFieldValue('billingPostalCode', values.postalCode);
        setFieldValue('billingStreet', values.street);
        setFieldValue('billingHouseNumber', values.houseNumber);
      }

      const response = await userService.updateUser(user.id, { adress, billingAdress });

      if (response?.updatedUser && response.token) {
        setUser({ ...user, ...response.updatedUser });
        localStorage.setItem('token', response.token);
        setIsEditing(false);
      } else {
        toast.error('Failed to update user data.');
      }
      resetForm();
    } catch (error) {
      toast.error('Failed to update user data.');
    }
  };

  return (
    <div className="mx-auto w-full h-full bg-white rounded-2xl shadow-lg px-12 py-8 dark:text-primary dark:bg-gray-700 dark:border-primary">
      <h1 className="text-2xl font-semibold text-gray-800 mb-8 dark:text-orange-600">{t('manage adresses')}</h1>

      <Formik
        initialValues={{
          country: user.adress?.split(', ')[0] || '',
          city: user.adress?.split(', ')[1] || '',
          postalCode: user.adress?.split(', ')[2] || '',
          street: user.adress?.split(', ')[3] || '',
          houseNumber: user.adress?.split(', ')[4] || '',
          billingCountry: user.billingAdress?.split(', ')[0] || '',
          billingCity: user.billingAdress?.split(', ')[1] || '',
          billingPostalCode: user.billingAdress?.split(', ')[2] || '',
          billingStreet: user.billingAdress?.split(', ')[3] || '',
          billingHouseNumber: user.billingAdress?.split(', ')[4] || '',
        }}
        validationSchema={adressValidationSchema}
        enableReinitialize
        onSubmit={(values, { resetForm, setFieldValue }) =>
          handleSaveClick(values, resetForm, setFieldValue)
        }
      >
        {({ resetForm, isSubmitting }) => (
          <Form className="space-y-5">
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-4 dark:text-orange-600">{t('main adress')}</h2>
              {isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1 dark:text-primary">{t('country')}</label>
                    <Field
                      name="country"
                      type="text"
                      className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-indigo-300 dark:text-primary dark:border-primary dark:bg-gray-800"
                    />
                    <ErrorMessage name="country" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1 dark:text-primary">{t('city')}</label>
                    <Field
                      name="city"
                      type="text"
                      className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-indigo-300 dark:text-primary dark:border-primary dark:bg-gray-800"
                    />
                    <ErrorMessage name="city" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1 dark:text-primary">{t('postal code')}</label>
                    <Field
                      name="postalCode"
                      type="text"
                      className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-indigo-300 dark:text-primary dark:border-primary dark:bg-gray-800"
                    />
                    <ErrorMessage
                      name="postalCode"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1 dark:text-primary">{t('street')}</label>
                    <Field
                      name="street"
                      type="text"
                      className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-indigo-300 dark:text-primary dark:border-primary dark:bg-gray-800"
                    />
                    <ErrorMessage name="street" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1 dark:text-primary">{t('house number')}</label>
                    <Field
                      name="houseNumber"
                      type="text"
                      className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-indigo-300 dark:text-primary dark:border-primary dark:bg-gray-800"
                    />
                    <ErrorMessage
                      name="houseNumber"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
              ) : (
                <p className="text-gray-800 dark:text-primary">
                  {user.adress ? user.adress : t('no main adress has been added yet')}
                </p>
              )}
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-4 dark:text-orange-600">{t('billing adress')}</h2>
              {isEditing ? (
                <>
                  <div className="flex items-center space-x-2 mb-4">
                    <input
                      type="checkbox"
                      id="billingAdressCheckbox"
                      checked={billingAdressEqual}
                      onChange={handleCheckboxChange}
                      className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <label htmlFor="billingAdressCheckbox" className="text-sm text-gray-600 dark:text-primary">
                      {t('same as main adress')}
                    </label>
                  </div>

                  {!billingAdressEqual && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1 dark:text-primary">{t('country')}</label>
                        <Field
                          name="billingCountry"
                          type="text"
                          className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-indigo-300 dark:text-primary dark:border-primary dark:bg-gray-800"
                        />
                        <ErrorMessage
                          name="billingCountry"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-600 mb-1 dark:text-primary">{t('city')}</label>
                        <Field
                          name="billingCity"
                          type="text"
                          className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-indigo-300 dark:text-primary dark:border-primary dark:bg-gray-800"
                        />
                        <ErrorMessage
                          name="billingCity"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-600 mb-1 dark:text-primary">
                          {t('postal code')}
                        </label>
                        <Field
                          name="billingPostalCode"
                          type="text"
                          className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-indigo-300 dark:text-primary dark:border-primary dark:bg-gray-800"
                        />
                        <ErrorMessage
                          name="billingPostalCode"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-600 mb-1 dark:text-primary">{t('street')}</label>
                        <Field
                          name="billingStreet"
                          type="text"
                          className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-indigo-300 dark:text-primary dark:border-primary dark:bg-gray-800"
                        />
                        <ErrorMessage
                          name="billingStreet"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-600 mb-1 dark:text-primary">
                          {t('house number')}
                        </label>
                        <Field
                          name="billingHouseNumber"
                          type="text"
                          className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-indigo-300 dark:text-primary dark:border-primary dark:bg-gray-800"
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
                <p className="text-gray-800 dark:text-primary">
                  {user.billingAdress
                    ? user.billingAdress
                    : t('no billing adress has been added yet')}
                </p>
              )}
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={() => handleCancelClick(resetForm)}
                    className="px-4 py-2 bg-primary-light text-gray-700 rounded-lg hover:bg-gray-400 dark:text-primary dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-primary dark:border"
                  >
                    {t('cancel')}
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90"
                  >
                    {isSubmitting ? t('saving') : t('save')}
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={handleEditClick}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90"
                >
                  {t('edit')}
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
