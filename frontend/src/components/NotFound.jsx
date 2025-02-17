import { Link } from 'react-router-dom';

import TBoly from '../assets/t-boly-orange.png';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-100 dark:bg-gray-800">
      <img src={TBoly} alt="not-found" className="w-96 mb-20" />
      <h1 className="text-5xl font-bold text-primary dark:text-orange-400">404 - Not Found</h1>
      <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        to="/"
        className="mt-12 px-6 py-3 bg-orange-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-orange-600 dark:bg-orange-400 dark:hover:bg-orange-500 transition"
      >
        Go back to Home
      </Link>
    </div>
  );
}
