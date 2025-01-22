import { useEffect, useState } from 'react';
import { FaFacebook, FaInstagram, FaPinterest, FaTwitter } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import { LuHeart } from 'react-icons/lu';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import productService from '../../services/productService';
import RatingStars from '../products/RatingStars';

export default function ProductById() {
  const { productId } = useParams();
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
        setProductInCartCount(1)
      } catch (err) {
        toast.error('Failed to fetch category name:', err);
      } finally {
        setLoading(false);
      }
    };
console.log(categoryNames)
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

  return (
    <div>
      {product ? (
        <div className="mt-20 mb-32 md:mr-60 md:ml-60">
          <div className="flex justify-start gap-2 mb-28">
            <h1 className=" text-3xl">Products /</h1>
            <h1 className="text-primary text-3xl font-medium">{` ${product.name}`}</h1>
          </div>
          <div className=" flex flex-col md:flex-row justify-between gap-32">
            <div className="h-80 w-80 md:h-1/3 md:w-1/3 flex flex-col gap-16">
              <div className=" border-2 rounded-2xl">
                <img
                  className=" h-full w-full p-7 pr-8 shrink-0"
                  src={product.pictureUrl}
                  alt={product.name}
                />
              </div>
              <div className="flex space-x-4 items-center mb-8 justify-center">
                <div className="text-xl font-semibold ">Share this: </div>
                <div className="text-gray-500 hover:text-primary">
                  <FaInstagram size={24} />
                </div>
                <div className="text-gray-500 hover:text-primary">
                  <FaTwitter size={24} />
                </div>
                <div className="text-gray-500 hover:text-primary">
                  <FaFacebook size={24} />
                </div>
                <div className="text-gray-500 hover:text-primary">
                  <FaPinterest size={24} />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-8 md:w-2/3 md:h-2/3">
              <h1 className=" text-4xl">{product.name}</h1>
              <div className="mt-8 mb-8 font-medium text-2xl">€{product.price}</div>
              <div className="flex gap-2 pb-2 items-center">
                <RatingStars rating={product.rating} /> (Reviews)
              </div>
              <div className="hidden md:block">{product.description}</div>

              <div className="flex gap-12 mt-10 mb-10">
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={handleDecrement}
                    disabled={productInCartCount <= 1}
                    className={`px-5 py-2 text-xl font-bold border-t-2 border-l-2 border-b-2 rounded-l-xl  ${productInCartCount <= 1 ? 'bg-gray-200 cursor-not-allowed border-gray-200' : 'border-primary hover:bg-primary hover:text-white text-gray-900'}`}
                  >
                    -
                  </button>
                  <div className="px-6 py-2 border-2 border-primary text-xl">
                    {productInCartCount}
                  </div>
                  <button
                    type="button"
                    onClick={handleIncrement}
                    disabled={productInCartCount >= product.quantity}
                    className={`px-5 py-2 text-xl font-bold border-t-2 border-r-2 border-b-2 rounded-r-xl ${productInCartCount >= product.quantity ? 'bg-gray-200 cursor-not-allowed border-gray-200' : 'border-primary hover:bg-primary hover:text-white text-gray-900'}`}
                  >
                    +
                  </button>
                </div>

                <div className="flex">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-3 w-40 rounded-xl border-2 border-primary bg-primary p-2 text-white hover:border-gray-900 hover:text-black"
                  >
                    <FiShoppingCart />
                    Add to Cart
                  </button>
                </div>
                <button
                  type="button"
                  className="flex items-center text-xl justify-center hover:text-primary"
                >
                  <LuHeart />
                </button>
              </div>

              <div className="flex flex-col rounded-xl border-2 p-5 gap-2">
                <div className="font-semibold text-xl mb-3">Short description</div>
                <div className=" flex justify-between">
                  <div className="w-2/3">
                    <span className="font-semibold">Category:</span> {categoryNames.join(", ")}
                  </div>
                  <div className="w-1/3">
                    <span className="font-semibold">Quantity:</span>{' '}
                    {product.quantity >= 1 ? `${product.quantity} available` : `Out of stock`}
                  </div>
                </div>
                <div className=" flex justify-between">
                  <div className="w-2/3">
                    <span className="font-semibold">Recommended age: </span>
                    {product.ageRecommendationMin} - {product.ageRecommendationMax} years
                  </div>
                  <div className="w-1/3">
                    <span className="font-semibold">Players number: </span>
                    {product.playersNumberMin === product.playersNumberMax
                      ? `${product.playersNumberMin} `
                      : `${product.playersNumberMin} - ${product.playersNumberMax} `}
                    player(s)
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col border-2 rounded-xl p-10 gap-14 mt-20">
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
            {reviews ? <div>Reviews</div> : <div>{product.description}</div>}
          </div>
          <div className="mt-20">
            <h2 className="text-2xl font-semibold text-center mb-16">Related Products</h2>
            <div className="flex flex-wrap md:flex-row justify-center md:justify-between gap-8 mt-8">
              {relatedProductsByCategory.map((relatedProduct) => (
                <div key={relatedProduct.id} className="flex flex-col gap-2">
                  <div className="relative">
                    <Link to={`/products/${relatedProduct.id}`}>
                      <img
                        className="border-2 rounded-2xl w-80 h-80 p-7 pr-8 shrink-0 hover:border-gray-900"
                        src={relatedProduct.pictureUrl}
                        alt={relatedProduct.name}
                      />
                    </Link>
                    <button
                      type="submit"
                      className="absolute top-2 right-2 rounded-full flex items-center justify-center hover:text-primary"
                    >
                      <LuHeart className="m-2" />
                    </button>
                    <button
                      type="submit"
                      className="absolute top-9 right-2 rounded-full flex items-center justify-center hover:text-primary"
                    >
                      <FiShoppingCart className="m-2" />
                    </button>
                  </div>
                  <div className="w-60 font-medium">{relatedProduct.name}</div>
                  <div className="font-medium text-lg">€{relatedProduct.price}</div>
                  <div className="flex gap-2 pb-2">
                    <RatingStars rating={relatedProduct.rating} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>Product not found</div>
      )}
    </div>
  );
}
