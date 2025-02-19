import { t } from 'i18next';
import * as yup from 'yup';

export const reviewValidationSchema = yup.object({
  rating: yup.number().required(t(`rating is required`)).min(1, t(`rating is required`)),
  review: yup.string().required(t(`rating is required`)),
});

export const validation = '';
