import * as yup from 'yup';

export const nwUserValidationSchemaByAdmin = yup.object({
  firstName: yup.string().required('FirstName is required'),
  lastName: yup.string().required('LastName is required'),
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
});

export const validation = '';
