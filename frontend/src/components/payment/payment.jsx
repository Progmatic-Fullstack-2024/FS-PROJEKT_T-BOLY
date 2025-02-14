import { Formik, Form, Field, ErrorMessage } from 'formik';

import { paymentValidationSchema } from '../../validations/payment.validation.js';

const handlePayment = (initialValues) => {
  console.log(initialValues);
};

//----------------

//----------------

export default function PaymentModal() {
  return (
    <div className="border rounded-xl bg-white p-5 m-2">
      {/* -------------------------------------------------------------------- */}

      {/* -------------------------------------------------------------------- */}
      <Formik
        initialValues={{
          creditcard: '',
          cardNumber: '',
          nameOnCard: '',
          expirationDate: '',
          securityCode: '',
        }}
        validationSchema={paymentValidationSchema}
        onSubmit={handlePayment}
      >
        <Form>
          <div className="text-4xl">Payment</div>
          <div>All transactions are secure and encrypted.</div>
          {/* -------------------------------------------------------------------- */}

          {/* -------------------------------------------------------------------- */}

          <div>
            <Field name="creditcard" type="checkbox" className="p-2 border" />
            <ErrorMessage name="creditcard" component="div" className="text-red-500 text-sm" />
          </div>
          <div>
            <hr />
          </div>
          <div className="m-3">
            <div className="m-3">
              <Field
                name="cardNumber"
                type="text"
                placeholder="Card number 1234 1234 12341234"
                className="w-full p-2 border  rounded-md border-orange-500 "
              />
              <ErrorMessage name="cardNumber" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="m-3">
              <Field
                name="nameOnCard"
                type="text"
                placeholder="Name on card"
                className="w-full p-2 border rounded-md  border-orange-500 "
              />
              <ErrorMessage name="nameOnCard" component="div" className="text-red-500 text-sm" />
            </div>
          </div>
          <div className="flex m-3">
            <div className="w-2/3 m-3">
              <Field
                name="expirationDate"
                type="text"
                placeholder="Expiration date (MM/YY)"
                className="w-full p-2 border rounded-md  border-orange-500 "
              />
              <ErrorMessage
                name="expirationDate"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="w-1/3 m-3">
              <Field
                name="securityCode"
                type="text"
                placeholder="Security code"
                className="w-full p-2 border rounded-md  border-orange-500 "
              />
              <ErrorMessage name="securityCode" component="div" className="text-red-500 text-sm" />
            </div>
          </div>
          <div className="flex justify-center px-10">
            <button type="submit" className="bg-primary text-white rounded-md w-full py-2">
              Place order
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
