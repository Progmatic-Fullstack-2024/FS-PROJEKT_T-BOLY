import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import AddNewProduct from './CreateProductByAdmin.jsx';
import ProductRow from './ProductRow.jsx';
import productService from '../../services/productService.js';
import DisplayedProductsNumber from '../products/DisplayProductsNumber.jsx';
import Pagination from '../products/Pagination.jsx';

export default function ProductsTable() {
  const [pageNumber, setPageNumber] = useState(1);
  const [productsByCategory, setProductsByCategory] = useState([]);
  const [limit] = useState(10);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const data = await productService.getAllProductsByCategory(
          'all',
          'name',
          'asc',
          pageNumber,
          limit,
        );
        setProductsByCategory(data);
      } catch (error) {
        toast.error('Failed to fetch products:', error);
      }
    };

    fetchProductsByCategory();
  }, [pageNumber, limit]);

  const handleDownload = async () => {
    try {
      await productService.exportProducts();
      toast.success("Products exported successfully!");
    } catch (error) {
      toast.error("Failed to export products");
    }
  };

  return (
    <section className="py-3 sm:py-5">
      <div className="px-4 mx-auto max-w-screen-2xl lg:px-12">
        <div className="relative overflow-hidden bg-gray-50 bg-opacity-80 shadow-md sm:rounded-lg">
          <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
            <div className="flex items-center flex-1 space-x-4">
              <h5>
                <span className="text-black">All Products: </span>
                <span className="text-black">{productsByCategory.totalProducts}</span>
              </h5>
            </div>
            <div className="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
              <AddNewProduct>Add newProduct</AddNewProduct>
       
              <button
                onClick={handleDownload}
                type="button"
                className="flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-400 rounded-lg hover:bg-primary hover:text-primary-700 focus:ring-4 focus:ring-gray-200"
              >
                <BsDownload className="w-4 h-4 mr-2" />
                Export products
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 overflow-x-scroll">
              <thead className="text-xs text-gray-700 uppercase bg-primary">
                <tr>
                  <th scope="col" className="p-4 w-12 text-center">
                    <div className="flex items-center">
                      <input
                        id="checkbox-all"
                        type="checkbox"
                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label htmlFor="checkbox-all" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </th>
                  <th scope="col" className="px-4 py-3 w-48 text-left text-gray-100">
                    Product
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 w-48 text-left text-gray-100 hidden md:table-cell"
                  >
                    Description
                  </th>
                  <th scope="col" className="px-4 py-3 w-36 text-left text-gray-100">
                    Category
                  </th>
                  <th scope="col" className="px-4 py-3 w-24 text-center text-gray-100">
                    Price
                  </th>
                  <th scope="col" className="px-4 py-3 w-24 text-center text-gray-100">
                    Quantity
                  </th>
                  <th scope="col" className="px-4 py-3 w-24 text-center text-gray-100">
                    Rating
                  </th>
                  <th scope="col" className="px-4 py-3 w-48 text-left text-gray-100">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {productsByCategory?.products &&
                  productsByCategory.products.map((product) => (
                    <ProductRow key={product.id} product={product} />
                  ))}
              </tbody>
            </table>
          </div>
          <div className="bg-primary bg-opacity-20 flex items-center justify-between p-8">
            <DisplayedProductsNumber
              pageNumber={pageNumber}
              limit={limit}
              totalProducts={productsByCategory.totalProducts}
            />
            <Pagination
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              totalPages={productsByCategory.totalPages}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
