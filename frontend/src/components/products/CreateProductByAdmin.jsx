import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useContext } from 'react';
import { toast } from 'react-toastify';

import AuthContext from '../../contexts/AuthContext.jsx';
import { productValidationSchema } from '../../validations/product.validation.js';

export default function CreateProductByAdmin({ onClose }) {
  const { register } = useContext(AuthContext);

  const handleCreate = async (values) => {
    const result = await register(values);
    console.log(values);
    if (result.ok) {
      toast.success('Create successful!');
    } else {
      toast.error('Create failed!');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-screen-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-orange-500">Create new GAME</h2>
          <button type="button" className="text-gray-500 hover:text-black" onClick={onClose}>
            ✖
          </button>
        </div>

        <Formik
          initialValues={{
            name: '',
            description: '',
            category: '',
            price: '',
            pictureUrl: '',
            quantity: '',
            rating: '',
            ageRecommendationMin: '',
            ageRecommendationMax: '',
            playersNumberMin: '',
            playersNumberMax: '',
          }}
          validationSchema={productValidationSchema}
          onSubmit={handleCreate}
        >
          <Form className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex flex-col w-2/3">
                <div>
                  <label className="block text-sm font-medium">The name of the GAME</label>
                  <Field name="name" className="w-full p-2 border rounded-lg" />
                  <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                </div>

                <div>
                  <label className="block text-sm font-medium">Description of the GAME</label>
                  <Field
                    name="description"
                    type="text"
                    className="w-full p-2 border rounded-lg h-40"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <div className="flex w-1/3 border m-5 align-middle justify-center rounded-lg">
                <img
                  className="h-60"
                  src="https://cdn.pixelbin.io/v2/black-bread-289bfa/HrdP6X/original/hamleys-product/494500958/665/494500958-1_5150.webp"
                  alt="LEGO"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium">Image URL</label>
              <Field name="imageURL" type="text" className="w-full p-2 border rounded-lg" />
              <ErrorMessage name="imageURL" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium">Category</label>
              <Field name="category" type="text" className="w-full p-2 border rounded-lg" />
              <ErrorMessage name="category" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="flex flex-row gap-4">
              <div className="flex flex-col justify-between items-center border rounded-lg p-2 w-1/3">
                <p className="text-xs text-orange-500">Price / Quantity</p>
                <div>
                  <div className="px-1">
                    <label className="text-sm font-medium">Price</label>
                    <Field name="price" type="number" className="w-full p-2 border rounded-lg" />
                    <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div className="px-1">
                    <label className="text-sm font-medium">Quantity</label>
                    <Field name="quantity" type="number" className="w-full p-2 border rounded-lg" />
                    <ErrorMessage
                      name="quantity"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between items-center border rounded-lg p-2 w-1/3">
                <p className="text-xs text-orange-500">Recommended min - max ages</p>
                <div>
                  <div className="px-1">
                    <label className="text-sm font-medium">min Age</label>
                    <Field name="minAge" type="number" className="w-full p-2 border rounded-lg" />
                    <ErrorMessage name="minAge" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div className="px-1">
                    <label className="text-sm font-medium">max Age</label>
                    <Field name="maxAge" type="number" className="w-full p-2 border rounded-lg" />
                    <ErrorMessage name="maxAge" component="div" className="text-red-500 text-sm" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between items-center border rounded-lg p-2 w-1/3">
                <p className="text-xs text-orange-500">Recommended min - max Players number</p>
                <div>
                  <div className="px-1">
                    <label className="text-sm font-medium">min Players</label>
                    <Field
                      name="minPlayers"
                      type="number"
                      className="w-full p-2 border rounded-lg"
                    />
                    <ErrorMessage
                      name="minPlayers"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="px-1">
                    <label className="block text-sm font-medium">max Players</label>
                    <Field
                      name="maxPlayers"
                      type="number"
                      className="w-full p-2 border rounded-lg "
                    />
                    <ErrorMessage
                      name="maxPlayers"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button type="submit" className="bg-primary text-white w-full py-2 rounded-lg">
              Create a new GAME
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
