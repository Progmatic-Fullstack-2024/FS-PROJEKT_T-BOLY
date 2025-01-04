import { useState, useEffect } from 'react';
import productService from '../../services/productService.js';
import Nav from './Nav.jsx';
import { useParams } from 'react-router-dom';

export default function ProductsByCategory() {
  const [productsByCategory, setProductsByCategory] = useState([]);
  const { categoryId } = useParams();

  console.log('categoryId:', categoryId);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const data = await productService.getAllProductsByCategory(categoryId);
        console.log('data:', data);
        setProductsByCategory(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    fetchProductsByCategory();
  }, [categoryId]);

  return (
    <div>
      <Nav />
      <div>
        {productsByCategory.length > 0 ? (
          productsByCategory.map((product, index) => <div key={index}> {product.name}</div>)
        ) : (
          <div>No products found for this category.</div>
        )}
      </div>
    </div>
  );
}
