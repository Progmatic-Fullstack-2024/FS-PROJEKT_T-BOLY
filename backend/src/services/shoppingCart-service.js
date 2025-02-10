import prisma from "../models/prismaClient.js";
import HttpError from "../utils/HttpError.js";

const getAllShoppingCarts = async () => {
  const shoppingCarts = await prisma.cart.findMany({});
  return { shoppingCarts };
};

const getShoppingCartByUserId = async (userId) => {
  const shoppingCart = await prisma.cart.findFirst({
    where: { userId },
    include: {
      products: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!shoppingCart) {
    return [];
  }

  const cartItems = shoppingCart?.products?.map((cartItem) => ({
    id: cartItem.id,
    productId: cartItem.product.id,
    name: cartItem.product.name,
    price: cartItem.product.price,
    quantity: cartItem.quantity,
    pictureUrl: cartItem.product.pictureUrl,
  }));

  return cartItems;
};

const createShoppingCart = async (userId) => {
  const activeShoppingCart = await prisma.cart.findFirst({
    where: { userId },
    include: { products: true },
  });

  if (activeShoppingCart) {
    return activeShoppingCart;
  }

  const newShoppingCart = await prisma.cart.create({
    data: { userId },
  });
  return newShoppingCart;
};

const addCartItem = async (userId, productId, quantity) => {
  const shoppingCart = await createShoppingCart(userId);

  const existingCartItem = shoppingCart?.products?.find(
    (cartItem) => cartItem.productId === productId,
  );

  if (existingCartItem) {
    const updateExistingCartItem = await prisma.cartItem.update({
      where: { id: existingCartItem.id },
      data: {
        quantity: existingCartItem.quantity + quantity,
      },
    });
    return updateExistingCartItem;
  }

  const newCartItem = await prisma.cartItem.create({
    data: { cartId: shoppingCart.id, productId, quantity },
    include: {
      product: true,
    },
  });

  return newCartItem;
};

const updateCartItem = async (userId, productId, quantity) => {
  const shoppingCart = await getShoppingCartByUserId(userId);

  const cartItem = shoppingCart?.find((item) => item.productId === productId);

  if (!cartItem) {
    throw new HttpError("Cart item not found", 404);
  }

  const updatedCartItem = await prisma.cartItem.update({
    where: { id: cartItem.id },
    data: {
      quantity,
    },
  });

  return updatedCartItem;
};

const removeCartItem = async (userId, productId) => {
  const shoppingCart = await getShoppingCartByUserId(userId);

  const cartItem = shoppingCart?.find((item) => item.productId === productId);

  if (!cartItem) {
    throw new HttpError("Cart item not found", 404);
  }

  const removedCartItem = await prisma.cartItem.delete({
    where: { id: cartItem.id },
  });

  return removedCartItem;
};

export default {
  getAllShoppingCarts,
  getShoppingCartByUserId,
  createShoppingCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
};
