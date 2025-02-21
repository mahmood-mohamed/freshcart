import axios from "axios";
import { toast, Bounce } from "react-toastify";

// ✅ Pass `setNumOfCartItems` as an argument instead of using `useContext`
export async function addProductToCart(productId, setIsLoading, setNumOfCartItems) {
  let isMounted = true; // Prevents state updates if the component unmounts

  try {
    setIsLoading(true);

    const { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      { productId },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    if (isMounted) {
      setNumOfCartItems(data.numOfCartItems);
    }

    if (data.status === "success") {
      toast.success(`${data.message} 🛒`, {
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
    console.error("Error adding product to cart:", error);

    const errorMessage =
      error.response?.data?.message || "Failed to add product to cart. Please try again.";

    toast.error(`${errorMessage}`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      transition: Bounce,
    });
  } finally {
    if (isMounted) {
      setIsLoading(false);
    }
  }

  return () => {
    isMounted = false; // Cleanup function
  };
}
