import paymentService from "../services/payment-service.js";

const handleCreatePaymentIntent = async (req, res, next) => {
  const { amount, currency } = req.body;
  try {
    const paymentIntent = await paymentService.createPaymentIntent(
      amount,
      currency,
    );
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    next(error);
  }
};

export default { handleCreatePaymentIntent };
