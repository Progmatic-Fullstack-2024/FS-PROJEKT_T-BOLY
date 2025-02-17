/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { IoStatsChart } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import OverviewSkeleton from './OverviewSkeleton';
import StatCard from './StatCard';
import statisticsService from '../../../services/statisticsService';
import getChartData from '../../../utils/getChartData';

export default function Overview() {
  const [stats, setStats] = useState(null);
  const [activeCategory, setActiveCategory] = useState('users');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      setIsLoading(true);
      try {
        const data = await statisticsService.getStatistics();
        setStats(data);
      } catch (err) {
        toast.error('Error fetching statistics:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (!stats || isLoading) return <OverviewSkeleton />;

  return (
    <div className="p-5">
      <h1 className="flex items-center gap-4 text-3xl font-bold mb-6  dark:text-primary">
        <IoStatsChart className="text-primary" />
        Admin Dashboard
      </h1>

      {/* Clickable Overview Cards */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <StatCard
          title="Total Users"
          value={stats.users.total}
          icon="👤"
          color="bg-blue-500"
          onClick={() => setActiveCategory('users')}
        />
        <StatCard
          title="Total Orders"
          value={stats.orders.total}
          icon="🛒"
          color="bg-green-500"
          onClick={() => setActiveCategory('orders')}
        />
        <StatCard
          title="Total Products"
          value={stats.products.total}
          subValue={`${stats.products.outOfStock} out of stock`}
          icon="📦"
          color="bg-yellow-500"
          onClick={() => setActiveCategory('products')}
        />
        <StatCard
          title="Total Revenue"
          value={`€${stats.orders.totalRevenue.toFixed(2)}`}
          subValue={`Avg Order: €${stats.orders.avgOrderValue.toFixed(2)}`}
          icon="💰"
          color="bg-purple-500"
          onClick={() => setActiveCategory('revenue')}
        />
        <StatCard
          title="Total Reviews"
          value={stats.reviews.total}
          subValue="Click for rating breakdown"
          icon="⭐"
          color="bg-pink-500"
          onClick={() => setActiveCategory('reviews')}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white bg-opacity-50 dark:bg-gray-800 dark:text-primary hover:bg-opacity-60 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">
            📈 {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Overview
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={getChartData(stats, activeCategory)} barSize={50}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white bg-opacity-50 dark:bg-gray-800 dark:text-primary hover:bg-opacity-60 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">
            📊 {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Tooltip />
              <Legend />
              <Pie
                data={getChartData(stats, activeCategory)}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {getChartData(stats, activeCategory).map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#FFBB28'][index % 5]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Most Ordered Products List (Orders Section) */}
      {activeCategory === 'orders' && (
        <div className="bg-white bg-opacity-80 dark:bg-gray-800 dark:text-primary p-4 rounded-lg shadow-md mt-6">
          <h2 className="text-lg font-semibold mb-4">📦 Most Ordered Products</h2>
          <ul className="space-y-2">
            {stats.orders.mostOrdered.map((product) => (
              <li key={product.productId} className="flex justify-between border-b pb-2">
                <Link
                  to={`/products/${product.productId}`}
                  className="text-primary hover:underline"
                >
                  {product.name}
                </Link>
                <span className="font-bold">{product._count.orderId} Orders</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Highest Value Orders List (Revenue Section) */}
      {activeCategory === 'revenue' && (
        <div className="bg-white bg-opacity-80 dark:bg-gray-800 dark:text-primary hover:bg-opacity-60 p-4 rounded-lg shadow-md mt-6">
          <h2 className="text-lg font-semibold mb-4">💰 Highest Value Orders</h2>
          <ul className="space-y-2">
            {stats.revenue.highestOrders.map((order) => (
              <li key={order.id} className="flex justify-between border-b pb-2">
                <span>Order #{order.id}</span>
                <span className="font-bold">€{order.totalPrice.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Top Selling Products List */}
      {activeCategory === 'products' && (
        <div className="bg-white bg-opacity-80 dark:bg-gray-800 dark:text-primary hover:bg-opacity-60 p-4 rounded-lg shadow-md mt-6">
          <h2 className="text-lg font-semibold mb-4">🏆 Bestselling Products</h2>
          <ul className="space-y-2">
            {stats.products.topSelling.map((product) => (
              <li key={product.productId} className="flex justify-between border-b pb-2">
                <Link
                  to={`/products/${product.productId}`}
                  className="text-primary hover:underline"
                >
                  {product.name}
                </Link>
                <span className="font-bold">{product._sum.quantity} sold</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Most Reviewed Products List */}
      {activeCategory === 'reviews' && (
        <div className="bg-white bg-opacity-80 dark:bg-gray-800 dark:text-primary hover:bg-opacity-60 p-4 rounded-lg shadow-md mt-6">
          <h2 className="text-lg font-semibold mb-4">📝 Most Reviewed Products</h2>
          <ul className="space-y-2">
            {stats.reviews.mostReviewed.map((product) => (
              <li key={product.productId} className="flex justify-between border-b pb-2">
                <Link
                  to={`/products/${product.productId}`}
                  className="text-primary hover:underline"
                >
                  {product.name}
                </Link>
                <span className="font-bold">
                  {product._count.id} reviews | ⭐ {product._avg.rating.toFixed(1)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
