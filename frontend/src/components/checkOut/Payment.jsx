import { useContext, useState } from 'react';
import { toast } from 'react-toastify';

import CartContext from '../../contexts/CartContext.jsx';
import orderItemService from '../../services/orderItemService.js';
import orderService from '../../services/orderService.js';

export default function Payment() {
  const [order, setOrder] = useState();
  const [orderItems, setOrderItems] = useState([]);
  const { cart, totalPrice } = useContext(CartContext);

  const handleOrder = async () => {
    try {
      const orderData = await orderService.createOrder(totalPrice);
      setOrder(orderData);

      const orderItemsData = await Promise.all(
        cart.map(async (item) => {
          const orderItem = await orderItemService.createOrderItem(
            item.productId,
            item.quantity,
            item.price,
          );
          return orderItem;
        }),
      );
      setOrderItems(orderItemsData);
    } catch (error) {
      toast.error('Error fetching order');
    }
  };

  console.log('order', order);
  console.log('orderitems', orderItems);

  return (
    <div className=" border-2 rounded-xl p-12">
      <h1 className="text-2xl font-medium mb-8">Payment</h1>
      <button type="button" onClick={handleOrder}>
        order
      </button>
    </div>
  );
}
