import { useState } from 'react';
import { FiTrash } from 'react-icons/fi';
import { toast } from 'react-toastify';

import categoryService from '../../services/categoryService';

export default function DeleteCategoryModal({ category, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await categoryService.deleteCategory(category.id);
      toast.success('Category deleted successfully!');
      onDelete(category.id);
      setIsOpen(false);
    } catch (error) {
      toast.error('Failed to delete category');
    }
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} type="button" className="h-full text-red-500">
        <FiTrash />
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 dark:bg-gray-800 dark:border-primary dark:border">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-primary">
                Are you sure you want to delete {category.name}?
              </h3>
              <div className="mt-4 flex justify-center space-x-4">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-800"
                >
                  Yes, delete
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-primary dark:hover:bg-gray-600 dark:hover:text-white dark:border-primary dark:border"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
