import { useContext, useState } from 'react';

import LanguageContext from '../../contexts/LanguageContext';
import userService from '../../services/userService';
import RatingStars from '../products/RatingStars';

export default function Review({ review }) {
  const [user, setUser] = useState('');
  const { t } = useContext(LanguageContext);
  const reviewTimestamp = () => {
    const createdAt = new Date(review.createdAt);
    const now = new Date();
    const timeDiff = now - createdAt;

    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} ${t('day(s) ago')}`;
    }
    if (hours > 0) {
      return `${hours} ${t('hour(s) ago')}`;
    }
    return t('now');
  };

  const timeDiff = reviewTimestamp();

  const getUser = async () => {
    setUser(await userService.getUserById(review.userId));
  };
  getUser();

  return (
    <div className="flex items-center gap-12 p-2 border m-3 rounded-xl">
      <div>
        <div className="flex mb-4">
          <div className="font-medium flex items-center justify-center">
            <img src={user.profilePictureUrl} alt="" className="rounded-full w-10 h-10 mr-4 ml-2" />
            <p className="block text-sm text-gray-500 dark:text-gray-400">{`${user.firstName}  ${user.lastName}`}</p>
          </div>
        </div>
        <div className="flex items-center space-x-1 rtl:space-x-reverse mb-5">
          <RatingStars rating={review.rating} />
          <h3 className=" text-sm text-gray-500">{timeDiff}</h3>
        </div>
      </div>
      <div className="my-2 text-gray-500 dark:text-gray-400">{review.review}</div>
    </div>
  );
}
