import prisma from "../models/prismaClient.js";

const getAllOrderItemsByOrderId = async (orderId) => {
  const orderItems = await prisma.orderItem.findMany({ where: { orderId } });
  return orderItems;
};

const createOrderItem = async (orderItemData) => {
  const orderItem = prisma.orderItem.create({
    data: { orderItemData },
  });
  return orderItem;
};

export default {
  getAllOrderItemsByOrderId,
  createOrderItem,
};
