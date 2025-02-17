import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useContext } from 'react';
import { BsFillStarFill, BsStar, BsStarHalf } from 'react-icons/bs';
import { useParams } from 'react-router-dom';

import AuthContext from '../../contexts/AuthContext';
import LanguageContext from '../../contexts/LanguageContext.jsx';
import reviewService from '../../services/reviewService';
import { reviewValidationSchema } from '../../validations/review.validations';

export default function ReviewModal({ setIsReviewOpen }) {
  const { t } = useContext(LanguageContext);
  const { user } = useContext(AuthContext);
  const { productId } = useParams();
  const handleClose = () => {
    setIsReviewOpen(false);
  };

  const getStarIcon = (rating, starValue) => {
    if (rating >= starValue) return <BsFillStarFill className="text-yellow-400" />;
    if (rating >= starValue - 0.5) return <BsStarHalf className="text-yellow-400" />;
    return <BsStar className="text-yellow-400" />;
  };

  const handleSubmit = async (values) => {
    await reviewService.createReview({
      userId: user.id,
      rating: values.rating,
      review: values.review,
      productId,
    });
    handleClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md dark:bg-gray-800 dark:border-primary dark:border dark:text-primary">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{t('rate this product')}</h2>
          <button type="button" className="text-gray-500 hover:text-black" onClick={handleClose}>
            ✖
          </button>
        </div>

        <Formik
          initialValues={{
            rating: 0,
            review: '',
          }}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
          validationSchema={reviewValidationSchema}
        >
          {({ values, setFieldValue }) => (
            <Form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-primary">
                  {t('rating')}
                </label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((starValue) => (
                    <button
                      type="button"
                      key={starValue}
                      onClick={() => setFieldValue('rating', starValue)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setFieldValue('rating', starValue);
                        }
                      }}
                      className="cursor-pointer focus:outline-none"
                    >
                      {getStarIcon(values.rating, starValue)}
                    </button>
                  ))}
                </div>
                <ErrorMessage name="rating" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-primary">
                  {t('review')}
                </label>
                <Field
                  as="textarea"
                  name="review"
                  placeholder={t('write your thoughts here')}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 h-40 dark:bg-gray-700 dark:border dark:placeholder-primary dark:text-primary dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:border-primary"
                />
                <ErrorMessage name="review" component="div" className="text-red-500 text-sm" />
              </div>

              <button type="submit" className="bg-primary text-white w-full py-2 rounded-lg">
                {t('add review')}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
