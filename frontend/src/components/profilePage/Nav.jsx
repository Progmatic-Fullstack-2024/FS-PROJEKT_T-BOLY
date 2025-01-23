import { useState, useContext } from 'react';
import { BsBoxSeam } from 'react-icons/bs';
import { IoIosHeartEmpty } from 'react-icons/io';
import { IoLockClosedOutline } from 'react-icons/io5';
import { LuHouse } from 'react-icons/lu';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { VscAccount } from 'react-icons/vsc';
import { Link } from 'react-router-dom';

import AuthContext from '../../contexts/AuthContext';

export default function Nav() {
  const [isSidebarOpen, setIsSideBarOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const toggleSidebar = () => {
    setIsSideBarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <button
        onClick={toggleSidebar}
        data-drawer-target="separator-sidebar"
        data-drawer-toggle="separator-sidebar"
        aria-controls="separator-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>

      <nav
        className={` h-full  top-0 px-4 py-4 overflow-y-auto p-8  top-0 left-0 z-40 w-64 transition-transform -translate-x-full sm:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full hidden md:block'}`}
      >
        <h2>Welcome, {user?.username}</h2>

        <ul className="space-y-4 font-medium">
          <li className="mt-4">
            <Link
              onClick={() => setIsSideBarOpen(false)}
              className=" flex justify-between  p-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              to="orders"
            >
              <span className="flex ">
                <BsBoxSeam className="mr-4 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                Orders
              </span>
              <MdKeyboardArrowRight className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            </Link>
          </li>
          <li className="">
            <Link
              onClick={() => setIsSideBarOpen(false)}
              className="border-t border-gray-200  dark:border-gray-700  flex justify-between p-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              to="favorites"
            >
              <span className="flex  pb-0">
                <IoIosHeartEmpty className=" pb-0 mr-4 flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />{' '}
                Favorites
              </span>
              <MdKeyboardArrowRight className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            </Link>
          </li>
          <li className="">
            <Link
              onClick={() => setIsSideBarOpen(false)}
              className="border-t border-gray-200 dark:border-gray-700  flex justify-between p-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              to="personal_data"
            >
              <span className="flex">
                <VscAccount className="mr-4 flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />{' '}
                Personal data
              </span>
              <MdKeyboardArrowRight className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            </Link>
          </li>
          <li className="">
            <Link
              onClick={() => setIsSideBarOpen(false)}
              className="border-t border-gray-200 dark:border-gray-700  flex justify-between p-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              to="change_password"
            >
              <span className="flex">
                <IoLockClosedOutline className="mr-4 flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />{' '}
                Change password
              </span>
              <MdKeyboardArrowRight className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            </Link>
          </li>
          <li className="">
            <Link
              onClick={() => setIsSideBarOpen(false)}
              className="border-t border-gray-200 dark:border-gray-700  flex justify-between p-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              to="adresses"
            >
              <span className="flex">
                <LuHouse className="mr-4 flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />{' '}
                Adresses
              </span>
              <MdKeyboardArrowRight className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
