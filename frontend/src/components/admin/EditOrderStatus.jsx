import React, { useState } from 'react';
import orderService from '../../services/orderService';
import { toast } from 'react-toastify';

export default function EditOrderStatus({ order }) {
  const [status, setStatus] = useState(order.status);

  const handleChange = async (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus);
    try {
      await orderService.updateOrder(order.id, { ...order, status: newStatus });
      toast.success(`Status updated to ${newStatus} `);
    } catch (error) {
      toast.error('Failed to update role');
      setStatus(order.status);
    }
  };
  return (
    <select
      value={status}
      onChange={handleChange}
      className="border border-gray-300 rounded p-1 bg-white"
    >
      <option value="AWAITING PAYMENT">AWAITING PAYMENT</option>
      <option value="PROCESSING">PROCESSING</option>
      <option value="PACKED">PACKED</option>
      <option value=" OUTFORDELIVERY"> OUTFORDELIVERY</option>
      <option value="  DELIVERED"> DELIVERED</option>
      <option value="  COMPLETED"> COMPLETED</option>
      <option value=" CANCELED"> CANCELED</option>
    </select>
  );
}
