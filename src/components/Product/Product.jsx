import { Button } from "@heroui/react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { addProductToCart } from "../../services/CartServices/addProductToCart";
import StarRating from "../StarRating/StarRating";
import { formatCurrency } from "../../helpers/formatCurrencyHelper";
import { CartItemsContext } from "../../contexts/cartContext";
import { wishlistContext } from "../../contexts/wishlistItemsContext";
import WishlistButton from "../WishlistButton/WishlistButton";


export default function Product({ product }) {
  const [isLoadingCart, setIsLoadingCart] = useState(false);
  const [isLoadingWishList, setIsLoadingWishList] = useState(false);
  // To Add Product to Cart
  const { setNumOfCartItems } = useContext(CartItemsContext);
  const handleAddToCart = () => {
    addProductToCart(product.id, setIsLoadingCart, setNumOfCartItems);
  };


  


  return (<div className="relative flex flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
    <Link className="relative mx-3 mt-3 flex overflow-hidden rounded-xl" to={`/productDetails/${product._id}`}>
      <img className="object-contain w-full" src={product.imageCover} alt={product.title} />
      {
        product.priceAfterDiscount &&
        <span className="absolute top-0 left-0 m-2 rounded-full bg-red-600 py-1 px-2 text-center text-sm font-medium text-white">{Math.round(100 - product.priceAfterDiscount / product.price * 100)}% OFF</span>
      }
    </Link>

    <div className="mt-4 px-5 md:px-3 lg:px-5 pb-5 flex flex-col justify-between grow">
      <Link to={`/productDetails/${product._id}`}>
        <h5 title="Name" className="text-lg font-semibold tracking-tight text-slate-900 line-clamp-1">{product.title}</h5>
      </Link>
      <div className="mt-1 mb-3">
        <p>
          {
            product.priceAfterDiscount ?
              <span>
                <span className="text-medium font-medium text-slate-800 pe-1">{formatCurrency(product.priceAfterDiscount)}</span>
                <span className="text-sm font-normal text-slate-700 line-through">{formatCurrency(product.price)}</span>
              </span>
              :
              <span className="text-md font-medium text-slate-800">{formatCurrency(product.price)}</span>

          }
        </p>
        <div className="flex items-center gap-3">

          <StarRating rating={product.ratingsAverage} />

          <span title="Rating" className="rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">{product.ratingsAverage}</span>
        </div>
        <span className="ml-2 text-sm text-gray-600">({product.ratingsQuantity} reviews)</span>
      </div>
      <div className="flex justify-between items-center gap-1">
        <Button isLoading={isLoadingCart} onPress={handleAddToCart} size="sm" className="flex items-center justify-between rounded-md bg-green-500 px-5 md:px-4 lg:px-3 py-2.5 text-center text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-3 focus:ring-teal-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {isLoadingCart ? "Adding..." : "Add to Cart"}
        </Button>

        
        <WishlistButton productId={product._id}/>
      </div>


    </div>

  </div>
  )
}
