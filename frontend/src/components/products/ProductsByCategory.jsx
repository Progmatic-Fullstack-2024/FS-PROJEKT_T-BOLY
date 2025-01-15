import { useState, useEffect } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { LuHeart } from 'react-icons/lu';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import Nav from './Nav.jsx';
import SelectCategoryInput from './SelectCategoryInput.jsx';
import categoryService from '../../services/categoryService.js';
import productService from '../../services/productService.js';

export default function ProductsByCategory() {
  const [productsByCategory, setProductsByCategory] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [sortingOption, setSortingOption] = useState({ sorting: 'name', order: 'asc' });
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const { categoryId } = useParams();

  useEffect(() => {
    const fetchCategoryById = async () => {
      try {
        if (categoryId === 'all') {
          setCategoryName('All products');
        } else {
          const data = await categoryService.getCategoryById(categoryId);
          setCategoryName(data.name);
        }
      } catch (error) {
        toast.error('Failed to fetch category name:', error);
      }
    };

    const fetchProductsByCategory = async () => {
      try {
        const { sorting, order } = sortingOption;
        const data = await productService.getAllProductsByCategory(
          categoryId,
          sorting,
          order,
          pageNumber,
          9,
        );
        setProductsByCategory(data.products);
        setTotalPages(data.totalPages);
        setTotalProducts(data.totalProducts);
      } catch (error) {
        toast.error('Failed to fetch products:', error);
      }
    };

    fetchCategoryById();
    fetchProductsByCategory();
  }, [categoryId, sortingOption, pageNumber]);

  useEffect(() => {
    setPageNumber(1);
  }, [categoryId, sortingOption]);

  const handleSortingChange = (e) => {
    const [sorting, order] = e.target.value.split('-');
    setSortingOption({ sorting, order });
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const pageLimit = 3;
    let startPage = Math.max(1, pageNumber - Math.floor(pageLimit / 2));
    const endPage = Math.min(totalPages, startPage + pageLimit - 1);

    if (endPage - startPage + 1 < pageLimit) {
      startPage = Math.max(1, endPage - pageLimit + 1);
    }

    // eslint-disable-next-line no-plusplus
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="m-20">
      <h1 className="text-primary m-8 text-3xl">Products</h1>
      <div className="flex gap-32 m-8">
        <Nav />
        <div>
          <h1 className="md:w-80 hidden md:block mb-12 text-4xl">{categoryName}</h1>
          <div className="flex justify-between mr-44 items-center">
            <div>
              <select
                className="p-2"
                id="sorting"
                onChange={handleSortingChange}
                value={`${sortingOption.sorting}-${sortingOption.order}`}
              >
                <option value="name-asc">Default sorting</option>
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
                <option value="rating-asc">Rating (Low to High)</option>
                <option value="rating-desc">Rating (High to Low)</option>
              </select>
            </div>
            <div>
              <h1>
                Showing {Math.min((pageNumber - 1) * 9 + 1, totalProducts)} -{' '}
                {Math.min(pageNumber * 9, totalProducts)} of {totalProducts} results
              </h1>
            </div>
          </div>

          <SelectCategoryInput />
          <div className="flex flex-wrap gap-8 justify-between mr-44">
            {productsByCategory.length > 0 ? (
              productsByCategory.map((product, index) => (
                <div>
                  <div className="flex flex-col gap-1" key={index}>
                    <div className="relative">
                      <img
                        className="border-2 rounded-2xl w-80 h-80 p-7 pr-8"
                        src={product.pictureUrl}
                        alt={product.name}
                      />
                      <button
                        type="submit"
                        className="absolute top-2 right-2 rounded-full flex items-center justify-center"
                      >
                        <LuHeart className="m-2" />
                      </button>
                      <button
                        type="submit"
                        className="absolute top-9 right-2 rounded-full flex items-center justify-center"
                      >
                        <FiShoppingCart className="m-2" />
                      </button>
                    </div>
                    <div className="w-60">{product.name}</div>
                    <div className="font-medium text-lg">${product.price}</div>
                    <div>Rating: {product.rating}</div>
                  </div>
                </div>
              ))
            ) : (
              <div>No products found for this category.</div>
            )}
          </div>
          <div className="flex mt-16 justify-center mr-44">
            <div className="flex items-center h-12 gap-2">
              <button
                type="button"
                onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
                disabled={pageNumber === 1}
              >
                <div className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-900 bg-white border border-1 border-gray-400 rounded-full hover:text-primary hover:border-primary disabled:text-gray-300  disabled:border-gray-300">
                  <div className="sr-only">Previous</div>
                  <svg
                    className="w-3 h-3 rtl:rotate-180"
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
                </div>
              </button>
              {getPageNumbers().map((page) => (
                <div key={page}>
                  <button
                    type="button"
                    onClick={() => setPageNumber(page)}
                    className={`px-4 h-10 leading-tight rounded-full ${page === pageNumber ? 'text-white bg-primary border-primary' : 'text-gray-900 bg-white border-gray-400'} border hover:text-primary hover:border-primary`}
                  >
                    {page}
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setPageNumber(Math.min(totalPages, pageNumber + 1))}
                disabled={pageNumber === totalPages}
              >
                <div className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-900 bg-white border border-1 border-gray-400 rounded-full hover:text-primary hover:border-primary  disabled:text-gray-300  disabled:border-gray-300">
                  <div className="sr-only">Next</div>
                  <svg
                    className="w-3 h-3 rtl:rotate-180"
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
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
