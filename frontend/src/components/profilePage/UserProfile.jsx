import { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import Nav from './Nav';
import { Outlet } from 'react-router-dom';

export default function UserProfile() {
  const { user } = useContext(AuthContext);
  return (
    <>
      
      <div className="flex ">
        <div>
          <h2>Welcome, {user?.username}</h2>
          <Nav />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
}
