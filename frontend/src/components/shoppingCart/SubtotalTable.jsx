import { useContext } from 'react';
import { Link } from 'react-router-dom';

import CartContext from '../../contexts/CartContext';

export default function SubtotalTable() {
  const { subtotalPrice, totalPrice, shippingPrice } = useContext(CartContext);

  return (
    <div className="md:ml-auto border-2 rounded-xl md:w-1/2 w-full flex flex-col md:mr-12 p-10 gap-10 ">
      <h1 className="text-xl font-medium">Shopping cart total</h1>
      <table>
        <tr>
          <td className="pb-2 pr-16">Subtotal</td>
          <td className="pb-2 ">€{subtotalPrice.toFixed(2)}</td>
        </tr>
        <tr>
          <td className="pb-2 pr-16">Shipping</td>
          <td className="pb-2 ">€{shippingPrice}</td>
        </tr>
        {/* <tr>
            <td className="pb-2 pr-16">Coupon</td>
            <td className="pb-2 ">-%</td>
          </tr> */}
        <tr>
          <td className="text-xl font-medium pt-7 pr-10">Total</td>
          <td className="text-xl font-medium pt-7 ">€{totalPrice.toFixed(2)}</td>
        </tr>
      </table>
      <Link
        to="/checkOut"
        className="w-full text-center rounded-xl border-2 border-primary bg-primary p-2 text-white  hover:text-black hover:border-gray-900"
      >
        Proceed to checkout
      </Link>
    </div>
  );
}
