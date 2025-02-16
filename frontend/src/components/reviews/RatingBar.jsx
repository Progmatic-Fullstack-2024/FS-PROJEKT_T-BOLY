import { useSearchParams } from 'react-router-dom';

export default function RatingBar({ label, percentage, count, selectedBar }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleRateSorting = () => {
    searchParams.delete('rating');

    searchParams.set('rating', label);
    setSearchParams(searchParams);
  };

  return (
    <div className="flex items-center space-x-4 w-full ">
      <span className="text-sm text-gray-600 ">{label} </span>
      <button
        type="button"
        className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden hover:border hover:bg-gradient-to-r from-yellow-100 to-yellow-500 hover:cursor-pointer"
        onClick={handleRateSorting}
        aria-label="Button"
      >
        <div
          className={`h-2 rounded-full ${label === selectedBar ? 'bg-primary' : 'bg-yellow-500'}`}
          style={{ width: `${percentage}%` }}
        />
      </button>
      <span className="text-sm text-gray-600">{count.toLocaleString()}</span>
    </div>
  );
}
