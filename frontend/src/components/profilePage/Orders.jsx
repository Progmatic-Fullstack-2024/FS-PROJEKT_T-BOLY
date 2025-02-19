import { useContext, useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import AuthContext from '../../contexts/AuthContext';
import orderItemsService from '../../services/orderItemService';
import orderService from '../../services/orderService';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [hoveredOrderId, setHoveredOrderId] = useState(null);
  const { user } = useContext(AuthContext);

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
    <div className="mx-auto w-full bg-white rounded-lg shadow-md p-8">
      <h1 className="text-xl font-bold text-gray-700 mb-4">Your Orders</h1>
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
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-[100]">
          <div className="relative bg-white p-10 rounded-lg shadow-lg w-3/5 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-8">Order details</h2>
            <button
              type="button"
              onClick={handleCloseModal}
              className="absolute top-10 -right-20 text-2xl w-40 rounded-xl hover:text-black hover:border-gray-900"
            >
              <RxCross2 />
            </button>
            <div className="flex gap-10">
              <div className="flex flex-col gap-3 border-2 rounded-xl p-5 w-1/3">
                <div>
                  <span className="font-medium">Order ID:</span> {selectedOrder.id}
                </div>
                <div>
                  <span className="font-medium">Order date:</span> {selectedOrder.formattedDate}
                </div>
                <div className="font-medium">Total Price: €{selectedOrder.totalPrice}</div>
                <div className="text-xl font-medium text-primary">
                  Status: {selectedOrder.formattedStatus}
                </div>
              </div>
              <div className="flex flex-col gap-3 border-2 rounded-xl p-5 w-2/3">
                <div>
                  <span className="font-medium">Name: </span>
                  {user.firstName} {user.lastName}
                </div>
                <div>
                  <span className="font-medium">Phone Number: </span>
                  {selectedOrder.phoneNumber}
                </div>
                <div>
                  <h2 className="font-medium">Delivery Address:</h2>
                  <div> {selectedOrder.adress}</div>
                </div>
                <div>
                  <h2 className="font-medium">Billing Address:</h2>
                  <div> {selectedOrder.billingAdress}</div>
                </div>
              </div>
            </div>

            <div className="w-full border-2 rounded-xl p-10 h-fit mt-10">
              <h1 className="text-xl font-medium mb-10">Order Items</h1>
              <table className="w-full">
                <thead>
                  <tr className="bg-primary text-white rounded-xl border-gray-300">
                    <th colSpan={2} className="text-left pt-5 pb-5 pl-10">
                      Product
                    </th>
                    <th className="text-left pt-5 pb-5 pl-10">Price</th>
                    <th className="text-left pt-5 pb-5 pl-10">Quantity</th>
                    <th className="text-left pt-5 pb-5 pl-10 pr-10">Subtotal</th>
                  </tr>
                </thead>
                {orderItems.length > 0 ? (
                  orderItems.map((item) => (
                    <tr key={item.id} className="border-b">
                      <div className="w-32 h-32 ">
                        <Link to={`/products/${item.productId}`}>
                          <img
                            className="border-2 object-contain rounded-2xl mt-6 mb-6 p-2 w-28 h-28 hover:border-gray-900"
                            src={item.product.pictureUrl}
                            alt=""
                          />
                        </Link>
                      </div>
                      <td className=" mt-6 mb-6 pl-10 text-left">
                        <div className="font-medium">{item.product.name}</div>
                      </td>
                      <td className="mt-6 mb-6 pl-10 text-center">
                        <div className="text-left">€{item.price}</div>
                      </td>
                      <td className=" mt-6 mb-6 pl-10  text-center">
                        <div className="font-medium">{item.quantity}</div>
                      </td>
                      <td className=" mt-6 mb-6 pl-10 text-center pr-10">
                        <div className="font-medium">
                          €{(item.quantity * item.price).toFixed(2)}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-gray-500 text-center py-6">
                      No items found
                    </td>
                  </tr>
                )}
              </table>
            </div>
            {selectedOrder.orderNotes && (
              <div className=" border-2 rounded-xl p-5 w-full mt-10">
                <span className="font-medium">Customer notes: </span>
                {selectedOrder.orderNotes}
              </div>
            )}

            <div className="m-12 flex justify-center ">
              <button
                type="button"
                onClick={handleCloseModal}
                className="w-40 text-center rounded-xl border-2 border-primary bg-primary p-2 text-white  hover:text-black hover:border-gray-900"
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
