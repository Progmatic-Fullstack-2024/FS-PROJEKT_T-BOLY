import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import CategoriesTable from './components/admin/categories/CategoriesTable.jsx';
import CouponsTable from './components/admin/coupons/CouponsTable.jsx';
import OrdersTable from './components/admin/orders/OrdersTable.jsx';
import Overview from './components/admin/overview/Overview.jsx';
import ProductsTable from './components/admin/products/ProductsTable.jsx';
import UserTable from './components/admin/users/UserTable.jsx';
import Payment from './components/checkOut/Payment.jsx';
import MemberRoute from './components/MemberRoute.jsx';
import NotFound from './components/NotFound.jsx';
import ProductById from './components/productDetails/ProductById.jsx';
import ProductsByCategory from './components/products/ProductsByCategory.jsx';
import './index.css';
import Addresses from './components/profilePage/Addresses.jsx';
import Orders from './components/profilePage/Orders.jsx';
import PassChange from './components/profilePage/PassChange.jsx';
import PersonalData from './components/profilePage/PersonalData.jsx';
import Wishlist from './components/profilePage/Wishlist.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import ShoppingCart from './components/shoppingCart/ShoppingCart.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { CartProvider } from './contexts/CartContext.jsx';
import { LanguageProvider } from './contexts/LanguageContext.jsx';
import ThemeProvider from './contexts/ThemeContext.jsx';
import { WishlistProvider } from './contexts/WishlistContext.jsx';
import About from './pages/About.jsx';
import AdminLayout from './pages/AdminLayout.jsx';
import Contacts from './pages/Contact.jsx';
import Homepage from './pages/Homepage';
import ProfilePage from './pages/ProfilePage.jsx';
import './i18n';

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
            <Payment />
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
          { path: 'addresses', element: <Addresses /> },
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
      {
        path: '/admin/categories',
        element: <CategoriesTable />,
      },
      {
        path: '/admin/coupons',
        element: <CouponsTable />,
      },
    ],
  },
  { path: '*', element: <NotFound /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <LanguageProvider>
    <AuthProvider>
      <ThemeProvider>
        <CartProvider>
          <WishlistProvider>
            <RouterProvider router={router} />
          </WishlistProvider>
        </CartProvider>
      </ThemeProvider>
    </AuthProvider>
  </LanguageProvider>,
);
