import prisma from "../models/prismaClient.js";

const getAllOrderItemsByOrderId = async (orderId) => {
  const orderItems = await prisma.orderItem.findMany({ where: { orderId } });
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
