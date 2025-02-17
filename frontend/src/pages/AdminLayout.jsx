import React, { useContext, useState } from 'react';
import { BsDice5, BsCreditCard } from 'react-icons/bs';
import { FiMenu, FiUser, FiUsers, FiHome, FiLogOut } from 'react-icons/fi';
import { IoFileTrayStackedSharp } from 'react-icons/io5';
import { LuTickets } from 'react-icons/lu';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import TbolyOrange from '../assets/t-boly-orange.png';
import TbolyWhite from '../assets/t-boly-white.png';
import DarkModeToggle from '../components/DarkModeToggle';
import SearchBar from '../components/searchBar/SearchBar';
import AuthContext from '../contexts/AuthContext';
import useDarkMode from '../hooks/useDarkMode';

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const { theme } = useDarkMode();

  return (
    <div className="antialiased bg-gray-50 h-screen flex flex-col">
      <nav className="bg-primary border-b border-gray-200 px-4 py-2.5 fixed left-0 right-0 top-0 z-50 dark:bg-gray-800 dark:border-primary">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex justify-start items-center">
            <button
              type="button"
              className="p-2 mr-2 text-gray-50 rounded-lg cursor-pointer md:hidden hover:text-gray-300 focus:ring-2 focus:ring-gray-100"
              aria-expanded={isSidebarOpen}
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <FiMenu className="w-6 h-6" />
              <span className="sr-only">Toggle sidebar</span>
            </button>
            <Link to="/" className="flex items-center mr-1">
              {theme === 'dark' ? (
                <img src={TbolyOrange} className="h-8 w-60 md:w-auto" alt="Ant Logo" />
              ) : (
                <img src={TbolyWhite} className="h-8 w-60 md:w-auto" alt="Ant Logo" />
              )}
            </Link>
            <span className="flex items-center self-center md:text-2xl font-semibold whitespace-nowrap text-white mr-6 dark:text-primary">
              ADMIN
            </span>
            <SearchBar />
          </div>
          <div className="flex items-center relative gap-4">
            <DarkModeToggle className="py-3" />
            <Link
              to="/profile_page/personal_data"
              className="hidden md:flex items-center gap-3 p-2 bg-gray-100 bg-opacity-10 rounded-lg shadow-md hover:bg-opacity-20 focus:outline-none"
            >
              <FiUser className="w-7 h-7 text-gray-50 dark:text-orange-600" />
              <div className="text-white">
                {user && (
                  <p className="text-sm font-medium leading-none">
                    Welcome, <span className="font-semibold">{user.username}</span>
                  </p>
                )}
                <p className="text-xs text-gray-200 dark:text-primary">
                  Manage your profile and settings
                </p>
              </div>
            </Link>
          </div>
        </div>
      </nav>

      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform  bg-primary border-gray-200 md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        aria-label="Sidenav"
      >
        <div className="flex flex-col overflow-y-auto py-5 px-3 h-full bg-primary dark:bg-gray-800 dark:border-primary dark:border-2">
          <ul className="space-y-2">
            <li>
              <Link
                to="/admin"
                onClick={() => setIsSidebarOpen(false)}
                className="flex items-center p-2 text-base font-medium text-gray-50 hover:text-primary rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-primary dark:hover:text-white"
              >
                <FiHome className="w-6 h-6" />
                <span className="ml-3">Overview</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/products"
                onClick={() => setIsSidebarOpen(false)}
                className="flex items-center p-2 text-base font-medium text-gray-50 hover:text-primary rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-primary dark:hover:text-white"
              >
                <BsDice5 className="w-6 h-6" />
                <span className="ml-3">Products</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/orders"
                onClick={() => setIsSidebarOpen(false)}
                className="flex items-center p-2 text-base font-medium text-gray-50 hover:text-primary rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-primary dark:hover:text-white"
              >
                <BsCreditCard className="w-6 h-6" />
                <span className="ml-3">Orders</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/users"
                onClick={() => setIsSidebarOpen(false)}
                className="flex items-center p-2 text-base font-medium text-gray-50 hover:text-primary rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-primary dark:hover:text-white"
              >
                <FiUsers className="w-6 h-6" />
                <span className="ml-3">Users</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/categories"
                onClick={() => setIsSidebarOpen(false)}
                className="flex items-center p-2 text-base font-medium text-gray-50 hover:text-primary rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-primary dark:hover:text-white"
              >
                <IoFileTrayStackedSharp className="w-6 h-6" />
                <span className="ml-3">Categories</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/coupons"
                onClick={() => setIsSidebarOpen(false)}
                className="flex items-center p-2 text-base font-medium text-gray-50 hover:text-primary rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-primary dark:hover:text-white"
              >
                <LuTickets className="w-6 h-6" />
                <span className="ml-3">Coupons</span>
              </Link>
            </li>
          </ul>
          <button
            type="button"
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="mt-auto flex items-center p-2 text-base font-medium text-gray-50 rounded-lg  hover:bg-gray-100 hover:text-red-500 dark:hover:bg-red-500 dark:text-primary dark:hover:text-white"
          >
            <FiLogOut className="w-6 h-6" />
            <span className="ml-3">Logout</span>
          </button>
        </div>
      </aside>

      <main className="p-4 md:ml-64 h-auto pt-20 bg-primary bg-opacity-40 grow dark:bg-gray-900">
        <Outlet />
      </main>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
