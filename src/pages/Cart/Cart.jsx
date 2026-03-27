import { useEffect, useState, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button, RadioGroup, Radio } from "@heroui/react";
import CartProduct from "../../components/CartProduct/CartProduct";
import { formatCurrency } from "../../helpers/formatCurrencyHelper";
import LoadingScreen from "../../components/LoadingScreens/LoadingScreen";
import { CartItemsContext } from "../../contexts/cartContext";
import shoppingCart from "../../assets/images/shopping-cart.png";
import emptyCart from "../../assets/images/empty-cart.png";
import api from "../../services/api/axiosInstance";

export default function Cart() {
  const [cartData, setCartData] = useState(null);
  const [cartId, setCartId] = useState(null);
  const [isLoadingScreen, setIsLoadingScreen] = useState(true);
  const [clearCartLoading, setClearCartLoading] = useState(false);
  const [error, setError] = useState(null);
  const [requestTimeOut, setRequestTimeOut] = useState();
  const { numOfCartItems, setNumOfCartItems } = useContext(CartItemsContext);
  const [selectedPayment, setSelectedPayment] = useState("online");

  // Fetch cart data
  const getUserCart = useCallback(async () => {
    try {
      setIsLoadingScreen(true);
      const { data } = await api.get("/cart", {
        headers: {
          token: localStorage.getItem("token")
        }
      });
      setNumOfCartItems(data.numOfCartItems);
      setCartData(data.data);
      setCartId(data.cartId);
      setError(null);
    } catch (error) {
      console.error("Error fetching cart data:", error.response.data.message);
      setError("😣 Oops! Failed to fetch cart data. Please try again later.");
    } finally {
      setIsLoadingScreen(false);
    }
  }, [setNumOfCartItems]);

  useEffect(() => {
    getUserCart();
  }, [getUserCart]);

  // Update product count
  function updateProductCount(productId, count) {
    clearTimeout(requestTimeOut);
    setRequestTimeOut(
      setTimeout(() => {
        api.put(`/cart/${productId}`, { count })
          .then(({ data }) => {
            setCartData(data.data);
            setNumOfCartItems(data.numOfCartItems);
          })
          .catch((err) => console.log('Error updating product count:', err));
      }, 500)
    );
  }

  // Remove specific cart item
  const removeSpecificCartItem = useCallback(
    async (productId, setIsLoadingRemove) => {
      try {
        setIsLoadingRemove(true);
        const { data } = await api.delete(`/cart/${productId}`);
        setNumOfCartItems(data.numOfCartItems);
        setCartData(data.data);
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
      await api.delete("/cart");
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

  if (isLoadingScreen) return <LoadingScreen />;
  if (error) return (
    <div className="container py-20 text-center">
      <div className="max-w-md mx-auto p-8 bg-red-50 rounded-3xl border border-red-100">
        <p className="text-red-500 font-bold mb-4">{error}</p>
        <Button onPress={getUserCart} variant="flat" color="danger">Try Again</Button>
      </div>
    </div>
  );

  if (!cartData || numOfCartItems === 0) return <EmptyCartMessage />;

  return (
    <section className="container mx-auto py-12 px-4 max-w-7xl">
      {/* 🏷️ Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div className="space-y-1">
          <div className="flex items-center gap-4"> 
            <img src={shoppingCart} alt="Shopping Cart" className="w-12 h-12" />
            <h1 className="text-2xl font-black text-gray-800 tracking-tight">Your Cart</h1>
            <div className="px-4 py-1 bg-green-50 text-green-600 rounded-full text-sm font-black">
              {numOfCartItems} ITEMS
            </div>
          </div>
          <p className="text-gray-400 text-sm font-medium">Manage your items and proceed to checkout.</p>
        </div>
        
        <Button
          isLoading={clearCartLoading}
          onPress={removeCartItems}
          variant="flat"
          color="danger"
          startContent={<i className="fas fa-trash-alt"></i>}
          className="font-bold rounded-2xl px-8"
        >
          Clear All
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* 📦 Items List */}
        <div className="lg:col-span-8 space-y-6">
          {cartData.products.map((product) => (
            <CartProduct
              key={product._id}
              product={product}
              removeSpecificCartItem={removeSpecificCartItem}
              updateProductCount={updateProductCount}
            />
          ))}
        </div>

        {/* 🧾 Order Summary */}
        <div className="lg:col-span-4">
          <OrderSummary
            subtotal={cartData.totalCartPrice}
            total={cartData.totalCartPrice}
            cartId={cartId}
            selectedPayment={selectedPayment}
            setSelectedPayment={setSelectedPayment}
          />
        </div>
      </div>
    </section>
  );
}

function OrderSummary({ subtotal, total, cartId, selectedPayment, setSelectedPayment }) {
  return (
    <aside className="sticky top-24 bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 space-y-8">
      <h2 className="text-2xl font-black text-gray-800 tracking-tight">Order Summary</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center text-gray-500">
          <span className="font-medium">Selected Items</span>
          <span className="font-bold text-gray-800">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between items-center text-gray-500">
          <span className="font-medium">Shipping Fee</span>
          <span className="text-green-600 font-bold uppercase text-xs tracking-widest">Free</span>
        </div>
        <div className="pt-4 border-t border-gray-50 flex justify-between items-end">
          <span className="text-gray-400 text-xs font-black uppercase tracking-widest">Total Amount</span>
          <span className="text-2xl font-semibold text-green-600 tracking-tighter">
            {formatCurrency(total)}
          </span>
        </div>
      </div>

      {/* 💳 Payment Methods */}
      <div className="space-y-4">
        <p className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Payment Method</p>
        <RadioGroup
          value={selectedPayment}
          onValueChange={setSelectedPayment}
          className="gap-3"
        >
          <PaymentCard 
            value="online" 
            title="Online Payment"
            desc="Pay securely with card/bank"
            icon="fa-credit-card"
            color="blue"
            isSelected={selectedPayment === "online"}
          />
          <PaymentCard 
            value="cash" 
            title="Cash on Delivery"
            desc="Pay when you receive"
            icon="fa-truck"
            color="green"
            isSelected={selectedPayment === "cash"}
          />
        </RadioGroup>
      </div>

      {/* 🚀 Checkout Actions */}
      <Button 
        as={Link}
        to={selectedPayment === "online" ? `/onlinePayment/${cartId}` : `/cashOnPayment/${cartId}`}
        color={selectedPayment === 'online' ? 'primary' : 'success'}
        size="lg"
        className="w-full h-16 rounded-[1.25rem] font-bold text-lg shadow-xl shadow-blue-100"
        startContent={<i className={`fas ${selectedPayment === 'online' ? 'fa-lock' : 'fa-check-circle'} mr-2`}></i>}
      >
        Place Order Now
      </Button>

      <div className="flex items-center justify-center gap-4 text-gray-300 text-2xl pt-2">
         <i className="fab fa-cc-visa"></i>
         <i className="fab fa-cc-mastercard"></i>
         <i className="fab fa-cc-paypal"></i>
         <i className="fab fa-cc-apple-pay"></i>
      </div>
    </aside>
  );
}

function PaymentCard({ value, title, desc, icon, color, isSelected }) {
  const colorMap = {
    blue: "border-blue-500 bg-blue-50/50 text-blue-600 shadow-blue-100",
    green: "border-green-500 bg-green-50/50 text-green-600 shadow-green-100"
  };

  return (
    <div className={`relative flex items-center p-4 rounded-2xl border-2 transition-all cursor-pointer ${isSelected ? colorMap[color] + " shadow-lg shadow-opacity-30" : "border-gray-100 bg-white hover:border-gray-200"}`}>
      <Radio value={value} className="mr-2" />
      <div className="flex items-center gap-4 ml-2">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${isSelected ? 'bg-white shadow-sm' : 'bg-gray-50 text-gray-400'}`}>
          <i className={`fas ${icon}`}></i>
        </div>
        <div>
          <p className="font-bold text-gray-800 text-sm">{title}</p>
          <p className="text-gray-400 text-[10px] font-medium uppercase tracking-wider">{desc}</p>
        </div>
      </div>
    </div>
  );
}

function EmptyCartMessage() {
  return (
    <div className="container py-16 mt-10 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="max-w-md mx-auto space-y-8">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-green-200 blur-3xl opacity-30 rounded-full"></div>
          <img src={emptyCart} alt="Empty cart" className="relative w-64 mx-auto animate-bounce duration-[3000ms]" />
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-black text-gray-800 tracking-tight">Your Cart is Empty</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Looks like you haven't added anything to your cart yet. Explore our fresh products and find something you love!
          </p>
        </div>
        <Button 
          as={Link}
          to="/"
          size="lg"
          variant="solid" 
          color="success"
          className="px-12 rounded-2xl font-bold shadow-xl shadow-green-100"
          startContent={<i className="fas fa-shopping-basket"></i>}
        >
          Start Shopping
        </Button>
      </div>
    </div>
  );
}
