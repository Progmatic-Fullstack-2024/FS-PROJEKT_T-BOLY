import prisma from "../models/prismaClient.js";

const getAllOrderItemsByOrderId = async (orderId) => {
  const orderItems = await prisma.orderItem.findMany({
    where: { orderId },
    include: { product: { select: { name: true, pictureUrl: true } } },
  });
  return orderItems;
};

const createOrderItem = async (orderId, productId, quantity, price) => {
  const orderItem = prisma.orderItem.create({
    data: { orderId, productId, quantity, price },
  });
  return orderItem;
};

export default {
  getAllOrderItemsByOrderId,
  createOrderItem,
};
