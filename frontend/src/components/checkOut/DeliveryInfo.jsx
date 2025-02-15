import { ErrorMessage, Field, Formik } from 'formik';
import { Form } from 'react-router-dom';
import * as yup from 'yup';

export default function DeliveryInfo({
  sameAddresses,
  setSameAddresses,
  formData,
  setFormData,
}) {
  const userDataValidationSchema = yup.object({
    firstName: yup.string().required('FirstName is required'),
    lastName: yup.string().required('LastName is required'),
    street: yup.string().required('Street is required'),
    houseNumber: yup.string().required('House number is required'),
    country: yup.string().required('Country is required'),
    city: yup.string().required('City is required'),
    postalCode: yup.string().required('ZIP code is required'),
    phoneNumber: yup.string().required('Phone number is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    orderNotes: yup.string(),
  });

  const handleSetBillingAddress = () => {
    setSameAddresses((prev) => !prev);
    if (sameAddresses) {
      setFormData((values) => ({
        ...values,
        billingStreet: values.billingStreet,
        billingHouseNumber: values.billingHouseNumber,
        billingCountry: values.billingCountry,
        billingCity: values.billingCity,
        billingPostalCode: values.billingPostalCode,
      }));
    }
  };

  return (
    <div className=" border-2 rounded-xl p-12">
      <h1 className="text-2xl font-medium mb-12">Delivery info</h1>
      <div>
        <Formik
          initialValues={formData}
          validationSchema={userDataValidationSchema}
          onSubmit={(values) => {
            setFormData((prevData) => ({
              ...prevData,
              ...values, 
            }));
            console.log('Updated form data: ', formData); 
          }}
        >
          <Form className="flex flex-col gap-6">
            <div className=" flex justify-between gap-10">
              <div className="w-1/2">
                <label className="block mb-2 font-medium">
                  First name <span className="text-red-500 font-bold">*</span>
                </label>
                <Field
                  name="firstName"
                  type="text"
                  className="w-full px-4 py-2 border-2 rounded-xl text-gray-700 focus:outline-none focus:border-2 focus:border-primary"
                />
                <ErrorMessage name="firstName" component="div" className="text-red-500" />
              </div>
              <div className="w-1/2">
                <label className="block mb-2 font-medium">
                  Last name <span className="text-red-500 font-bold">*</span>
                </label>
                <Field
                  name="lastName"
                  type="text"
                  className="w-full px-4 py-2 border-2 rounded-xl text-gray-700 focus:outline-none focus:border-2 focus:border-primary"
                />
                <ErrorMessage name="lastName" component="div" className="text-red-500" />
              </div>
            </div>
            <div className=" flex justify-between gap-10">
              <div className="w-3/4">
                <label className="block mb-2 font-medium">
                  Street <span className="text-red-500 font-bold">*</span>
                </label>
                <Field
                  name="street"
                  type="text"
                  className="w-full px-4 py-2 border-2 rounded-xl text-gray-700 focus:outline-none focus:border-2 focus:border-primary"
                />
                <ErrorMessage name="street" component="div" className="text-red-500" />
              </div>
              <div className="w-1/4">
                <label className="block mb-2 font-medium">
                  House number <span className="text-red-500 font-bold">*</span>
                </label>
                <Field
                  name="houseNumber"
                  type="text"
                  className="w-full px-4 py-2 border-2 rounded-xl text-gray-700 focus:outline-none focus:border-2 focus:border-primary"
                />
                <ErrorMessage name="houseNumber" component="div" className="text-red-500" />
              </div>
            </div>
            <div className=" flex justify-between gap-10">
              <div className="w-1/2">
                <label className="block mb-2 font-medium">
                  Country <span className="text-red-500 font-bold">*</span>
                </label>
                <Field
                  name="country"
                  type="text"
                  className="w-full px-4 py-2 border-2 rounded-xl text-gray-700 focus:outline-none focus:border-2 focus:border-primary"
                />
                <ErrorMessage name="country" component="div" className="text-red-500" />
              </div>
              <div className="w-1/2">
                <label className="block mb-2 font-medium">
                  City <span className="text-red-500 font-bold">*</span>
                </label>
                <Field
                  name="city"
                  type="text"
                  className="w-full px-4 py-2 border-2 rounded-xl text-gray-700 focus:outline-none focus:border-2 focus:border-primary"
                />
                <ErrorMessage name="city" component="div" className="text-red-500" />
              </div>
            </div>
            <div className=" flex justify-between gap-10">
              <div className="w-1/2">
                <label className="block mb-2 font-medium">
                  ZIP code <span className="text-red-500 font-bold">*</span>
                </label>
                <Field
                  name="postalCode"
                  type="text"
                  className="w-full px-4 py-2 border-2 rounded-xl text-gray-700 focus:outline-none focus:border-2 focus:border-primary"
                />
                <ErrorMessage name="postalCode" component="div" className="text-red-500" />
              </div>
              <div className="w-1/2">
                <label className="block mb-2 font-medium">
                  Phone number <span className="text-red-500 font-bold">*</span>
                </label>
                <Field
                  name="phoneNumber"
                  type="text"
                  className="w-full px-4 py-2 border-2 rounded-xl text-gray-700 focus:outline-none focus:border-2 focus:border-primary"
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
                  name="email"
                  type="email"
                  className="w-full px-4 py-2 border-2 rounded-xl text-gray-700 bg-gray-100 focus:outline-none"
                  readOnly
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="block mb-2 font-medium">Order notes (optional):</label>
              <Field
                name="orderNotes"
                as="textarea"
                className="w-full px-4 py-2 border-2 rounded-xl text-gray-700 focus:outline-none focus:border-2 focus:border-primary"
                rows="4"
              />
              <ErrorMessage name="orderNotes" component="div" className="text-red-500" />
            </div>
            <div className="mt-3">
              <label className="flex items-center gap-3">
                <Field
                  className="w-5 h-5 border-2 border-gray-300 rounded-md checked:bg-primary checked:border-transparent "
                  type="checkbox"
                  name="sameAddresses"
                  checked={sameAddresses}
                  onChange={handleSetBillingAddress}
                />
                <span>Use shipping address as billing address</span>
              </label>
            </div>
            {!sameAddresses && (
              <div className="flex flex-col gap-6">
                <h1 className="text-2xl font-medium mt-8 mb-12">Billing Address</h1>
                <div className="flex justify-between gap-10">
                  <div className="w-3/4">
                    <label className="block mb-2 font-medium">
                      Billing Street <span className="text-red-500 font-bold">*</span>
                    </label>
                    <Field
                      name="billingStreet"
                      type="text"
                      className="w-full px-4 py-2 border-2 rounded-xl text-gray-700 focus:outline-none focus:border-2 focus:border-primary"
                    />
                    <ErrorMessage name="billingStreet" component="div" className="text-red-500" />
                  </div>
                  <div className="w-1/4">
                    <label className="block mb-2 font-medium">
                      Billing house number <span className="text-red-500 font-bold">*</span>
                    </label>
                    <Field
                      name="billingHouseNumber"
                      type="text"
                      className="w-full px-4 py-2 border-2 rounded-xl text-gray-700 focus:outline-none focus:border-2 focus:border-primary"
                    />
                    <ErrorMessage
                      name="billingHouseNumber"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                </div>
                <div className="flex justify-between gap-10">
                  <div className="w-1/2">
                    <label className="block mb-2 font-medium">
                      Billing Country <span className="text-red-500 font-bold">*</span>
                    </label>
                    <Field
                      name="billingCountry"
                      type="text"
                      className="w-full px-4 py-2 border-2 rounded-xl text-gray-700 focus:outline-none focus:border-2 focus:border-primary"
                    />
                    <ErrorMessage name="billingCountry" component="div" className="text-red-500" />
                  </div>
                  <div className="w-1/2">
                    <label className="block mb-2 font-medium">
                      Billing City <span className="text-red-500 font-bold">*</span>
                    </label>
                    <Field
                      name="billingCity"
                      type="text"
                      className="w-full px-4 py-2 border-2 rounded-xl text-gray-700 focus:outline-none focus:border-2 focus:border-primary"
                    />
                    <ErrorMessage name="billingCity" component="div" className="text-red-500" />
                  </div>
                </div>
                <div className="mr-10">
                  <div className="w-1/2">
                    <label className="block mb-2 font-medium">
                      Billing ZIP code <span className="text-red-500 font-bold">*</span>
                    </label>
                    <Field
                      name="billingPostalCode"
                      type="text"
                      className="w-full px-4 py-2 border-2 rounded-xl text-gray-700 focus:outline-none focus:border-2 focus:border-primary"
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
        </Formik>
      </div>
    </div>
  );
}
