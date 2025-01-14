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
        console.log("data", data)
        console.log("pageNumber", pageNumber)
        console.log("totalpage", totalPages)
      } catch (error) {
        toast.error('Failed to fetch products:', error);
      }
    };

    fetchCategoryById();
    fetchProductsByCategory();
  }, [categoryId, sortingOption, pageNumber]);

  const handleSortingChange = (e) => {
    const [sorting, order] = e.target.value.split('-');
    setSortingOption({ sorting, order });
  };

  return (
    <div>
      <h1 className="text-primary m-8 text-xl">Products</h1>
      <div className="flex gap-20 m-8">
        <Nav />
        <div>
          <h1 className="md:w-60 hidden md:block mb-12 text-xl">{categoryName}</h1>
          <div className="flex justify-between mr-8">
            <div>
              <label htmlFor="sorting">Sort by:</label>
              <select
                id="sorting"
                onChange={handleSortingChange}
                value={`${sortingOption.sorting}-${sortingOption.order}`}
              >
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
                <option value="rating-asc">Rating (Low to High)</option>
                <option value="rating-desc">Rating (High to Low)</option>
              </select>
            </div>
          </div>

          <SelectCategoryInput />
          <div className="flex flex-wrap gap-8 justify-around ">
            {productsByCategory.length > 0 ? (
              productsByCategory.map((product, index) => (
                <div>
                  <div className="flex flex-col gap-1" key={index}>
                    <div className="relative">
                      <img
                        className="border-2 rounded-lg w-80 h-80 p-7 pr-8"
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
          <div className="flex gap-5 p-10">
            <button
              type="button"
              onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
              disabled={pageNumber === 1}
            >
              Previous
            </button>
            <div>
              Page {pageNumber} of {totalPages}
            </div>
            <button
              type="button"
              onClick={() => setPageNumber(Math.min(totalPages, pageNumber + 1))}
              disabled={pageNumber === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
