import { ErrorMessage, Field, Form, Formik } from 'formik';

import { deliveryInfoValidationSchema } from '../../validations/deliveryInfo.validation';

export default function DeliveryInfo({ formData, setFormData }) {
  return (
    <div className="border-2 rounded-xl md:p-12 dark:border-primary dark:border dark:text-primary dark:bg-gray-700 p-4 h-fit md:mb-0 mb-10">
      <h1 className="text-2xl font-medium mb-12">Delivery info</h1>
      <Formik validationSchema={deliveryInfoValidationSchema} initialValues={formData}>
        {({ values, setFieldValue }) => (
          <Form className="flex flex-col md:gap-6 gap-3">
            <div className=" flex justify-between md:gap-10 gap-4">
              <div className="w-1/2">
                <label className="block mb-2 font-medium">
                  First name <span className="text-red-500 font-bold">*</span>
                </label>
                <Field
                  readOnly
                  onChange={(e) => {
                    setFieldValue('firstName', e.target.value);
                    setFormData((prev) => ({ ...prev, firstName: e.target.value }));
                  }}
                  name="firstName"
                  type="text"
                  className="w-full px-4 py-2 border-2 rounded-xl font-medium text-gray-700 bg-gray-100 focus:outline-none dark:bg-gray-800 dark:border-primary dark:border dark:text-primary"
                />
                <ErrorMessage name="firstName" component="div" className="text-red-500" />
              </div>
              <div className="w-1/2">
                <label className="block mb-2 font-medium">
                  Last name <span className="text-red-500 font-bold">*</span>
                </label>
                <Field
                  readOnly
                  onChange={(e) => {
                    setFieldValue('lastName', e.target.value);
                    setFormData((prev) => ({ ...prev, lastName: e.target.value }));
                  }}
                  name="lastName"
                  type="text"
                  className="w-full px-4 py-2 border-2 rounded-xl font-medium text-gray-700 bg-gray-100 focus:outline-none dark:bg-gray-800 dark:border-primary dark:border dark:text-primary"
                />
                <ErrorMessage name="lastName" component="div" className="text-red-500" />
              </div>
            </div>
            <div className=" flex justify-between md:gap-10 gap-4">
              <div className="md:w-2/3 w-1/2">
                <label className="block mb-2 font-medium">
                  Street <span className="text-red-500 font-bold">*</span>
                </label>
                <Field
                  onChange={(e) => {
                    setFieldValue('street', e.target.value);
                    setFormData((prev) => ({ ...prev, street: e.target.value }));
                  }}
                  name="street"
                  type="text"
                  className="w-full px-4 py-2 border-2 rounded-xl font-medium text-gray-700 focus:outline-none focus:border-2 focus:border-primary dark:bg-gray-800 dark:border-primary dark:border dark:text-primary"
                />
                <ErrorMessage name="street" component="div" className="text-red-500" />
              </div>
              <div className="md:w-1/3 w-1/2">
                <label className="block mb-2 font-medium">
                  House number <span className="text-red-500 font-bold">*</span>
                </label>
                <Field
                  onChange={(e) => {
                    setFieldValue('houseNumber', e.target.value);
                    setFormData((prev) => ({ ...prev, houseNumber: e.target.value }));
                  }}
                  name="houseNumber"
                  type="text"
                  className="w-full px-4 py-2 border-2 rounded-xl font-medium text-gray-700 focus:outline-none focus:border-2 focus:border-primary dark:bg-gray-800 dark:border-primary dark:border dark:text-primary"
                />
                <ErrorMessage name="houseNumber" component="div" className="text-red-500" />
              </div>
            </div>
            <div className=" flex justify-between md:gap-10 gap-4">
              <div className="w-1/2">
                <label className="block mb-2 font-medium">
                  Country <span className="text-red-500 font-bold">*</span>
                </label>
                <Field
                  onChange={(e) => {
                    setFieldValue('country', e.target.value);
                    setFormData((prev) => ({ ...prev, country: e.target.value }));
                  }}
                  name="country"
                  type="text"
                  className="w-full px-4 py-2 border-2 rounded-xl font-medium text-gray-700 focus:outline-none focus:border-2 focus:border-primary dark:bg-gray-800 dark:border-primary dark:border dark:text-primary"
                />
                <ErrorMessage name="country" component="div" className="text-red-500" />
              </div>
              <div className="w-1/2">
                <label className="block mb-2 font-medium">
                  City <span className="text-red-500 font-bold">*</span>
                </label>
                <Field
                  onChange={(e) => {
                    setFieldValue('city', e.target.value);
                    setFormData((prev) => ({ ...prev, city: e.target.value }));
                  }}
                  name="city"
                  type="text"
                  className="w-full px-4 py-2 border-2 rounded-xl font-medium text-gray-700 focus:outline-none focus:border-2 focus:border-primary dark:bg-gray-800 dark:border-primary dark:border dark:text-primary"
                />
                <ErrorMessage name="city" component="div" className="text-red-500" />
              </div>
            </div>
            <div className=" flex justify-between md:gap-10 gap-4">
              <div className="w-1/2">
                <label className="block mb-2 font-medium">
                  ZIP code <span className="text-red-500 font-bold">*</span>
                </label>
                <Field
                  onChange={(e) => {
                    setFieldValue('postalCode', e.target.value);
                    setFormData((prev) => ({ ...prev, postalCode: e.target.value }));
                  }}
                  name="postalCode"
                  type="text"
                  className="w-full px-4 py-2 border-2 rounded-xl font-medium text-gray-700 focus:outline-none focus:border-2 focus:border-primary dark:bg-gray-800 dark:border-primary dark:border dark:text-primary"
                />
                <ErrorMessage name="postalCode" component="div" className="text-red-500" />
              </div>
              <div className="w-1/2">
                <label className="block mb-2 font-medium">
                  Phone number <span className="text-red-500 font-bold">*</span>
                </label>
                <Field
                  onChange={(e) => {
                    setFieldValue('phoneNumber', e.target.value);
                    setFormData((prev) => ({ ...prev, phoneNumber: e.target.value }));
                  }}
                  name="phoneNumber"
                  type="text"
                  placeholder="+36-11-1111111"
                  className="w-full px-4 py-2 border-2 rounded-xl font-medium text-gray-700 focus:outline-none focus:border-2 focus:border-primary placeholder:text-gray-400 placeholder:font-normal dark:bg-gray-800 dark:border-primary dark:border dark:text-primary dark:placeholder-primary"
                />
                <ErrorMessage name="phoneNumber" component="div" className="text-red-500" />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block mb-2 font-medium">
                  Email address <span className="text-red-500 font-bold">*</span>
                </label>
                <Field
                  onChange={(e) => {
                    setFieldValue('email', e.target.value);
                    setFormData((prev) => ({ ...prev, email: e.target.value }));
                  }}
                  name="email"
                  type="email"
                  className="w-full px-4 py-2 border-2 rounded-xl font-medium text-gray-700 bg-gray-100 focus:outline-none dark:bg-gray-800 dark:border-primary dark:border dark:text-primary"
                  readOnly
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="block mb-2 font-medium">Order notes (optional):</label>
              <Field
                onChange={(e) => {
                  setFieldValue('orderNotes', e.target.value);
                  setFormData((prev) => ({ ...prev, orderNotes: e.target.value }));
                }}
                name="orderNotes"
                as="textarea"
                className="w-full px-4 py-2 border-2 rounded-xl font-medium text-gray-700 focus:outline-none focus:border-2 focus:border-primary dark:bg-gray-800 dark:border-primary dark:border dark:text-primary"
                rows="4"
              />
              <ErrorMessage name="orderNotes" component="div" className="text-red-500" />
            </div>
            <div className="mt-3">
              <label className="flex items-center gap-3">
                <Field
                  className="w-5 h-5 border-2 border-gray-300 rounded-md checked:bg-primary checked:border-transparent "
                  type="checkbox"
                  name="isSameAddress"
                  onChange={(e) => {
                    setFieldValue('isSameAddress', e.target.checked);
                    setFormData((prev) => ({ ...prev, isSameAddress: e.target.checked }));
                  }}
                />
                <span>Use shipping address as billing address</span>
              </label>
            </div>
            {!values.isSameAddress && (
              <div className="flex flex-col gap-6">
                <h1 className="text-2xl font-medium mt-8 md:mb-12 mb-6">Billing Address</h1>
                <div className="flex justify-between md:gap-10 gap-4">
                  <div className="md:w-2/3 w-1/2">
                    <label className="block mb-2 font-medium">
                      Billing Street <span className="text-red-500 font-bold">*</span>
                    </label>
                    <Field
                      onChange={(e) => {
                        setFieldValue('billingStreet', e.target.value);
                        setFormData((prev) => ({ ...prev, billingStreet: e.target.value }));
                      }}
                      name="billingStreet"
                      type="text"
                      className="w-full px-4 py-2 border-2 rounded-xl font-medium text-gray-700 focus:outline-none focus:border-2 focus:border-primary"
                    />
                    <ErrorMessage name="billingStreet" component="div" className="text-red-500" />
                  </div>
                  <div className="md:w-1/3 w-1/2">
                    <label className="block mb-2 font-medium">
                      Billing house number <span className="text-red-500 font-bold">*</span>
                    </label>
                    <Field
                      onChange={(e) => {
                        setFieldValue('billingHouseNumber', e.target.value);
                        setFormData((prev) => ({ ...prev, billingHouseNumber: e.target.value }));
                      }}
                      name="billingHouseNumber"
                      type="text"
                      className="w-full px-4 py-2 border-2 rounded-xl font-medium text-gray-700 focus:outline-none focus:border-2 focus:border-primary"
                    />
                    <ErrorMessage
                      name="billingHouseNumber"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                </div>
                <div className="flex justify-between md:gap-10 gap-4">
                  <div className="w-1/2">
                    <label className="block mb-2 font-medium">
                      Billing Country <span className="text-red-500 font-bold">*</span>
                    </label>
                    <Field
                      onChange={(e) => {
                        setFieldValue('billingCountry', e.target.value);
                        setFormData((prev) => ({ ...prev, billingCountry: e.target.value }));
                      }}
                      name="billingCountry"
                      type="text"
                      className="w-full px-4 py-2 border-2 rounded-xl font-medium text-gray-700 focus:outline-none focus:border-2 focus:border-primary"
                    />
                    <ErrorMessage name="billingCountry" component="div" className="text-red-500" />
                  </div>
                  <div className="w-1/2">
                    <label className="block mb-2 font-medium">
                      Billing City <span className="text-red-500 font-bold">*</span>
                    </label>
                    <Field
                      onChange={(e) => {
                        setFieldValue('billingCity', e.target.value);
                        setFormData((prev) => ({ ...prev, billingCity: e.target.value }));
                      }}
                      name="billingCity"
                      type="text"
                      className="w-full px-4 py-2 border-2 rounded-xl font-medium text-gray-700 focus:outline-none focus:border-2 focus:border-primary"
                    />
                    <ErrorMessage name="billingCity" component="div" className="text-red-500" />
                  </div>
                </div>
                <div className="md:mr-10 mr-4">
                  <div className="w-1/2">
                    <label className="block mb-2 font-medium">
                      Billing ZIP code <span className="text-red-500 font-bold">*</span>
                    </label>
                    <Field
                      onChange={(e) => {
                        setFieldValue('billingPostalCode', e.target.value);
                        setFormData((prev) => ({ ...prev, billingPostalCode: e.target.value }));
                      }}
                      name="billingPostalCode"
                      type="text"
                      className="w-full px-4 py-2 border-2 rounded-xl font-medium text-gray-700 focus:outline-none focus:border-2 focus:border-primary"
                    />
                    <ErrorMessage
                      name="billingPostalCode"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}
