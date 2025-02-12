import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthContext from '../../contexts/AuthContext';

export default function AdultProductLoginModal() {
  const navigate = useNavigate();

  const handleCloser = () => {
    navigate('/products/category/all');
  };
  const { user } = useContext(AuthContext);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Alert</h2>

          <button
            type="button"
            onClick={handleCloser}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="default-modal"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        {user ? (
          <div className="h-32 p-3 text-center text-2xl">
            You need to be an adult for watch this product!
          </div>
        ) : (
          <div className="h-32 p-3 text-center text-2xl">Please register first or log in!</div>
        )}
        <button
          onClick={handleCloser}
          type="submit"
          className="bg-primary text-white w-full py-2 rounded-lg"
        >
          {user ? 'I understand' : 'Go to Login'}
        </button>
      </div>
    </div>
  );
}
