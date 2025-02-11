
import axiosInstance from "./axiosInstance";

const createCoupon = async (couponData) => {
  const response = await axiosInstance.post("/api/coupons", couponData);
  return response.data;
};

const getAllCoupons = async () => {
  const response = await axiosInstance.get("/api/coupons");
  return response.data;
};

const deleteCoupon = async (id) => {
  const response = await axiosInstance.delete(`/api/coupons/${id}`);
  return response.data;
};

export default {
  createCoupon,
  getAllCoupons,
  deleteCoupon,
};
