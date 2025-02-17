import React, { useEffect, useState } from 'react';
import { BsSortUp, BsSortDownAlt } from 'react-icons/bs';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import OrderRow from './OrderRow';
import orderService from '../../services/orderService';
import DisplayedProductsNumber from '../products/DisplayedProductsNumber.jsx';
import Pagination from '../products/Pagination.jsx';

export default function OrdersTable() {
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const sorting = searchParams.get('sorting');
  const order = searchParams.get('order');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderService.getAllOrders(searchParams.toString());
        setOrders(data.orders);
        setTotalOrders(data.totalOrders);
        setTotalPages(data.totalPages);
      } catch (error) {
        toast.error('Failed to fetch orders');
      }
    };

    fetchOrders();
  }, [searchParams]);

  const handleSort = (column) => {
    if (column === 'userLastName') {
      searchParams.set('sorting', 'lastName');
      searchParams.set('table', 'user');
      searchParams.set('order', order === 'asc' ? 'desc' : 'asc');
    }
    if (column === 'userEmail') {
      searchParams.set('sorting', 'email');
      searchParams.set('table', 'user');
      searchParams.set('order', order === 'asc' ? 'desc' : 'asc');
    }
    if (column === 'userAddress') {
      searchParams.set('sorting', 'address');
      searchParams.set('table', 'user');
      searchParams.set('order', order === 'asc' ? 'desc' : 'asc');
    }
    if (column === 'totalPrice') {
      searchParams.set('sorting', 'totalPrice');
      searchParams.set('table', 'order');
      searchParams.set('order', order === 'asc' ? 'desc' : 'asc');
    }
    if (column === 'createdAt') {
      searchParams.set('sorting', 'createdAt');
      searchParams.set('table', 'order');
      searchParams.set('order', order === 'asc' ? 'desc' : 'asc');
    }
    if (column === 'status') {
      searchParams.set('sorting', 'status');
      searchParams.set('table', 'order');
      searchParams.set('order', order === 'asc' ? 'desc' : 'asc');
    } else {
      searchParams.set('page', 1);
      searchParams.set('limit', 9);
      setSearchParams(searchParams);
    }
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
          <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4 dark:bg-gray-700 dark:border-primary dark:border">
            <div className="flex items-center flex-1 space-x-4">
              <h5>
                <span className="text-black dark:text-primary">All Orders: </span>
                <span className="text-black dark:text-primary">{totalOrders}</span>
              </h5>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 overflow-x-scroll dark:text-primary">
              <thead className="text-xs text-gray-700 uppercase bg-primary dark:bg-gray-800 dark:text-primary dark:border-primary dark:border">
                <tr>
                  <th
                    onClick={() => handleSort('userLastName')}
                    className="px-4 py-3 w-48 text-left text-gray-100 cursor-pointer dark:text-orange-600"
                  >
                    Costumer Name
                    {renderSortIcon('lastName')}
                  </th>
                  <th
                    onClick={() => handleSort('userEmail')}
                    className="px-4 py-3 w-48 text-left text-gray-100 cursor-pointer dark:text-orange-600"
                  >
                    Email {renderSortIcon('email')}
                  </th>

                  <th
                    onClick={() => handleSort('userAddress')}
                    className="px-4 py-3 w-48 text-left text-gray-100 dark:text-orange-600"
                  >
                    Address {renderSortIcon('address')}
                  </th>

                  <th
                    onClick={() => handleSort('totalPrice')}
                    className="px-4 py-3 text-left text-gray-100 cursor-pointer hidden md:table-cell dark:text-orange-600"
                  >
                    Paid
                    {renderSortIcon('totalPrice')}
                  </th>
                  <th
                    onClick={() => handleSort('status')}
                    className="px-4 py-3  text-left text-gray-100 dark:text-orange-600"
                  >
                    Status
                    {renderSortIcon('status')}
                  </th>
                  <th
                    onClick={() => handleSort('createdAt')}
                    className="px-4 py-3  text-left text-gray-100 cursor-pointer dark:text-orange-600"
                  >
                    Created
                    {renderSortIcon('createdAt')}
                  </th>
                  <th className="px-4 py-3  text-center text-gray-100  w-10 dark:text-orange-600">Ordered products</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((torder) => (
                  <OrderRow key={torder.id} order={torder} />
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-primary bg-opacity-20 flex items-center justify-between p-8 dark:bg-gray-800 dark:border-primary dark:border">
            <DisplayedProductsNumber totalProducts={totalOrders} />
            <Pagination totalPages={totalPages} />
          </div>
        </div>
      </div>
    </section>
  );
}
