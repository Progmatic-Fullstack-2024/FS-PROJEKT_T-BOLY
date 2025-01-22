import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import UserRow from './UserRow.jsx';
import userService from '../../services/userService.js';
import DisplayedProductsNumber from '../products/DisplayProductsNumber.jsx';
import Pagination from '../products/Pagination.jsx';

export default function UsersTable() {
  const [pageNumber, setPageNumber] = useState(1);
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [limit] = useState(10);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await userService.getAllUsers('username', 'asc', pageNumber, limit);
        setUsers(data.users);
        setTotalUsers(data.totalUsers);
        setTotalPages(data.totalPages);
      } catch (error) {
        toast.error('Failed to fetch users');
      }
    };

    fetchUsers();
  }, [pageNumber, limit]);

  const handleDelete = async (userId) => {
    try {
      await userService.deleteUser(userId);
      toast.success('User deleted successfully');
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

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
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 overflow-x-scroll">
              <thead className="text-xs text-gray-700 uppercase bg-primary">
                <tr>
                  <th className="px-4 py-3 w-48 text-left text-gray-100">Name</th>
                  <th className="px-4 py-3 w-48 text-left text-gray-100 hidden md:table-cell">
                    Email
                  </th>
                  <th className="px-4 py-3 w-36 text-left text-gray-100">Role</th>
                  <th className="px-4 py-3 w-36 text-left text-gray-100">Registered</th>
                  <th className="px-4 py-3 w-48 text-left text-gray-100">Actions</th>
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
            <DisplayedProductsNumber
              pageNumber={pageNumber}
              limit={limit}
              totalProducts={totalUsers}
            />
            <Pagination
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              totalPages={totalPages}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
