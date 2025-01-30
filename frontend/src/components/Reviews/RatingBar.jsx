

export default function RatingBar({ label, percentage, count }) {
  return (
    <div className="flex items-center space-x-4 w-full ">
      <span className="text-sm text-gray-600 ">{label} </span>
      <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${percentage}%` }} />
      </div>
      <span className="text-sm text-gray-600">{count.toLocaleString()}</span>
    </div>
  );
}
