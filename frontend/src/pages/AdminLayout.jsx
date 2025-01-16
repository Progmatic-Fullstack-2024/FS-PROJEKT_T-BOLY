import React from 'react';
import { BsDice5, BsCreditCard } from 'react-icons/bs';
import { FiMenu, FiSearch, FiBell, FiUser, FiUsers, FiHome, FiLogOut } from 'react-icons/fi';
import { Outlet, Link } from 'react-router-dom';

import TbolyWhite from '../assets/t-boly-white.png';

export default function AdminLayout() {
  return (
    <div className="antialiased bg-gray-50 h-screen flex flex-col">
      <nav className="bg-primary border-b border-gray-200 px-4 py-2.5 fixed left-0 right-0 top-0 z-50">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex justify-start items-center">
            <button
              type="button"
              className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:ring-2 focus:ring-gray-100"
            >
              <FiMenu className="w-6 h-6" />
              <span className="sr-only">Toggle sidebar</span>
            </button>
            <Link to="/admin" className="flex items-center mr-1">
              <img src={TbolyWhite} className="mr-3 h-8" alt="Ant Logo" />
              <span className="flex items-center self-center text-2xl font-semibold whitespace-nowrap text-white">
                ADMIN
              </span>
            </Link>
            <form action="#" method="GET" className="hidden md:block md:pl-2">
              <label htmlFor="topbar-search" className="sr-only">
                Search
              </label>
              <div className="relative md:w-64 lg:w-96">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <FiSearch className="w-5 h-5 text-gray-50" />
                </div>
                <input
                  type="text"
                  name="search"
                  id="topbar-search"
                  className="bg-white bg-opacity-50 border border-gray-300 text-gray-50 text-sm rounded-lg block w-full pl-10 p-2.5 focus:outline-none placeholder:text-gray-50"
                  placeholder="Search"
                />
              </div>
            </form>
          </div>
          <div className="flex items-center lg:order-2">
            <button
              type="button"
              className="p-2 mr-1 text-gray-50 rounded-lg hover:text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-gray-300"
            >
              <FiSearch className="w-6 h-6" />
              <span className="sr-only">Search</span>
            </button>
            <button
              type="button"
              className="p-2 mr-1 text-gray-50 rounded-lg hover:text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 "
            >
              <FiBell className="w-6 h-6" />
              <span className="sr-only">Notifications</span>
            </button>
            <button
              type="button"
              className="flex mx-3 text-sm rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 "
            >
              <FiUser className="w-6 h-6 text-white" />
              <span className="sr-only">User menu</span>
            </button>
          </div>
        </div>
      </nav>

      <aside
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-primary border-gray-200 md:translate-x-0"
        aria-label="Sidenav"
      >
        <div className="flex flex-col overflow-y-auto py-5 px-3 h-full bg-primary">
          <ul className="space-y-2">
            <li>
              <Link
                to="/admin"
                className="flex items-center p-2 text-base font-medium text-gray-50 hover:text-primary rounded-lg  hover:bg-gray-100"
              >
                <FiHome className="w-6 h-6" />
                <span className="ml-3">Overview</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/products"
                className="flex items-center p-2 text-base font-medium text-gray-50 hover:text-primary rounded-lg  hover:bg-gray-100"
              >
                <BsDice5 className="w-6 h-6" />
                <span className="ml-3">Products</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/orders"
                className="flex items-center p-2 text-base font-medium text-gray-50 hover:text-primary rounded-lg  hover:bg-gray-100"
              >
                <BsCreditCard className="w-6 h-6" />
                <span className="ml-3">Orders</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/users"
                className="flex items-center p-2 text-base font-medium text-gray-50 hover:text-primary rounded-lg  hover:bg-gray-100"
              >
                <FiUsers className="w-6 h-6" />
                <span className="ml-3">Users</span>
              </Link>
            </li>
          </ul>
          <button
            type="button"
            className="mt-auto flex items-center p-2 text-base font-medium text-gray-50 rounded-lg  hover:bg-gray-100 hover:text-red-500"
          >
            <FiLogOut className="w-6 h-6" />
            <span className="ml-3">Logout</span>
          </button>
        </div>
      </aside>

      <main className="p-4 md:ml-64 h-auto pt-20 bg-primary bg-opacity-40 grow">
        <Outlet />
      </main>
    </div>
  );
}
