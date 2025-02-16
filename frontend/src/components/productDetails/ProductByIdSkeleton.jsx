export default function ProductByIdSkeleton() {
  return (
    <div className="animate-pulse mt-20 mb-32 md:mr-60 md:ml-60 mr-6 ml-6">
      <div className="md:flex gap-2 md:mb-28 mb-10">
        <div className="h-8 w-48 bg-gray-300 rounded-md" />
        <div className="h-8 w-32 bg-gray-400 rounded-md" />
      </div>
      <div className="flex flex-col md:flex-row justify-between md:gap-32 gap-6">
        <div className="h-96 w-96 bg-gray-300 rounded-xl" />
        <div className="flex flex-col gap-8 md:w-2/3 md:h-2/3 md:items-start items-center">
          <div className="h-10 w-60 bg-gray-300 rounded-md" />
          <div className="h-8 w-24 bg-gray-400 rounded-md" />
          <div className="h-6 w-40 bg-gray-300 rounded-md" />
          <div className="h-20 w-full bg-gray-200 rounded-md" />
          <div className="flex gap-4">
            <div className="h-12 w-32 bg-gray-300 rounded-md" />
            <div className="h-12 w-32 bg-gray-400 rounded-md" />
          </div>
        </div>
      </div>
      <div className="animate-pulse mt-10 p-6 border-2 rounded-lg">
        <div className="flex justify-center gap-6 mb-4">
          <div className="h-8 w-32 bg-gray-300 rounded-md" />
          <div className="h-8 w-32 bg-gray-300 rounded-md" />
        </div>
        <div className="h-4 w-full bg-gray-300 rounded-md mb-2" />
        <div className="h-4 w-5/6 bg-gray-300 rounded-md mb-2" />
        <div className="h-4 w-3/4 bg-gray-300 rounded-md mb-2" />
        <div className="h-4 w-2/3 bg-gray-300 rounded-md" />
      </div>
    </div>
  );
}
