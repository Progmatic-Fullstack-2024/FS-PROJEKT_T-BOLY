import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import categoryService from '../../services/categoryService';

export default function Nav() {
  const [categories, setCategories] = useState([]);
  const { categoryId } = useParams();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getAllCategories();
        setCategories(data);
      } catch (error) {
        toast.error('Failed to fetch categories:', error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="border-2 rounded-lg p-3 pl-6 mb-10">
      <h1 className="pb-8 pt-4 text-xl">Product categories</h1>
      <nav>
        <ul>
          <li className={categoryId === 'all' ? 'text-primary pb-3 ' : 'pb-3 '}>
            <Link to="/products/category/all">+ All products</Link>
          </li>
          {categories.map((category) => (
            <li className={categoryId === category.id ? 'text-primary pb-3 ' : 'pb-3 '}>
              <Link key={category.id} to={`/products/category/${category.id}`}>
                + {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
