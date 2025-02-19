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

export default {
  getAllOrderItemsByOrderId,
};
