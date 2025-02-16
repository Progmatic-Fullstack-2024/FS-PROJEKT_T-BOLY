import couponsService from "../services/coupons-service.js";

const getAllCoupons = async (req, res, next) => {
  try {
    const coupons = await couponsService.getAllCoupons();
    res.status(200).json(coupons);
  } catch (error) {
    next(error);
  }
};

const getCouponById = async (req, res, next) => {
  try {
    const coupon = await couponsService.getCouponById(req.params.id);
    res.status(200).json(coupon);
  } catch (error) {
    next(error);
  }
};

const createCoupon = async (req, res, next) => {
  try {
    const newCoupon = await couponsService.createCoupon(req.body);
    res.status(201).json(newCoupon);
  } catch (error) {
    next(error);
  }
};

const updateCoupon = async (req, res, next) => {
  try {
    const updatedCoupon = await couponsService.updateCoupon(
      req.params.id,
      req.body,
    );
    res.status(200).json(updatedCoupon);
  } catch (error) {
    next(error);
  }
};

const deleteCoupon = async (req, res, next) => {
  try {
    await couponsService.deleteCoupon(req.params.id);
    res.status(200).json({ message: "Coupon deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const getCouponByCode = async (req, res, next) => {
  const { code } = req.params;
  try {
    const coupon = await couponsService.getCouponByCode(code);
    res.status(200).json(coupon);
  } catch (error) {
    next(error);
  }
};

export default {
  getAllCoupons,
  getCouponById,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  getCouponByCode,
};
