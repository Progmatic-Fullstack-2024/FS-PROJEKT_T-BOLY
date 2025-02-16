import wishlistService from "../services/wishlist-service.js";

const getWishlistByUserId = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const wishlist = await wishlistService.getWishlistByUserId(userId);
    res.status(200).json(wishlist);
  } catch (error) {
    next(error);
  }
};

const addToWishlist = async (req, res, next) => {
  const userId = req.user.id;
  const { productId } = req.body;
  try {
    const newWishlist = await wishlistService.addToWishlist(userId, productId);
    res.status(201).json(newWishlist);
  } catch (error) {
    next(error);
  }
};

const removeFromWishlist = async (req, res, next) => {
  const userId = req.user.id;
  const productId = req.params.id;
  try {
    const newWishlist = await wishlistService.removeFromWishlist(
      userId,
      productId,
    );
    res.status(200).json(newWishlist);
  } catch (error) {
    next(error);
  }
};

export default {
  getWishlistByUserId,
  addToWishlist,
  removeFromWishlist,
};
