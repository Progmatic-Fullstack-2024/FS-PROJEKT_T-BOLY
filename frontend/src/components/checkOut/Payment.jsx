import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import CartContext from '../../contexts/CartContext.jsx';
import orderService from '../../services/orderService.js';


export default function Payment() {
  const [order, setOrder] = useState();
  const [orderItems, setOrderItems] = useState([]);
  const { cart, clearCart, totalPrice } = useContext(CartContext);
  const navigate = useNavigate();

  const handleOrder = async () => {
    try {
      const { newOrder, orderItemsData } = await orderService.createOrder({
        totalPrice,
        orderItems: cart,
      });
      setOrder(newOrder);
      setOrderItems(orderItemsData);
      clearCart()
      navigate('/profile_page/orders')
    } catch (error) {
      toast.error('Error creating order');
    }
  };

  return (
    <div className=" border-2 rounded-xl p-12">
      <h1 className="text-2xl font-medium mb-8">Payment</h1>
      <button type="button" onClick={handleOrder}>
        order
      </button>
    </div>
  );
}
