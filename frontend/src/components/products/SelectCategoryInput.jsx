import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import LanguageContext from '../../contexts/LanguageContext';
import categoryService from '../../services/categoryService';

export default function SelectCategoryInput() {
  const [categories, setCategories] = useState([]);
  const { categoryId } = useParams();
  const { t } = useContext(LanguageContext);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getAllCategories();
        setCategories(data.categories);
      } catch (error) {
        toast.error(`Failed to fetch categories: ${error.message}. Please try again later.`);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (event) => {
    window.location.href = `/products/category/${event.target.value}`;
  };

  return (
    <div className="flex flex-col">
      <select
        value={categoryId}
        onChange={handleCategoryChange}
        className="w-60 p-2 border-2 rounded-lg md:hidden"
      >
        <option className={categoryId === 'all' ? 'text-primary' : ''} value="all">
          {t('all')} {t('products')}
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
