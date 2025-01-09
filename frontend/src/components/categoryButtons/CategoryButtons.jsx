import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import CategoryButton from './CategoryButton';
import categoryService from '../../services/categoryService';

export default function CategoryButtons() {
  const [categories, setCategories] = useState([]);

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
    <div className="flex flex-col items-center">
      <h1 className="text-center mt-4">Find the Perfect Toy</h1>
      <p className="text-center my-4">Our Collections</p>
      <div className="flex flex-wrap p-4 gap-20 text-center ">
        {categories.map((category, idx) => (
          <CategoryButton key={category.id} category={category} idx={idx} />
        ))}
      </div>
    </div>
  );
}
