import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useContext } from 'react';
import { toast } from 'react-toastify';

import AuthContext from '../../contexts/AuthContext.jsx';

export default function PassChange() {
  const { passwordChange, user } = useContext(AuthContext);

  const handleSave = async (values, actions, { setSubmitting }) => {
    actions.setSubmitting(true);
    try {
      const result = await passwordChange(user.id, values);
      if (result.ok) {
        toast.success('Password changed  succesfully.');
      } else {
        toast.error(`Password change failed. ${result.message.response.data.error}`);
      }
    } catch (error) {
      toast.error('An unexpected error occured. Please try again later');
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="mx-auto w-full h-full bg-white rounded-2xl shadow-lg p-12">
      <div>
        <Formik
          initialValues={{
            oldPassword: '',
            newPassword: '',
          }}
          onSubmit={handleSave}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block text-gray-600 text-sm mb-1">Old password</label>
                <Field
                  name="oldPassword"
                  type="password"
                  className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-indigo-200"
                />
                <ErrorMessage name="oldPassword" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block text-gray-600 text-sm mb-1">New password</label>
                <Field
                  name="newPassword"
                  type="password"
                  className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-indigo-200"
                />
                <ErrorMessage name="newPassword" component="div" className="text-red-500 text-sm" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-indigo-700"
              >
                {isSubmitting ? 'Changing password...' : 'Change password'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
