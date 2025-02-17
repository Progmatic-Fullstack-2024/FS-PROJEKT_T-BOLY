import { Outlet } from 'react-router-dom';

import Nav from './Nav';

export default function UserProfile() {
  return (
    <div className="flex">
      <Nav />
      <div className="grow py-8 px-4">
        <Outlet />
      </div>
    </div>
  );
}
