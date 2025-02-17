import axiosInstance from './axiosInstance';

const createCoupon = async (couponData) => {
  const response = await axiosInstance.post('/api/coupons', couponData);
  return response.data;
};

const getAllCoupons = async (searchParams) => {
  const response = await axiosInstance.get(`/api/coupons?${searchParams}`);
  return response.data;
};

const deleteCoupon = async (id) => {
  const response = await axiosInstance.delete(`/api/coupons/${id}`);
  return response.data;
};

const getCouponByCode = async (code) => {
  const response = await axiosInstance.get(`/api/coupons/code/${code}`);
  return response.data;
};

export default {
  createCoupon,
  getAllCoupons,
  deleteCoupon,
  getCouponByCode,
};
