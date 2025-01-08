import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Header from './components/header/Header';

export default function App() {
  return (
    <div>
      <Header />
      <Outlet />
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
