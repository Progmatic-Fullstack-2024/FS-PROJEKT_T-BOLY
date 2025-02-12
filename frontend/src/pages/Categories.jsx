import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import categoryService from '../services/categoryService.js';

function Categories() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getAllCategories();
        setCategories(data.categories);
      } catch (error) {
        toast.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Categories</h1>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {categories.map((category) => (
          <button
            type="button"
            key={category.id}
            onClick={() => navigate(`/categories/${category.id}`)}
            style={{
              padding: '10px 20px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              cursor: 'pointer',
              backgroundColor: '#f9f9f9',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            }}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Categories;
