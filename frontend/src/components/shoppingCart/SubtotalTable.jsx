import { useContext } from 'react';
import { Link } from 'react-router-dom';

import CartContext from '../../contexts/CartContext';
import LanguageContext from '../../contexts/LanguageContext';

export default function SubtotalTable({ coupon }) {
  const { subtotalPrice, totalPrice, shippingPrice } = useContext(CartContext);
  const { t } = useContext(LanguageContext);

  return (
    <div className="md:mr-5 md:ml-auto border-2 rounded-xl md:w-1/2 w-full flex flex-col p-10 gap-10 dark:text-white dark:bg-gray-700 dark:border-primary">
      <h1 className="text-xl font-medium dark:text-primary">{t('shopping cart total')}</h1>
      <table>
        <tr>
          <td className="pb-2 pr-16 font-medium dark:text-primary">{t('subtotal')}</td>
          <td className="pb-2 font-medium text-right dark:text-primary">
            €{subtotalPrice.toFixed(2)}
          </td>
        </tr>
        {coupon && (
          <tr>
            <td className="pb-2 pr-16 font-medium dark:text-primary">
              {coupon.discount}% {t(`discount`)}
            </td>
            <td className="pb-2 text-red-500 font-medium text-right">
              - €{((subtotalPrice / 100) * coupon.discount).toFixed(2)}
            </td>
          </tr>
        )}
        <tr>
          <td className="pb-2 pr-16 font-medium">{t('shipping')}</td>
          <td className="pb-2 font-medium text-right dark:text-primary">
            €{shippingPrice.toFixed(2)}
          </td>
        </tr>
        <tr>
          <td className="text-xl pt-7 pr-10 font-medium dark:text-primary">{t('total')}</td>
          <td className="text-xl pt-7 font-medium text-right">€{totalPrice.toFixed(2)}</td>
        </tr>
      </table>
      <Link
        to="/checkOut"
        className="w-full text-center rounded-xl border-2 border-primary bg-primary p-2 text-white  hover:text-black hover:border-gray-900 "
      >
        {t('proceed to checkout')}
      </Link>
    </div>
  );
}
