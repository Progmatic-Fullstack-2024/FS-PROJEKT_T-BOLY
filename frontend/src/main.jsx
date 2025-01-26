import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import ProductsTable from './components/admin/ProductsTable.jsx';
import UserTable from './components/admin/UserTable.jsx';
import ProductById from './components/productDetails/ProductById.jsx';
import ProductsByCategory from './components/products/ProductsByCategory.jsx';
import './index.css';
import Adresses from './components/profilePage/Adresses.jsx';
import Favorites from './components/profilePage/Favorites.jsx';
import Orders from './components/profilePage/Orders.jsx';
import PassChange from './components/profilePage/PassChange.jsx';
import PersonalData from './components/profilePage/PersonalData.jsx';
import ShoppingCart from './components/shoppingCart/ShoppingCart.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import About from './pages/About.jsx';
import AdminLayout from './pages/AdminLayout.jsx';
import Contacts from './pages/Contact.jsx';
import Homepage from './pages/Homepage';
import ProfilePage from './pages/ProfilePage.jsx';

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
        path: '/products/:productId',
        element: <ProductById />,
      },
      { path: '/shoppingCart', element: <ShoppingCart /> },
      {
        path: '/profile_page',
        element: <ProfilePage />,
        children: [
          { path: 'adresses', element: <Adresses /> },
          { path: 'orders', element: <Orders /> },
          { path: 'personal_data', element: <PersonalData /> },
          { path: 'favorites', element: <Favorites /> },
          { path: 'change_password', element: <PassChange /> },
        ],
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        path: 'products',
        element: <ProductsTable />,
      },
      {
        path: 'users',
        element: <UserTable />,
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        path: 'products',
        element: <ProductsTable />,
      },
      {
        path: 'users',
        element: <UserTable />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>,
);
