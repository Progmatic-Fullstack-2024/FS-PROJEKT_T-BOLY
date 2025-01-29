import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import Review from './Review';
import reviewService from '../../services/reviewService';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
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
  }, []);
  return (
    <div>
      {reviews.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </div>
  );
}
