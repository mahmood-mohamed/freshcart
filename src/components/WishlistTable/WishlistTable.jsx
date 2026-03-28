import { useContext, useState, useEffect } from "react";
import { Card, Button } from "@heroui/react";
import { wishlistContext } from "../../contexts/wishlistItemsContext";
import { formatCurrency } from "../../helpers/formatCurrencyHelper";
import { Link, useNavigate } from "react-router-dom";
import { addProductToCart } from "../../services/CartServices/addProductToCart";
import { CartItemsContext } from "../../contexts/cartContext";
import LoadingScreen from "../LoadingScreens/LoadingScreen";
import ErrorBoundary from './../ErrorBoundary/ErrorBoundary';
import wishlistImg from "../../assets/images/wishlist-cart.png";

export default function WishlistTable() {
  const { wishlist, setWishlist, removeWishlistItem } = useContext(wishlistContext);
  const { setNumOfCartItems } = useContext(CartItemsContext);
  const [loading, setLoading] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsInWishlist(wishlist.some((item) => item._id));
  }, [wishlist]);


  async function removeItem(productId) {
    try {
      setLoading(true);
      await removeWishlistItem(productId);
    } catch (error) {
      console.error("Error removing item:", error);
    } finally {
      setLoading(false);
    }
  }

  async function addCartAndRemoveWishlist(productId) {
    try {
      setLoading(true);

      const isProductInWishlist = wishlist.some(item => item._id === productId);

      if (!isProductInWishlist) {
        console.warn("Product not in wishlist!");
        return;
      }

      await addProductToCart(productId, setLoading, setNumOfCartItems);
      await removeItem(productId);

      console.log("Product successfully moved to cart!");
    } catch (error) {
      console.error("Error moving product to cart:", error);
    } finally {
      setLoading(false); 
    }
  }


  if (loading) {
    return <LoadingScreen />;  
  }

  return (
    <ErrorBoundary>
      <div>
        {
          (wishlist?.length > 0) &&
          <div className="flex items-center justify-between mb-8">
            
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-bold">My Wishlist <i className="fas fa-heart text-red-500"></i></h1>  
              <p className="text-gray-500">Manage your favorite products and save them for later.</p>
            </div>
            
            <p className="text-md font-semibold">Items ({wishlist?.length})</p>
          </div>
        }
      </div>
      {wishlist.length === 0 ? (
        <div className="container py-16 mt-10 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-green-200 blur-3xl opacity-30 rounded-full"></div>
            <img src={wishlistImg} className="w-24 max-w-24" alt="wishlist cart"/>
          </div>
          <h2 className="text-xl font-bold mt-4 mb-2 text-gray-800 tracking-tight">Your Wishlist is Empty</h2>
          <p className="text-gray-500">Looks like you haven't added anything to your wishlist yet. Explore our fresh products and find something you love!</p>
          <Button
            color="primary"
            variant="flat"
            className="mt-4"
            onPress={() => navigate('/products')}
          >
            Explore Products
          </Button>
        </div>

      ) : (

        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {wishlist.map((item) => (
            <Card key={item._id || item.productId || Math.random().toString(36)} className="flex flex-col">
              <Link to={`/productDetails/${item._id}`}>
                <img src={item.imageCover} alt={item.title} className="w-full object-contain rounded" />
              </Link>
              <div className="mt-2 px-2 flex flex-col grow">
                <Link to={`/productDetails/${item._id}`}>
                  <h2 className="text-lg font-semibold line-clamp-2">{item.title}</h2>
                </Link>
                <h2 className="text-slate-500 line-clamp-2">{item.description}</h2>
                {item.priceAfterDiscount ? (
                  <span className="py-1">
                    <span className="text-gray-900 font-medium pb-1 pe-1">{formatCurrency(item.priceAfterDiscount)}</span>
                    <span className="text-gray-400 text-sm line-through">{formatCurrency(item.price)}</span>
                  </span>
                ) : (
                  <span className="text-gray-800 font-medium py-1">{formatCurrency(item.price)}</span>
                )}
                <div className="flex grow items-end justify-around py-3">
                  <Button
                    size="sm"
                    title="Add to cart"
                    onPress={() => addCartAndRemoveWishlist(item._id)}
                    variant="bordered"
                    color="primary"
                  >
                    <i className="fas fa-cart-plus"></i> Add
                  </Button>

                  <Button
                    size="sm"
                    title="Remove"
                    onPress={() => removeItem(item._id)}
                    variant="bordered"
                    color="danger"
                  >
                    <i className="fas fa-trash"></i> Remove
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </ErrorBoundary>
  );
}
