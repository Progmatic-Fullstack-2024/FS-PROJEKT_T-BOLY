import { BarChart, Bar, PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function OverviewCharts({ stats }) {
  const barData = [
    { name: "Users", value: stats.totalUsers || 0 },
    { name: "Orders", value: stats.totalOrders || 0 },
    { name: "Coupons", value: stats.totalCoupons || 0 },
    { name: "Categories", value: stats.totalCategories || 0 },
    { name: "Products", value: stats.totalProducts || 0 },
  ];

  const pieData = [
    { name: "Users", value: stats.totalUsers },
    { name: "Orders", value: stats.totalOrders },
    { name: "Coupons", value: stats.totalCoupons },
    { name: "Categories", value: stats.totalCategories },
    { name: "Products", value: stats.totalProducts },
  ];

  const COLORS = ["#ff6b6b", "#4c51bf", "#f6ad55", "#48bb78", "#4299e1"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
      <div className="bg-white p-8 shadow-lg rounded-xl">
        <h3 className="text-xl font-bold mb-4 flex items-center">
        🌚 <span className="ml-2">Statistics Overview</span>
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={barData}>
            <Tooltip />
            <Bar dataKey="value" fill="#6366f1" barSize={400} radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-8 shadow-lg rounded-xl">
        <h3 className="text-xl font-bold mb-4 flex items-center">
        🌝 <span className="ml-2">Category Distribution</span>
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Tooltip />
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
