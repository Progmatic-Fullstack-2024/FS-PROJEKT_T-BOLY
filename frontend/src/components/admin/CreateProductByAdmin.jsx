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
  const [gallery, setGallery] = useState(null);
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

  if (productIdFromProductRow) {
    useEffect(() => {
      const fetchProduct = async () => {
        try {
          const result = await productService.getProductById(productIdFromProductRow);

          setProductData(result.product);
        } catch (error) {
          toast.error('Failed to fetch product.');
        }
      };

      fetchProduct();
    }, [isOpen]);
  }

  useEffect(() => {
    if (productData && isOpen)
      setInitialValues({
        id: productData?.id,
        name: productData?.name,
        description: productData?.description,
        price: productData?.price,
        quantity: productData?.quantity,
        isDeleted: productData?.isDeleted,
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

  const handleMoreFileChange = (e) => {
    const moreImages = Array.from(e.target.files);
    
    setGallery(moreImages);
  };

  const handleCreate = async (values) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });

    formData.append('file', file);
    formData.append('moreImages', gallery);

    const result = await productService.createProduct(formData);

    const productId = result.id;

    values.category.map(async (category) => {
      await productCategoryConnectionService.createProductCategoryConnection({
        categoryId: category.value,
        productId,
      });
    });
    setInitialValues({});
    setIsOpen(false);
  };

  const handleUpdate = async (values) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });

    formData.append('file', file);
    formData.append('moreImages', gallery);

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
        <div className="fixed ms:modal-content overflow-y-auto w-full inset-0 bg-gray-800 bg-opacity-50 flex justify-center md:items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full sm:max-w-screen-lg h-max">
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
                  <div className="flex md:h-60  md:flex-row flex-col justify-between items-center mb-4">
                    <div className="flex flex-col w-full md:w-2/3">
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
                      className="flex max-h-60 w-full md:w-1/3 border m-5 align-middle justify-center rounded-lg"
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                      />

                      <img
                        className={`object-contain hover:grayscale-0 cursor-pointer ${file || productData?.playersNumberMax ? '' : 'grayscale blur-[2px] hover:blur-0'}`}
                        src={
                          (file && URL.createObjectURL(file)) || productData?.pictureUrl || noImage
                        }
                        alt="NoImage"
                      />
                    </button>
                  </div>
                  <div>
                    <input type="file" multiple onChange={handleMoreFileChange} />
                  </div>
                  <div className="flex md:flex-row flex-col gap-x-3 ">
                    <div className="md:w-2/3">
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

                    <div className="flex justify-center w-full md:w-1/3 mt-5">
                      <div className="flex">
                        <label className="inline-flex items-center cursor-pointer ">
                          <Field type="checkbox" name="isDeleted" className="sr-only peer" />
                          <span className="ms-3 text-xl font-medium text-gray-900 dark:text-gray-300 mr-4">
                            Active
                          </span>
                          <div className="relative sm:w-28 w-20 h-7 bg-green-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[6px] after:bg-white after:border-gray-300 after:border after:rounded after:h-6 sm:after:w-12 after:w-8 after:transition-all dark:border-gray-600 peer-checked:bg-red-400 dark:peer-checked:bg-red-400">
                            &nbsp;
                          </div>
                          <span className="ms-3 text-xl font-medium text-gray-900 dark:text-gray-300 ml-4">
                            Deleted
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex md:flex-row sm:flex-row flex-col gap-4">
                    <div className="flex flex-col justify-between items-center border rounded-lg p-2 md:w-1/3">
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

                    <div className="flex flex-col justify-between items-center border rounded-lg p-2 md:w-1/3">
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

                    <div className="flex flex-col justify-between items-center border rounded-lg p-2 md:w-1/3">
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
