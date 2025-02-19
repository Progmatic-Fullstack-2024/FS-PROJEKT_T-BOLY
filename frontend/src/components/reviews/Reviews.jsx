import { useContext, useEffect, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import RatingDetails from './RatingDetails';
import Review from './Review';
import LanguageContext from '../../contexts/LanguageContext';
import reviewService from '../../services/reviewService';
import Pagination from '../products/Pagination';

export default function Reviews(product) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [reviews, setReviews] = useState([]);
  const [sortedReviews, setSortedReviews] = useState();
  const [allReviews, setAllReviews] = useState([]);
  const [itemsPerPage] = useState(5);
  const { t } = useContext(LanguageContext);
  const [totalPages, setTotalPages] = useState(1);
  const [ratings, setRatings] = useState([
    { label: 1, count: 0 },
    { label: 2, count: 0 },
    { label: 3, count: 0 },
    { label: 4, count: 0 },
    { label: 5, count: 0 },
  ]);

  const pageNumber = searchParams.get('page') || 1;
  const rating = searchParams.get('rating');

  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const { productId } = useParams();

  useEffect(() => {
    const fetchReviewsByProduct = async () => {
      try {
        const response = await reviewService.allReviewByProduct(
          productId,
          pageNumber,
          itemsPerPage,
          rating,
        );
        setAllReviews(response.allReviews);
        setReviews(response.reviews);
        setSortedReviews(response.totalReviews);
        setTotalPages(response.totalPages);
      } catch (error) {
        toast.error(`Failed to fetch product: ${error.message}. Please try again later.`);
      }
    };
    fetchReviewsByProduct();
  }, [productId, pageNumber, itemsPerPage, searchParams, isReviewOpen]);

  useEffect(() => {
    if (reviews.length === 0) return;

    const rates = allReviews.map((review) => review.rating);

    const countOccurrences = (arr) => {
      const counts = arr.reduce((acc, num) => {
        acc[num] = (acc[num] || 0) + 1;
        return acc;
      }, {});

      const allRatings = [1, 2, 3, 4, 5];
      return allRatings.map((label) => ({
        label,
        count: counts[label] || 0,
      }));
    };

    setRatings(countOccurrences(rates));
  }, [reviews]);

  const handleShowAll = () => {
    searchParams.delete('rating');
    setSearchParams(searchParams);
  };

  return (
    <div>
      <div className='p-4 mx-auto flex" '>
        <h1 className="text-2x font-bold mb-4">{t('summary of ratings')}</h1>
        <div>
          <RatingDetails ratings={ratings} product={product} numberOfRatings={sortedReviews} />
        </div>
        <button
          className="text-primary flex justify-center m-2"
          onClick={() => setIsReviewOpen(!isReviewOpen)}
          type="button"
        >
          {isReviewOpen ? t('hide reviews') : t('show reviews')}
          {isReviewOpen ? (
            <IoIosArrowUp className="mt-[6px] ml-1" />
          ) : (
            <IoIosArrowDown className="mt-[6px] ml-1" />
          )}
        </button>
      </div>
      {isReviewOpen && (
        <div className="p-4 ">
          <div className="flex ">
            {rating ? (
              <div className="flex">
                <div className="text-orange-500">
                  {t(`now only`)} {rating} {t(`rating-star reviews are visible`)}
                </div>{' '}
                <button type="button" className="px-5 text-orange-500" onClick={handleShowAll}>
                  {t(`show all`)}
                </button>
              </div>
            ) : (
              ''
            )}
          </div>
          {reviews.map((review) => (
            <Review key={review.id} review={review} />
          ))}
        </div>
      )}
      {isReviewOpen && <Pagination totalPages={totalPages} />}
    </div>
  );
}
