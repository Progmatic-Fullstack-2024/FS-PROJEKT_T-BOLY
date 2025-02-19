import { t } from 'i18next';
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
    AWAITINGPAYMENT: t('waiting for payment'),
    PROCESSING: t('processing'), // --Delivery processing
    PACKED: t('packed'),
    OUTFORDELIVERY: t('out for delivery'),
    DELIVERED: t('delivered'),
    COMPLETED: t(`completed`),
    CANCELED: t(`canceled`),
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
    <div className="md:mx-auto md:w-full bg-white rounded-lg shadow-md md:p-16 p-5 dark:bg-gray-700 dark:border-primary dark:border">
      <h1 className="text-xl font-bold text-gray-700 mb-10 dark:text-primary">
        {t(`your orders`)}
      </h1>

      {/* mobile */}

      <div className="md:hidden space-y-8">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order.id}
              className="flex flex-col gap-2 border p-6 rounded-lg shadow-md bg-white dark:bg-gray-700 dark:border-primary"
            >
              <div className="dark:text-primary">
                <span className="font-semibold">Order ID:</span> {order.id}
              </div>
              <div className=" dark:text-primary">
                <span className="font-semibold">Order date:</span> {order.formattedDate}
              </div>
              <div className="font-medium dark:text-primary">
                <span className="font-semibold">Total price:</span> €{order.totalPrice.toFixed(2)}
              </div>
              <div className="font-medium dark:text-primary">
                <span className="font-semibold">Status:</span> {order.formattedStatus}
              </div>
              <button
                type="button"
                onClick={() => handleViewDetails(order)}
                className="mt-4 w-full rounded-xl border-2 border-primary bg-primary p-2 text-white"
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No orders found</p>
        )}
      </div>

      <div className="hidden md:block">
        <table className="md:w-full border-collapse border-b border-gray-300 dark:text-primary dark:border-primary">
          <thead>
            <tr className="bg-primary dark:bg-gray-800 dark:border-primary dark:border">
              <th className="py-6 px-12 text-left font-bold text-white dark:text-orange-600">
                {t(`order`)} ID
              </th>
              <th className="py-6 px-12 text-left font-bold text-white dark:text-orange-600">
                {t(`order date`)}
              </th>
              <th className="py-6 px-12 text-left font-bold text-white dark:text-orange-600">
                {t(`total price`)}
              </th>
              <th className="py-6 px-12 text-left font-bold text-white dark:text-orange-600">
                {t(`status`)}
              </th>
              <th className="py-6 px-12 text-left font-bold text-white dark:text-orange-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order.id}
                  className={`border-t border-gray-300 ${hoveredOrderId === order.id ? 'bg-primary-light dark:bg-gray-600' : ''}`}
                  onMouseEnter={() => setHoveredOrderId(order.id)}
                  onMouseLeave={() => setHoveredOrderId(null)}
                >
                  <td className="py-10 px-12 text-left font-medium text-gray-900 dark:text-primary">
                    {order.id}
                  </td>
                  <td className="py-10 px-12 text-left font-medium text-gray-900 dark:text-primary">
                    {order.formattedDate}
                  </td>
                  <td className="py-10 px-12 text-left font-medium text-gray-900 dark:text-primary">
                    €{order.totalPrice.toFixed(2)}
                  </td>
                  <td className="py-10 px-12 text-left font-medium text-gray-900 dark:text-primary">
                    {order.formattedStatus}
                  </td>
                  <td className="py-10 px-12 text-left">
                    <button
                      type="button"
                      onClick={() => handleViewDetails(order)}
                      className="w-28 rounded-xl border-2 border-primary bg-primary p-2 text-white  hover:text-black hover:border-gray-900"
                    >
                      {t(`view details`)}
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
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-[100]">
          <div className="relative bg-white md:p-10 p-4 rounded-lg shadow-lg md:w-3/5 w-11/12 max-h-[90vh] overflow-y-auto dark:bg-gray-800  dark:border-primary dark:border">
            <h2 className="text-2xl font-bold mb-8">{t(`order details`)}</h2>
            <button
              type="button"
              onClick={handleCloseModal}
              className="absolute md:top-10 top-6 md:-right-24 -right-28 rounded-xl text-2xl w-40 hover:text-primary dark:hover:text-white"
            >
              <RxCross2 />
            </button>
            <div className="md:flex gap-10">
              <div className="flex flex-col gap-3 border-2 rounded-xl md:p-5 p-3 md:w-1/3 dark:bg-gray-700 dark:border-primary dark:border md:mb-0 mb-5">
                <div>
                  <span className="font-medium dark:text-orange-600">{t(`order`)} ID:</span>{' '}
                  {selectedOrder.id}
                </div>
                <div>
                  <span className="font-medium dark:text-orange-600">{t(`order date`)}:</span>{' '}
                  {selectedOrder.formattedDate}
                </div>
                <div className="font-medium dark:text-orange-600">
                  {t(`total price`)}: €{selectedOrder.totalPrice.toFixed(2)}
                </div>
                <div className="font-medium dark:text-orange-600">
                  Total Price: €{selectedOrder.totalPrice.toFixed(2)}
                </div>
                <div className="text-xl font-medium text-primary dark:text-orange-600">
                  {t(`status`)}: {selectedOrder.formattedStatus}
                </div>
              </div>
              <div className="flex flex-col gap-3 border-2 rounded-xl md:p-5 p-3 md:w-2/3 dark:bg-gray-700 dark:border-primary dark:border">
                <div>
                  <span className="font-medium dark:text-orange-600">{t(`name`)}: </span>
                  {user.firstName} {user.lastName}
                </div>
                <div>
                  <span className="font-medium dark:text-orange-600">{t(`phone number`)}: </span>
                  {selectedOrder.phoneNumber}
                </div>
                <div>
                  <h2 className="font-medium dark:text-orange-600">{t(`delivery address`)}:</h2>
                  <div> {selectedOrder.address}</div>
                </div>
                <div>
                  <h2 className="font-medium dark:text-orange-600">{t(`billing address`)}:</h2>
                  <div> {selectedOrder.billingAddress}</div>
                </div>
              </div>
            </div>

            <div className="w-full border-2 rounded-xl md:p-10 p-3 h-fit md:mt-10 mt-5 dark:bg-gray-700 dark:border-primary dark:border">
              <h1 className="text-xl font-medium md:mb-10 mb-8">{t(`order items`)}</h1>

              {/* mobile */}

              <div className="md:hidden flex flex-col gap-6">
                {orderItems.length > 0 ? (
                  orderItems.map((item) => (
                    <div
                      key={item.id}
                      className="border-2 rounded-xl p-4 mb-6 dark:bg-gray-700 dark:border-primary dark:border"
                    >
                      <div className="flex gap-4">
                        <Link to={`/products/${item.productId}`}>
                          <img
                            className="object-contain rounded-2xl w-28 h-28 mr-3 dark:bg-gray-800 dark:border-primary"
                            src={item.product.pictureUrl}
                            alt=""
                          />
                        </Link>
                        <div className="flex flex-col ">
                          <div className="font-medium">{item.product.name}</div>
                          <div>Price: €{item.price.toFixed(2)}</div>
                          <div>Quantity: {item.quantity}</div>
                          <div className="font-medium">
                            Subtotal: €{(item.quantity * item.price).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 text-center py-6">No items found</div>
                )}
              </div>

              {/* desktop */}

              <table className="hidden md:table w-full">
                <thead>
                  <tr className="bg-primary text-white rounded-xl border-gray-300">
                    <th colSpan={2} className="text-left pt-5 pb-5 pl-10">
                      {t(`product`)}
                    </th>
                    <th className="text-left pt-5 pb-5 pl-10">{t(`price`)}</th>
                    <th className="text-left pt-5 pb-5 pl-10">{t(`quantity`)}</th>
                    <th className="text-left pt-5 pb-5 pl-10 pr-10">{t(`subtotal`)}</th>
                  </tr>
                </thead>
                {orderItems.length > 0 ? (
                  orderItems.map((item) => (
                    <tr key={item.id} className="border-b dark:border-primary">
                      <div className="w-32 h-32 ">
                        <Link to={`/products/${item.productId}`}>
                          <img
                            className="border-2 object-contain rounded-2xl mt-6 mb-6 p-2 w-28 h-28 hover:border-gray-900 dark:bg-gray-800 dark:border-primary dark:border dark:text-primary"
                            src={item.product.pictureUrl}
                            alt=""
                          />
                        </Link>
                      </div>
                      <td className=" mt-6 mb-6 pl-10 text-left">
                        <div className="font-medium mr-10">{item.product.name}</div>
                      </td>
                      <td className="mt-6 mb-6 pl-10 text-center">
                        <div className="text-left">€{item.price.toFixed(2)}</div>
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
              <div className=" border-2 rounded-xl md:p-5 p-3 w-full md:mt-10 mt-5">
                <span className="font-medium">{t(`customer notes`)}: </span>
                {selectedOrder.orderNotes}
              </div>
            )}

            <div className="m-12 flex justify-center ">
              <button
                type="button"
                onClick={handleCloseModal}
                className="w-40 text-center rounded-xl border-2 border-primary bg-primary p-2 text-white  hover:text-black hover:border-gray-900"
              >
                {t(`close`)}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
