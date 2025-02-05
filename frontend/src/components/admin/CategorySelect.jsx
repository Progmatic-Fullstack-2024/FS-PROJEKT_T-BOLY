import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import categoryService from '../../services/categoryService';

export default function SelectCategoryInput({ setSelectedCategory }) {
  const [categories, setCategories] = useState([]);
  const { categoryId } = useParams();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getAllCategories();
        setCategories(data);
      } catch (error) {
        toast.error(`Failed to fetch categories: ${error.message}. Please try again later.`);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="flex flex-col">
      <select
        value={categoryId}
        onChange={handleCategoryChange}
        className="w-60 p-2 px-4 py-2 text-sm font-medium text-black rounded-lg bg-primary-700 bg-opacity-50 border border-gray-400 "
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
