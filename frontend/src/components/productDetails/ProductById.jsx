import { useContext, useEffect, useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import DescriptionReview from './DescriptionReview';
import PictureModal from './PicturesModal';
import QuantityChangeButtons from './QuantityChangeButtons';
import RelatedProducts from './RelatedProducts';
import SharingButtons from './SharingButtons';
import ShortDescription from './ShortDescription';
import CartContext from '../../contexts/CartContext';
import productService from '../../services/productService';
import reviewService from '../../services/reviewService';
import AddToWishlistHeart from '../products/AddToWishlistHeart';
import RatingStars from '../products/RatingStars';
import ReviewModal from '../reviews/ReviewModal';
import LanguageContext from '../../contexts/LanguageContext';

export default function ProductById() {
  const { productId } = useParams();
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProductsByCategory, setRelatedProductsByCategory] = useState([]);
  const [categoryNames, setCategoryNames] = useState([]);
  const [productInCartCount, setProductInCartCount] = useState(1);
  const [reviews, setReviews] = useState(false);
  const { cart, addToCart } = useContext(CartContext);
  const [numberOfAllRating, setNumberOfAllRating] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPictureIndex, setSelectedPictureIndex] = useState(0);
  const { t } = useContext(LanguageContext);
  

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        setLoading(true);
        const data = await productService.getProductById(productId);
        setProduct(data.product);
        setRelatedProductsByCategory(data.relatedProductsByCategory);
        setCategoryNames(data.categoryNames);
        setReviews(false);
        const response = await reviewService.allReviewByProduct(productId);
        setNumberOfAllRating(response.allReviews.length);
      } catch (error) {
        toast.error(`Failed to fetch product: ${error.message}. Please try again later.`);
      } finally {
        setLoading(false);
      }
    };
    fetchProductById();
  }, [productId]);

  if (loading) {
    return <div className="text-center p-32 text-3xl">Loading...</div>;
  }

  const handleIncrement = () => {
    if (productInCartCount < product.quantity) {
      setProductInCartCount(productInCartCount + 1);
    }
  };

  const handleDecrement = () => {
    if (productInCartCount > 1) {
      setProductInCartCount(productInCartCount - 1);
    }
  };

  const handleDescription = () => {
    setReviews(false);
  };

  const handleReviews = () => {
    setReviews(true);
  };

  const handleNewReview = () => {
    setIsReviewOpen(true);
  };

  const allPictures = [product.pictureUrl, ...product.morePictureUrl];

  const handlePictureClick = (index) => {
    setSelectedPictureIndex(index);
    setModalOpen(true);
  };

  return (
    <div>
      {product ? (
        <div className="mt-20 mb-32 md:mr-60 md:ml-60 mr-6 ml-6">
          <div className="md:flex gap-2 md:mb-28 mb-10">
            <h1 className="text-3xl">{t('products')} /</h1>
            <h1 className="text-primary text-3xl font-medium">{product.name}</h1>
          </div>
          <div className="flex flex-col md:flex-row justify-between md:gap-32 gap-6">
            <div className="h-68 w-68 md:h-1/3 md:w-1/3 flex flex-col gap-6 md:mb-5">
              <button
                type="button"
                onClick={() => handlePictureClick(0)}
                className="flex border-2 rounded-2xl min-h-96 w-full items-center"
              >
                <img
                  className="h-full w-full p-7 pr-8 shrink-0 cursor-pointer"
                  src={product.pictureUrl}
                  alt={product.name}
                />
              </button>
              {allPictures.length > 1 && (
                <div className="flex h-40 gap-2 justify-between">
                  {product.morePictureUrl.slice(0, 3).map((picture, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handlePictureClick(index + 1)}
                      className="md:w-32 md:h-32 w-28 h-28 flex-shrink-0 p-3 border-2 rounded-xl overflow-hidden object-cover"
                      aria-label={`View picture ${index + 1}`}
                    >
                      <img src={picture} alt="" />
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-8 md:w-2/3 md:h-2/3 md:items-start items-center">
              <h1 className="md:text-3xl text-2xl md:font-normal font-semibold text-center">
                {product.name}
              </h1>
              <div className="mt-8 mb-8 font-medium text-2xl text-center">€{product.price}</div>
              <div className="flex gap-2 pb-2 items-center">
                <RatingStars rating={product.rating} /> ({numberOfAllRating})
                <button
                  className="flex items-center justify-center ml-4 gap-3 w-40 border-2 border-primary rounded-xl bg-primary p-2 text-white hover:border-gray-900 hover:text-black"
                  type="button"
                  onClick={handleNewReview}
                >
                  {t('rate this product')}
                </button>
              </div>
              {isReviewOpen && <ReviewModal setIsReviewOpen={setIsReviewOpen} />}
              <div className="mt-6 mb-6">{product.description}</div>
              <SharingButtons />
              <div className="flex md:gap-12 gap-3 mt-10 mb-10">
                {!cart.some((item) => item.productId === product.id) && (
                  <QuantityChangeButtons
                    handleDecrement={handleDecrement}
                    handleIncrement={handleIncrement}
                    product={product}
                    productInCartCount={productInCartCount}
                    maxQuantity={product.quantity}
                  />
                )}
                <div className="flex">
                  {cart.find((item) => item.productId === product.id) ? (
                    <Link
                      to="/shoppingCart"
                      className="flex px-5 py-3 items-center justify-center gap-3 w-40 rounded-xl border-2 border-green-600 bg-green-600 text-white hover:border-gray-900 hover:text-black"
                    >
                      <FiShoppingCart />
                      {t('in cart')}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        addToCart(productId, productInCartCount) &&
                        setProductInCartCount(1)
                      }
                      className={`flex items-center justify-center gap-3 w-40 rounded-xl border-2 ${product.quantity >= 1 ? 'border-primary bg-primary p-2 text-white hover:border-gray-900 hover:text-black' : 'border-gray-200 bg-gray-200 text-gray-900 cursor-not-allowed'}`}
                      disabled={product.quantity < 1}
                    >
                      <FiShoppingCart />
                      {product.quantity < 1 ? 'Out of Stock' : t('add to cart')}
                    </button>
                  )}
                </div>
                <div className=" text-4xl relative">
                  <AddToWishlistHeart product={product} />
                </div>
              </div>
              <ShortDescription categoryNames={categoryNames} product={product} />
            </div>
          </div>
          <DescriptionReview
            handleDescription={handleDescription}
            reviews={reviews}
            handleReviews={handleReviews}
            product={product}
          />
          <RelatedProducts relatedProductsByCategory={relatedProductsByCategory} />
          <PictureModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            allPictures={allPictures}
            selectedPictureIndex={selectedPictureIndex}
          />
        </div>
      ) : (
        <div>Product not found</div>
      )}
    </div>
  );
}
