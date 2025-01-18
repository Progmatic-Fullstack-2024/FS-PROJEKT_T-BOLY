import React, { useState, useEffect } from 'react';
import { BsFillFileEarmarkPlusFill, BsDownload } from 'react-icons/bs';
import { toast } from 'react-toastify';

import ProductRow from './ProductRow.jsx';
import productService from '../../services/productService.js';
import AddNewProduct from './CreateProductByAdmin.jsx';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const handleClick = (page) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <nav aria-label="Page navigation example" className="py-4 flex justify-center">
      <ul className="flex items-center -space-x-px h-8 text-sm">
        <li>
          <button
            type="button"
            onClick={() => handleClick(currentPage - 1)}
            className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-orange-300 rounded-s-lg hover:bg-orange-100 hover:text-gray-700 ${
              currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''
            }`}
            disabled={currentPage === 1}
          >
            <span className="sr-only">Previous</span>
            <svg
              className="w-2.5 h-2.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </button>
        </li>
        {Array.from({ length: totalPages }).map((_, index) => (
          <li key={index}>
            <button
              type="button"
              onClick={() => handleClick(index + 1)}
              className={`flex items-center justify-center px-3 h-8 leading-tight ${
                currentPage === index + 1
                  ? 'text-orange-600 border border-orange-600 bg-orange-50 hover:bg-orange-200 hover:text-orange-700'
                  : 'text-gray-500 bg-orange-50 border border-orange-300 hover:bg-orange-100 hover:text-gray-700'
              }`}
            >
              {index + 1}
            </button>
          </li>
        ))}
        <li>
          <button
            type="button"
            onClick={() => handleClick(currentPage + 1)}
            className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-orange-300 rounded-e-lg hover:bg-orange-100 hover:text-gray-700 ${
              currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''
            }`}
            disabled={currentPage === totalPages}
          >
            <span className="sr-only">Next</span>
            <svg
              className="w-2.5 h-2.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default function ProductsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;
  const [productsByCategory, setProductsByCategory] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const data = await productService.getAllProductsByCategory('all', 'name', 'asc', 1, 10);
        setProductsByCategory(data);
        setTotalProducts(data.totalProducts);
      } catch (error) {
        toast.error('Failed to fetch products:', error);
      }
    };

    fetchProductsByCategory();
  }, []);

  return (
    <section className="py-3 sm:py-5">
      <div className="px-4 mx-auto max-w-screen-2xl lg:px-12">
        <div className="relative overflow-hidden bg-gray-50 bg-opacity-80 shadow-md sm:rounded-lg">
          <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
            <div className="flex items-center flex-1 space-x-4">
              <h5>
                <span className="text-black">All Products: </span>
                <span className="text-black">{totalProducts}</span>
              </h5>
            </div>
            <div className="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
              <AddNewProduct>Add newProduct</AddNewProduct>
              <button
                type="button"
                className="flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-400 rounded-lg hover:bg-primary hover:text-primary-700 focus:ring-4 focus:ring-gray-200"
              >
                <BsDownload className="w-4 h-4 mr-2" />
                Export
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
          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </section>
  );
}
