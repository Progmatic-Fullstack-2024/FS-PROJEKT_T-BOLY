import { ErrorMessage, Field, Formik } from 'formik';
import { useContext } from 'react';
import { Form } from 'react-router-dom';
import * as yup from 'yup';

import AuthContext from '../../contexts/AuthContext';

export default function DeliveryInfo() {
  const { user } = useContext(AuthContext);
  console.log(user);

  const initialValues = {
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email,
  };

  const userDataValidationSchema = yup.object({
    firstName: yup.string().required('FirstName is required'),
    lastName: yup.string().required('LastName is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
  });

  return (
    <div className=" border-2 rounded-xl p-12">
      <h1 className="text-2xl font-medium mb-12">Delivery info</h1>
      <div>
        <Formik initialValues={initialValues} validationSchema={userDataValidationSchema}>
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
          </Form>
        </Formik>
      </div>
    </div>
  );
}
