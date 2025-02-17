import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import CategoryButton from './CategoryButton';
import CategoryButtonSkeleton from './CategoryButtonSkeleton';
import LanguageContext from '../../contexts/LanguageContext';
import categoryService from '../../services/categoryService';

export default function CategoryButtons() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useContext(LanguageContext);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const data = await categoryService.getAllCategories();
        setCategories(data.categories);
      } catch (error) {
        toast.error(`Failed to fetch categories: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col items-center py-16 dark:text-primary dark:bg-gray-700">
      <h1 className="text-3xl font-bold mb-4 dark:text-orange-600">{t('find the perfect toy')}</h1>
      <p className="text-center mb-10">{t('our collections')}</p>
      <div className="flex flex-wrap justify-around p-4 gap-8 md:gap-16 text-center mx-10">
        {categories
          .slice(0, 5)
          .map((category) =>
            isLoading ? (
              <CategoryButtonSkeleton key={category.id} />
            ) : (
              <CategoryButton key={category.id} category={category} />
            ),
          )}
      </div>
    </div>
  );
}
