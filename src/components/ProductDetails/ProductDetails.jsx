import { useContext, useEffect, useState } from 'react'
import axios from "axios"
import { useParams } from 'react-router-dom';
import LoadingScreen from './../LoadingScreens/LoadingScreen';
import Slider from "react-slick";
import StarRating from './../StarRating/StarRating';
import { Button } from '@heroui/react';
import { addProductToCart } from '../../services/CartServices/addProductToCart';
import { formatCurrency } from '../../helpers/formatCurrencyHelper';
import { CartItemsContext } from '../../contexts/cartContext';
import WishlistButton from '../WishlistButton/WishlistButton';


export default function ProductDetails() {

  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [addToCartLoading, setAddToCartLoading] = useState(false);
  const [isWishListed, setIsWishListed] = useState(false);

  // To Add Product to Cart
  const { setNumOfCartItems } = useContext(CartItemsContext);
  const handleAddToCart = () => {
    addProductToCart(product.id, setAddToCartLoading, setNumOfCartItems);
  };



  const settings = {
    dots: true,
    infinite: true,
    speed: 100,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    getProductDetails(productId);
  }, [])


  async function getProductDetails(id) {
    setIsLoading(true);
    const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    setProduct(data.data);
    setIsLoading(false);
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="flex flex-wrap items-center -mx-4">
      <div className="w-full  md:w-1/3 mx-auto px-10 md:px-8 mb-8">
        <Slider {...settings}>
          {
            product?.images?.map((imgSrc, index) => {
              return <img key={index} src={imgSrc} alt={product?.title} className="w-full h-auto rounded-lg shadow-md mb-4" />
            })
          }
        </Slider>
      </div>

      <div className="w-full md:w-2/3 px-8 md:px-4">
        <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
        <div className="flex items-center mb-2">

          <StarRating rating={product?.ratingsAverage} />

          <span className="ml-2 text-sm text-gray-700">{product?.ratingsAverage} ({product?.ratingsQuantity} reviews)</span>
        </div>
        <div className="mb-2">
          {
            (product?.priceAfterDiscount) ?
              <>
                <span className="text-2xl font-semibold mr-2">{formatCurrency(product?.priceAfterDiscount)}</span>
                <span className="text-gray-500 line-through">{formatCurrency(product?.price)}</span>
              </>
              :
              <span className="text-2xl font-medium mr-2">{formatCurrency(product?.price)}</span>


          }
        </div>

        <h3 className='mb-2'><span className='font-bold'>Category: </span> {product?.category?.name}.</h3>
        <h3 className='mb-2'><span className='font-bold'>Brand: </span> {product?.brand?.name}.</h3>
        <p className=" mb-4"><span className='font-bold'>Sold:  </span> {product?.sold}</p>
        <p className="text-gray-700 mb-6">{product?.description}.</p>

        <div className="flex space-x-4 mb-6">
          <Button isLoading={addToCartLoading} size='sm' onPress={handleAddToCart} className="bg-green-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            {addToCartLoading ? "Adding..." : "Add to Cart"}
          </Button>

          <WishlistButton productId={product._id}/>

        </div>

      </div>
    </div>



  )
}
