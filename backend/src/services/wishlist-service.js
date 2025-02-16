import prisma from "../models/prismaClient.js";
import HttpError from "../utils/HttpError.js";

const getWishlistByUserId = async (userId) => {
  if (!userId) {
    throw new Error("This user does not exist");
  }

  const wishlist = await prisma.wishList.findFirst({
    where: { userId },
    include: { products: { include: { product: true } } },
  });

  if (!wishlist) {
    return [];
  }

  return wishlist;
};

const addToWishlist = async (userId, productId) => {
  const wishlist = await prisma.wishList.findFirst({
    where: { userId },
  });

  if (!wishlist) {
    return prisma.wishList.create({
      data: { userId, products: { create: { productId } } },
      include: { products: true },
    });
  }
  const existingProduct = await prisma.wishListItem.findFirst({
    where: { wishListId: wishlist.id, productId },
  });
  if (existingProduct) throw new HttpError("Product already in wishlist", 406);
  return prisma.wishList.update({
    where: { id: wishlist.id },
    data: { products: { create: { productId } } },
    include: { products: { include: { product: true } } },
  });
};

const removeFromWishlist = async (userId, productId) => {
  const wishlist = await prisma.wishList.findFirst({
    where: { userId },
  });
  if (!wishlist) throw new HttpError("Wishlist not found", 404);
  const wishlistItem = await prisma.wishListItem.findFirst({
    where: { wishListId: wishlist.id, productId },
  });
  await prisma.wishListItem.delete({ where: { id: wishlistItem.id } });
};

export default {
  getWishlistByUserId,
  addToWishlist,
  removeFromWishlist,
};
