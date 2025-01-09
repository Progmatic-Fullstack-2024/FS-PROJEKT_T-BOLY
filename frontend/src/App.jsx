import { Outlet } from 'react-router-dom';

import CategoryButtons from './components/categoryButtons/CategoryButtons';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';

export default function App() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="grow">
        <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Find the Perfect Toy</h1>
        <p style={{ textAlign: 'center', marginBottom: '20px' }}>Our Collections</p>
        <CategoryButtons />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
