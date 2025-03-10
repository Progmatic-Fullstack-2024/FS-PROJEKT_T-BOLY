import { useSearchParams } from 'react-router-dom';

export default function SelectRoleInput() {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedRole = searchParams.get('filterByRole') || 'all';

  const handleRoleChange = (event) => {
    if (event.target.value === '') {
      searchParams.delete('filterByRole');
    } else searchParams.set('filterByRole', event.target.value);
    setSearchParams(searchParams);
  };

  return (
    <div className="flex flex-col ">
      <select
        value={selectedRole}
        onChange={handleRoleChange}
        className="w-60 p-2 px-4 py-2 text-sm font-medium text-black rounded-lg bg-primary-700 bg-opacity-50 border border-gray-400 "
      >
        <option className={selectedRole === '' ? 'text-primary' : ''} value="">
          All Roles
        </option>
        {['GUEST', 'USER', 'ADMIN'].map((role) => (
          <option
            className={selectedRole === role ? 'text-primary' : 'text-gray-600'}
            key={role}
            value={role}
          >
            {role}
          </option>
        ))}
      </select>
    </div>
  );
}
