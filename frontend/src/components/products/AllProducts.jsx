import { useState, useEffect } from 'react';
import productService from '../../services/productService.js';
import Nav from './Nav.jsx';


export default function Allproducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts= async () => {
      try {
        const data = await productService.getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h1 className="text-[#F57D0D] m-8">Products</h1>
      <div className="flex gap-20 m-8">
        <div>
          <Nav />
        </div>
        <div>
          <h1>All products</h1>
          <div>
            {products.length > 0 ? (
              products.map((product, index) => (
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
              <div>No products found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}