import { useContext, useState, useEffect } from "react";
import { Card, Button } from "@heroui/react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { wishlistContext } from "../../contexts/wishlistItemsContext";
import { formatCurrency } from "../../helpers/formatCurrencyHelper";
import { Link } from "react-router-dom";
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


  useEffect(() => {
    setIsInWishlist(wishlist.some((item) => item._id));
  }, [wishlist]);


  // إزالة العنصر من الـ wishlist
  async function removeItem(productId) {
    try {
      setLoading(true);
      await removeWishlistItem(productId);
      // لا داعي لتحديث الحالة هنا لأن السياق سيتولى ذلك
    } catch (error) {
      console.error("Error removing item:", error);
    } finally {
      setLoading(false);
    }
  }

  async function addCartAndRemoveWishlist(productId) {
    try {
      setLoading(true);

      // ✅ تأكد أن المنتج موجود في قائمة الرغبات قبل إزالته
      const isProductInWishlist = wishlist.some(item => item._id === productId);

      if (!isProductInWishlist) {
        console.warn("Product not in wishlist!");
        return;
      }

      // ✅ أضف المنتج إلى عربة التسوق
      await addProductToCart(productId, setLoading, setNumOfCartItems);

      // ✅ بعد الإضافة الناجحة، احذفه من قائمة الرغبات
      await removeItem(productId);

      console.log("Product successfully moved to cart!");
    } catch (error) {
      console.error("Error moving product to cart:", error);
    } finally {
      setLoading(false);  // ✅ إيقاف التحميل بعد الانتهاء
    }
  }


  if (loading) {
    return <LoadingScreen />;  // إظهار شاشة تحميل أثناء العمليات الطويلة
  }

  return (
    <ErrorBoundary>
      <div>
        {
          (wishlist?.length > 0) &&
          <h2 className="text-xl font-semibold mb-3">Items ({wishlist?.length})</h2>
        }
      </div>
      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center mt-7 gap-3">
          <p className="text-gray-500">Your wishlist is empty.</p>
          <img src={wishlistImg} className="w-1/4 max-w-16" alt="wishlist cart"/>
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
