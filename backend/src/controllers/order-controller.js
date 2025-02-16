import orderService from "../services/order-service.js";
import orderItemService from "../services/orderItem-service.js";
import productService from "../services/products-service.js";

const getAllOrders = async (req, res, next) => {
  const {
    sorting = "lastName", // ezt át kell majd írni a createdAt -re
    order = "asc",
    table = "user",
    page = 1,
    limit = 9,
    search,
  } = req.query;
  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  try {
    const orders = await orderService.getAllOrders(
      sorting,
      order,
      table,
      pageNumber,
      limitNumber,
      search,
    );
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const order = await orderService.getOrderById(id);
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

const getOrdersByUserId = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const orders = await orderService.getOrdersByUserId(userId);
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

const createOrder = async (req, res, next) => {
  const userId = req.user.id;
  const {
    totalPrice,
    orderItems,
    adress,
    billingAdress,
    phoneNumber,
    status,
    orderNotes,
  } = req.body;

  try {
    const newOrder = await orderService.createOrder(
      userId,
      totalPrice,
      adress,
      billingAdress,
      phoneNumber,
      status,
      orderNotes,
    );
    const orderItemsData = await Promise.all(
      orderItems.map(async (item) => {
        try {
          const orderItem = await orderItemService.createOrderItem(
            newOrder.id,
            item.productId,
            item.quantity,
            item.price,
          );
          await productService.updateStock(item.productId, item.quantity);
          return orderItem;
        } catch (error) {
          return null;
        }
      }),
    );
    res.status(201).json({ newOrder, orderItemsData });
  } catch (error) {
    next(error);
  }
};

const updateOrder = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedOrder = await orderService.updateOrder(id, status);
    res.status(200).json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

const destroyOrder = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const canceledOrder = await orderService.destroyOrder(id, status);
    res.status(200).json(canceledOrder);
  } catch (error) {
    next(error);
  }
};

export default {
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
  createOrder,
  updateOrder,
  destroyOrder,
};
