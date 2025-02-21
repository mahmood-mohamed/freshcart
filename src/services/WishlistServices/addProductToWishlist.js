import axios from "axios";
import { toast, Bounce } from "react-toastify";

export async function addToWishlist(productId, setNumOfWishlistItems) {

  try {

    const { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      { productId },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    setNumOfWishlistItems(data.count);

    if (data.status === "success") {
      toast.success("Added to Wishlist! 💖", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    }
  } catch (error) {
    toast.error("Failed to add to Wishlist. Please try again. 😥😥", {
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
