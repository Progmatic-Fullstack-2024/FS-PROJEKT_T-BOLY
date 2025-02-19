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
  const [showModal, setShowModal] = useState(false);
  const [cardType, setCardType] = useState(null);
  const { t } = useContext(LanguageContext);
  const { cart, totalPrice, clearCart, setCoupon } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    street: user.address?.split(', ')[3] || '',
    houseNumber: user.address?.split(', ')[4] || '',
    country: user.address?.split(', ')[0] || '',
    city: user.address?.split(', ')[1] || '',
    postalCode: user.address?.split(', ')[2] || '',
    phoneNumber: '',
    email: user.email,
    orderNotes: '',
    billingStreet: user.billingAddress?.split(', ')[3] || '',
    billingHouseNumber: user.billingAddress?.split(', ')[4] || '',
    billingCountry: user.billingAddress?.split(', ')[0] || '',
    billingCity: user.billingAddress?.split(', ')[1] || '',
    billingPostalCode: user.billingAddress?.split(', ')[2] || '',
    isSameAddress: true,
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

      const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: { name: values.name },
        },
      });

      if (stripeError) {
        toast.error(`Error: ${stripeError.message}`);
      } else {
        resetForm();

        elements.getElement(CardNumberElement).clear();
        elements.getElement(CardExpiryElement).clear();
        elements.getElement(CardCvcElement).clear();

        await orderService.createOrder({
          totalPrice,
          orderItems: cart,
          address: `${formData.country}, ${formData.city}, ${formData.postalCode}, ${formData.street}, ${formData.houseNumber}`,
          billingAddress: formData.isSameAddress
            ? `${formData.country}, ${formData.city}, ${formData.postalCode}, ${formData.street}, ${formData.houseNumber}`
            : `${formData.billingCountry}, ${formData.billingCity}, ${formData.billingPostalCode}, ${formData.billingStreet}, ${formData.billingHouseNumber}`,
          phoneNumber: formData.phoneNumber,
          status: 'PROCESSING',
          orderNotes: formData.orderNotes,
        });

        setCoupon('');
        setShowModal(true);
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

  const closeModal = () => {
    setShowModal(false);
    navigate('/profile_page/orders');
    clearCart();
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
          <div className="p-12 border-2 rounded-2xl dark:border-primary dark:border dark:text-primary dark:bg-gray-700">
            <h1 className="text-2xl font-medium mb-6">Payment</h1>
            <div className="flex items-center mb-4 justify-between ml-3">
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
                        className="block w-full px-4 py-2 border-2 rounded-xl text-gray-700 focus:outline-none focus:border-2 focus:border-primary dark:border-primary dark:border dark:text-primary dark:placeholder-primary dark:bg-gray-800"
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
                              className="inline-block h-8"
                            />
                          </div>
                        )}
                        <CardNumberElement
                          onChange={handleCardChange}
                          options={cardElementOptions}
                          className="block w-full px-4 py-2 border-2 rounded-xl text-gray-700 focus:outline-none focus:border-2 focus:border-primary dark:border-primary dark:border dark:text-primary dark:placeholder-primary dark:bg-gray-800"
                        />
                      </div>
                    </div>{' '}
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block mb-1 font-medium">{t('expiration date')}</label>
                        <CardExpiryElement
                          options={cardElementOptions}
                          className="block w-full px-4 py-2 border-2 rounded-xl focus:outline-none focus:border-2 focus:border-primary dark:border-primary dark:border dark:placeholder-primary dark:bg-gray-800"
                        />
                      </div>
                      <div>
                        <label className="block mb-1 font-medium">CVC</label>
                        <CardCvcElement
                          options={cardElementOptions}
                          className="block w-full px-4 py-2 border-2 rounded-xl text-gray-700 focus:outline-none focus:border-2 focus:border-primary dark:border-primary dark:border dark:text-primary dark:placeholder-primary dark:bg-gray-800"
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
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-12 rounded-xl max-w-lg mx-auto transform -translate-y-40 w-1/4 dark:bg-gray-700 dark:border-primary dark:border">
            <div className="text-2xl font-medium mb-10 text-center text-primary">
              Successful payment!
            </div>
            <div className="text-xl font-medium mb-10 text-center">
              Thank you for your purchase!
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                onClick={closeModal}
                className="w-28 rounded-xl border-2 border-primary bg-primary p-2 text-white  hover:text-black hover:border-gray-900"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
