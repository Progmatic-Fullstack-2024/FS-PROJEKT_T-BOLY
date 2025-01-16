import React, { useState } from 'react';
import {
  BsFillFileEarmarkPlusFill,
  BsDownload,
  BsFillStarFill,
  BsStar,
  BsStarHalf,
} from 'react-icons/bs';
import { FiEdit, FiTrash } from 'react-icons/fi';


function renderStars(rating) {
  const stars = [];
  for (let i = 1; i <= 5; i += 1) {
    if (i <= Math.floor(rating)) {
      stars.push(<BsFillStarFill key={`${i}-${rating}`} className="text-yellow-500" />);
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
      stars.push(<BsStarHalf key={`${i}-${rating}`} className="text-yellow-500" />);
    } else {
      stars.push(<BsStar key={`${i}-${rating}`} className="text-gray-300" />);
    }
  }
  return stars;
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  const handleClick = (page) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <nav aria-label="Page navigation example"
    className="py-4 flex justify-center">
      <ul className="flex items-center -space-x-px h-8 text-sm">
        <li>
          <button 
            type="button" onClick={() => handleClick(currentPage - 1)}
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
              type="button" onClick={() => handleClick(index + 1)}
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
            type="button" onClick={() => handleClick(currentPage + 1)}
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

  return (
    <section className="py-3 sm:py-5">
      <div className="px-4 mx-auto max-w-screen-2xl lg:px-12">
        <div className="relative overflow-hidden bg-gray-50 bg-opacity-80 shadow-md sm:rounded-lg">
          <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
            <div className="flex items-center flex-1 space-x-4">
              <h5>
                <span className="text-black">All Products:</span>
                <span className="text-black">123456</span>
              </h5>
              <h5>
                <span className="text-black">Total sales:</span>
                <span className="text-black">$88.4k</span>
              </h5>
            </div>
            <div className="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
              <button
                type="button"
                className="flex items-center justify-center px-4 py-2 text-sm font-medium text-black rounded-lg bg-primary-700 hover:bg-primary focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                <BsFillFileEarmarkPlusFill className="h-4 w-4 mr-2" />
                Add new product
              </button>
              <button
                type="button"
                className="flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-primary hover:text-primary-700 focus:ring-4 focus:ring-gray-200"
              >
                <FiEdit className="w-4 h-4 mr-2" />
                Update stocks
              </button>
              <button
                type="button"
                className="flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-primary hover:text-primary-700 focus:ring-4 focus:ring-gray-200"
              >
                <BsDownload className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-primary">
                <tr>
                  <th scope="col" className="p-4">
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
                  <th scope="col" className="px-4 py-3 text-gray-100">
                    Product
                  </th>
                  <th scope="col" className="px-4 py-3 text-gray-100">
                    Category
                  </th>
                  <th scope="col" className="px-4 py-3 text-gray-100">
                    Stock
                  </th>
                  <th scope="col" className="px-4 py-3 text-gray-100">
                    Sales/Day
                  </th>
                  <th scope="col" className="px-4 py-3 text-gray-100">
                    Sales/Month
                  </th>
                  <th scope="col" className="px-4 py-3 text-gray-100">
                    Rating
                  </th>
                  <th scope="col" className="px-4 py-3 text-gray-100">
                    Sales
                  </th>
                  <th scope="col" className="px-4 py-3 text-gray-100">
                    Revenue
                  </th>
                  <th scope="col" className="px-4 py-3 text-gray-100">
                    Last Update
                  </th>
                  <th scope="col" className="px-4 py-3 text-gray-100">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b dark:border-gray-600 hover:bg-orange-200">
                  <td className="w-4 px-4 py-3">
                    <div className="flex items-center">
                      <input
                        id="checkbox-1"
                        type="checkbox"
                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label htmlFor="checkbox-1" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </td>
                  <td className="px-4 py-3">name</td>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3"></td>
                  <td className="py-6 flex items-center space-x-1">{renderStars(4.5)}</td>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <button type="button" className="text-yellow-500">
                        <FiEdit />
                      </button>
                      <button type="button" className="text-red-500">
                        <FiTrash />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b dark:border-gray-600 hover:bg-orange-200">
                  <td className="w-4 px-4 py-3">
                    <div className="flex items-center">
                      <input
                        id="checkbox-1"
                        type="checkbox"
                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label htmlFor="checkbox-1" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </td>
                  <td className="px-4 py-3">Apple iMac</td>
                  <td className="px-4 py-3">Desktop PC</td>
                  <td className="px-4 py-3">95</td>
                  <td className="px-4 py-3">1.47</td>
                  <td className="px-4 py-3">0.47</td>
                  <td className="py-6 flex items-center space-x-1">{renderStars(3.5)}</td>
                  <td className="px-4 py-3">1.6M</td>
                  <td className="px-4 py-3">$3.2M</td>
                  <td className="px-4 py-3">Just now</td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <button type="button" className="text-yellow-500">
                        <FiEdit />
                      </button>
                      <button type="button" className="text-red-500">
                        <FiTrash />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b dark:border-gray-600 hover:bg-orange-200">
                  <td className="w-4 px-4 py-3">
                    <div className="flex items-center">
                      <input
                        id="checkbox-1"
                        type="checkbox"
                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label htmlFor="checkbox-1" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </td>
                  <td className="px-4 py-3">Apple iMac</td>
                  <td className="px-4 py-3">Desktop PC</td>
                  <td className="px-4 py-3">95</td>
                  <td className="px-4 py-3">1.47</td>
                  <td className="px-4 py-3">0.47</td>
                  <td className="py-6 flex items-center space-x-1">{renderStars(2)}</td>
                  <td className="px-4 py-3">1.6M</td>
                  <td className="px-4 py-3">$3.2M</td>
                  <td className="px-4 py-3">Just now</td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <button type="button" className="text-yellow-500">
                        <FiEdit />
                      </button>
                      <button type="button" className="text-red-500">
                        <FiTrash />
                      </button>
                    </div>
                  </td>
                </tr>
                {/* Repeat similar rows for other products */}
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
