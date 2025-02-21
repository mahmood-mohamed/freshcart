import { Button } from "@heroui/react";
import { formatCurrency } from "../../helpers/formatCurrencyHelper";
import { useEffect, useState } from "react";

export default function CartProduct({product, removeSpecificCartItem, updateProductCount}) {

  const [isLoadingRemove, setIsLoadingRemove] = useState(false);
  const [productCount, setProductCount] = useState(product.count);

  useEffect(()=> {
    setProductCount(product.count);
  },[product.count])

  function increment(){
    setProductCount(productCount + 1);
    updateProductCount(product.product._id, productCount + 1);
  }

  function decrement(){
    setProductCount(productCount - 1);
    updateProductCount(product.product._id, productCount - 1);
  }

  return (
    <div className="justify-between items-center mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
            <img src={product.product.imageCover} alt={product.product.title.split(' ').slice(0,3).join(' ')} className="w-full rounded-lg sm:w-40" />
            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between gap-1">
              <div className="mt-5 sm:mt-0">
                <h2 className="text-lg font-bold text-gray-900">{product.product.title.split(' ').slice(0,3).join(' ')}</h2>
                <p className="mt-1 text-xs text-gray-700">{formatCurrency(product.price) }</p>
              </div>
              <div className="mt-4 flex justify-between flex-wrap sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                <div className="flex items-stretch font-medium rounded-sm overflow-hidden border-gray-100">
                  <Button 
                    isDisabled={product.count === 1}
                    onPress={decrement}
                    className="rounded-none font-semibold min-w-0  bg-gray-100  duration-100 hover:bg-blue-500 hover:text-blue-50"> - </Button>
                  <input className="w-10 border border-slate-50 bg-white text-center text-xs outline-none" type="number" 
                    value={productCount} 
                    onChange={(e) => (setProductCount(e.target.value))} 
                    onBlur={(e)=> updateProductCount(product.product._id, e.target.value)} 
                    min={1} />
                  <Button 
                    onPress={increment}
                    className="rounded-none font-semibold min-w-0  bg-gray-100  duration-100 hover:bg-blue-500 hover:text-blue-50"> + </Button>
                </div>
                <div className="flex items-center gap-1 space-x-4">
                  <p className="text-sm font-medium">{ formatCurrency(product.count * product.price) }</p>
                </div>

                <Button
                  onPress={() => removeSpecificCartItem(product.product._id, setIsLoadingRemove)}
                  isLoading={isLoadingRemove}
                  className="p-0 rounded-full bg-transparent hover:bg-red-100 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                  aria-label="Remove product"
                  isIconOnly  
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-red-600 hover:text-red-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </Button>
              </div>
            </div>
    </div>
  )
}
