import DeleteUserModal from './DeleteUserModal';
import EditUserRole from './EditUserRole.jsx';

export default function UserRow({ user, onDelete }) {
  return (
    <tr className="border-b dark:border-gray-600 hover:bg-orange-200">
      <td className="px-4 py-3">
        {user.firstName} {user.lastName}
      </td>
      <td className="px-4 py-3 hidden md:table-cell">{user.email}</td>
      <td className="px-4 py-3">
        <EditUserRole user={user} />
      </td>
      <td className="px-4 py-3">{new Date(user.registrationDate).toLocaleDateString()}</td>
      <td className="px-4 py-3">
        <div className="flex space-x-2">
          <DeleteUserModal user={user} onDelete={onDelete} />
        </div>
      </td>
    </tr>
  );
}
