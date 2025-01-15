import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import CreateProductByAdmin from './components/products/CreateProductByAdmin.jsx'
import ProductsByCategory from './components/products/ProductsByCategory.jsx';
import './index.css';
import { AuthProvider } from './contexts/AuthContext.jsx';
import About from './pages/About.jsx';
import Contacts from './pages/Contact.jsx';
import Homepage from './pages/Homepage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Homepage />,
      },
      {
        path: '/contact',
        element: <Contacts />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/products/category/:categoryId',
        element: <ProductsByCategory />,
      },
      {
        path: '/admin/createproduct',
        element: <CreateProductByAdmin />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>,
);
