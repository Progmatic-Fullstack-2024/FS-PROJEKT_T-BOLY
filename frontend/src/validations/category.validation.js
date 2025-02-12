import * as Yup from 'yup';

export const categoryValidationSchema = Yup.object({
  name: Yup.string().required('Category name is required'),
  description: Yup.string().required('Category description is required'),
});

export const validation = '';
