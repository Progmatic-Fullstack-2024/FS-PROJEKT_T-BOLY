import prisma from "../models/prismaClient.js";
import HttpError from "../utils/HttpError.js";

const getAllOrders = async (sorting, order, table, page, limit, search) => {
  const where = search && { AND: [] };

  if (search && search.trim() && search !== undefined) {
    where.AND.push({
      OR: [
        {
          totalPrice: {
            equals: Number(search) ? parseFloat(search) : undefined,
          },
        },
        {
          user: {
            OR: [
              { firstName: { contains: search, mode: "insensitive" } },
              { lastName: { contains: search, mode: "insensitive" } },
              { email: { contains: search, mode: "insensitive" } },
              { adress: { contains: search, mode: "insensitive" } },
            ],
          },
        },
      ],
    });
  }

  const orders = await prisma.order.findMany({
    where,
    include: {
      user: {
        select: {
          firstName: true,
          lastName: true,
          email: true,
          adress: true,
        },
      },
      products: {
        include: { product: { select: { name: true, pictureUrl: true } } },
      },
    },
    orderBy:
      table === "order"
        ? { [sorting]: order }
        : { [table]: { [sorting]: order } },
    skip: (page - 1) * limit,
    take: limit,
  });

  const totalOrders = await prisma.order.count({ where });
  const totalPages = Math.ceil(totalOrders / limit);

  return { orders, totalOrders, totalPages };
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

const createOrder = async (
  userId,
  totalPrice,
  adress,
  billingAdress,
  phoneNumber,
  status
) => {
  const newOrder = await prisma.order.create({
    data: { userId, totalPrice, adress, billingAdress, phoneNumber, status },
  });
  return newOrder;
};

const updateOrder = async (id, status) => {
  await getOrderById(id);
  const updatedOrder = await prisma.order.update({
    where: { id },
    data: { status: status.status },
  });
  return updatedOrder;
};

const destroyOrder = async (id, status) => {
  await getOrderById(id);
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
