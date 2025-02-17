export default function StatCard({ title, value, subValue, icon, color, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-4 rounded-lg shadow-md text-white cursor-pointer hover:opacity-90 transition-all ${color}`}
    >
      <div className="flex items-center">
        <span className="text-2xl">{icon}</span>
        <div className="ml-3">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-xl font-bold">{value}</p>
          {subValue && <p className="text-sm">{subValue}</p>}
        </div>
      </div>
    </button>
  );
}
