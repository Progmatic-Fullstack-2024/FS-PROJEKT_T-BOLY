import { useState } from 'react';

import userService from '../../services/userService';
import RatingStars from '../products/RatingStars';

export default function Review({ review }) {
  const [user, setUser] = useState('');
  const reviewTimestamp = () => {
    const createdAt = new Date(review.createdAt);
    const now = new Date();
    const timeDiff = now - createdAt;

    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day(s) ago`;
    }
    if (hours > 0) {
      return `${hours} hour(s) ago`;
    }
    return `now`;
  };

  const timeDiff = reviewTimestamp();

  const getUser = async () => {
    setUser(await userService.getUserById(review.userId));
  };
  getUser();

  return (
    <div>
      <div className="flex items-center mb-4">
        <img src={user.profilePictureUrl} alt="" />
        <div className="font-medium ">
          <p className="block text-sm text-gray-500 dark:text-gray-400">{`${user.firstName}  ${user.lastName}`}</p>
        </div>
      </div>
      <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse mb-5">
        <RatingStars rating={review.rating} />
        <h3 className=" text-sm text-gray-500">{timeDiff}</h3>
      </div>
      <div className="mb-2 text-gray-500 dark:text-gray-400">{review.review}</div>
    </div>
  );
}
