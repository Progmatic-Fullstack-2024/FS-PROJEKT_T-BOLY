import { Outlet } from 'react-router-dom';

import Nav from './Nav';

export default function UserProfile() {
  return (
    <div className="flex">
      <Nav />
      <div className="grow p-8">
        <Outlet />
      </div>
    </div>
  );
}
