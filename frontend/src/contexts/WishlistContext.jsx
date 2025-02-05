import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import wishlistService from '../services/wishlistService.js';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const data = await wishlistService.getWishlist();
        setWishlist(data.products || []);
      } catch (error) {
        toast.error('Error fetching wishlist');
      } finally {
        setIsLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  const addProductToWishlist = async (productId) => {
    try {
      const updatedWishlist = await wishlistService.addProduct(productId);
      setWishlist(updatedWishlist.products);
      toast.success('Product added to wishlist');
    } catch (error) {
      toast.error('Error adding product to wishlist');
    }
  };

  const removeProductFromWishlist = async (productId) => {
    try {
      await wishlistService.removeProduct(productId);
      setWishlist((prevWishlist) => prevWishlist.filter((item) => item.productId !== productId));
      toast.success('Product removed from wishlist');
    } catch (error) {
      toast.error('Error removing product from wishlist');
    }
  };

  const value = {
    wishlist,
    addProductToWishlist,
    removeProductFromWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>{!isLoading && children}</WishlistContext.Provider>
  );
}

export default WishlistContext;
