import { useContext } from 'react';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import CartItemRow from './CartItemRow';
import SubtotalTable from './SubtotalTable';
import CartContext from '../../contexts/CartContext';

export default function ShoppingCart() {
  const { cart } = useContext(CartContext);

  return (
    <div className="ml-80 mr-80 mt-28 mb-28 flex flex-col">
      <h1 className="text-primary mb-28 text-3xl font-medium">Your shopping cart</h1>
      <div className="flex justify-center">
        <table className="w-full border-collapse border-b border-gray-300 ">
          <thead>
            <tr className="bg-gray-200 ">
              <th colSpan={2} className="text-left pl-12 p-6">
                Product
              </th>
              <th className="text-left pr-20">Price</th>
              <th className="text-left pl-12 pr-20">Quantity</th>
              <th className="text-left pl-12 pr-20">Subtotal</th>
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
                  <div className="flex justify-center items-center text-xl">
                    Your shopping cart is empty.
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-20 mb-20 flex justify-between">
        <div className="flex gap-5 ml-5">
          <input
            className="w-96 rounded-xl border-2 border-gray-300 p-2 hover:border-gray-900"
            type="text"
            placeholder="Coupon code"
          />
          <button
            className="w-28 text-center rounded-xl border-2 border-primary bg-primary p-2 text-white  hover:text-black hover:border-gray-900"
            type="submit"
          >
            Apply
          </button>
        </div>
        <Link
          to="/products/category/all"
          className="mr-12 w-52 text-center rounded-xl border-2 border-primary bg-primary p-2 text-white  hover:text-black hover:border-gray-900"
        >
          Continue shopping
        </Link>
      </div>
      <SubtotalTable />
    </div>
  );
}
