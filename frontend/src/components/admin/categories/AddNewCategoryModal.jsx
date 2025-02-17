import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRef, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { IoMdAddCircle } from 'react-icons/io';
import { toast } from 'react-toastify';

import noImage from '../../../assets/noImage.png';
import categoryService from '../../../services/categoryService';
import { categoryValidationSchema } from '../../../validations/category.validation';
import Spinner from '../Spinner';

export default function AddNewCategoryModal({ onCreate, categoryToUpdate }) {
  const fileInputRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    name: categoryToUpdate ? categoryToUpdate.name : '',
    description: categoryToUpdate ? categoryToUpdate.description : '',
    image: null,
  };

  const handleFileChange = (event, setFieldValue) => {
    const newFile = event.currentTarget.files[0];
    setFieldValue('image', newFile);
  };

  const handleCreate = async (values) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('description', values.description);
      if (values.image) {
        formData.append('image', values.image);
      }

      const response = categoryToUpdate
        ? await categoryService.updateCategory(categoryToUpdate.id, formData)
        : await categoryService.createCategory(formData);
      onCreate(response);

      if (response) toast.success('Category added successfully!');
      setIsOpen(false);
    } catch (error) {
      toast.error('Failed to add category');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!categoryToUpdate ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center px-4 py-2 text-sm font-medium text-black rounded-lg bg-primary-700 border border-gray-400 hover:bg-primary focus:ring-4 focus:ring-primary-300 dark:bg-gray-800 dark:hover:bg-gray-600 dark:border-primary dark:text-primary focus:outline-none dark:focus:ring-primary-800"
        >
          <IoMdAddCircle className="h-5 w-5 mr-2" /> Add New Category
        </button>
      ) : (
        <button onClick={() => setIsOpen(true)} type="button">
          <FiEdit className="text-yellow-500 h-4 w-4 mr-2" />
        </button>
      )}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 dark:bg-gray-700 dark:border-primary dark:border-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-orange-500">
                {categoryToUpdate ? 'Update Category' : 'Create New Category'}
              </h2>
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
              {({ setFieldValue, values }) => (
                <Form className="flex flex-col">
                  <label className="block text-left text-sm font-medium dark:text-primary">
                    Category Name
                  </label>
                  <Field
                    name="name"
                    className="block w-full p-2 border rounded-lg dark:text-primary dark:bg-gray-600 dark:border-primary dark:border-2"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />

                  <label className="block text-left text-sm font-medium dark:text-primary">
                    Category Description
                  </label>
                  <Field
                    as="textarea"
                    name="description"
                    className="block w-full p-2 border rounded-lg min-h-40 text-justify dark:text-primary dark:bg-gray-600 dark:border-primary dark:border-2"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500 text-sm"
                  />

                  <label className="block text-left text-sm font-medium mt-2 dark:text-primary">
                    Upload Image
                  </label>
                  <div className="w-full">
                    <button
                      onClick={() => fileInputRef.current.click()}
                      type="button"
                      className="relative flex h-[170px] w-full border align-middle justify-center rounded-lg dark:bg-gray-600 dark:border-primary dark:border-2"
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, setFieldValue)}
                      />

                      <img
                        className={`object-contain max-w-full max-h-full hover:grayscale-0 cursor-pointer ${values.image || categoryToUpdate?.pictureUrl ? '' : 'grayscale blur-[2px] hover:blur-0'}`}
                        src={
                          (values.image && URL.createObjectURL(values.image)) ||
                          categoryToUpdate?.pictureUrl ||
                          noImage
                        }
                        alt="NoImage"
                      />

                      <span className="absolute -right-2 -bottom-1 text-white bg-orange-500 bg-opacity-80 rounded px-2">
                        Category image
                      </span>
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="block bg-primary text-white w-full mt-4 p-2 rounded-lg dark:text-primary dark:bg-gray-600 dark:border-primary dark:border-2"
                  >
                    {!isLoading && (categoryToUpdate ? 'Update Category' : 'Create Category')}
                    {isLoading && <Spinner />}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </>
  );
}
