import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { BsFillFileEarmarkPlusFill } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import Select from 'react-select';
import { toast } from 'react-toastify';

import noImage from '../../assets/noImage.png';
import categoryService from '../../services/categoryService.js';
import productCategoryConnectionService from '../../services/productCategoryConnectionService.js';
import productService from '../../services/productService.js';
import { productValidationSchema } from '../../validations/product.validation.js';

export default function CreateProductByAdmin({ productIdFromProductRow, onUpdate }) {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [productData, setProductData] = useState({});
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getAllCategories();
        setCategoryOptions(data.map((c) => ({ value: c.id, label: c.name })));
      } catch (error) {
        toast.error('Failed to fetch categories.');
      }
    };

    if (isOpen) fetchCategories();
  }, [isOpen]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await productService.getProductById(productIdFromProductRow);
        setProductData(product);
      } catch (error) {
        toast.error('Failed to fetch product.');
      }
    };

    if (isOpen) {
      fetchProduct();
    }
  }, [isOpen]);

  useEffect(() => {
    if (productData && isOpen)
      setInitialValues({
        id: productData?.id,
        name: productData?.name,
        description: productData?.description,
        price: productData?.price,
        quantity: productData?.quantity,
        ageRecommendationMin: productData?.ageRecommendationMin,
        ageRecommendationMax: productData?.ageRecommendationMax,
        playersNumberMin: productData?.playersNumberMin,
        playersNumberMax: productData?.playersNumberMax,
        category:
          productData?.categoryProduct?.map((c) => ({
            value: c.categoryId,
            label: c.category.name,
          })) || [],
      });
  }, [productData, isOpen]);

  const handleFileChange = (e) => {
    const newFile = e.target.files[0];
    setFile(newFile);
  };

  const handleCreate = async (values) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });
    formData.append('file', file);

    const result = await productService.createProduct(formData);

    const productId = result.id;

    values.category.map(async (category) => {
      await productCategoryConnectionService.createProductCategoryConnection({
        categoryId: category.value,
        productId,
      });
    });
    setIsOpen(false);
    setInitialValues({});
  };

  const handleUpdate = async (values) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });
    formData.append('file', file);

    await productCategoryConnectionService.destroyProductCategoryConnection(values.id);

    values.category.map(async (category) => {
      await productCategoryConnectionService.createProductCategoryConnection({
        categoryId: category.value,
        productId: values.id,
      });
    });

    const result = await productService.updatedProduct(productIdFromProductRow, formData);
    if (result) {
      onUpdate(productIdFromProductRow, result);
    }

    if (result) {
      toast.success('Connection Update successful!');
    } else {
      toast.error('Connection Update failed!');
    }

    setIsOpen(false);
    setInitialValues({});
  };

  return (
    <>
      {!productIdFromProductRow ? (
        <button
          onClick={() => setIsOpen(true)}
          type="button"
          className="flex items-center justify-center px-4 py-2 text-sm font-medium text-black rounded-lg bg-primary-700 border border-gray-400 hover:bg-primary focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
        >
          <BsFillFileEarmarkPlusFill className="h-4 w-4 mr-2 " />
          Add new product
        </button>
      ) : (
        <button onClick={() => setIsOpen(true)} type="button">
          <FiEdit className="text-yellow-500 h-4 w-4 mr-2" />
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-screen-lg">
            <div className="flex justify-between items-center mb-4">
              {!productIdFromProductRow ? (
                <h2 className="text-lg font-bold text-orange-500">Create new GAME</h2>
              ) : (
                <h2 className="text-lg font-bold text-green-500">Update GAME</h2>
              )}
              <button
                type="button"
                className="text-gray-500 hover:text-black"
                onClick={() => setIsOpen(false)}
              >
                ✖
              </button>
            </div>

            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={productValidationSchema}
              onSubmit={!productIdFromProductRow ? handleCreate : handleUpdate}
            >
              {({ setFieldValue }) => (
                <Form className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex flex-col w-2/3">
                      <div>
                        <label className="block text-left text-sm font-medium">
                          The name of the GAME
                        </label>
                        <Field name="name" className="w-full p-2 border rounded-lg" />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-left text-sm font-medium">
                          Description of the GAME
                        </label>
                        <Field
                          name="description"
                          as="textarea"
                          rows="5"
                          className="w-full p-2 border rounded-lg h-40"
                        />
                        <ErrorMessage
                          name="description"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => fileInputRef.current.click()}
                      type="button"
                      className="flex w-1/3 border m-5 align-middle justify-center rounded-lg"
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                      />

                      <img
                        className={`object-contain h-60  hover:grayscale-0 cursor-pointer ${file || productData?.playersNumberMax ? '' : 'grayscale blur-[2px] hover:blur-0'}`}
                        src={
                          (file && URL.createObjectURL(file)) || productData?.pictureUrl || noImage
                        }
                        alt="NoImage"
                      />
                    </button>
                  </div>
                  <div>
                    <label className="block text-left text-sm font-medium">Category</label>
                    {(initialValues?.name || !productIdFromProductRow) && (
                      <Select
                        defaultValue={initialValues.category}
                        isMulti
                        name="colors"
                        options={categoryOptions}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={(selectedOptions) => setFieldValue('category', selectedOptions)}
                      />
                    )}

                    <ErrorMessage
                      name="category"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="flex flex-row gap-4">
                    <div className="flex flex-col justify-between items-center border rounded-lg p-2 w-1/3">
                      <p className="text-xs text-orange-500">Price / Quantity</p>
                      <div>
                        <div className="px-1">
                          <label className="text-sm font-medium">Price</label>
                          <Field
                            name="price"
                            type="number"
                            className="w-full p-2 border rounded-lg"
                          />
                          <ErrorMessage
                            name="price"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                        <div className="px-1">
                          <label className="text-sm font-medium">Quantity</label>
                          <Field
                            name="quantity"
                            type="number"
                            className="w-full p-2 border rounded-lg"
                          />
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
                          <Field
                            name="ageRecommendationMin"
                            type="number"
                            className="w-full p-2 border rounded-lg"
                          />
                          <ErrorMessage
                            name="ageRecommendationMin"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                        <div className="px-1">
                          <label className="text-sm font-medium">max Age</label>
                          <Field
                            name="ageRecommendationMax"
                            type="number"
                            className="w-full p-2 border rounded-lg"
                          />
                          <ErrorMessage
                            name="ageRecommendationMax"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between items-center border rounded-lg p-2 w-1/3">
                      <p className="text-xs text-orange-500">
                        Recommended min - max Players number
                      </p>
                      <div>
                        <div className="px-1">
                          <label className="text-sm font-medium">min Players</label>
                          <Field
                            name="playersNumberMin"
                            type="number"
                            className="w-full p-2 border rounded-lg"
                          />
                          <ErrorMessage
                            name="playersNumberMin"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                        <div className="px-1">
                          <label className="block text-sm font-medium">max Players</label>
                          <Field
                            name="playersNumberMax"
                            type="number"
                            className="w-full p-2 border rounded-lg "
                          />
                          <ErrorMessage
                            name="playersNumberMin"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {!productIdFromProductRow ? (
                    <button type="submit" className="bg-primary text-white w-full py-2 rounded-lg">
                      Create a new GAME
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="bg-green-500 text-white w-full py-2 rounded-lg"
                    >
                      UPDATE GAME
                    </button>
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </>
  );
}
