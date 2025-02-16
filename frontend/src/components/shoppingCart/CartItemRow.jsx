import { useContext, useEffect, useState } from 'react';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import CartContext from '../../contexts/CartContext';
import productService from '../../services/productService';
import QuantityChangeButtons from '../productDetails/QuantityChangeButtons';

export default function CartItemRow({ cartProduct }) {
  const { removeFromCart, updateCartItem } = useContext(CartContext);
  const [maxQuantity, setMaxQuantity] = useState(cartProduct.quantity);
  const [isSubmitting, setIsSubmittung] = useState(false);

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const productData = await productService.getProductById(cartProduct.productId);
        setMaxQuantity(productData.product.quantity);
      } catch (error) {
        toast.error('Failed to fetch product quantity from stock');
      }
    };
    fetchProductById();
  }, [cartProduct.productId]);

  const handleDecrement = () => {
    updateCartItem(cartProduct.productId, cartProduct.quantity - 1);
  };

  const handleIncrement = () => {
    if (cartProduct.quantity < maxQuantity) {
      updateCartItem(cartProduct.productId, cartProduct.quantity + 1);
    }
  };

  return (
    <tr key={cartProduct.id} className="border-t border-gray-300">
      <div className="w-48 h-48 mt-5 mb-5 ml-5">
        <Link to={`/products/${cartProduct.productId}`}>
          <img
            className="border-2 object-contain rounded-2xl mt-6 mb-6 p-5 w-48 h-48 hover:border-gray-900"
            src={cartProduct.pictureUrl}
            alt=""
          />
        </Link>
      </div>
      <td className="pl-12 pr-20 text-left font-medium">{cartProduct.name}</td>
      <td className="pr-20 text-left font-medium">€{cartProduct.price}</td>
      <td>
        <QuantityChangeButtons
          handleDecrement={() => handleDecrement()}
          handleIncrement={() => handleIncrement()}
          product={cartProduct}
          productInCartCount={cartProduct.quantity}
          maxQuantity={maxQuantity}
        />
      </td>
      <td className="pl-12 pr-20 text-left font-medium">
        €{(cartProduct.price * cartProduct.quantity).toFixed(2)}
      </td>
      <td className="text-red-500 cursor-pointer text-xl">
        <button
          type="button"
          onClick={() => removeFromCart(cartProduct.productId, isSubmitting, setIsSubmittung)}
          disabled={isSubmitting}
        >
          <RiDeleteBin5Line />
        </button>
      </td>
    </tr>
  );
}
