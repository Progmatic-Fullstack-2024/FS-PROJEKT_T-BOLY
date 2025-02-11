import { Formik, Form, Field, ErrorMessage } from 'formik';

export default function ResetPassword({ onClose }) {
  const handleResetPassword = async () => {};
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Reset password</h2>
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
              <label className="block text-sm font-medium">Username</label>
              <Field name="username" className="w-full p-2 border rounded-lg" />
              <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium">Email</label>
              <Field name="email" type="email" className="w-full p-2 border rounded-lg" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>

            <button type="submit" className="bg-primary text-white w-full py-2 rounded-lg">
              Reset password
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
