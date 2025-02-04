import * as yup from 'yup';

export const reviewValidationSchema = yup.object({
  rating: yup.number().required('Rating is required').min(1, 'Rating is required'),
  review: yup.string().required('Review is required'),
});

export const validation = '';
