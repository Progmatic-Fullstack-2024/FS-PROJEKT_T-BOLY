import React, { useState } from 'react';
import { toast } from 'react-toastify';

import userService from '../../services/userService.js';

export default function EditUserRole({ user }) {
  const [role, setRole] = useState(user.role);

  const handleChange = async (event) => {
    const newRole = event.target.value;
    setRole(newRole);
    try {
      await userService.updateUser(user.id, { ...user, role: newRole });
      toast.success(`Role updated to ${newRole} for ${user.firstName} ${user.lastName}`);
    } catch (error) {
      toast.error('Failed to update role');
      setRole(user.role);
    }
  };

  return (
    <select
      value={role}
      onChange={handleChange}
      className="border border-gray-300 rounded p-1 bg-white dark:bg-gray-800 dark:border-primary"
    >
      <option value="GUEST">Guest</option>
      <option value="USER">User</option>
      <option value="ADMIN">Admin</option>
    </select>
  );
}
