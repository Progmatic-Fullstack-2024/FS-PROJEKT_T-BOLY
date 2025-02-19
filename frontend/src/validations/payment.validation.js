import * as yup from 'yup';

export const paymentValidationSchema = yup.object({
  //   creditcard: yup.string().required('Card type is required'), //Checkbox
  cardNumber: yup
    .string()
    .label('Card number')
    .min(16)
    .max(16)
    .typeError('Input must be a number!')
    .required(),

  nameOnCard: yup.string().required('Owner name is required'),

  expirationDate: yup.string().min(6).max(9).required('Expiration date is required'),
  securityCode: yup.number().required('CVC is required'),
});

export const validation = '';
