import { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import LoadingScreen from './../LoadingScreens/LoadingScreen';
import Slider from "react-slick";
import StarRating from './../StarRating/StarRating';
import { Button, Breadcrumbs, BreadcrumbItem } from '@heroui/react';
import { addProductToCart } from '../../services/CartServices/addProductToCart';
import { formatCurrency } from '../../helpers/formatCurrencyHelper';
import { CartItemsContext } from '../../contexts/cartContext';
import WishlistButton from '../WishlistButton/WishlistButton';
import api from '../../services/api/axiosInstance';
import ReviewsSection from '../ReviewsSection/ReviewsSection';

export default function ProductDetails() {

  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [addToCartLoading, setAddToCartLoading] = useState(false);

  // To Add Product to Cart
  const { setNumOfCartItems } = useContext(CartItemsContext);
  const handleAddToCart = () => {
    addProductToCart(product?._id || product?.id, setAddToCartLoading, setNumOfCartItems);
  };

  const scrollToReviews = () => {
    document.getElementById(`reviews-${product?._id}`)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Slider Settings
  const imagesSettings = {
    dots: true,
    infinite: true,
    speed: 100,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const reviewsSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    arrows: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          dots: false,
        }
      }
    ]
  };

  useEffect(() => {
    getProductDetails(productId);
  }, [productId])


  async function getProductDetails(id) {
    try {
      setIsLoading(true);
      const { data } = await api.get(`products/${id}`);
      setProduct(data.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
        
        {/* Left Column: Product Images (Sticky) */}
        <div className="md:sticky md:top-16 h-max">
          {/* Breadcrumbs */}
          <Breadcrumbs aria-label="breadcrumb" className='mb-4'>
            <BreadcrumbItem>
              <Link to="/" className="inline-block hover:opacity-80">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link to="/products" className="inline-block hover:opacity-80">Products</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>{product?.title.slice(0, 28)}...</BreadcrumbItem>
          </Breadcrumbs> 
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 p-6 md:p-12 mb-4">
            {product?.images?.length > 1 ? (
              <Slider {...imagesSettings}>
                {product?.images?.map((imgSrc, index) => (
                  <div key={index} className="flex items-center justify-center outline-none">
                    <img 
                      src={imgSrc} 
                      alt={`${product?.title} - view ${index + 1}`} 
                      className="w-full h-[400px] md:h-[500px] object-contain mx-auto" 
                    />
                  </div>
                ))}
              </Slider>
            ) : (
              <div className="flex items-center justify-center">
                <img 
                  src={product?.images?.[0] || product?.imageCover} 
                  alt={product?.title} 
                  className="w-full h-[400px] md:h-[500px] object-contain mx-auto" 
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Product Info & Actions */}
        <div className="flex flex-col pt-2 md:pt-6">
          
          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            {product?.category?.name && (
              <span className="bg-green-100 text-green-800 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                {product.category.name}
              </span>
            )}
            {product?.subcategory?.map((sub) => (
              <span key={sub._id} className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-full">
                {sub.name}
              </span>
            ))}
            {product?.brand?.name && (
              <div className="flex items-center gap-1.5 border border-gray-200 px-3 py-1.5 rounded-full ml-auto">
                {product?.brand?.image && (
                  <img src={product.brand.image} alt={product.brand.name} className="w-5 h-5 object-contain" />
                )}
                <span className="text-xs font-bold text-gray-700">{product.brand.name}</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight leading-tight mb-4">
            {product?.title}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-1.5 bg-yellow-50 px-3 py-1.5 rounded-full border border-yellow-200">
              <StarRating rating={product?.ratingsAverage} />
              <span className="text-sm font-bold text-yellow-800 ml-1">{product?.ratingsAverage?.toFixed(1) || 0}</span>
            </div>
            {product?.ratingsQuantity > 0 && (
              <button 
                onClick={scrollToReviews}
                className="text-sm font-medium text-gray-500 hover:text-green-600 transition-colors underline underline-offset-4 decoration-gray-300 hover:decoration-green-500"
              >
                Read {product.ratingsQuantity} reviews
              </button>
            )}
          </div>

          {/* Price */}
          <div className="mb-6">
            {product?.priceAfterDiscount ? (
              <div className="flex items-end gap-3 flex-wrap">
                <span className="text-xl md:text-2xl font-bold text-green-600 tracking-tight">
                  {formatCurrency(product?.priceAfterDiscount)}
                </span>
                <span className="text-md md:text-lg text-gray-400 font-medium line-through">
                  {formatCurrency(product?.price)}
                </span>
                <span className="bg-red-100 text-red-700 text-sm font-semibold px-2 py-1 rounded-lg shadow-sm">
                  Save {Math.round(((product.price - product.priceAfterDiscount) / product.price) * 100)}%
                </span>
              </div>
            ) : (
              <span className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
                {formatCurrency(product?.price)}
              </span>
            )}
          </div>

          {/* Stock & Sold Status */}
          <div className="flex items-center flex-wrap justify-between sm:justify-around gap-6 bg-gray-50 rounded-2xl p-4 border border-gray-100">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Availability</span>
              <span className={`text-sm font-bold flex items-center gap-1.5 ${product?.quantity > 0 ? (product?.quantity > 20 ? 'text-green-600' : 'text-orange-500') : 'text-red-500'}`}>
                <span className={`w-2 h-2 rounded-full ${product?.quantity > 0 ? (product?.quantity > 20 ? 'bg-green-500' : 'bg-orange-500 animate-pulse') : 'bg-red-500'}`}></span>
                {product?.quantity > 0 ? (product?.quantity > 20 ? 'In Stock Ready to Ship' : `Hurry, only ${product.quantity} left`) : 'Out of Stock'}
              </span>
            </div>
            <div className="w-px h-10 bg-gray-200 sm:block hidden"></div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Total Sold</span>
              <span className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-green-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                </svg>
                {product?.sold} units
              </span>
            </div>
          </div>

          {/* Description (Parsed) */}
          <div className="mb-8 sm:mb-10 mt-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Product Details</h3>
            <ul className="space-y-3">
              {product?.description?.split('\n').map((line, idx) => {
                if (!line.trim()) return null;
                const parts = line.split('\t');
                if (parts.length > 1) {
                  return (
                    <li key={idx} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 text-sm">
                      <span className="font-bold text-gray-800 min-w-[140px] truncate pr-2 relative after:content-[''] after:absolute after:bottom-1/3 after:left-[100%] after:w-full after:border-b after:border-dotted after:border-gray-300 hidden sm:block">
                        {parts[0]}
                      </span>
                      <span className="font-bold text-gray-800 sm:hidden block mb-0.5">{parts[0]}:</span>
                      <span className="text-gray-600 bg-white z-10 pl-1">{parts.slice(1).join(' ')}</span>
                    </li>
                  );
                }
                return (
                  <li key={idx} className="text-gray-700 leading-relaxed text-sm flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0"></span>
                    <span>{line}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-row gap-4 mb-14">
            <Button 
              isLoading={addToCartLoading} 
              onPress={handleAddToCart} 
              isDisabled={product?.quantity === 0}
              className="flex-1 bg-green-600 text-white h-14 text-base font-bold rounded-2xl hover:bg-green-700 transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-6 h-6 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
              {addToCartLoading ? "Adding Item..." : "Add to Cart"}
            </Button>

            <div className="flex-none h-14 w-14 flex items-center justify-center rounded-2xl border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all cursor-pointer group">
              <WishlistButton productId={product?._id} className="w-full h-full flex items-center justify-center" />
            </div>
          </div>

          {/* Reviews Section */}
          <div id={`reviews-${product?._id}`} className="scroll-mt-28 bg-gray-50/50 p-6 md:p-8 rounded-3xl border border-gray-100">
            <div className="flex flex-col sm:flex-row items-center justify-between flex-wrap gap-2 mb-6">
              <div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-tight">Customer Reviews</h3>
                <p className="text-sm text-gray-500 mt-1">Real feedback from verified buyers.</p>
              </div>
              <div className="flex items-center gap-2 w-fit bg-white px-2 sm:px-4 py-1 sm:py-1.5 rounded-2xl shadow-sm border border-gray-100">
                <StarRating rating={product?.ratingsAverage} />
                <div className="flex items-baseline gap-1 ms-2">
                  <span className="text-md font-bold text-gray-900">{product?.ratingsAverage?.toFixed(1) || 0}</span>
                  <span className="text-sm font-medium text-gray-400">/ 5</span>
                </div>
              </div>
            </div>

            {product?.reviews?.length > 0 ? (
              <div className="-mx-4 pb-4">
                <Slider {...reviewsSettings}>
                  {product?.reviews?.map((review) => (
                    <ReviewsSection key={review._id} review={review} />
                  ))}
                </Slider>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-gray-500 bg-white rounded-2xl shadow-[inset_0_0_15px_rgba(0,0,0,0.03)] border border-gray-100/50 transition-all hover:bg-gray-50/50">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">No reviews yet</h4>
                <p className="text-sm text-gray-500 max-w-xs text-center leading-relaxed">
                  Be the first to share your thoughts about this product and help others make a decision.
                </p>
              </div>
            )}
          </div>
          {/* End Reviews Section */}
          
        </div>
      </div>
    </div>
  );
}
