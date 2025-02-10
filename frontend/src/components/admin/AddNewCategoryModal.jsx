import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';

import categoryService from '../../services/categoryService';
import { categoryValidationSchema } from '../../validations/category.validation';

export default function AddNewCategoryModal({ setIsOpen }) {
  const initialValues = {
    name: '',
  };

  const handleCreate = async (values) => {
    try {
      const response = await categoryService.createCategory(values);
      if (response) toast.success('Category added successfully!');
      setIsOpen(false);
    } catch (error) {
      toast.error('Failed to add category');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-orange-500">Create New Category</h2>
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
          validationSchema={categoryValidationSchema}
        >
          <Form className="flex flex-col">
            <label className="block text-left text-sm font-medium">Category Name</label>
            <Field name="name" className="block w-full p-2 border rounded-lg" />
            <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />

            <button
              type="submit"
              className="block bg-primary text-white w-full mt-4 p-2 rounded-lg"
            >
              Create Category
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
