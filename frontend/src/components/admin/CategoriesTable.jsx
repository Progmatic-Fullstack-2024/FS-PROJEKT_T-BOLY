import React, { useState, useEffect } from 'react';
import { IoMdAddCircle } from 'react-icons/io';
import { toast } from 'react-toastify';

import AddNewCategoryModal from './AddNewCategoryModal.jsx';
import categoryService from '../../services/categoryService.js';

export default function CategoriesTable() {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getAllCategories();
        setCategories(data);
      } catch (error) {
        toast.error('Failed to fetch categories');
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="py-3 sm:py-5">
      <div className="px-4 mx-auto max-w-screen-2xl lg:px-12">
        <div className="relative overflow-hidden bg-gray-50 bg-opacity-80 shadow-md sm:rounded-lg">
          <div className="flex flex-row justify-between px-4 py-3">
            <h5 className="text-black">Categories</h5>
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="flex items-center px-4 py-2 text-sm font-medium text-black rounded-lg bg-primary hover:bg-orange-600"
            >
              <IoMdAddCircle className="h-5 w-5 mr-2" /> Add New Category
            </button>
          </div>
          <ul className="p-4 bg-white rounded-lg shadow">
            {categories.map((category) => (
              <li key={category.id} className="text-lg py-2">
                {category.name}
              </li>
            ))}
          </ul>
          {isOpen && <AddNewCategoryModal setIsOpen={setIsOpen} />}
        </div>
      </div>
    </section>
  );
}
