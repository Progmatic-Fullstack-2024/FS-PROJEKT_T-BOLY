import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import orderItemsService from '../../services/orderItemService';
import orderService from '../../services/orderService';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [hoveredOrderId, setHoveredOrderId] = useState(null);

  const statusMap = {
    AWAITINGPAYMENT: 'Waiting for payment',
    PROCESSING: 'Processing',
    PACKED: 'Packed',
    OUTFORDELIVERY: 'Out for delivery',
    DELIVERED: 'Delivered',
    COMPLETED: 'Completed',
    CANCELED: 'Canceled',
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderService.getOrdersByUserId();

        const formattedOrders = data.map((order) => {
          const createdAt = new Date(order.createdAt);
          const year = createdAt.getFullYear();
          const month = (createdAt.getMonth() + 1).toString().padStart(2, '0');
          const day = createdAt.getDate().toString().padStart(2, '0');
          const formattedDate = `${year}-${month}-${day}`;

          const formattedStatus = statusMap[order.status] || order.status;

          return { ...order, formattedDate, formattedStatus };
        });

        setOrders(formattedOrders);
      } catch (error) {
        toast.error('Could not fetch orders');
      }
    };

    fetchOrders();
  }, []);

  const handleViewDetails = async (order) => {
    setSelectedOrder(order);
    console.log('order', order);
    try {
      const data = await orderItemsService.getAllOrderItemsByOrderId(order.id);
      setOrderItems(data);
    } catch (error) {
      toast.error('Could not fetch order items');
    }
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
    setOrderItems([]);
  };

  return (
    <div className="overflow-x-auto m-20">
      <h1 className="text-2xl font-semibold mb-16">Your orders</h1>
      <table className="md:w-full border-collapse border-b border-gray-300">
        <thead>
          <tr className="bg-primary">
            <th className="py-6 px-12 text-left font-bold text-white">Order ID</th>
            <th className="py-6 px-12 text-left font-bold text-white">Order date</th>
            <th className="py-6 px-12 text-left font-bold text-white">Total price</th>
            <th className="py-6 px-12 text-left font-bold text-white">Status</th>
            <th className="py-6 px-12 text-left font-bold text-white">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr
                key={order.id}
                className={`border-t border-gray-300 ${hoveredOrderId === order.id ? 'bg-primary-light' : ''}`}
                onMouseEnter={() => setHoveredOrderId(order.id)}
                onMouseLeave={() => setHoveredOrderId(null)}
              >
                <td className="py-10 px-12 text-left font-medium text-gray-900">{order.id}</td>
                <td className="py-10 px-12 text-left font-medium text-gray-900">
                  {order.formattedDate}
                </td>
                <td className="py-10 px-12 text-left font-medium text-gray-900">
                  €{order.totalPrice}
                </td>
                <td className="py-10 px-12 text-left font-medium text-gray-900">
                  {order.formattedStatus}
                </td>
                <td className="py-10 px-12 text-left">
                  <button
                    type="button"
                    onClick={() => handleViewDetails(order)}
                    className="w-28 rounded-xl border-2 border-primary bg-primary p-2 text-white  hover:text-black hover:border-gray-900"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-20 px-12 text-center text-gray-500">
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {selectedOrder && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-2">Order details</h2>
            <div>Order ID: {selectedOrder.id}</div>
            <div>{selectedOrder.formattedDate}</div>
            <div>Total Price: €{selectedOrder.totalPrice}</div>
            <div>Status:{selectedOrder.formattedStatus}</div>
            <h3 className="mt-4 font-semibold">Order Items:</h3>
            {orderItems.length > 0 ? (
              orderItems.map((item) => (
                <div key={item.id} className="py-1">
                  <div>name: {item.product.name}</div>
                  <div>price: €{item.price}</div>
                  <div>amount: {item.quantity}</div>
                </div>
              ))
            ) : (
              <div className="text-gray-500">No items found</div>
            )}
            <div className="mt-4">
              <button
                type="button"
                onClick={handleCloseModal}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
