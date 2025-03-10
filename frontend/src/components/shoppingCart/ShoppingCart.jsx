import { useContext } from 'react';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import CartItemRow from './CartItemRow';
import SubtotalTable from './SubtotalTable';
import CartContext from '../../contexts/CartContext';
import LanguageContext from '../../contexts/LanguageContext';

export default function ShoppingCart() {
  const { cart } = useContext(CartContext);
  const { t } = useContext(LanguageContext);

  return (
    <div className="md:ml-80 ml-2 mr-2 md:mr-80 md:mt-28 mt-10 mb-28 flex flex-col">
      <h1 className="text-primary md:mb-28 mb-10 text-3xl font-medium">
        {t('your shopping cart')}
      </h1>
      <div className="md:flex md:justify-center overflow-x-scroll md:overflow-x-visible">
        <table className=" md:w-full border-collapse border-b border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th colSpan={2} className="text-left pl-12 p-6">
                {t('product')}
              </th>
              <th className="text-left pr-20">{t('price')}</th>
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
              <tr className="border-t border-gray-300 ">
                <td colSpan={6} className="p-20">
                  <div className="flex md:justify-center items-center text-xl">
                    {t('your shopping cart is empty')}.
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div
        className={`mt-20 md:mb-20 mb-10 flex md:flex-row flex-col items-center gap-10 ${cart.length > 0 ? 'justify-between' : 'justify-end'}`}
      >
        {cart.length > 0 && (
          <div className="flex gap-5 md:ml-5 items-end">
            <input
              className="md:w-96 w-64 rounded-xl border-2 border-gray-300 p-2 hover:border-gray-900"
              type="text"
              placeholder={t('coupon code')}
            />
            <button
              className="w-28 text-center rounded-xl border-2 border-primary bg-primary p-2 text-white  hover:text-black hover:border-gray-900"
              type="submit"
            >
              {t('apply')}
            </button>
          </div>
        )}
        <Link
          to="/products/category/all"
          className="md:mr-12 w-52 text-center rounded-xl border-2 border-primary bg-primary p-2 text-white  hover:text-black hover:border-gray-900"
        >
          {t('continue shopping')}
        </Link>
      </div>
      {cart.length > 0 && <SubtotalTable />}
    </div>
  );
}
