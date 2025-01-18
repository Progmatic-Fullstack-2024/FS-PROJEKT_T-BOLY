import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import categoryService from '../../services/categoryService';

export default function SelectCategoryInput() {
  const [categories, setCategories] = useState([]);
  const { categoryId } = useParams();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getAllCategories();
        setCategories(data);
      } catch (error) {
        toast.error('Failed to fetch categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (event) => {
    window.location.href = `/products/category/${event.target.value}`;
  };

  return (
    <div className="flex flex-col mb-12">
      <h1 className="md:hidden w-60 pb-3">Select category</h1>
      <select
        value={categoryId}
        onChange={handleCategoryChange}
        className="w-60 p-2 border-2 rounded-lg md:hidden"
      >
        <option className={categoryId === 'all' ? 'text-primary' : ''} value="all">
          All products
        </option>
        {categories.map((category) => (
          <option
            className={categoryId === category.id ? 'text-primary' : ''}
            key={category.id}
            value={category.id}
          >
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}
