import React from 'react';
import { Link } from 'react-router-dom';

import VectorCloud1 from '../../assets/card-games.png';
import VectorCloud2 from '../../assets/family-games.png';
import VectorCloud3 from '../../assets/kid-games.png';
import VectorCloud4 from '../../assets/lego-games.png';
import VectorCloud5 from '../../assets/logic-games.png';

const cloudImages = [VectorCloud1, VectorCloud2, VectorCloud3, VectorCloud4, VectorCloud5];
export default function CategoryButton({ category, idx }) {
  return (
    <Link className="w-40 flex flex-col items-center" to={`/products/category/${category.id}`}>
      <div>
        <img
          className="w-48 h-48 object-contain"
          src={category.imageUrl || cloudImages[idx % cloudImages.length]}
          alt={category.name}
        />
      </div>
      <span className="text-xl font-bold">{category.name}</span>
    </Link>
  );
}
