import stripe from "../config/stripeConfig.js";
import HttpError from "../utils/HttpError.js";

const createPaymentIntent = async (amount, currency = "usd") => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency,
  });
  if (!paymentIntent) throw new HttpError("Error creating payment intent", 401);

  return paymentIntent;
};

export default { createPaymentIntent };
