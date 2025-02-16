export default function FilterBySkeleton() {
  return (
    <div className="flex flex-col gap-2 p-6 border-2 rounded-lg mb-10 animate-pulse">
      <div className="h-6 w-32 bg-gray-300 rounded-md" />
      <div className="h-10 bg-gray-300 rounded-md" />
      <div className="flex justify-between mt-3">
        <div className="h-10 w-20 bg-gray-300 rounded-md" />
        <div className="h-10 w-20 bg-gray-300 rounded-md" />
      </div>
      <div className="flex justify-between mt-4">
        <div className="h-10 w-28 bg-gray-300 rounded-md" />
        <div className="h-10 w-28 bg-gray-300 rounded-md" />
      </div>
    </div>
  );
}
