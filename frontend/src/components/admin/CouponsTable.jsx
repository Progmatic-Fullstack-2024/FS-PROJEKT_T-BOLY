import React, { useState, useEffect } from 'react';
import { IoMdAddCircle } from 'react-icons/io';
import { toast } from 'react-toastify';

import AddNewCouponModal from './AddNewCouponModal.jsx';
import DeleteCouponModal from './DeleteCouponModal.jsx';
import couponService from '../../services/couponsService.js';

export default function CouponsTable() {
  const [coupons, setCoupons] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const data = await couponService.getAllCoupons();
        setCoupons(data);
      } catch (error) {
        toast.error('Failed to fetch coupons');
      }
    };

    fetchCoupons();
  }, []);

  const handleDelete = async (deletedId) => {
    setCoupons((prevCoupons) => prevCoupons.filter((coupon) => coupon.id !== deletedId));
  };

  const handleCreate = async (newCoupon) => {
    setCoupons((prevCoupons) => [...prevCoupons, newCoupon]);
  };

  return (
    <section className="py-3 sm:py-5">
      <div className="px-4 mx-auto max-w-screen-2xl lg:px-12">
        <div className="relative overflow-hidden bg-gray-50 bg-opacity-80 shadow-md sm:rounded-lg">
          <div className="flex flex-row justify-between px-4 py-3">
            <h5 className="text-black">Coupons</h5>
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="flex items-center px-4 py-2 text-sm font-medium text-black rounded-lg bg-primary hover:bg-orange-600"
            >
              <IoMdAddCircle className="h-5 w-5 mr-2" /> Add New Coupon
            </button>
          </div>
          <table className="w-full text-sm text-left text-gray-500 bg-white">
            <thead>
              <tr className="text-gray-700 uppercase bg-primary">
                <th className="px-4 py-3">Code</th>
                <th className="px-4 py-3">Discount</th>
                <th className="px-4 py-3">Valid From</th>
                <th className="px-4 py-3">Valid To</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon) => (
                <tr key={coupon.id} className="border-b">
                  <td className="px-4 py-3">{coupon.code}</td>
                  <td className="px-4 py-3">{coupon.discount}%</td>
                  <td className="px-4 py-3">{new Date(coupon.validFrom).toLocaleDateString()}</td>
                  <td className="px-4 py-3">{new Date(coupon.validTo).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-center">
                    <DeleteCouponModal coupon={coupon} onDelete={handleDelete} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {isOpen && <AddNewCouponModal setIsOpen={setIsOpen} onCreate={handleCreate} />}
        </div>
      </div>
    </section>
  );
}
