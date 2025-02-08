import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import VectorCloud1 from '../../assets/VectorCloud1.png';
import VectorCloud2 from '../../assets/VectorCloud2.png';
import VectorCloud3 from '../../assets/VectorCloud3.png';
import VectorCloud4 from '../../assets/VectorCloud4.png';
import VectorCloud5 from '../../assets/VectorCloud5.png';
import LanguageContext from '../../contexts/LanguageContext';

const cloudImages = [VectorCloud1, VectorCloud2, VectorCloud3, VectorCloud4, VectorCloud5];
export default function CategoryButton({ category, idx }) {
  const { t } = useContext(LanguageContext);
  return (
    <Link className="w-40 flex flex-col items-center" to={`/products/category/${category.id}`}>
      <div>
        <img
          className="w-32 h-32 object-contain"
          src={category.imageUrl || cloudImages[idx % cloudImages.length]}
          alt={category.name}
        />
      </div>
      <span className="text-xl font-bold">{t(category.name)}</span>
    </Link>
  );
}
