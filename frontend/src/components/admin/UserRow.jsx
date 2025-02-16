import DeleteUserModal from './DeleteUserModal';
import EditUserRole from './EditUserRole.jsx';

export default function UserRow({ user, onDelete }) {
  return (
    <tr className="border-b dark:border-gray-600 hover:bg-orange-200 dark:bg-gray-700">
      <td className="px-4 py-3 dark:text-primary">
        {user.firstName} {user.lastName}
      </td>
      <td className="px-4 py-3 hidden md:table-cell dark:text-primary">{user.email}</td>
      <td className="px-4 py-3 dark:text-primary">
        <EditUserRole user={user} />
      </td>
      <td className="px-4 py-3 dark:text-primary">{new Date(user.registrationDate).toLocaleDateString()}</td>
      <td className="px-4 py-3 text-center">
        <DeleteUserModal user={user} onDelete={onDelete} />
      </td>
    </tr>
  );
}
