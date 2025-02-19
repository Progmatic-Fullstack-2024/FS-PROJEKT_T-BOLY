import { t } from 'i18next';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import CartContext from '../../contexts/CartContext';

export default function OrderTable() {
  const { cart, subtotalPrice, totalPrice, shippingPrice, coupon } = useContext(CartContext);

  return (
    <div className="md:w-2/5 border-2 rounded-xl md:p-12 p-4 h-fitdark:bg-gray-700 dark:border-primary dark:border dark:text-primary dark:bg-gray-700">
      <h1 className="text-2xl font-medium mb-8"> {t(`your order`)}</h1>
      <table className="w-full">
        {cart.map((product) => (
          <tr
            key={product.id}
            className=" border-b border-gray-300 flex items-center justify-start dark:border-primary"
          >
            <td className="w-2/6 mt-6 mb-6 mr-2">
              <Link to={`/products/${product.productId}`}>
                <img
                  className="border-2 object-contain rounded-2xl p-3 w-28 h-28 hover:border-gray-900 dark:bg-gray-800 dark:border-primary dark:border dark:text-primary"
                  src={product.pictureUrl}
                  alt="Product"
                />
              </Link>
            </td>
            <td className="w-1/2 mt-6 mb-6 mr-6">
              <div className="text-left mb-3 font-medium">{product.name}</div>
              <div className="text-left ">
                {t(`amount`)}: {product.quantity}
              </div>
            </td>
            <td className="w-1/6 mt-6 mb-6 text-right font-medium">
              €{(product.price * product.quantity).toFixed(2)}
            </td>
          </tr>
        ))}
        <tr className="border-b border-gray-300 flex justify-between dark:border-primary">
          <td className="flex justify-center mt-12 mb-12 flex-col gap-5">
            <div className="font-medium">{t(`subtotal`)}</div>
            {coupon && (
              <div className="font-medium">
                {coupon.discount}% {t(`discount`)}
              </div>
            )}
            <div className="font-medium">{t(`shipping`)}</div>
          </td>
          <td className="flex justify-center mt-12 mb-12 flex-col gap-5">
            <div className="font-medium text-right">€{subtotalPrice.toFixed(2)}</div>
            {coupon && (
              <div className="font-medium text-right text-red-500">
                - €{((subtotalPrice / 100) * coupon.discount).toFixed(2)}
              </div>
            )}
            <div className="font-medium text-right">€{shippingPrice.toFixed(2)}</div>
          </td>
        </tr>
        <tr className=" flex items-center justify-between">
          <td className="mt-12 ">
            <div className="text-primary font-bold text-xl">{t(`total`)}</div>
          </td>
          <td className="mt-12 ">
            <div className="text-primary font-bold text-xl text-right">
              €{totalPrice.toFixed(2)}
            </div>
          </td>
        </tr>
      </table>
    </div>
  );
}
