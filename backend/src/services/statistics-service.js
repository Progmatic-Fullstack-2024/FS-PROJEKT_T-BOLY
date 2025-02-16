/* eslint-disable no-underscore-dangle */
import { subDays, format } from "date-fns";
import prisma from "../models/prismaClient.js";

const getAdminStatistics = async () => {
  const totalUsers = await prisma.user.count();
  const activeUsers = await prisma.user.count({ where: { isActive: true } });
  const usersByRole = await prisma.user.groupBy({
    by: ["role"],
    _count: { id: true },
  });

  const totalOrders = await prisma.order.count();
  const ordersByStatus = await prisma.order.groupBy({
    by: ["status"],
    _count: { id: true },
  });

  const totalRevenue = await prisma.order.aggregate({
    _sum: { totalPrice: true },
  });
  const avgOrderValue = await prisma.order.aggregate({
    _avg: { totalPrice: true },
  });

  const highestValueOrders = await prisma.order.findMany({
    orderBy: { totalPrice: "desc" },
    take: 5,
    select: { id: true, totalPrice: true, userId: true },
  });

  const totalProducts = await prisma.product.count();
  const outOfStockProducts = await prisma.product.count({
    where: { quantity: 0 },
  });

  const topSellingProducts = await prisma.orderItem.groupBy({
    by: ["productId"],
    _sum: { quantity: true },
    orderBy: { _sum: { quantity: "desc" } },
    take: 5,
  });

  const productIds = topSellingProducts.map((p) => p.productId);
  const productNames = await prisma.product.findMany({
    where: { id: { in: productIds } },
    select: { id: true, name: true },
  });

  const topSellingProductsWithNames = topSellingProducts.map((p) => ({
    ...p,
    name:
      productNames.find((prod) => prod.id === p.productId)?.name ||
      "Unknown Product",
  }));

  const mostOrderedProducts = await prisma.orderItem.groupBy({
    by: ["productId"],
    _count: { orderId: true },
    orderBy: { _count: { orderId: "desc" } },
    take: 5,
  });

  const mostOrderedProductNames = await prisma.product.findMany({
    where: { id: { in: mostOrderedProducts.map((p) => p.productId) } },
    select: { id: true, name: true },
  });

  const mostOrderedProductsWithNames = mostOrderedProducts.map((p) => ({
    ...p,
    name:
      mostOrderedProductNames.find((prod) => prod.id === p.productId)?.name ||
      "Unknown Product",
  }));

  const mostReviewedProducts = await prisma.review.groupBy({
    by: ["productId"],
    _count: { id: true },
    _avg: { rating: true },
    orderBy: { _count: { id: "desc" } },
    take: 5,
  });

  const reviewProductNames = await prisma.product.findMany({
    where: { id: { in: mostReviewedProducts.map((p) => p.productId) } },
    select: { id: true, name: true },
  });

  const mostReviewedProductsWithNames = mostReviewedProducts.map((p) => ({
    ...p,
    name:
      reviewProductNames.find((prod) => prod.id === p.productId)?.name ||
      "Unknown Product",
  }));

  const last7Days = [...Array(7)].map((_, i) => {
    const date = subDays(new Date(), i);
    return { date: format(date, "yyyy-MM-dd") };
  });

  const dailyRevenue = await prisma.order.groupBy({
    by: ["createdAt"],
    _sum: { totalPrice: true },
    where: { createdAt: { gte: subDays(new Date(), 7) } },
  });

  const dailyRevenueFormatted = last7Days.map((day) => {
    const found = dailyRevenue.find(
      (d) => format(d.createdAt, "yyyy-MM-dd") === day.date,
    );
    return {
      date: day.date,
      revenue: found ? found._sum.totalPrice : 0,
    };
  });

  const revenueByStatus = await prisma.order.groupBy({
    by: ["status"],
    _sum: { totalPrice: true },
  });

  const revenueByStatusFormatted = revenueByStatus.map((status) => ({
    name: status.status,
    value: status._sum.totalPrice || 0,
  }));

  return {
    users: { total: totalUsers, active: activeUsers, byRole: usersByRole },
    orders: {
      total: totalOrders,
      byStatus: ordersByStatus,
      totalRevenue: totalRevenue._sum.totalPrice || 0,
      avgOrderValue: avgOrderValue._avg.totalPrice || 0,
      mostOrdered: mostOrderedProductsWithNames,
    },
    products: {
      total: totalProducts,
      outOfStock: outOfStockProducts,
      topSelling: topSellingProductsWithNames,
    },
    revenue: {
      highestOrders: highestValueOrders,
      daily: dailyRevenueFormatted,
      byStatus: revenueByStatusFormatted,
    },
    reviews: {
      total: await prisma.review.count(),
      stars: await prisma.review
        .groupBy({
          by: ["rating"],
          _count: { id: true },
        })
        .then((data) =>
          data.reduce((acc, curr) => {
            acc[curr.rating] = curr._count.id;
            return acc;
          }, {}),
        ),
      mostReviewed: mostReviewedProductsWithNames,
    },
  };
};

export default { getAdminStatistics };
