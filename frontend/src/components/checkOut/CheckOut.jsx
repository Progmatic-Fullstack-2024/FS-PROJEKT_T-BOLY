import {
  useStripe,
  useElements,
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from '@stripe/react-stripe-js';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import DeliveryInfo from './DeliveryInfo';
import OrderTable from './OrderTable';
import amexLogo from '../../assets/card icons/amex.png';
import masterCardLogo from '../../assets/card icons/card.png';
import visaLogo from '../../assets/card icons/visa.png';
import AuthContext from '../../contexts/AuthContext';
import CartContext from '../../contexts/CartContext';
import LanguageContext from '../../contexts/LanguageContext';
import orderService from '../../services/orderService';
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
  const { t } = useContext(LanguageContext);
  const { cart, totalPrice, clearCart, setCoupon } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    street: user.adress?.split(', ')[3] || '',
    houseNumber: user.adress?.split(', ')[4] || '',
    country: user.adress?.split(', ')[0] || '',
    city: user.adress?.split(', ')[1] || '',
    postalCode: user.adress?.split(', ')[2] || '',
    phoneNumber: 'soon',
    email: user.email,
    orderNotes: '',
    billingStreet: user.billingAdress?.split(', ')[3] || '',
    billingHouseNumber: user.billingAdress?.split(', ')[4] || '',
    billingCountry: user.billingAdress?.split(', ')[0] || '',
    billingCity: user.billingAdress?.split(', ')[1] || '',
    billingPostalCode: user.billingAdress?.split(', ')[2] || '',
    isSameAdress: true,
  });

  const navigate = useNavigate();

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
        
        await orderService.createOrder({
          totalPrice,
          orderItems: cart,
          adress: `${formData.country}, ${formData.city}, ${formData.postalCode}, ${formData.street}, ${formData.houseNumber}`,
          billingAdress: formData.isSameAdress
            ? `${formData.country}, ${formData.city}, ${formData.postalCode}, ${formData.street}, ${formData.houseNumber}`
            : `${formData.billingCountry}, ${formData.billingCity}, ${formData.billingPostalCode}, ${formData.billingStreet}, ${formData.billingHouseNumber}`,
          phoneNumber: formData.phoneNumber,
          status: 'PROCESSING',
        });

        clearCart();
        setCoupon('');
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

  const getCardLogo = (brand) => {
    switch (brand) {
      case 'visa':
        return visaLogo;
      case 'mastercard':
        return masterCardLogo;
      case 'amex':
        return amexLogo;

      default:
        return '/images/default-logo.png';
    }
  };

  if (!cart.length) {
    return navigate('/profile_page/orders');
  }
  return (
    <div className="mr-60 ml-60 mt-28 mb-28">
      <h1 className="text-primary mb-20 text-3xl font-medium">Check out</h1>
      <div className="flex gap-32">
        <div className="flex flex-col gap-20 w-3/5">
          <DeliveryInfo formData={formData} setFormData={setFormData} />
          <div className="p-12 border-2 rounded-2xl">
            <h1 className="text-2xl font-medium mb-6">Payment</h1>
            <div className="flex items-center mb-4 justify-between ml-3 ">
              <label className="flex items-center font-medium">
                <input
                  type="radio"
                  name="accept"
                  checked
                  className="mr-3 appearance-none rounded-full w-3 h-3 checked:bg-primary border-2 border-white checked:ring-1 ring-primary"
                />
                {t('Credit card')}
              </label>
              <div className="flex items-center gap-4">
                <img src={masterCardLogo} alt="" className="h-5 w-9 m-2" />
                <img src={visaLogo} alt="" className="h-9 w-9 m-2" />
                <img src={amexLogo} alt="" className="h-9 w-9" />
              </div>
            </div>

            <Formik
              initialValues={{ name: '' }}
              validationSchema={PaymentSchema}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form>
                  <div className="flex flex-col gap-6 mb-8">
                    <div>
                      <label htmlFor="name" className="block mb-1 font-medium">
                        {t('name on card')}
                      </label>
                      <Field
                        name="name"
                        type="text"
                        className="block w-full px-4 py-2 border-2 rounded-xl text-gray-700 focus:outline-none focus:border-2 focus:border-primary"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 font-medium">{t('card number')}</label>
                      <div className="flex">
                        {cardType && (
                          <div className="mt- mr-2">
                            <img
                              src={getCardLogo(cardType)}
                              alt={cardType}
                              className="inline-block h-8 "
                            />
                          </div>
                        )}
                        <CardNumberElement
                          onChange={handleCardChange}
                          options={cardElementOptions}
                          className="block w-full px-4 py-2 border-2 rounded-xl text-gray-700 focus:outline-none focus:border-2 focus:border-primary"
                        />
                      </div>
                    </div>{' '}
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block mb-1 font-medium">{t('expiration date')}</label>
                        <CardExpiryElement
                          options={cardElementOptions}
                          className="block w-full px-4 py-2 border-2 rounded-xl text-gray-700 focus:outline-none focus:border-2 focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block mb-1 font-medium">CVC</label>
                        <CardCvcElement
                          options={cardElementOptions}
                          className="block w-full px-4 py-2 border-2 rounded-xl text-gray-700 focus:outline-none focus:border-2 focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={!stripe || loading}
                    className="w-full text-center rounded-xl border-2 border-primary bg-primary p-2 text-white  hover:text-black hover:border-gray-900"
                  >
                    {loading ? t('processing') : t('pay')}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <OrderTable />
      </div>
    </div>
  );
}
