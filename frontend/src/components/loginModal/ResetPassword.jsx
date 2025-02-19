import emailjs from 'emailjs-com';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { t } from 'i18next';
import { toast } from 'react-toastify';

import { VITE_PUBLIC_KEY, VITE_SERVICE_ID } from '../../constants/constants';
import authService from '../../services/authService';

export default function ResetPassword({ onClose }) {
  const handleResetPassword = async (values) => {
    try {
      const result = await authService.forgottenPasswordUpdate(values);
      if (result.statusText === 'OK') {
        toast.success('Password changed successfully');
        onClose();
        const data = { email: values.email, message: result.data, username: values.username };
        await emailjs.send(VITE_SERVICE_ID, 'template_qmtei8p', data, VITE_PUBLIC_KEY);
      }
    } catch (error) {
      toast.error(`Password changed failed.`);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md dark:bg-gray-800 dark:border-primary dark:border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{t(`reset password`)}</h2>
          <button type="button" className="text-gray-500 hover:text-black" onClick={onClose}>
            ✖
          </button>
        </div>

        <Formik
          initialValues={{
            username: '',
            email: '',
          }}
          onSubmit={handleResetPassword}
        >
          <Form className="space-y-4">
            <div>
              <label className="block text-sm font-medium">{t(`username`)}</label>
              <Field
                name="username"
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-primary dark:border"
              />
              <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium">{t(`email`)}</label>
              <Field
                name="email"
                type="email"
                className="w-full p-2  border rounded-lg dark:bg-gray-700 dark:border-primary dark:border"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>

            <button type="submit" className="bg-primary text-white w-full py-2 rounded-lg">
              {t(`reset password`)}
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
