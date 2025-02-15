import Stripe from "stripe";
import { STRIPE_SECRET_KEY } from "../constants/constants.js";

const stripe = new Stripe(STRIPE_SECRET_KEY);

export default stripe;
