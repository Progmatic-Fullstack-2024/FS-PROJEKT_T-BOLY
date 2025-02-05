import Reviews from '../Reviews/Reviews';

export default function DescriptionReview({
  handleDescription,
  reviews,
  handleReviews,
  product,
  numberOfAllRating,
}) {
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
      {reviews ? (
        <Reviews numberOfAllRating={numberOfAllRating} product={product} />
      ) : (
        <div className="text-justify mr-12 ml-12">
          Bag stretch chase imaginary bugs rub face on everything behind the couch give attitude
          swat at dog intently stare at the same spot claw drapes need to chase tail, hide when
          guests come over attack feet make muffins lick butt leave dead animals as gifts destroy
          couch. Give attitude swat at dog flop over rub face on everything hide when guests come
          over intrigued by the shower chase imaginary bugs attack feet need to chase tail behind
          the couch make muffins intently sniff hand why must they do that, destroy couch bag
          stretch hopped up on goofballs leave dead animals as gifts intently stare at the same spot
          lick butt claw drapes hunt anything that moves hopped up on goofballs.
        </div>
      )}
    </div>
  );
}
