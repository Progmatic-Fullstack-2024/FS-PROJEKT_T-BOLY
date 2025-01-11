import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


import App from './App';
import Home from './components/Home.jsx';
import ProductsByCategory from './components/products/ProductsByCategory.jsx';
import './index.css';
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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={router} />);
