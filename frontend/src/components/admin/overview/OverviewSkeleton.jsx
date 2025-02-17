export default function OverviewSkeleton() {
  return (
    <div className="animate-pulse p-6">
      <h1 className="text-3xl font-bold mb-6">📊 Admin Dashboard</h1>

      <div className="grid grid-cols-5 gap-4 mb-6">
        <div className="h-28 bg-blue-300 rounded-md" />
        <div className="h-28 bg-green-300 rounded-md" />
        <div className="h-28 bg-yellow-300 rounded-md" />
        <div className="h-28 bg-purple-300 rounded-md" />
        <div className="h-28 bg-pink-300 rounded-md" />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="h-96 bg-gray-300 rounded-md" />
        <div className="h-96 bg-gray-300 rounded-md" />
      </div>
    </div>
  );
}
