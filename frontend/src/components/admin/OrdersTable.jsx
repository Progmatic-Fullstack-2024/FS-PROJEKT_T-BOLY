import React, { useEffect, useState } from 'react';
import { BsSortUp, BsSortDownAlt } from 'react-icons/bs';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import OrderRow from './OrderRow';
import orderService from '../../services/orderService';

export default function OrdersTable() {
  const [orders, setOrders] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const sorting = searchParams.get('sorting');
  const order = searchParams.get('order');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderService.getAllOrders(searchParams.toString());
        setOrders(data);
      } catch (error) {
        toast.error('Failed to fetch orders');
      }
    };

    fetchOrders();
  }, [searchParams]);

  const handleSort = (column) => {
    if (sorting === column) {
      searchParams.set('order', order === 'asc' ? 'desc' : 'asc');
    } else {
      searchParams.set('sorting', column);
      searchParams.set('order', 'asc');
    }
    searchParams.set('page', 1);
    searchParams.set('limit', 9);
    setSearchParams(searchParams);
  };

  const renderSortIcon = (column) => {
    if (sorting === column) {
      return order === 'asc' ? (
        <BsSortUp className="inline w-5 h-5 ml-1" />
      ) : (
        <BsSortDownAlt className="inline w-5 h-5 ml-1" />
      );
    }
    return null;
  };
  return (
    <section className="py-3 sm:py-5">
      <div className="px-4 mx-auto max-w-screen-2xl lg:px-12">
        <div className="relative overflow-hidden bg-gray-50 bg-opacity-80 shadow-md sm:rounded-lg">
          <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
            <div className="flex items-center flex-1 space-x-4">
              <h5>
                <span className="text-black">All Orders: </span>
                <span className="text-black">valahány</span>
              </h5>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 overflow-x-scroll">
              <thead className="text-xs text-gray-700 uppercase bg-primary">
                <tr>
                  <th
                    onClick={() => handleSort('firstName')}
                    className="px-4 py-3 w-48 text-left text-gray-100 cursor-pointer"
                  >
                    Costumer Name
                    {renderSortIcon('firstName')}
                  </th>
                  <th
                    onClick={() => handleSort('email')}
                    className="px-4 py-3 w-48 text-left text-gray-100 cursor-pointer"
                  >
                    Costumer Email {renderSortIcon('email')}
                  </th>
                  <th className="px-4 py-3 w-48 text-left text-gray-100 ">Costumer Adress</th>
                  <th
                    onClick={() => handleSort('totalPrice')}
                    className="px-4 py-3 text-left text-gray-100 cursor-pointer hidden md:table-cell"
                  >
                    Payed
                    {renderSortIcon('totalPrice')}
                  </th>
                  <th className="px-4 py-3  text-left text-gray-100">Status</th>
                  <th
                    onClick={() => handleSort('status')}
                    className="px-4 py-3  text-left text-gray-100 cursor-pointer"
                  >
                    Created
                    {renderSortIcon('status')}
                  </th>
                  <th className="px-4 py-3  text-center text-gray-100  w-10">Ordered products</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((torder) => (
                  <OrderRow key={torder.id} order={torder} />
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-primary bg-opacity-20 flex items-center justify-between p-8">
            {/* <DisplayedProductsNumber totalProducts={totalUsers} />
            <Pagination totalPages={totalPages} /> */}
          </div>
        </div>
      </div>
    </section>
  );
}
