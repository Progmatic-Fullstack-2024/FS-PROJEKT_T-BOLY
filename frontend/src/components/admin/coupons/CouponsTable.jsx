import React, { useState, useEffect } from 'react';
import { IoMdAddCircle } from 'react-icons/io';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import AddNewCouponModal from './AddNewCouponModal.jsx';
import CopuonsTableSkeleton from './CouponsTableSkeleton.jsx';
import DeleteCouponModal from './DeleteCouponModal.jsx';
import couponService from '../../../services/couponsService.js';
import DisplayedProductsNumber from '../../products/DisplayedProductsNumber.jsx';
import Pagination from '../../products/Pagination.jsx';

export default function CouponsTable() {
  const [coupons, setCoupons] = useState([]);
  const [totalCoupons, setTotalCoupons] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        setIsLoading(true);
        const data = await couponService.getAllCoupons(searchParams.toString());
        setCoupons(data.coupons);
        setTotalCoupons(data.totalCoupons);
        setTotalPages(data.totalPages);
      } catch (error) {
        toast.error('Failed to fetch coupons');
      } finally {
        setIsLoading(true);
      }
    };

    fetchCoupons();
  }, [searchParams]);

  const handleDelete = async (deletedId) => {
    setCoupons((prevCoupons) => prevCoupons.filter((coupon) => coupon.id !== deletedId));
  };

  const handleCreate = async (newCoupon) => {
    setCoupons((prevCoupons) => [...prevCoupons, newCoupon]);
  };

  if (isLoading) {
    return <CopuonsTableSkeleton />;
  }

  return (
    <section className="py-3 sm:py-5">
      <div className="px-4 mx-auto max-w-screen-2xl lg:px-12">
        <div className="overflow-hidden bg-gray-50 bg-opacity-80 shadow-md sm:rounded-lg">
          <div className="relative overflow-hidden bg-gray-50 bg-opacity-80 shadow-md">
            <div className="flex flex-row items-center justify-between px-4 py-3">
              <h5 className="text-black">All Coupons: {totalCoupons}</h5>
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="flex items-center justify-center px-4 py-2 text-sm font-medium text-black rounded-lg bg-primary-700 border border-gray-400 hover:bg-primary focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                <IoMdAddCircle className="h-5 w-5 mr-2" /> Add New Coupon
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 bg-white">
                <thead className="text-xs text-gray-700 uppercase bg-primary">
                  <tr className="text-gray-700 uppercase bg-primary">
                    <th className="px-4 py-3 w-24 text-left text-gray-100 cursor-pointer">Code</th>
                    <th className="px-4 py-3 w-48 text-center text-gray-100 cursor-pointer">
                      Discount
                    </th>
                    <th className="px-4 py-3 w-48 text-center text-gray-100 cursor-pointer">
                      Valid From
                    </th>
                    <th className="px-4 py-3 w-48 text-center text-gray-100 cursor-pointer">
                      Valid To
                    </th>
                    <th className="px-4 py-3 w-48 text-gray-100 cursor-pointer text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {coupons.map((coupon) => (
                    <tr
                      key={coupon.id}
                      className="border-b dark:border-gray-600 hover:bg-orange-200"
                    >
                      <td className="px-4 py-5">{coupon.code}</td>
                      <td className="px-4 py-5 text-center">{coupon.discount}%</td>
                      <td className="px-4 py-5 text-center">
                        {new Date(coupon.validFrom).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {new Date(coupon.validTo).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <DeleteCouponModal coupon={coupon} onDelete={handleDelete} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {isOpen && <AddNewCouponModal setIsOpen={setIsOpen} onCreate={handleCreate} />}
          </div>
          <div className="bg-primary bg-opacity-20 flex items-center justify-between p-8">
            <DisplayedProductsNumber totalProducts={totalCoupons} />
            <Pagination totalPages={totalPages} />
          </div>
        </div>
      </div>
    </section>
  );
}
