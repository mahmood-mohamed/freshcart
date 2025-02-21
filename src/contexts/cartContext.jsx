import { createContext, useEffect, useState } from "react";
import axios from "axios"; // Ensure axios is imported

export const CartItemsContext = createContext(null);

export default function CartItemsProvider({ children }) {
  const [numOfCartItems, setNumOfCartItems] = useState(null);

  useEffect(() => {
    async function getCartItems() {
      try {
        const { data } = await axios.get(
          "https://ecommerce.routemisr.com/api/v1/cart",
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        setNumOfCartItems(data.numOfCartItems);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    }

    getCartItems();
  }, []);

  return (
    <CartItemsContext.Provider value={{ numOfCartItems, setNumOfCartItems }}>
      {children}
    </CartItemsContext.Provider>
  );
}
