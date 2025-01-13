import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import ProductsByCategory from './components/products/ProductsByCategory.jsx';
import './index.css';
import { AuthProvider } from './contexts/AuthContext.jsx';
import About from './pages/About.jsx';
import Contacts from './pages/Contact.jsx';
import Homepage from './pages/Homepage';
import ProfilePage from './pages/ProfilePage.jsx';
import Adresses from './components/profilePage/Adresses.jsx';
import Orders from './components/profilePage/Orders.jsx';
import PersonalData from './components/profilePage/PersonalData.jsx';
import Favorites from './components/profilePage/Favorites.jsx';
import PassChange from './components/profilePage/PassChange.jsx';

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
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>,
);
