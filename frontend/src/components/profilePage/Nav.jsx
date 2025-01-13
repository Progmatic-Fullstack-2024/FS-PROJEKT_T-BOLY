import { Link } from 'react-router-dom';
import { BsBoxSeam } from 'react-icons/bs';
import { IoIosHeartEmpty } from 'react-icons/io';
import { VscAccount } from 'react-icons/vsc';
import { IoLockClosedOutline } from 'react-icons/io5';
import { LuHouse } from 'react-icons/lu';
import { MdKeyboardArrowRight } from 'react-icons/md';
export default function Nav() {
  return (
    <nav className="h-full px-4 py-4 overflow-y-auto p-8">
      <h1 className="space-y-2 font-medium">My account</h1>
      <ul className="space-y-4 font-medium">
        <li className='mt-4'>
          <Link
            className=" flex justify-between  p-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            to="orders"
          >
            <span className="flex ">
              <BsBoxSeam className="mr-4 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              Orders
            </span>
            <MdKeyboardArrowRight className="ml-28 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
          </Link>
        </li>
        <li className=''>
          <Link
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
        <li className=''>
          <Link
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
        <li className=''>
          <Link
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
        <li className=''>
          <Link
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
  );
}
