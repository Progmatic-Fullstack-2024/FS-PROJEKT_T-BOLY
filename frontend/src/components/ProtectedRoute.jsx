import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthContext from '../contexts/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user || user.role !== 'ADMIN') {
    return (
      <div className="flex items-center justify-center h-screen bg-primary-light">
        <div className="max-w-xl w-full p-10 bg-white rounded-2xl shadow-xl text-center border border-gray-200">
          <h1 className="text-3xl font-extrabold text-primary mb-6">Access Denied</h1>
          <p className="text-lg text-gray-700 mb-8">
            You do not have permission to access this page.
          </p>
          <p className="text-lg text-gray-700 mb-8">
            Please contact an administrator if you believe this is a mistake.
          </p>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="w-full px-6 py-3 bg-primary text-white text-lg font-semibold rounded-lg shadow hover:bg-primary-dark transition border-2 border-primary hover:border-gray-900 hover:text-gray-900"
          >
            Go Back to Home
          </button>
        </div>
      </div>
    );
  }

  return children;
}
