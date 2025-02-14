import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '../../utils/stripe';
import CheckoutForm from './CheckOut';


export default function Payment() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
