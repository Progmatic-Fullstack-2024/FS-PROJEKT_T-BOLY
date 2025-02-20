export default function ProductsGridSkeleton() {
  return (
    <div className="flex flex-wrap gap-2 2xl:gap-8 md:justify-between shrink-0 hover:border-gray-900 dark:hover:border-white dark:bg-gray-700 dark:border-primary">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="flex flex-col gap-2 w-72 2xl:w-80 animate-pulse mb-6">
          <div className="w-72 h-72 2xl:w-80 2xl:h-80 bg-gray-200 rounded-xl" />
          <div className="h-5 w-3/4 bg-gray-200 rounded" />
          <div className="h-5 w-1/2 bg-gray-200 rounded" />
          <div className="h-4 w-40 bg-gray-200 rounded" />
        </div>
      ))}
    </div>
  );
}
