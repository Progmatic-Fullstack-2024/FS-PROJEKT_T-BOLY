import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import CategoryButton from './CategoryButton';
import LanguageContext from '../../contexts/LanguageContext';
import categoryService from '../../services/categoryService';

export default function CategoryButtons() {
  const [categories, setCategories] = useState([]);
  const { t } = useContext(LanguageContext);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getAllCategories();
        setCategories(data);
      } catch (error) {
        toast.error(`Failed to fetch categories: ${error.message}`);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col items-center my-16">
      <h1 className="text-3xl font-bold mb-4">{t('find the perfect toy')}</h1>
      <p className="text-center mb-10">{t('our collections')}</p>
      <div className="flex flex-wrap justify-around p-4 gap-8 md:gap-16 text-center mx-10">
        {categories.slice(0, 5).map((category, idx) => (
          <CategoryButton key={category.id} category={category} idx={idx} />
        ))}
      </div>
    </div>
  );
}
