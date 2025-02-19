import * as yup from 'yup';

export const deliveryInfoValidationSchema = yup.object({
  country: yup.string().required('Country is required'),
  city: yup.string().required('City is required'),
  'postal code': yup.string().required('Postal code is required'),
  street: yup.string().required('Street is requires'),
  'house number': yup.string().required('House number is requires'),
  billingCountry: yup.string().required('Billing adress is required'),
  billingCity: yup.string().required('Billing city is required'),
  billingStreet: yup.string().required('Billing street is required'),
  billingHouseNumber: yup.string().required('Billing house number is required'),
  billingPostalCode: yup.string().required('Billing postal code is required'),
  phoneNumber: yup.string().required('Phone number is required'),
  orderNotes: yup.string(),
});

export const validation = '';
