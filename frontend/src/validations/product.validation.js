import * as yup from 'yup';

export const productValidationSchema = yup.object({
  name: yup.string().required('Please add a name of the GAME'),
  description: yup.string().required('Please add a descriptions for the game'),
  price: yup.number().required('Add a price to the game'),
  quantity: yup.number().required('Add a quantity to the game'),
  // pictureUrl: yup.pictureUrl().required('Add an URL for uplod'),
  ageRecommendationMin: yup.number().required('Add min Age'),
  ageRecommendationMax: yup.number().required('Add max Age'),
  playersNumberMin: yup.number().required('Add min Players number'),
  playersNumberMax: yup.number().required('Add max Players number'),
});

export const validation = '';
