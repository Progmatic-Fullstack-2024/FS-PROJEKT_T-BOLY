import Reviews from './Reviews';

export default function DescriptionReview({ handleDescription, reviews, handleReviews, product }) {
  return (
    <div className="flex flex-col border-2 rounded-xl p-10 gap-14 md:mt-20 mt-10">
      <div className="flex justify-center text-2xl gap-8">
        <button
          className={`pt-2 pb-2 border-b-4  hover:border-b-gray-900 ${reviews ? 'border-b-white' : ' border-b-primary'}`}
          type="button"
          onClick={handleDescription}
        >
          Description
        </button>
        <div className="pt-2 pb-2">/</div>
        <button
          className={`pt-2 pb-2 border-b-4  hover:border-b-gray-900 ${reviews ? 'border-b-primary' : 'border-b-white'}`}
          type="button"
          onClick={handleReviews}
        >
          Reviews
        </button>
      </div>
      {reviews ? <Reviews /> : <div className="text-justify">{product?.description}</div>}
    </div>
  );
}
