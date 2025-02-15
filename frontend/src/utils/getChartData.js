const getChartData = (stats, activeCategory) => {
  switch (activeCategory) {
    case 'users':
      return stats.users.byRole.map((role) => ({ name: role.role, value: role._count.id }));
    case 'orders':
      return stats.orders.byStatus.map((status) => ({
        name: status.status,
        value: status._count.id,
      }));
    case 'products':
      return stats.products.topSelling.map((product) => ({
        name: product.name,
        value: product._sum.quantity,
      }));
    case 'reviews':
      return stats.reviews.mostReviewed.map((product) => ({
        name: product.name,
        value: product._count.id,
      }));
    case 'revenue':
      return stats.revenue.daily.map((day) => ({
        name: day.date,
        value: day.revenue,
      }));
    default:
      return [];
  }
};

export default getChartData;
