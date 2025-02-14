import {
  useStripe,
  useElements,
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from '@stripe/react-stripe-js';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import paymentService from '../../services/paymentService';

const PaymentSchema = Yup.object().shape({
  name: Yup.string().required('Name is required').min(2, 'Too short').max(50, 'Too long'),
});

const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': { color: '#aab7c4' },
    },
    invalid: { color: '#9e2146' },
  },
};

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [cardType, setCardType] = useState(null);

  const handleSubmit = async (values, { resetForm }) => {
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      const clientSecret = await paymentService.createPaymentIntent({
        amount: 1000,
        currency: 'usd',
      });

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: { name: values.name },
        },
      });

      if (stripeError) {
        toast.error(`Error: ${stripeError.message}`);
      } else {
        resetForm();
        toast.success(`Payment Successful! ID: ${paymentIntent.id}`);

        elements.getElement(CardNumberElement).clear();
        elements.getElement(CardExpiryElement).clear();
        elements.getElement(CardCvcElement).clear();
      }
    } catch (error) {
      toast.error('Payment failed');
    } finally {
      setLoading(false);
    }
  };

  const handleCardChange = (event) => {
    if (event.complete) {
      setCardType(event.brand);
    } else {
      setCardType(null);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <Formik initialValues={{ name: '' }} validationSchema={PaymentSchema} onSubmit={handleSubmit}>
        {() => (
          <Form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name on card
              </label>
              <Field
                name="name"
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Card Number</label>
              <CardNumberElement
                onChange={handleCardChange}
                options={cardElementOptions}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
             
            </div>

            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Expiration date</label>
                <CardExpiryElement
                  options={cardElementOptions}
                  className="imt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">CVC</label>
                <CardCvcElement
                  options={cardElementOptions}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!stripe || loading}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              {loading ? 'Processing...' : 'Pay'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
