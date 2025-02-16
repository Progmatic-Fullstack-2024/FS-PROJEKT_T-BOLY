export default function NavSkeleton() {
  return (
    <div className="border-2 rounded-lg p-8 pl-6 mb-10 animate-pulse">
      <div className="h-6 w-64 bg-gray-300 rounded-md mb-6" />
      <nav>
        <ul>
          <li className="h-6 w-48 bg-gray-300 rounded-md mb-3" />
          <li className="h-6 w-48 bg-gray-300 rounded-md mb-3" />
          <li className="h-6 w-48 bg-gray-300 rounded-md mb-3" />
          <li className="h-6 w-48 bg-gray-300 rounded-md mb-3" />
          <li className="h-6 w-48 bg-gray-300 rounded-md mb-3" />
          <li className="h-6 w-48 bg-gray-300 rounded-md mb-3" />
          <li className="h-6 w-48 bg-gray-300 rounded-md mb-3" />
          <li className="h-6 w-48 bg-gray-300 rounded-md mb-3" />
          <li className="h-6 w-48 bg-gray-300 rounded-md mb-3" />
        </ul>
      </nav>
    </div>
  );
}
