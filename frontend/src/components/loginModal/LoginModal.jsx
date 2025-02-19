import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useContext } from 'react';
import { toast } from 'react-toastify';

import AuthContext from '../../contexts/AuthContext.jsx';
import LanguageContext from '../../contexts/LanguageContext.jsx';

export default function LoginModal({ onClose, openResetPasswordModal }) {
  const { login } = useContext(AuthContext);
  const { t } = useContext(LanguageContext);

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
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md dark:bg-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{t(`login`)}</h2>
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
                <label className="block text-sm font-medium">{t('email or username')}</label>
                <Field
                  name="identifier"
                  className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-primary"
                />
                <ErrorMessage name="identifier" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium">{t('password')}</label>
                <Field
                  name="password"
                  type="password"
                  className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-primary"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
              </div>

              <button
                disabled={isSubmitting}
                type="submit"
                className="bg-primary text-white w-full py-2 rounded-lg dark:bg-gray-800 dark:border-primary dark:border-2 dark:text-primary dark:hover:bg-primary dark:hover:text-white"
              >
                {isSubmitting ? t(`logging in`) : t('log in')}
              </button>
            </Form>
          )}
        </Formik>
        <button
          type="button"
          className="text-blue-500 underline mt-4"
          onClick={openResetPasswordModal}
        >
          Forgot your password?
        </button>
      </div>
    </div>
  );
}
