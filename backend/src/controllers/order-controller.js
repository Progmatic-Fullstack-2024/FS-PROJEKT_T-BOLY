import orderService from "../services/order-service.js";
import orderItemService from "../services/orderItem-service.js";

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getAllOrders();
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
  const { totalPrice, orderItems } = req.body;

  try {
    const newOrder = await orderService.createOrder(userId, totalPrice);
    const orderItemsData = await Promise.all(
      orderItems.map(async (item) => {
        try {
          const orderItem = await orderItemService.createOrderItem(
            newOrder.id,
            item.productId,
            item.quantity,
            item.price,
          );
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
