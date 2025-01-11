import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Footer from './components/footer/Footer';
import Header from './components/header/Header';

export default function App() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="grow">
        <Outlet />
      </div>
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
      <Footer/>
    </div>
  );
}
