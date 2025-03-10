import React, { useState, useEffect } from 'react';
import { BsSortUp, BsSortDownAlt } from 'react-icons/bs';
import { IoMdPersonAdd } from 'react-icons/io';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import AddNewUserModal from './AddNewUserModal.jsx';
import RoleSelect from './RoleSelect.jsx';
import UserRow from './UserRow.jsx';
import UsersTableSkeleton from './UsersTableSkeleton';
import userService from '../../../services/userService.js';
import DisplayedProductsNumber from '../../products/DisplayedProductsNumber.jsx';
import Pagination from '../../products/Pagination.jsx';

export default function UsersTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const sorting = searchParams.get('sorting');
  const order = searchParams.get('order');

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const data = await userService.getAllUsers(searchParams.toString());
        setUsers(data.users);
        setTotalUsers(data.totalUsers);
        setTotalPages(data.totalPages);
      } catch (error) {
        toast.error('Failed to fetch users');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [searchParams]);

  const handleSort = (column) => {
    if (sorting === column) {
      searchParams.set('order', order === 'asc' ? 'desc' : 'asc');
    } else {
      searchParams.set('sorting', column);
      searchParams.set('order', 'asc');
    }
    searchParams.set('page', 1);
    searchParams.set('limit', 9);
    setSearchParams(searchParams);
  };

  const renderSortIcon = (column) => {
    if (sorting === column) {
      return order === 'asc' ? (
        <BsSortUp className="inline w-5 h-5 ml-1" />
      ) : (
        <BsSortDownAlt className="inline w-5 h-5 ml-1" />
      );
    }
    return null;
  };

  const handleDelete = async (userId) => {
    try {
      await userService.deleteUser(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  if (isLoading) {
    return <UsersTableSkeleton />;
  }

  return (
    <section className="py-3 sm:py-5">
      <div className="px-4 mx-auto max-w-screen-2xl lg:px-12">
        <div className="relative overflow-hidden bg-gray-50 bg-opacity-80 shadow-md sm:rounded-lg">
          <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
            <div className="flex items-center flex-1 space-x-4">
              <h5>
                <span className="text-black">All Users: </span>
                <span className="text-black">{totalUsers}</span>
              </h5>
            </div>
            <RoleSelect />
            <button
              onClick={() => setIsOpen(true)}
              type="button"
              className="flex items-center justify-center px-4 py-2 text-sm font-medium text-black rounded-lg bg-primary-700 border border-gray-400 hover:bg-primary focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            >
              <IoMdPersonAdd className="h-4 w-4 mr-2 " />
              Add new user
            </button>
            {isOpen && <AddNewUserModal setIsOpen={setIsOpen} />}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 overflow-x-scroll">
              <thead className="text-xs text-gray-700 uppercase bg-primary">
                <tr>
                  <th
                    onClick={() => handleSort('firstName')}
                    className="px-4 py-3 w-48 text-left text-gray-100 cursor-pointer"
                  >
                    Name
                    {renderSortIcon('firstName')}
                  </th>
                  <th
                    onClick={() => handleSort('email')}
                    className="px-4 py-3 w-48 text-left text-gray-100 cursor-pointer hidden md:table-cell"
                  >
                    Email
                    {renderSortIcon('email')}
                  </th>
                  <th className="px-4 py-3 w-24 text-left text-gray-100">Role</th>
                  <th
                    onClick={() => handleSort('registrationDate')}
                    className="px-4 py-3 w-24 text-left text-gray-100 cursor-pointer"
                  >
                    Registered
                    {renderSortIcon('registrationDate')}
                  </th>
                  <th className="px-4 py-3 w-12 text-center text-gray-100">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <UserRow key={user.id} user={user} onDelete={handleDelete} />
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-primary bg-opacity-20 flex items-center justify-between p-8">
            <DisplayedProductsNumber totalProducts={totalUsers} />
            <Pagination totalPages={totalPages} />
          </div>
        </div>
      </div>
    </section>
  );
}
