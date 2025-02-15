import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import CartContext from '../../contexts/CartContext';
import LanguageContext from '../../contexts/LanguageContext';

export default function SubtotalTable() {
  const { cart } = useContext(CartContext);

  const [subtotalPrice, setSubtotalPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const { t } = useContext(LanguageContext);

  const shippingPrice = 10;

  useEffect(() => {
    const calculateSubtotalPrice = () => {
      const total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
      setSubtotalPrice(total);
      setTotalPrice(total + shippingPrice);
    };

    calculateSubtotalPrice();
  }, [cart]);

  return (
    <div className="md:ml-auto border-2 rounded-xl md:w-1/2 w-full flex flex-col md:mr-12 p-10 gap-10 ">
      <h1 className="text-xl font-medium">{t('shopping cart total')}</h1>
      <table>
        <tr>
          <td className="pb-2 pr-16">{t('subtotal')}</td>
          <td className="pb-2 ">€{subtotalPrice.toFixed(2)}</td>
        </tr>
        <tr>
          <td className="pb-2 pr-16">{t('shipping')}</td>
          <td className="pb-2 ">€{shippingPrice}</td>
        </tr>
        {/* <tr>
            <td className="pb-2 pr-16">Coupon</td>
            <td className="pb-2 ">-%</td>
          </tr> */}
        <tr>
          <td className="text-xl font-medium pt-7 pr-10">{t('total')}</td>
          <td className="text-xl font-medium pt-7 ">€{totalPrice.toFixed(2)}</td>
        </tr>
      </table>
      <Link
        to="/checkOut"
        className="w-full text-center rounded-xl border-2 border-primary bg-primary p-2 text-white  hover:text-black hover:border-gray-900"
      >
        {t('proceed to checkout')}
      </Link>
    </div>
  );
}
