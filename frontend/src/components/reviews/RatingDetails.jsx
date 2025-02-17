import { useSearchParams } from 'react-router-dom';

import RatingBar from './RatingBar';
import RatingStars from '../products/RatingStars';

export default function RatingDetails({ ratings, product, numberOfRatings }) {
  const [searchParams] = useSearchParams();
  const selectedBar = searchParams.get('rating') ? Number(searchParams.get('rating')) : null;

  return (
    <div className="space-y-2 flex w-full">
      <div className="flex items-center flex-col m-2">
        <h2 className="text-3xl">{product?.product?.rating?.toFixed(1)}</h2>
        <div className="flex ">
          {product?.product?.rating && <RatingStars rating={product?.product?.rating} />}
        </div>
        <h3>({numberOfRatings})</h3>
      </div>
      <div className="w-full m-2  flex flex-col-reverse ">
        {ratings.map((rating) => (
          <RatingBar
            percentage={(rating.count / numberOfRatings) * 100 || 0}
            key={rating.label}
            label={rating.label}
            count={rating.count}
            selectedBar={selectedBar}
          />
        ))}
      </div>
    </div>
  );
}
