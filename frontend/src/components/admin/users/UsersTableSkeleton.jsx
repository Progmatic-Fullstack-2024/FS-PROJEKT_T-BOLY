import React from 'react';
import { BsSortUp } from 'react-icons/bs';
import { IoMdPersonAdd } from 'react-icons/io';

export default function UsersTableSkeleton() {
  const renderSortIcon = () => <BsSortUp className="inline w-5 h-5 ml-1" />;

  return (
    <section className="py-3 sm:py-5">
      <div className="px-4 mx-auto max-w-screen-2xl lg:px-12">
        <div className="relative overflow-hidden bg-gray-50 bg-opacity-80 shadow-md sm:rounded-lg">
          <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
            <div className="flex items-center flex-1 space-x-4">
              <h5>
                <span className="text-black">All Users: </span>
                <span className="text-black">--</span>
              </h5>
            </div>
            <button
              type="button"
              className="flex items-center justify-center px-4 py-2 text-sm font-medium text-black rounded-lg bg-primary-700 border border-gray-400 hover:bg-primary focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            >
              <IoMdPersonAdd className="h-4 w-4 mr-2" />
              Add new user
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 overflow-x-scroll">
              <thead className="text-xs text-gray-700 uppercase bg-primary">
                <tr>
                  <th className="px-4 py-3 w-48 text-left text-gray-100 cursor-pointer">
                    Name {renderSortIcon()}
                  </th>
                  <th className="px-4 py-3 w-48 text-left text-gray-100 cursor-pointer hidden md:table-cell">
                    Email {renderSortIcon()}
                  </th>
                  <th className="px-4 py-3 w-24 text-left text-gray-100">Role</th>
                  <th className="px-4 py-3 w-24 text-left text-gray-100 cursor-pointer">
                    Registered {renderSortIcon()}
                  </th>
                  <th className="px-4 py-3 w-12 text-center text-gray-100">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(9)].map((_, index) => (
                  <tr key={index} className="border-b h-14 border-gray-400 animate-pulse">
                    <td
                      className="px-4 py-4 bg-gray-200 rounded-lg w-48 h-6"
                      aria-label="Name placeholder"
                    />
                    <td
                      className="px-4 py-4 bg-gray-200 rounded-lg w-48 h-6 hidden md:table-cell"
                      aria-label="Email placeholder"
                    />
                    <td
                      className="px-4 py-4 bg-gray-200 rounded-lg w-24 h-6"
                      aria-label="Role placeholder"
                    />
                    <td
                      className="px-4 py-4 bg-gray-200 rounded-lg w-24 h-6"
                      aria-label="Registered placeholder"
                    />
                    <td
                      className="px-4 py-4 bg-gray-200 rounded-lg w-12 h-6 text-center"
                      aria-label="Actions placeholder"
                    />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-primary bg-opacity-20 flex items-center justify-between p-8">
            <span className="text-gray-700">Showing -- users</span>
            <span className="text-gray-700">Page -- of --</span>
          </div>
        </div>
      </div>
    </section>
  );
}
