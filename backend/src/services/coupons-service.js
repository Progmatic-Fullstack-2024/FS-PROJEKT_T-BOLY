import prisma from "../models/prismaClient.js";
import HttpError from "../utils/HttpError.js";

const getAllCoupons = async (pageNumber, limitNumber, search) => {
  const where = search
    ? { code: { contains: search, mode: "insensitive" } }
    : undefined;

  const skip = (pageNumber - 1) * limitNumber;
  const take = limitNumber;

  const coupons = await prisma.coupon.findMany({
    where,
    skip,
    take,
  });

  const totalCoupons = await prisma.coupon.count({ where });
  const totalPages = Math.ceil(totalCoupons / limitNumber);

  return { coupons, totalCoupons, totalPages };
};
const getCouponById = async (id) => {
  const coupon = await prisma.coupon.findUnique({ where: { id } });
  if (!coupon) throw new HttpError("Coupon not found", 404);
  return coupon;
};

const createCoupon = async (couponData) =>
  prisma.coupon.create({ data: couponData });

const updateCoupon = async (id, couponData) =>
  prisma.coupon.update({
    where: { id },
    data: couponData,
  });

const deleteCoupon = async (id) => prisma.coupon.delete({ where: { id } });

const getCouponByCode = async (code) =>
  prisma.coupon.findFirst({ where: { code } });

export default {
  getAllCoupons,
  getCouponById,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  getCouponByCode,
};
