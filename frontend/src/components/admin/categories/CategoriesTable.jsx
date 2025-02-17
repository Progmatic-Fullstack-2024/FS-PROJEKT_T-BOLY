import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import AddNewCategoryModal from './AddNewCategoryModal.jsx';
import CategoriesTableSkeleton from './CategoriesTableSkeleton.jsx';
import DeleteCategoryModal from './DeleteCategoryModal.jsx';
import noImage from '../../../assets/noImage.png';
import categoryService from '../../../services/categoryService.js';
import DisplayedProductsNumber from '../../products/DisplayedProductsNumber.jsx';
import Pagination from '../../products/Pagination.jsx';

export default function CategoriesTable() {
  const [categories, setCategories] = useState([]);
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const data = await categoryService.getAllCategories(searchParams.toString());
        setCategories(data.categories);
        setTotalCategories(data.totalCategories);
        setTotalPages(data.totalPages);
      } catch (error) {
        toast.error('Failed to fetch categories');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [searchParams]);

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

  if (isLoading) {
    return <CategoriesTableSkeleton />;
  }

  return (
    <section className="py-3 sm:py-5">
      <div className="px-4 mx-auto max-w-screen-2xl lg:px-12">
        <div className="overflow-hidden bg-gray-50 bg-opacity-80 shadow-md sm:rounded-lg">
          <div className="relative overflow-hidden bg-gray-50 bg-opacity-80 shadow-md">
            <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between px-4 py-3">
              <h5 className="text-black">All Categories: {totalCategories}</h5>
              <AddNewCategoryModal onCreate={handleCreate} />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 bg-white">
                <thead className="text-xs text-gray-700 uppercase bg-primary">
                  <tr className="text-gray-700 uppercase bg-primary">
                    <th className="px-4 py-3 text-gray-100">Category Image</th>
                    <th className="px-4 py-3 text-gray-100">Category Name</th>
                    <th className="px-4 py-3 text-gray-100">Category Description</th>
                    <th className="px-4 py-3 text-gray-100">Last Updated</th>
                    <th className="px-4 py-3 w-48 text-gray-100 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr
                      key={category.id}
                      className="border-b dark:border-gray-600  hover:bg-orange-200"
                    >
                      <td className="px-4 py-3">
                        <img
                          className="w-12 h-12 rounded-lg"
                          src={category.pictureUrl || noImage}
                          alt={category.name}
                        />
                      </td>
                      <td className="px-4 py-3">{category.name}</td>
                      <td className="px-4 py-3">{category.description.slice(0, 100)}...</td>
                      <td className="px-4 py-3">
                        {new Date(category.updatedAt).toLocaleDateString()}
                      </td>
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
          <div className="bg-primary bg-opacity-20 flex items-center justify-between p-8">
            <DisplayedProductsNumber totalProducts={totalCategories} />
            <Pagination totalPages={totalPages} />
          </div>
        </div>
      </div>
    </section>
  );
}
