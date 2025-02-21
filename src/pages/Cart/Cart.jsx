import { useEffect, useState, useContext, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button, RadioGroup, Radio } from "@heroui/react";
import axios from "axios";
import CartProduct from "../../components/CartProduct/CartProduct";
import { formatCurrency } from "../../helpers/formatCurrencyHelper";
import LoadingScreen from "../../components/LoadingScreens/LoadingScreen";
import { CartItemsContext } from "../../contexts/cartContext";
import shoppingCart from "../../assets/images/shopping-cart.png";
import emptyCart from "../../assets/images/empty-cart.png";



// Constants
const API_BASE_URL = "https://ecommerce.routemisr.com/api/v1";

// Axios instance with default headers
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["token"] = token;
  }
  return config;
});

export default function Cart() {
  const [cartData, setCartData] = useState(null);
  const [cartId, setCartId] = useState(null);
  const [isLoadingScreen, setIsLoadingScreen] = useState(true);
  const [clearCartLoading, setClearCartLoading] = useState(false);
  const [error, setError] = useState(null);
  const [requestTimeOut, setRequestTimeOut] = useState();
  const { numOfCartItems, setNumOfCartItems } = useContext(CartItemsContext);
  const [selectedPayment, setSelectedPayment] = useState("online"); // الحالة الافتراضية هي الدفع أونلاين




  // Fetch cart data
  const getUserCart = useCallback(async () => {
    try {
      setIsLoadingScreen(true);
      const { data } = await apiClient.get("/cart");

      setNumOfCartItems(data.numOfCartItems);
      setCartData(data.data);
      setCartId(data.cartId);
      setError(null);
    } catch (error) {
      console.error("Error fetching cart data:", error);
      setError("😣 Oops! Failed to fetch cart data. Please try again later.");
    } finally {
      setIsLoadingScreen(false);
    }
  }, [setNumOfCartItems]);

  useEffect(() => {
    getUserCart();
  }, [getUserCart, cartId]);

  // Update product count
  function updateProductCount(productId, count) {
    clearTimeout(requestTimeOut);
    setRequestTimeOut(
      setTimeout(() => {

        axios.put(`${API_BASE_URL}/cart/${productId}`, {
          count
        }, {
          headers: {
            token: localStorage.getItem("token")
          }
        }).then(({ data }) => {
          setCartData(data.data);
          setNumOfCartItems(data.numOfCartItems);
          setCartId(data.cartId);
        }).catch((err) => {
          console.log('Error updating product count :' + err)

        })
      }, 500)
    )

  }

  // Remove specific cart item
  const removeSpecificCartItem = useCallback(
    async (productId, setIsLoadingRemove) => {
      try {
        setIsLoadingRemove(true);
        const { data } = await apiClient.delete(`/cart/${productId}`);

        setNumOfCartItems(data.numOfCartItems);
        setCartData(data.data);
        setCartId(data.cartId);
      } catch (error) {
        console.error("Error removing item:", error);
        setError("😣 Failed to remove item. Please try again.");
      } finally {
        setIsLoadingRemove(false);
      }
    },
    [setNumOfCartItems]
  );

  // Clear entire cart
  const removeCartItems = useCallback(async () => {
    try {
      setClearCartLoading(true);
      await apiClient.delete("/cart");

      setNumOfCartItems(0);
      setCartData(null);
      setCartId(null);
    } catch (error) {
      console.error("Error clearing cart:", error);
      setError("😣 Failed to clear cart. Please try again.");
    } finally {
      setClearCartLoading(false);
    }
  }, [setNumOfCartItems]);


  if (isLoadingScreen) {
    return (
      <div className="text-center mt-2">
        <p>Loading your cart...</p>
        <LoadingScreen />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4 bg-red-50 rounded-lg">
        {error}
      </div>
    );
  }

  if (!cartData || numOfCartItems === 0) {
    return <EmptyCartMessage />
  }

  return (
    <section className="mx-auto max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">
            Cart Items ({numOfCartItems})
          </h1>
          <img src={shoppingCart} alt="shopping cart" className="w-10 lg:w-12" />
        </div>
        <Button
          isLoading={clearCartLoading}
          onPress={removeCartItems}
          variant="bordered"
          color="danger"
          aria-label="Clear cart"
        >
          Clear Cart
        </Button>
      </div>

      <div className=" justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="flex-grow space-y-4 md:w-2/3">
          {cartData.products.map((product) => (
            <CartProduct
              key={product._id}
              product={product}
              removeSpecificCartItem={removeSpecificCartItem}
              updateProductCount={updateProductCount}
            />
          ))}
        </div>

        <OrderSummary
          subtotal={cartData.totalCartPrice}
          total={cartData.totalCartPrice}
          cartId={cartId}
          selectedPayment={selectedPayment}
          setSelectedPayment={setSelectedPayment}
        />
      </div>
    </section>
  );
}

// Extracted components

function OrderSummary({ subtotal, total, cartId, selectedPayment, setSelectedPayment }) {

  return (
    <aside className="sticky top-24 mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-1 md:w-1/3">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      <div className="space-y-3">
        <div className="flex justify-between pb-1 border-b-1 border-b-gray-100">
          <span className="text-sm font-medium">Subtotal:</span>
          <span className="text-sm font-normal">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between pb-1 border-b-1 border-b-gray-100">
          <span className="text-sm font-medium">Shipping:</span>
          <span className="text-sm font-normal">Free</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Total:</span>
          <div className="text-right">
            <p>{formatCurrency(total)}</p>
          </div>
        </div>
      </div>

      {/* اختيار وسيلة الدفع */}
      <RadioGroup
        color="secondary"
        className="mt-6"
        value={selectedPayment}
        onChange={(event) => {
          setSelectedPayment(event.target.value);
        }}
        label="Choose your preferred payment method:"
      >


        <div className={`flex items-center gap-3 p-3 border-2 rounded-lg transition 
          ${selectedPayment === "online" ? "border-blue-500 bg-blue-50 shadow-md" : "border-gray-300 bg-white"}`}
        >
          <Radio value="online" className="flex items-center gap-2">
            <span className="flex items-center gap-2 font-medium text-gray-800">
              <i className="fa-solid fa-credit-card text-blue-600 text-lg"></i>
              Online Payment
            </span>
          </Radio>
        </div>
        <p className="text-gray-500 text-sm mb-1">Pay securely using your credit or debit card.</p>
    
        <div className={`flex items-center gap-3 p-3 border-2 rounded-lg transition 
          ${selectedPayment === "cash" ? "border-green-500 bg-green-50 shadow-md" : "border-gray-300 bg-white"}`}
        >
          <Radio value="cash" className="flex items-center gap-2">
            <span className="flex items-center gap-2 font-medium text-gray-800">
              <i className="fa-solid fa-truck text-green-600 text-lg"></i>
              Cash on Delivery
            </span>
          </Radio>
        </div>
        <p className="text-gray-500 text-sm mb-1">Pay with cash when your order arrives.</p>
      </RadioGroup>

      {/* Button for online payment */}
      {selectedPayment === "online" && (
        <Link
          to={`/onlinePayment/${cartId}`}
          className="w-full mt-5 flex items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 py-2 
          text-center font-medium text-white shadow-lg hover:from-blue-600 hover:to-blue-800 transition-all"
        >
          <i className="fa-solid fa-credit-card text-yellow-300 text-lg hover:text-white transition-all"></i>
          Pay Online
        </Link>
      )}
      

      {/* Button for cash on delivery */}
      {selectedPayment === "cash" && (
        <Link
          to={`/cashOnPayment/${cartId}`}
          className="w-full mt-5 flex items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-green-500 to-green-700 py-2 
          text-center font-medium text-white shadow-lg hover:from-green-600 hover:to-green-800 transition-all"
        >
          <i className="fa-solid fa-truck text-yellow-300 text-lg hover:text-white transition-all"></i>
          Pay on Delivery
        </Link>
      )}

    </aside>
  );
}


function EmptyCartMessage() {
  return (
    <div className="text-center flex flex-col items-center py-20">
      <p className="text-2xl font-bold mb-4">Your cart is empty</p>
      <img src={emptyCart} alt="Empty cart" className="w-1/4 mx-auto my-2" />
      <Link to="/">
        <Button color="primary" variant="ghost">
          <i className="fa-solid fa-cart-arrow-down fa-lg"></i>
          Start Shopping
        </Button>
      </Link>
    </div>
  );
}
