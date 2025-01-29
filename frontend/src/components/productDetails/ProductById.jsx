import { useEffect, useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { LuHeart } from 'react-icons/lu';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import DescriptionReview from './DescriptionReview';
import QuantityChangeButtons from './QuantityChangeButtons';
import RelatedProducts from './RelatedProducts';
import ReviewModal from './ReviewModal';
import SharingButtons from './SharingButtons';
import ShortDescription from './ShortDescription';
import productService from '../../services/productService';
import RatingStars from '../products/RatingStars';

export default function ProductById() {
  const { productId } = useParams();
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProductsByCategory, setRelatedProductsByCategory] = useState([]);
  const [categoryNames, setCategoryNames] = useState([]);
  const [productInCartCount, setProductInCartCount] = useState(1);
  const [reviews, setReviews] = useState(false);

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        setLoading(true);
        const data = await productService.getProductById(productId);
        setProduct(data.product);
        setRelatedProductsByCategory(data.relatedProductsByCategory);
        setCategoryNames(data.categoryNames);
        setReviews(false);
        setProductInCartCount(1);
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

  return (
    <div>
      {product ? (
        <div className="mt-20 mb-32 md:mr-60 md:ml-60 mr-6 ml-6">
          <div className="hidden md:flex gap-2 mb-28">
            <h1 className=" text-3xl">Products /</h1>
            <h1 className="text-primary text-3xl font-medium">{` ${product.name}`}</h1>
          </div>
          <div className=" flex flex-col md:flex-row justify-between gap-32">
            <div className="h-80 w-80 md:h-1/3 md:w-1/3 flex flex-col gap-7 md:gap-16 md:mb-5 mb-5">
              <div className="flex border-2 rounded-2xl min-h-96 w-full items-center">
                <img
                  className="h-full w-full p-7 pr-8 shrink-0"
                  src={product.pictureUrl}
                  alt={product.name}
                />
              </div>
              <SharingButtons />
            </div>
            <div className="flex flex-col md:gap-8 md:w-2/3 md:h-2/3">
              <h1 className="md:text-3xl text-2xl md:font-normal font-semibold">{product.name}</h1>
              <div className="mt-8 mb-8 font-medium text-2xl">€{product.price}</div>
              <div className="flex gap-2 pb-2 items-center">
                <RatingStars rating={product.rating} /> (Reviews)
                <button
                  className="flex items-center justify-center gap-3 w-40 rounded-xl border-2 border-primary rounded-xl bg-primary p-2 text-white hover:border-gray-900 hover:text-black"
                  type="button"
                  onClick={handleNewReview}
                >
                  Rate this product
                </button>
              </div>
              {isReviewOpen && <ReviewModal setIsReviewOpen={setIsReviewOpen} />}
              <div className="hidden md:block">{product.description}</div>

              <div className="flex md:gap-12 gap-3 mt-10 mb-10">
                <QuantityChangeButtons
                  handleDecrement={handleDecrement}
                  handleIncrement={handleIncrement}
                  product={product}
                  productInCartCount={productInCartCount}
                />
                <div className="flex">
                  <button
                    type="button"
                    className={`flex items-center justify-center gap-3 w-40 rounded-xl border-2 ${product.quantity >= 1 ? 'border-primary bg-primary p-2 text-white hover:border-gray-900 hover:text-black' : 'border-gray-200 bg-gray-200 text-gray-900 cursor-not-allowed'}`}
                    disabled={product.quantity < 1}
                  >
                    <FiShoppingCart />
                    Add to Cart
                  </button>
                </div>
                <button
                  type="button"
                  className="hidden md:flex items-center text-xl justify-center hover:text-primary"
                >
                  <LuHeart />
                </button>
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
        </div>
      ) : (
        <div>Product not found</div>
      )}
    </div>
  );
}
