import prisma from "../models/prismaClient.js";
import HttpError from "../utils/HttpError.js";

const getAllOrders = async () => {
  const orders = await prisma.order.findMany({
    include: {
      user: {
        select: { firstName: true, lastName: true, email: true, adress: true },
      },
      products: {
        include: { product: { select: { name: true, pictureUrl: true } } },
      },
    },
  });
  return orders;
};

const getOrderById = async (id) => {
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      user: {
        select: { firstName: true, lastName: true, email: true, adress: true },
      },
      products: {
        include: { product: { select: { name: true, pictureUrl: true } } },
      },
    },
  });

  if (!order) throw new HttpError("This order does not exist", 403);
  return order;
};

const getOrdersByUserId = async (userId) => {
  const orders = await prisma.order.findMany({
    where: { userId },
  });

  return orders;
};

const createOrder = async (userId, totalPrice) => {
  console.log("totalprice", totalPrice);
  const newOrder = await prisma.order.create({
    data: { userId, totalPrice },
  });
  return newOrder;
};

const updateOrder = async (id, status) => {
  const order = await getOrderById(id);
  console.log(status);
  if (!order) throw new HttpError("Order not found", 404);
  const updatedOrder = await prisma.order.update({
    where: { id },
    data: { status },
  });
  return updatedOrder;
};

const destroyOrder = async (id, status) => {
  const order = await getOrderById(id);
  if (!order) throw new HttpError("Order not found", 404);
  const canceledOrder = prisma.order.update({
    where: { id },
    data: { status },
  });
  return canceledOrder;
};

export default {
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
  createOrder,
  updateOrder,
  destroyOrder,
};
