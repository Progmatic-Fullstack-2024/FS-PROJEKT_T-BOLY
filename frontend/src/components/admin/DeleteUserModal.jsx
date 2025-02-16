import { useState } from 'react';
import { BiInfoCircle } from 'react-icons/bi';
import { FiTrash } from 'react-icons/fi';
import { RxCross2 } from 'react-icons/rx';

export default function DeleteUserModal({ user, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)} type="button" className="h-full text-red-500">
        <FiTrash />
      </button>
      {isOpen && (
        <div
          id="popup-modal"
          tabIndex="-1"
          className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="bg-white rounded-lg shadow items-center relative w-full max-w-md max-h-full">
            <div className="relative bg-primary bg-opacity-50 rounded-lg shadow dark:bg-gray-800 dark:border-primary dark:border">
              <button
                type="button"
                className="absolute top-3 end-2.5 text-gray-40 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-primary dark:hover:text-white dark:text-primary"
                onClick={() => setIsOpen(false)}
              >
                <RxCross2 className="w-3 h-3 text-current" />
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <BiInfoCircle className="mx-auto mb-4 text-red-600 w-12 h-12" />
                <h3 className="mb-5 text-lg font-normal text-gray-50 dark:text-primary">
                  Are you sure you want to delete {user.username}?
                </h3>
                <button
                  onClick={() => onDelete(user.id)}
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  Yes, Im sure
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:bg-gray-700 dark:text-primary dark:border-primary dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
