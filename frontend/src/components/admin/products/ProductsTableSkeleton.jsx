import React from 'react';
import { BsSortUp, BsDownload } from 'react-icons/bs';
import { IoMdAdd } from 'react-icons/io';

export default function ProductsTableSkeleton() {
  const renderSortIcon = () => (
    <BsSortUp className="inline w-5 h-5 ml-1" aria-label="Sort ascending" />
  );

  return (
    <section className="py-3 sm:py-5" aria-labelledby="products-table-title">
      <div className="px-4 mx-auto max-w-screen-2xl lg:px-12">
        <div className="relative overflow-hidden bg-gray-50 bg-opacity-80 shadow-md sm:rounded-lg">
          <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
            <div className="flex items-center flex-1 space-x-4">
              <h5 id="products-table-title">
                <span className="text-black">All Products: </span>
                <span className="text-black" aria-live="polite">
                  --
                </span>
              </h5>
            </div>
            <div className="flex space-x-3">
              <button
                type="button"
                className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-400 rounded-lg hover:bg-gray-200 focus:ring-4 focus:ring-gray-200"
                aria-label="Add new product"
              >
                <IoMdAdd className="w-5 h-5 mr-2" /> Add Product
              </button>
              <button
                type="button"
                className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-400 rounded-lg hover:bg-gray-200 focus:ring-4 focus:ring-gray-200"
                aria-label="Export products"
              >
                <BsDownload className="w-5 h-5 mr-2" /> Export
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table
              className="w-full text-sm text-left text-gray-500 overflow-x-scroll"
              aria-label="Products Table"
            >
              <thead className="text-xs text-gray-700 uppercase bg-primary">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-3 w-8 text-left text-gray-100 cursor-pointer"
                    aria-sort="none"
                  >
                    Img
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 w-48 text-left text-gray-100 cursor-pointer"
                    aria-sort="none"
                  >
                    Product {renderSortIcon()}
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 w-32 text-left text-gray-100 cursor-pointer hidden md:table-cell"
                  >
                    Description
                  </th>
                  <th scope="col" className="px-4 py-3 w-24 text-left text-gray-100">
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 w-24 text-left text-gray-100 cursor-pointer"
                    aria-sort="none"
                  >
                    Price {renderSortIcon()}
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 w-24 text-left text-gray-100 cursor-pointer"
                    aria-sort="none"
                  >
                    Quantity {renderSortIcon()}
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 w-24 text-left text-gray-100 cursor-pointer"
                    aria-sort="none"
                  >
                    Rating {renderSortIcon()}
                  </th>
                  <th scope="col" className="px-4 py-3 w-12 text-center text-gray-100">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {[...Array(9)].map((_, index) => (
                  <tr
                    key={index}
                    className="border-b h-20 border-gray-200 animate-pulse"
                    aria-hidden="true"
                  >
                    <td
                      className="px-4 py-3 bg-gray-300 w-48 h-8 animate-pulse"
                      aria-hidden="true"
                    />
                    <td
                      className="px-4 py-3 bg-gray-300 w-48 h-8 animate-pulse"
                      aria-hidden="true"
                    />
                    <td
                      className="px-4 py-3 bg-gray-300 w-48 h-8 hidden md:table-cell animate-pulse"
                      aria-hidden="true"
                    />
                    <td
                      className="px-4 py-3 bg-gray-300 w-24 h-8 animate-pulse"
                      aria-hidden="true"
                    />
                    <td
                      className="px-4 py-3 bg-gray-300 w-24 h-8 animate-pulse"
                      aria-hidden="true"
                    />
                    <td
                      className="px-4 py-3 bg-gray-300 w-24 h-8 animate-pulse"
                      aria-hidden="true"
                    />
                    <td
                      className="px-4 py-3 bg-gray-300 w-24 h-8 animate-pulse"
                      aria-hidden="true"
                    />
                    <td
                      className="px-4 py-3 bg-gray-300 w-12 h-8 text-center animate-pulse"
                      aria-hidden="true"
                    />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-primary bg-opacity-20 flex items-center justify-between p-8">
            <span className="text-gray-700" aria-live="polite">
              Showing -- products
            </span>
            <span className="text-gray-700" aria-live="polite">
              Page -- of --
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
