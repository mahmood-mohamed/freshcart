import { Button } from "@heroui/react";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { addProductToCart } from "../../services/CartServices/addProductToCart";
import { formatCurrency } from "../../helpers/formatCurrencyHelper";
import { CartItemsContext } from "../../contexts/cartContext";
import WishlistButton from "../WishlistButton/WishlistButton";
import { toast } from "react-toastify";
import { authContext } from "../../contexts/authContext";


export default function Product({ product }) {
  const [isLoadingCart, setIsLoadingCart] = useState(false);
  const [isLoadingWishList, setIsLoadingWishList] = useState(false);
  // To Add Product to Cart
  const { setNumOfCartItems } = useContext(CartItemsContext);
  const { isLoggedIn } = useContext(authContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      toast.info("You must login first", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    addProductToCart(product.id, setIsLoadingCart, setNumOfCartItems);
  };


  


  return (
    <div className="group relative bg-white rounded-lg border border-gray-200 transition-all duration-300 hover:shadow-lg hover:border-gray-300">
      {/* Product Image - Full Width */}
      <Link 
        className="block overflow-hidden rounded-t-lg aspect-square bg-gray-50" 
        to={`/productDetails/${product._id}`}
      >
        <img 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
          src={product.imageCover} 
          alt={product.title} 
        />
        
        {/* Minimal Discount Badge */}
        {product.priceAfterDiscount && (
          <span className="absolute top-2 left-2 rounded bg-green-500 px-2 py-0.5 text-[10px] font-bold text-white">
            -{Math.round(100 - (product.priceAfterDiscount / product.price) * 100)}%
          </span>
        )}

        <div className="absolute top-2 right-2">
           <WishlistButton productId={product._id} />
        </div>
      </Link>

      {/* Product Info Section - Reduced Information */}
      {/* Product Info Section - Refined Layout */}
      <div className="p-2 flex flex-col gap-1">
        {/* Title row */}
        <Link to={`/productDetails/${product._id}`} className="block">
          <h3 className="truncate text-sm font-medium text-gray-800 hover:text-green-600 transition-colors" title={product.title}>
            {product.title}
          </h3>
        </Link>
        
        {/* Rating row */}
        <div className="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-[12px] font-semibold text-gray-500">{product.ratingsAverage}</span>
        </div>

        {/* Pricing & Add to Cart Row */}
        <div className="mt-auto flex items-center justify-between gap-2 pt-1 border-t border-gray-50">
          <div className="flex flex-col min-w-0">
            {product.priceAfterDiscount ? (
              <>
                <span className="text-sm font-medium text-green-600 truncate">{formatCurrency(product.priceAfterDiscount)}</span>
                <span className="text-[10px] text-gray-400 line-through truncate">{formatCurrency(product.price)}</span>
              </>
            ) : (
              <span className="text-sm font-medium text-gray-900 truncate">{formatCurrency(product.price)}</span>
            )}
          </div>

          <Button 
            isLoading={isLoadingCart} 
            onPress={handleAddToCart} 
            size="sm" 
            isIconOnly
            className="rounded-full bg-green-500 text-white shadow-sm hover:bg-green-600 w-8 h-8 flex-shrink-0"
          >
            {isLoadingCart ? "..." : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

