import { Elements } from '@stripe/react-stripe-js';

import CheckoutForm from './CheckOut';
import { stripePromise } from '../../utils/stripe';

export default function Payment() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
