import { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import NavSkeleton from './NavSkeleton';
import LanguageContext from '../../contexts/LanguageContext';
import categoryService from '../../services/categoryService';

export default function Nav() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { categoryId } = useParams();
  const { t } = useContext(LanguageContext);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const data = await categoryService.getAllCategories();
        setCategories(data.categories);
      } catch (error) {
        toast.error(`Failed to fetch categories: ${error.message}. Please try again later.`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (isLoading || !categories) {
    return <NavSkeleton />;
  }

  return (
    <div className="border-2 rounded-lg p-3 pl-6 mb-10 dark:border-primary dark:bg-gray-700">
      <h1 className="pb-8 pt-4 text-xl font-medium">
        {t('product')} {t('categories')}
      </h1>
      <nav>
        <ul>
          <li
            className={`pb-3 ${categoryId === 'all' && 'text-primary font-semibold dark:text-white'}`}
          >
            <Link to="/products/category/all">
              + {t('all')} {t('products')}
            </Link>
          </li>

          {categories.map((category) => (
            <li
              className={`pb-3 ${categoryId === category.id && 'text-primary font-semibold dark:text-white'}`}
            >
              <Link key={category.id} to={`/products/category/${category.id}`}>
                + {t(category.name)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
