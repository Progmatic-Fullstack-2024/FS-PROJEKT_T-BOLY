import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useContext } from 'react';
import { toast } from 'react-toastify';

import AuthContext from '../../contexts/AuthContext.jsx';
import { userValidationSchema } from '../../validations/user.validation.js';

export default function RegistrationModal({ onClose }) {
  const { register } = useContext(AuthContext);

  const handleRegister = async (values, { setSubmitting }) => {
    try {
      const result = await register(values);
      if (result.ok) {
        toast.success('Registration successful!');
      } else {
        toast.error(`Registration failed, ${result.message.response.data.error}`);
      }
      onClose();
    } catch (error) {
      toast.error('An unexpected error occured. Please try again later');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Register</h2>
          <button type="button" className="text-gray-500 hover:text-black" onClick={onClose}>
            ✖
          </button>
        </div>

        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
          }}
          validationSchema={userValidationSchema}
          onSubmit={handleRegister}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">First Name</label>
                <Field name="firstName" className="w-full p-2 border rounded-lg" />
                <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium">Last Name</label>
                <Field name="lastName" className="w-full p-2 border rounded-lg" />
                <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium">Email</label>
                <Field name="email" type="email" className="w-full p-2 border rounded-lg" />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium">Username</label>
                <Field name="username" className="w-full p-2 border rounded-lg" />
                <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium">Password</label>
                <Field name="password" type="password" className="w-full p-2 border rounded-lg" />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
              </div>

              <button
                disabled={isSubmitting}
                type="submit"
                className="bg-primary text-white w-full py-2 rounded-lg"
              >
                {isSubmitting ? 'Registering...' : 'Register'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
