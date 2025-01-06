import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Home from "./components/Home.jsx"
import ProductsByCategory from './components/products/ProductsByCategory.jsx';
import AllProducts from './components/products/AllProducts.jsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/products/category/:categoryId',
        element: <ProductsByCategory />,
      },
      {
        path: '/products',
        element: <AllProducts />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={router} />);
