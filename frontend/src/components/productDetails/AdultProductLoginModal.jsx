import { useContext } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';

import AuthContext from '../../contexts/AuthContext';

export default function AdultProductLoginModal() {
  const navigate = useNavigate();

  const handleCloser = () => {
    navigate('/products/category/all');
  };
  const { isUserAdult } = useContext(AuthContext);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md dark:bg-gray-700 dark:border-primary dark:border dark:text-primary">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Alert</h2>

          <button
            type="button"
            onClick={handleCloser}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-primary dark:hover:text-white dark:text-primary"
            data-modal-hide="default-modal"
          >
            <RxCross2 className="w-3 h-3 text-current" />
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        {!isUserAdult ? (
          <div className="h-32 p-3 text-center text-2xl">
            You need to be an adult for watch this product!
          </div>
        ) : (
          <div className="h-32 p-3 text-center text-2xl">Please register first or log in!</div>
        )}
        <button
          onClick={handleCloser}
          type="submit"
          className="bg-primary text-white w-full py-2 rounded-lg dark:bg-gray-800 dark:text-primary dark:border-primary dark:border dark:hover:bg-primary dark:hover:text-white"
        >
          {!isUserAdult ? 'I understand' : 'Go to Login'}

          
        </button>
      </div>
    </div>
  );
}
