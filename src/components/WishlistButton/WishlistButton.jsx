import { useContext, useEffect, useState } from "react";
import { HeartIcon } from "@heroicons/react/24/solid";
import { wishlistContext } from "../../contexts/wishlistItemsContext";
import { Button } from "@heroui/react";

export default function WishlistButton({ productId }) {
  const { wishlist, addWishlistItems, removeWishlistItem } = useContext(wishlistContext);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // تحديث isInWishlist عند تغيير wishlist أو productId
  useEffect(() => {
    setIsInWishlist(wishlist.some((item) => item._id === productId));
  }, [wishlist, productId]);

  const toggleWishlist = async () => {
    setIsLoading(true);

    try {
      if (isInWishlist) {
        await removeWishlistItem(productId);
        setIsInWishlist(false); // تحديث الحالة يدويًا بعد الإزالة
      } else {
        await addWishlistItems(productId);
        setIsInWishlist(true); // تحديث الحالة يدويًا بعد الإضافة
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      isIconOnly
      disabled={isLoading}
      size="sm"
      variant="light"
      title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
      onPress={toggleWishlist}
      className={`transition-all rounded-md hover:scale-110 ${
        isInWishlist ? "bg-transparent" : "bg-gray-50"
      }`}
    >
      <HeartIcon
        size={25}
        className={`transition-all duration-300 ${
          isInWishlist ? "text-rose-500" : "text-gray-300"
        }`}
      />
    </Button>
  );
}
