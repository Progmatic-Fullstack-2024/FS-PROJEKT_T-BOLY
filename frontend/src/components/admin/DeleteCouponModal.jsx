import { useState } from 'react';
import { FiTrash } from 'react-icons/fi';
import { toast } from 'react-toastify';

import couponService from '../../services/couponsService';

export default function DeleteCouponModal({ coupon, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await couponService.deleteCoupon(coupon.id);
      onDelete(coupon.id);
      toast.success('Coupon deleted successfully!');
      setIsOpen(false);
    } catch (error) {
      toast.error('Failed to delete coupon');
    }
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} type="button" className="h-full text-red-500">
        <FiTrash />
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900">
                Are you sure you want to delete coupon {coupon.code}?
              </h3>
              <div className="mt-4 flex justify-center space-x-4">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-800"
                >
                  Yes, delete
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
