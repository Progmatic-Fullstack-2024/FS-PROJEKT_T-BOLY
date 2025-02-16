import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';

import couponService from '../../services/couponsService';
import { couponValidationSchema } from '../../validations/coupon.validation';

export default function AddNewCouponModal({ setIsOpen, onCreate }) {
  const initialValues = {
    code: '',
    discount: '',
    validFrom: '',
    validTo: '',
  };
  const handleCreate = async (values) => {
    try {
      const formattedValues = {
        ...values,
        validFrom: new Date(values.validFrom).toISOString(),
        validTo: new Date(values.validTo).toISOString(),
        discount: Number(values.discount),
      };
      const response = await couponService.createCoupon(formattedValues);
      onCreate(response);
      if (response) toast.success('Coupon added successfully!');
      setIsOpen(false);
    } catch (error) {
      toast.error('Failed to add coupon');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 dark:bg-gray-700 dark:border-primary dark:text-primary dark:border-2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-orange-500">Create New Coupon</h2>
          <button
            type="button"
            className="text-gray-500 hover:text-black"
            onClick={() => setIsOpen(false)}
          >
            ✖
          </button>
        </div>

        <Formik
          initialValues={initialValues}
          onSubmit={handleCreate}
          validationSchema={couponValidationSchema}
        >
          <Form className="flex flex-col">
            <label className="block text-left text-sm font-medium">Coupon Code</label>
            <Field name="code" className="block w-full p-2 border rounded-lg dark:border-primary dark:border-2 dark:bg-gray-600" />
            <ErrorMessage name="code" component="div" className="text-red-500 text-sm" />

            <label className="block text-left text-sm font-medium mt-2">Discount (%)</label>
            <Field type="number" name="discount" className="block w-full p-2 border rounded-lg dark:border-primary dark:border-2 dark:bg-gray-600" />
            <ErrorMessage name="discount" component="div" className="text-red-500 text-sm" />

            <label className="block text-left text-sm font-medium mt-2">Valid From</label>
            <Field type="date" name="validFrom" className="block w-full p-2 border rounded-lg dark:border-primary dark:border-2 dark:bg-gray-600" />
            <ErrorMessage name="validFrom" component="div" className="text-red-500 text-sm" />

            <label className="block text-left text-sm font-medium mt-2">Valid To</label>
            <Field type="date" name="validTo" className="block w-full p-2 border rounded-lg dark:border-primary dark:border-2 dark:bg-gray-600" />
            <ErrorMessage name="validTo" component="div" className="text-red-500 text-sm" />

            <button
              type="submit"
              className="block bg-primary text-white w-full mt-4 p-2 rounded-lg"
            >
              Create Coupon
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
