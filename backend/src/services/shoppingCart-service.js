import prisma from "../models/prismaClient.js";
import HttpError from "../utils/HttpError.js";

const getAllShoppingCarts = async () => {
  const shoppingCarts = prisma.cart.findMany({});
  return { shoppingCarts };
};

const getShoppingCartById = async (shoppingCartId) => {
  const shoppingCart = await prisma.cart.findUnique({
    where: { shoppingCartId },
  });
  if (!shoppingCart) {
    throw new HttpError("ShoppingCart not found", 404);
  }
  return shoppingCart;
};

const createShoppingCart = async (shoppingCartData) => {
  const newShoppingCart = await prisma.cart.create({
    data: shoppingCartData,
  });
  return newShoppingCart;
};

const updateShoppingCart = async (shoppingCartId, shoppingCartData) => {
  await getShoppingCartById(shoppingCartId);
  const updatedShoppingCart = await prisma.cart.update({
    where: { shoppingCartId },
    data: shoppingCartData,
  });
  return updatedShoppingCart;
};

const destroyShoppingCart = async (shoppingCartId) => {
  await getShoppingCartById(shoppingCartId);
  const destroyedShoppingCart = prisma.cart.delete({
    where: { shoppingCartId },
  });
  return destroyedShoppingCart;
};

export default {
  getAllShoppingCarts,
  getShoppingCartById,
  createShoppingCart,
  updateShoppingCart,
  destroyShoppingCart,
};
