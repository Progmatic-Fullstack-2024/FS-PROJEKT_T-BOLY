export default function UsersTableSkeleton() {
    return (
      <div className="p-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex items-center justify-between p-4 border rounded-lg shadow-sm animate-pulse">
            <div className="h-6 w-32 bg-gray-200 rounded" />
            <div className="h-6 w-48 bg-gray-200 rounded hidden md:block" />
            <div className="h-6 w-24 bg-gray-200 rounded" />
            <div className="h-6 w-20 bg-gray-200 rounded" />
            <div className="h-6 w-12 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    );
  }