import { motion } from 'framer-motion';
import React from 'react';
import { FaUser, FaShoppingCart, FaTag, FaList, FaBox } from 'react-icons/fa';

export default function OverviewCards({ stats }) {
  const cards = [
    { label: 'Total Users', value: stats.totalUsers, icon: <FaUser />, color: 'bg-blue-500' },
    {
      label: 'Total Orders',
      value: stats.totalOrders,
      icon: <FaShoppingCart />,
      color: 'bg-green-500',
    },
    { label: 'Active Coupons', value: stats.totalCoupons, icon: <FaTag />, color: 'bg-yellow-500' },
    {
      label: 'Total Categories',
      value: stats.totalCategories,
      icon: <FaList />,
      color: 'bg-purple-500',
    },
    { label: 'Total Products', value: stats.totalProducts, icon: <FaBox />, color: 'bg-pink-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {cards.map((item, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.08 }}
          className={`p-5 text-white rounded-xl shadow-md ${item.color} flex items-center space-x-4 transition-all duration-300`}
        >
          <div className="text-3xl">{item.icon}</div>
          <div>
            <p className="text-lg font-semibold">{item.label}</p>
            <p className="text-2xl font-bold">{item.value}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
