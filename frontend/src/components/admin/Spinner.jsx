import { AiOutlineLoading } from 'react-icons/ai';

export default function Spinner() {
  return (
    <div className="flex items-center justify-center" role="status">
      <AiOutlineLoading className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600" />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
