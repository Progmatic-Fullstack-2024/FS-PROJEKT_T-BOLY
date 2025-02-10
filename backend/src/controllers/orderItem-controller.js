import orderItemService from "../services/orderItem-service.js";

const getAllOrderItemsByOrderId = async (req, res, next) => {
  const { orderId } = req.params;
  try {
    const orderItems =
      await orderItemService.getAllOrderItemsByOrderId(orderId);
    res.status(200).json(orderItems);
  } catch (error) {
    next(error);
  }
};

const createOrderItem = async (req, res, next) => {
  const orderId = req.params;
  const { productId, quantity, price } = req.body;
  try {
    const newOrder = await orderItemService.createOrderItem({
      orderId,
      productId,
      quantity,
      price,
    });
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
};

export default {
  getAllOrderItemsByOrderId,
  createOrderItem,
};
