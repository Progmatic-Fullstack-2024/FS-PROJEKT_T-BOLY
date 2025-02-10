import * as Yup from 'yup';

export const categoryValidationSchema = Yup.object({
  name: Yup.string().required('Category name is required'),
});

export const validation = '';