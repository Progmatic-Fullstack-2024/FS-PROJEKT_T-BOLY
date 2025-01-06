import { useState, useEffect } from 'react';
import productService from '../../services/productService.js';
import categoryService from '../../services/categoryService.js';
import Nav from './Nav.jsx';
import { useParams } from 'react-router-dom';

export default function ProductsByCategory() {
  const [productsByCategory, setProductsByCategory] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const { categoryId } = useParams();

  useEffect(() => {

    const fetchProductsByCategory = async () => {
      try {
        const data = await productService.getAllProductsByCategory(categoryId);
        setProductsByCategory(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    const fetchCategoryById = async () => {
      try {
        const data = await categoryService.getCategoryById(categoryId); 
        setCategoryName(data.name);  
      } catch (error) {
        console.error('Failed to fetch category name:', error);
      }
    };

    fetchProductsByCategory();
    fetchCategoryById();

  }, [categoryId]);

  return (
    <div>
      <h1 className="text-[#F57D0D] m-8">Products</h1>
      <div className="flex gap-20 m-8">
        <div>
          <Nav />
        </div>
        <div>
          <h1>{categoryName}</h1>
          <div>
            {productsByCategory.length > 0 ? (
              productsByCategory.map((product, index) => (
                <div className="flex flex-wrap mb-10 mt-10">
                  <div key={index}>
                    <img className="border-2 rounded-lg w-60 h-60" src={product.pictureUrl} alt={product.name} />
                    <div>{product.name}</div>
                    <div>${product.price}</div>
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
