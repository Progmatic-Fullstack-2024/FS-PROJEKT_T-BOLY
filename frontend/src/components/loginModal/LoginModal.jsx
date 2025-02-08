import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useContext } from 'react';
import { toast } from 'react-toastify';

import AuthContext from '../../contexts/AuthContext.jsx';

export default function LoginModal({ onClose }) {
  const { login } = useContext(AuthContext);

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const result = await login(values);
      if (result.ok) {
        toast.success('Logged in successfully.');
        onClose();
      } else {
        toast.error(`Login failed. ${result.message.response.data.error}`);
      }
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
          <h2 className="text-lg font-bold">Login</h2>
          <button type="button" className="text-gray-500 hover:text-black" onClick={onClose}>
            ✖
          </button>
        </div>

        <Formik
          initialValues={{
            identifier: '',
            password: '',
          }}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Email or Username</label>
                <Field name="identifier" className="w-full p-2 border rounded-lg" />
                <ErrorMessage name="identifier" component="div" className="text-red-500 text-sm" />
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
                {isSubmitting ? 'Logging in...' : 'Log in'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
