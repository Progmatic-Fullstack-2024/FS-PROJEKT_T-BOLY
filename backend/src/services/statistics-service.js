import prisma from "../models/prismaClient.js";

const getStatistics = async () => {
  const totalUsers = await prisma.user.count();
  const totalOrders = await prisma.order.count();
  const totalCoupons = await prisma.coupon.count({ where: { isActive: true } });
  const totalCategories = await prisma.category.count();
  const totalProducts = await prisma.product.count();
  const totalRevenue = await prisma.order.aggregate({
    _sum: { totalPrice: true },
  });

  return {
    totalUsers,
    totalOrders,
    totalCoupons,
    totalCategories,
    totalProducts,
    totalRevenue: totalRevenue._sum.totalPrice || 0,
  };
};

export default { getStatistics };
