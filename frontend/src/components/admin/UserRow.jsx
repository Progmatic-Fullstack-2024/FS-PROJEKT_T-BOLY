import DeleteUserModal from './DeleteUserModal';

export default function UserRow({ user }) {
    return (
      <tr className="border-b dark:border-gray-600 hover:bg-orange-200">
        <td className="px-4 py-3">{user.name}</td>
        <td className="px-4 py-3 hidden md:table-cell">{user.email}</td>
        <td className="px-4 py-3">{user.role}</td>
        <td className="px-4 py-3">{new Date(user.createdAt).toLocaleDateString()}</td>
        <td className="px-4 py-3">
          <div className="flex space-x-2">
            <DeleteUserModal user={user} />
          </div>
        </td>
      </tr>
    );
  }