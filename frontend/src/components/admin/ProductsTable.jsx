import React, { useState, useEffect } from 'react';
import { BsDownload, BsSortUp, BsSortDownAlt } from 'react-icons/bs';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import ProductAdminModal from './CreateProductByAdmin.jsx';
import ProductRow from './ProductRow.jsx';
import productService from '../../services/productService.js';
import DisplayedProductsNumber from '../products/DisplayedProductsNumber.jsx';
import Pagination from '../products/Pagination.jsx';

export default function ProductsTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [productsByCategory, setProductsByCategory] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const sorting = searchParams.get('sorting');
  const order = searchParams.get('order');

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const data = await productService.getAllProductsByCategory('all', searchParams.toString());

        setProductsByCategory(data.products);
        setTotalProducts(data.totalProducts);
        setTotalPages(data.totalPages);
      } catch (error) {
        toast.error('Failed to fetch products:', error);
      }
    };

    fetchProductsByCategory();
  }, [searchParams]);

  const onUpdate = (id, values) => {
    setProductsByCategory((prev) => prev.map((product) => (product.id === id ? values : product)));
  };
  const onDelete = (id) => {
    setProductsByCategory((prev) => prev.filter((product) => product.id !== id));
  };

  const handleDownload = async () => {
    try {
      await productService.exportProducts();
      toast.success('Products exported successfully!');
    } catch (error) {
      toast.error('Failed to export products');
    }
  };

  const handleSort = (column) => {
    if (sorting === column) {
      searchParams.set('order', order === 'asc' ? 'desc' : 'asc');
    } else {
      searchParams.set('sorting', column);
      searchParams.set('order', 'asc');
    }
    setSearchParams(searchParams);
  };

  const renderSortIcon = (column) => {
    if (sorting !== column) return null;
    return order === 'asc' ? (
      <BsSortUp className="w-5 h-5 inline ml-1" />
    ) : (
      <BsSortDownAlt className="w-5 h-5 inline ml-1" />
    );
  };

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
              <ProductAdminModal>Add newProduct</ProductAdminModal>

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
                  {/* <th scope="col" className="p-4 w-12 text-center">
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
                  </th> */}
                  <th
                    scope="col"
                    className="px-4 py-3 w-48 text-left text-gray-100 cursor-pointer"
                    onClick={() => handleSort('name')}
                  >
                    Product {renderSortIcon('name')}
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
                  <th
                    scope="col"
                    className="px-4 py-3 w-24 text-center text-gray-100 cursor-pointer"
                    onClick={() => handleSort('price')}
                  >
                    Price {renderSortIcon('price')}
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 w-24 text-center text-gray-100 cursor-pointer"
                    onClick={() => handleSort('quantity')}
                  >
                    Quantity {renderSortIcon('quantity')}
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 w-24 text-center text-gray-100 cursor-pointer"
                    onClick={() => handleSort('rating')}
                  >
                    Rating {renderSortIcon('rating')}
                  </th>
                  <th scope="col" className="px-4 py-3 w-48 text-left text-gray-100">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {productsByCategory &&
                  productsByCategory.map((product) => (
                    <ProductRow
                      key={product.id}
                      product={product}
                      onUpdate={onUpdate}
                      onDelete={onDelete}
                    />
                  ))}
              </tbody>
            </table>
          </div>
          <div className="bg-primary bg-opacity-20 flex items-center justify-between p-8">
            <DisplayedProductsNumber totalProducts={totalProducts} />
            <Pagination totalPages={totalPages} />
          </div>
        </div>
      </div>
    </section>
  );
}
