import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import LanguageContext from '../../contexts/LanguageContext';

export default function CategoryButton({ category }) {
  const { t } = useContext(LanguageContext);
  return (
    <Link className="w-40 flex flex-col items-center" to={`/products/category/${category.id}`}>
      <div>
        <img
          className="w-48 h-48 object-contain dark:border-2 dark:border-primary dark:rounded-2xl dark:bg-gray-800"
          src={category.pictureUrl}
          alt={category.name}
        />
      </div>
      <span className="text-xl font-bold">{t(category.name)}</span>
    </Link>
  );
}
