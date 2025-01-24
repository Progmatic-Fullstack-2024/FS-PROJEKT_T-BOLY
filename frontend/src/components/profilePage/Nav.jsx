import { useState, useContext } from 'react';
import { BsBoxSeam } from 'react-icons/bs';
import { HiMenu } from 'react-icons/hi';
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
    <div className="md:sticky md:top-0 md:h-full">
      <button
        onClick={toggleSidebar}
        data-drawer-target="separator-sidebar"
        data-drawer-toggle="separator-sidebar"
        aria-controls="separator-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
      >
        <span className="sr-only">Open sidebar</span>
        <HiMenu className="w-6 h-6" />
      </button>

      <nav
        className={`h-full  top-0 px-4 py-4 overflow-y-auto p-8 left-0 z-40 w-64 transition-transform -translate-x-full sm:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full hidden md:block'}`}
      >
        <h2 className="mt-4 ml-4">Welcome, {user?.username}</h2>

        <ul className="font-medium">
          <li className="mt-4">
            <Link
              onClick={() => setIsSideBarOpen(false)}
              className="flex justify-between p-4 text-gray-900 rounded-lg hover:bg-gray-100 group"
              to="orders"
            >
              <span className="flex ">
                <BsBoxSeam className="mr-4 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 " />
                Orders
              </span>
              <MdKeyboardArrowRight className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 " />
            </Link>
          </li>
          <li className="">
            <Link
              onClick={() => setIsSideBarOpen(false)}
              className="border-t border-gray-200 flex justify-between p-4 text-gray-900 rounded-lg  hover:bg-gray-100  group"
              to="favorites"
            >
              <span className="flex  pb-0">
                <IoIosHeartEmpty className=" pb-0 mr-4 flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 " />{' '}
                Favorites
              </span>
              <MdKeyboardArrowRight className="w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 " />
            </Link>
          </li>
          <li className="">
            <Link
              onClick={() => setIsSideBarOpen(false)}
              className="border-t border-gray-200   flex justify-between p-4 text-gray-900 rounded-lg  hover:bg-gray-100  group"
              to="personal_data"
            >
              <span className="flex">
                <VscAccount className="mr-4 flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 " />{' '}
                Personal data
              </span>
              <MdKeyboardArrowRight className="w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 " />
            </Link>
          </li>
          <li className="">
            <Link
              onClick={() => setIsSideBarOpen(false)}
              className="border-t border-gray-200   flex justify-between p-4 text-gray-900 rounded-lg  hover:bg-gray-100  group"
              to="change_password"
            >
              <span className="flex">
                <IoLockClosedOutline className="mr-4 flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 " />{' '}
                Change password
              </span>
              <MdKeyboardArrowRight className="w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 " />
            </Link>
          </li>
          <li className="">
            <Link
              onClick={() => setIsSideBarOpen(false)}
              className="border-t border-gray-200   flex justify-between p-4 text-gray-900 rounded-lg  hover:bg-gray-100  group"
              to="adresses"
            >
              <span className="flex">
                <LuHouse className="mr-4 flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 " />{' '}
                Adresses
              </span>
              <MdKeyboardArrowRight className="w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 " />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
