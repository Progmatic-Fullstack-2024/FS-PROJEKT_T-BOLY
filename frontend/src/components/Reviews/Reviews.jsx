import { useEffect, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import RatingDetails from './RatingDetails';
import Review from './Review';
import reviewService from '../../services/reviewService';

export default function Reviews(product) {
  const [reviews, setReviews] = useState([]);
  const [ratings, setRatings] = useState([
    { label: 1, count: 0 },
    { label: 2, count: 0 },
    { label: 3, count: 0 },
    { label: 4, count: 0 },
    { label: 5, count: 0 },
  ]);
  
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const { productId } = useParams();
  useEffect(() => {
    const fetchReviewsByProduct = async () => {
      try {
        const allReviewByProduct = await reviewService.allReviewByProduct(productId);
        setReviews(allReviewByProduct);
      } catch (error) {
        toast.error(`Failed to fetch product: ${error.message}. Please try again later.`);
      }
    };
    fetchReviewsByProduct();
  }, [productId]);

  useEffect(() => {
    if (reviews.length === 0) return;

    const rates = reviews.map((review) => review.rating);

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

  return (
    <div>
      <div className='p-4  mx-auto flex"'>
        <h1 className="text-2x font-bold mb-4">Summary of ratings</h1>
        <div>
          <RatingDetails ratings={ratings} product={product} />
        </div>
        <button
          className="text-primary flex justify-center m-2 "
          onClick={() => {
            setIsReviewOpen(!isReviewOpen);
          }}
          type="button"
        >
          I want to see all the reviews
          <IoIosArrowDown className="mt-1 ml-1" />
        </button>
      </div>
      {isReviewOpen && (
        <div className="p-4 ">
          {reviews.map((review) => (
            <Review key={review.id} review={review} />
          ))}
        </div>
      )}
      
    </div>
  );
}
