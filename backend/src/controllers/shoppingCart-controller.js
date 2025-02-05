import shoppingCartService from "../services/shoppingCart-service.js";

const getAllShoppingCarts = async (req, res, next) => {
  try {
    const shoppingCarts = await shoppingCartService.getAllShoppingCarts();
    res.status(200).json(shoppingCarts);
  } catch (error) {
    next(error);
  }
};

const getShoppingCartByUserId = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const shoppingCart =
      await shoppingCartService.getShoppingCartByUserId(userId);
    res.status(200).json(shoppingCart);
  } catch (error) {
    next(error);
  }
};

const createShoppingCart = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const newShoppingCart = await shoppingCartService.createShoppingCart({
      userId,
    });
    res.status(201).json(newShoppingCart);
  } catch (error) {
    next(error);
  }
};

const addCartItem = async (req, res, next) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;
  try {
    const addedCartItem = await shoppingCartService.addCartItem(
      userId,
      productId,
      quantity,
    );
    res.status(201).json(addedCartItem);
  } catch (error) {
    next(error);
  }
};

const updateCartItem = async (req, res, next) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;
  try {
    const updatedCartItem = await shoppingCartService.updateCartItem(
      userId,
      productId,
      quantity,
    );
    res.status(200).json(updatedCartItem);
  } catch (error) {
    next(error);
  }
};

const removeCartItem = async (req, res, next) => {
  const userId = req.user.id;
  const { productId } = req.body;
  try {
    const removedCartItem = await shoppingCartService.removeCartItem(
      userId,
      productId,
    );
    res.status(200).json(removedCartItem);
  } catch (error) {
    next(error);
  }
};

export default {
  getAllShoppingCarts,
  getShoppingCartByUserId,
  createShoppingCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
};
