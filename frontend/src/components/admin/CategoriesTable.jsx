import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import AddNewCategoryModal from './AddNewCategoryModal.jsx';
import DeleteCategoryModal from './DeleteCategoryModal.jsx';
import categoryService from '../../services/categoryService.js';

export default function CategoriesTable() {
  const [categories, setCategories] = useState([]);

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

  const handleDelete = (deletedId) => {
    setCategories(categories.filter((category) => category.id !== deletedId));
  };

  const handleCreate = (newCategory) => {
    setCategories([...categories, newCategory]);
  };

  const handleUpdate = (updatedCategory) => {
    setCategories(
      categories.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category,
      ),
    );
  };

  return (
    <section className="py-3 sm:py-5">
      <div className="px-4 mx-auto max-w-screen-2xl lg:px-12">
        <div className="relative overflow-hidden bg-gray-50 bg-opacity-80 shadow-md sm:rounded-lg">
          <div className="flex flex-row justify-between px-4 py-3">
            <h5 className="text-black">Categories</h5>
            <AddNewCategoryModal onCreate={handleCreate} />
          </div>
          <table className="w-full text-sm text-left text-gray-500 bg-white">
            <thead>
              <tr className="text-gray-700 uppercase bg-primary">
                <th className="px-4 py-3">Last Updated</th>
                <th className="px-4 py-3">Category Image</th>
                <th className="px-4 py-3">Category Name</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="border-b">
                  <td className="px-4 py-3">{new Date(category.updatedAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <img
                      className="w-12 h-12 rounded-lg"
                      src={category.pictureUrl}
                      alt={category.name}
                    />
                  </td>
                  <td className="px-4 py-3">{category.name}</td>
                  <td className="px-4 py-3 text-center">
                    <AddNewCategoryModal categoryToUpdate={category} onCreate={handleUpdate} />
                    <DeleteCategoryModal category={category} onDelete={handleDelete} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
