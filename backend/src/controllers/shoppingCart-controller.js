import shoppingCartService from "../services/shoppingCart-service.js";

const getAllShoppingCarts = async (req, res, next) => {
  try {
    const shoppingCarts = await shoppingCartService.getAllShoppingCarts();
    res.status(200).json(shoppingCarts);
  } catch (error) {
    next(error);
  }
};

const getShoppingCartById = async (req, res, next) => {
  const shoppingCartId = req.params.id;
  try {
    const shoppingCart =
      await shoppingCartService.getShoppingCartById(shoppingCartId);
    res.status(200).json(shoppingCart);
  } catch (error) {
    next(error);
  }
};

const createShoppingCart = async (req, res, next) => {
  // const { data } = req.body;
  try {
    const newShoppingCart = await shoppingCartService.createShoppingCart({
      //data
    });
    res.status(201).json(newShoppingCart);
  } catch (error) {
    next(error);
  }
};

const updateShoppingCart = async (req, res, next) => {
  const { shoppingCartId } = req.params;
  //const { data } = req.body;
  try {
    const updatedShoppingCart = await shoppingCartService.updateShoppingCart(
      shoppingCartId,
      {
        //data
      }
    );
    res.status(200).json(updatedShoppingCart);
  } catch (error) {
    next(error);
  }
};

const destroyShoppingCart = async (req, res, next) => {
  const { shoppingCartId } = req.params;
  try {
    const destroyedShoppingCart =
      await shoppingCartService.destroyShoppingCart(shoppingCartId);
    res.status(200).json(destroyedShoppingCart);
  } catch (error) {
    next(error);
  }
};

export default {
  getAllShoppingCarts,
  getShoppingCartById,
  createShoppingCart,
  updateShoppingCart,
  destroyShoppingCart,
};
