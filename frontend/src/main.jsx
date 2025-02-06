import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import OrdersTable from './components/admin/OrdersTable.jsx';
import Overview from './components/admin/Overview.jsx';
import ProductsTable from './components/admin/ProductsTable.jsx';
import UserTable from './components/admin/UserTable.jsx';
import CheckOut from './components/checkOut/CheckOut.jsx';
import MemberRoute from './components/MemberRoute.jsx';
import ProductById from './components/productDetails/ProductById.jsx';
import ProductsByCategory from './components/products/ProductsByCategory.jsx';
import './index.css';
import Adresses from './components/profilePage/Adresses.jsx';
import Orders from './components/profilePage/Orders.jsx';
import PassChange from './components/profilePage/PassChange.jsx';
import PersonalData from './components/profilePage/PersonalData.jsx';
import Wishlist from './components/profilePage/Wishlist.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import ShoppingCart from './components/shoppingCart/ShoppingCart.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { CartProvider } from './contexts/CartContext.jsx';
import { WishlistProvider } from './contexts/WishlistContext.jsx';
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
      {
        path: '/shoppingCart',
        element: (
          <MemberRoute>
            <ShoppingCart />
          </MemberRoute>
        ),
      },
      {
        path: '/checkOut',
        element: (
          <MemberRoute>
            <CheckOut />
          </MemberRoute>
        ),
      },
      {
        path: '/profile_page',
        element: (
          <MemberRoute>
            <ProfilePage />
          </MemberRoute>
        ),
        children: [
          { path: 'adresses', element: <Adresses /> },
          { path: 'orders', element: <Orders /> },
          { path: 'personal_data', element: <PersonalData /> },
          { path: 'wishlist', element: <Wishlist /> },
          { path: 'change_password', element: <PassChange /> },
        ],
      },
    ],
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '',
        element: <Overview />,
      },
      {
        path: 'products',
        element: <ProductsTable />,
      },
      {
        path: 'users',
        element: <UserTable />,
      },
      {
        path: 'orders',
        element: <OrdersTable />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <CartProvider>
      <WishlistProvider>
        <RouterProvider router={router} />
      </WishlistProvider>
    </CartProvider>
  </AuthProvider>,
);
