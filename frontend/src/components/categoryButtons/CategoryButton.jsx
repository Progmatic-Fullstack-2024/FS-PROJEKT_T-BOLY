import React from 'react';
import { Link } from 'react-router-dom';
import VectorCloud1 from '../../assets/VectorCloud1.png';
import VectorCloud2 from '../../assets/VectorCloud2.png';
import VectorCloud3 from '../../assets/VectorCloud3.png';
import VectorCloud4 from '../../assets/VectorCloud4.png';
import VectorCloud5 from '../../assets/VectorCloud5.png';

const cloudImages = [VectorCloud1, VectorCloud2, VectorCloud3, VectorCloud4, VectorCloud5];
export default function CategoryButton({ category, idx }) {
  return (
    <Link className="flex flex-col items-center" to={`/categories/${category.id}`}>
      <div>
        <img
          src={category.imageUrl || cloudImages[idx % cloudImages.length]}
          alt={category.name}
          style={{ width: '50px', height: '50px', objectFit: 'contain' }}
        />
      </div>
      <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{category.name}</span>
    </Link>
  );
}
