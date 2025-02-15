export default function FilterByAgeSkeleton() {
  return (
    <div className="flex flex-wrap gap-8 justify-between md:mr-44">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="flex flex-col gap-4 w-80 animate-pulse">
          <div className="h-80 w-80 bg-gray-200 rounded-xl" />
          <div className="h-6 w-3/4 bg-gray-200 rounded" />
          <div className="h-6 w-1/2 bg-gray-200 rounded" />
          <div className="h-5 w-40 bg-gray-200 rounded" />
        </div>
      ))}
    </div>
  );
}
