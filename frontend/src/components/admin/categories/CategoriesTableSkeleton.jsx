export default function CategoriesTableSkeleton() {
  return (
    <section className="py-3 sm:py-5 animate-pulse">
      <div className="px-4 mx-auto max-w-screen-2xl lg:px-12">
        <div className="overflow-hidden bg-gray-50 bg-opacity-80 shadow-md sm:rounded-lg">
          <div className="relative overflow-hidden bg-gray-50 bg-opacity-80 shadow-md">
            <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between px-4 py-3">
              <div className="h-6 w-48 bg-gray-300 rounded-md" />
              <div className="h-10 w-32 bg-gray-300 rounded-md" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 bg-white">
                <thead className="text-xs text-gray-700 uppercase bg-gray-300">
                  <tr>
                    {Array(5)
                      .fill(0)
                      .map((_, index) => (
                        <th
                          key={index}
                          className="px-4 py-3 bg-gray-400"
                          aria-label="Loading content"
                        />
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {Array(9)
                    .fill(0)
                    .map((_, index) => (
                      <tr key={index} className="border-b h-16 bg-gray-200">
                        <td
                          className="px-4 py-3 h-12 w-12 bg-gray-300 border-b border-gray-400"
                          aria-label="Loading content"
                        />
                        <td
                          className="px-4 py-3 h-6 w-32 bg-gray-300 border-b border-gray-400"
                          aria-label="Loading content"
                        />
                        <td
                          className="px-4 py-3 h-6 w-64 bg-gray-300 border-b border-gray-400"
                          aria-label="Loading content"
                        />
                        <td
                          className="px-4 py-3 h-6 w-24 bg-gray-300 border-b border-gray-400"
                          aria-label="Loading content"
                        />
                        <td
                          className="px-4 py-3 h-6 w-32 bg-gray-300 border-b border-gray-400"
                          aria-label="Loading content"
                        />
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-primary bg-opacity-20 flex items-center justify-between p-8">
            <div className="h-6 w-48 bg-gray-300 rounded-md" />
            <div className="h-6 w-32 bg-gray-300 rounded-md" />
          </div>
        </div>
      </div>
    </section>
  );
}
