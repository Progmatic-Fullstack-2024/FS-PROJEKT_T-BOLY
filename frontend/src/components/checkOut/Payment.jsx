import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import CartContext from '../../contexts/CartContext.jsx';
import orderService from '../../services/orderService.js';

export default function Payment({ formData }) {
  const [showModal, setShowModal] = useState(false);
  const { cart, clearCart, totalPrice } = useContext(CartContext);
  const navigate = useNavigate();

  console.log("formData", formData)

  const handleOrder = async () => {
    try {
      await orderService.createOrder({
        totalPrice,
        orderItems: cart,
        adress: formData.address,
        billingAdress: formData.billingAdress,
        phoneNumber: formData.phoneNumber,
      });
      clearCart();
      setShowModal(true);
    } catch (error) {
      toast.error('Error creating order');
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate('/profile_page/orders');
  };

  return (
    <div className=" border-2 rounded-xl p-12">
      <h1 className="text-2xl font-medium mb-8">Payment</h1>
      <button type="submit" onClick={handleOrder}>
        order
      </button>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-xl text-center border-4 border-primary mb-60">
            <h1 className="text-3xl font-extrabold text-primary mb-10">
              Thank you for your order!
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Your order has been successfully placed. <br></br> You will receive a confirmation
              email soon.
            </p>
            <button
              type="button"
              onClick={handleModalClose}
              className="w-28 text-center rounded-xl border-2 border-primary bg-primary p-2 text-white  hover:text-black hover:border-gray-900"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
