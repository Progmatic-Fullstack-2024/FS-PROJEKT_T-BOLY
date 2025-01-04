import { useState, useEffect } from 'react';
import categoryService from '../../services/categoryService';
import { Link } from 'react-router-dom';

export default function Nav() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <nav>
      <ul>
        {categories.map((category) => (
          <Link key={category.id} to={`/products/category/${category.id}`}>{category.name}</Link>
        ))}
      </ul>
    </nav>
  );
}
