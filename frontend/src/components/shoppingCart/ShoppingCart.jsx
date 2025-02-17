import { useContext, useState } from 'react';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import CartItemRow from './CartItemRow';
import SubtotalTable from './SubtotalTable';
import CartContext from '../../contexts/CartContext';
import LanguageContext from '../../contexts/LanguageContext';
import couponsService from '../../services/couponsService';
import isDateValid from '../../utils/isDateValid';

export default function ShoppingCart() {
  const { cart, coupon, setCoupon } = useContext(CartContext);
  const { t } = useContext(LanguageContext);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const applyCoupon = async () => {
    try {
      const data = await couponsService.getCouponByCode(code);
      if (!data.isActive) {
        return setError('Coupon is no longer available');
      }
      if (!isDateValid(data.validFrom, data.validTo)) {
        return setError('Coupon is no longer valid');
      }
      setError('');
      setCoupon(data);
      return true;
    } catch (err) {
      return setError('Invalid coupon');
    }
  };

  return (
    <div className="md:pl-80 pl-2 pr-2 md:pr-80 md:pt-28 pt-10 pb-28 flex flex-col dark:text-primary dark:bg-gray-800 dark:border-primary dark:border">
      <h1 className="text-primary md:pb-28 pb-10 text-3xl font-medium dark:text-primary">
        {t('your shopping cart')}
      </h1>
      <div className="md:flex md:justify-center overflow-x-scroll md:overflow-x-visible dark:text-primary">
        <table className="md:w-full border-collapse border-b border-gray-300 dark:text-primary dark:border-primary dark:border">
          <thead>
            <tr className="bg-primary text-white rounded-xl border-gray-30 dark:bg-gray-700 dark:text-primary dark:border-primary dark:border">
              <th colSpan={2} className="text-left pl-12 p-6">
                {t('product')}
              </th>
              <th className="text-left pr-20 ">{t('price')}</th>
              <th className="text-left pl-12 pr-20">{t('quantity')}</th>
              <th className="text-left pl-12 pr-20">{t('subtotal')}</th>
              <th className="text-left pr-12 text-xl">
                <RiDeleteBin5Line />
              </th>
            </tr>
          </thead>
          <tbody>
            {cart.length > 0 ? (
              cart.map((product) => <CartItemRow cartProduct={product} key={product.id} />)
            ) : (
              <tr className="border-t border-gray-300 dark:text-primary dark:border-primary dark:border">
                <td colSpan={6} className="p-20">
                  <div className="flex md:justify-center items-center text-xl dark:text-primary">
                    {t('your shopping cart is empty')}.
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div
        className={`mt-20 md:ml-5 md:mr-5 md:mb-20 mb-10 flex md:flex-row flex-col items-center gap-10 dark:text-primary ${cart.length > 0 ? 'justify-between' : 'justify-end'}`}
      >
        {cart.length > 0 && (
          <div className="flex gap-6">
            <div className="flex flex-col gap-3 dark:text-primary">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className={`md:w-96 w-64 rounded-xl border-2 border-gray-300 p-2 ${coupon?.discount ? '' : 'hover:border-gray-900 dark:text-primary dark:bg-gray-700 dark:border-primary dark:placeholder:text-primary'}`}
                type="text"
                placeholder={t('coupon code')}
              />
              <span className="text-red-500 text-sm">{error}</span>
            </div>
            <button
              onClick={applyCoupon}
              className={`w-28 h-11 text-center rounded-xl border-2 p-2 text-white ${coupon?.discount ? 'bg-gray-400 border-gray-400' : 'bg-primary border-primary hover:text-black hover:border-gray-900 dark:text-primary dark:bg-gray-700 dark:border-primary dark:placeholder:text-primary'}`}
              type="submit"
              disabled={coupon?.discount}
            >
              {t('apply')}
            </button>
          </div>
        )}
        <Link
          to="/products/category/all"
          className="w-52 text-center rounded-xl border-2 border-primary bg-primary p-2 text-white  hover:text-black hover:border-gray-900"
        >
          {t('continue shopping')}
        </Link>
      </div>
      {cart.length > 0 && <SubtotalTable coupon={coupon} />}
    </div>
  );
}
