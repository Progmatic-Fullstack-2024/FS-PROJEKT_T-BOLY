import * as Yup from 'yup';

export const couponValidationSchema = Yup.object({
  code: Yup.string().required('Coupon code is required'),
  // discount: Yup.number().min(1).max(100).required('Discount is required'),
  validFrom: Yup.date().required('ValidFrom date is required'),
  validTo: Yup.date()
    .required('ValidTo date is required')
    .min(Yup.ref('validFrom'), 'ValidTo date must be after ValidFrom date'),
});

export const validation = '';
