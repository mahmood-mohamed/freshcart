import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast, Bounce } from "react-toastify";

export const wishlistContext = createContext();

export default function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [numOfWishlistItems, setNumOfWishlistItems] = useState(0);
  const [isWishlistLoading, setIsWishlistLoading] = useState(true);

  useEffect(() => {
    getWishlistItems();
  }, []);

  // 🔥 جلب قائمة الرغبات من الواجهة الخلفية
  async function getWishlistItems() {
    try {
      setIsWishlistLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setIsWishlistLoading(false);
        return;
      }

      const response = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: { token },
      });

      setWishlist(response.data.data);
      setNumOfWishlistItems(response.data.count);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    } finally {
      setIsWishlistLoading(false);
    }
  }

  // 🔥 إضافة عنصر إلى قائمة الرغبات
  async function addWishlistItems(productId) {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        { headers: { token } }
      );

      if (response.data.status === "success") {
        toast.success(`${response.data.message} 💖`, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Bounce,
        });

        // ✅ تحديث القائمة محليًا ثم جلب البيانات من الواجهة الخلفية
        setWishlist((prevWishlist) => [...prevWishlist, response.data.data]);
        setNumOfWishlistItems((prev) => prev + 1);
        await getWishlistItems(); // جلب البيانات الجديدة
      }
    } catch (error) {
      toast.error("Failed to add to Wishlist. Please try again. 💔", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
      console.error("Error adding to wishlist:", error);
    }
  }

  // 🔥 إزالة عنصر من قائمة الرغبات
  const removeWishlistItem = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token || !productId) return;

      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        { headers: { token } }
      );

      if (response.data.status === "success") {
        // ✅ تحديث القائمة محليًا ثم جلب البيانات من الواجهة الخلفية
        setWishlist((prev) => prev.filter((item) => item._id !== productId));
        setNumOfWishlistItems((prev) => prev - 1);
        await getWishlistItems(); // جلب البيانات الجديدة
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  return (
    <wishlistContext.Provider value={{ wishlist, numOfWishlistItems, addWishlistItems, removeWishlistItem, isWishlistLoading }}>
      {children}
    </wishlistContext.Provider>
  );
}
