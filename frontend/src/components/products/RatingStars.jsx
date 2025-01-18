
import { BsFillStarFill, BsStar, BsStarHalf } from 'react-icons/bs';

export default function RatingStars({ rating }) {
  const stars = [];
  for (let i = 1; i <= 5; i += 1) {
    if (i <= Math.floor(rating)) {
      stars.push(<BsFillStarFill key={i - rating} className="h-full text-yellow-500" />);
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
      stars.push(<BsStarHalf key={i - rating} className="h-full text-yellow-500" />);
    } else {
      stars.push(<BsStar key={i - rating} className="h-full text-gray-300" />);
    }
  }
  return stars;
}
