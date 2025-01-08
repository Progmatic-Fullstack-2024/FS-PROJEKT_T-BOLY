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
        const data = await productService.getAllProductsByCategory(categoryId);
        setProductsByCategory(data);
      } catch (error) {
        toast.error('Failed to fetch products:', error);
      }
    };

    fetchCategoryById();
    fetchProductsByCategory();
  }, [categoryId]);

  return (
    <div>
      <h1 className="text-primary m-8 text-xl">Products</h1>
      <div className="flex gap-20 m-8">
        <Nav />
        <div>
          <h1 className="md:w-60 hidden md:block mb-12 text-xl">{categoryName}</h1>
          <SelectCategoryInput />
          <div className="flex flex-wrap gap-8 justify-around ">
            {productsByCategory.length > 0 ? (
              productsByCategory.map((product, index) => (
                <div>
                  <div className="flex flex-col gap-1" key={index}>
                    <div className="relative">
                      <img
                        className="border-2 rounded-lg w-60 h-60 p-10"
                        src="https://picsum.photos/500/300"
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
                    <div>{product.name}</div>
                    <div className="font-medium">${product.price}</div>
                    <div>Rating: {product.rating}</div>
                  </div>
                </div>
              ))
            ) : (
              <div>No products found for this category.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
