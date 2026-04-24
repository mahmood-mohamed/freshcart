import { Button } from "@heroui/react";
import { formatCurrency } from "../../helpers/formatCurrencyHelper";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CartProduct({ product, removeSpecificCartItem, updateProductCount }) {
  const [isLoadingRemove, setIsLoadingRemove] = useState(false);
  const [productCount, setProductCount] = useState(product.count);

  useEffect(() => {
    setProductCount(product.count);
  }, [product.count]);

  const handleIncrement = () => {
    const newCount = Number(productCount) + 1;
    setProductCount(newCount);
    updateProductCount(product.product._id, newCount);
  };

  const handleDecrement = () => {
    if (productCount <= 1) return;
    const newCount = Number(productCount) - 1;
    setProductCount(newCount);
    updateProductCount(product.product._id, newCount);
  };

  const handleBlur = (e) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val) && val >= 1) {
      updateProductCount(product.product._id, val);
    } else {
      setProductCount(product.count);
    }
  };

  return (
  <div className="group relative bg-white rounded-3xl p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col md:flex-row gap-4 md:gap-6">

    {/* Image */}
    <div className="relative w-full md:w-32 h-40 md:h-32 shrink-0 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
      <img 
        src={product.product.imageCover} 
        alt={product.product.title} 
        className="w-full h-full object-contain p-2 transform group-hover:scale-105 transition-transform duration-500" 
      />
    </div>

    {/* Product Info */}
    <div className="flex-grow space-y-2 text-center md:text-left">
      <h3 className="font-bold text-gray-800 text-base md:text-lg line-clamp-2 md:line-clamp-1 hover:text-green-600 transition-colors duration-300">
        <Link to={`/productDetails/${product.product._id}`}>
          {product.product.title}
        </Link>
      </h3>

      <span className="inline-block px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-bold">
        {product.product.category?.name || "Grocery"}
      </span>

      <p className="text-gray-400 text-sm font-medium">
        Unit Price: {formatCurrency(product.price)}
      </p>
    </div>

    {/* Controls */}
    <div className="w-full md:w-auto flex flex-col sm:flex-row md:flex-col items-center md:items-end justify-between gap-4">

      {/* Quantity + Remove */}
      <div className="flex items-center justify-between w-full sm:w-auto gap-3">

        {/* Counter */}
        <div className="flex items-center bg-gray-50 border border-gray-100 p-1 rounded-2xl">
          <Button 
            isIconOnly
            size="sm"
            variant="light"
            isDisabled={productCount <= 1}
            onPress={handleDecrement}
            className="w-8 h-8 rounded-xl text-gray-600 hover:bg-white"
          >
            <i className="fas fa-minus text-xs"></i>
          </Button>

          <input
            disabled={isLoadingRemove}
            type="number"
            min={1}
            className="w-12 bg-transparent text-center font-bold text-gray-800 text-sm outline-none"
            value={productCount}
            onChange={(e) => setProductCount(e.target.value)}
            onBlur={handleBlur}
          />

          <Button 
            isIconOnly
            size="sm"
            variant="light"
            onPress={handleIncrement}
            className="w-8 h-8 rounded-xl text-gray-600 hover:bg-white"
          >
            <i className="fas fa-plus text-xs"></i>
          </Button>
        </div>

        {/* Remove */}
        <Button
          isIconOnly
          isDisabled={isLoadingRemove}
          onPress={() => {
            setIsLoadingRemove(true);
            removeSpecificCartItem(product.product._id);
          }}
          variant="flat"
          color="danger"
          className="w-10 h-10 rounded-2xl bg-red-50 hover:bg-red-100 text-red-600"
        >
          {isLoadingRemove ? (
            <i className="fas fa-spinner fa-spin"></i>
          ) : (
            <i className="far fa-trash-alt"></i>
          )}
        </Button>
      </div>

      {/* Subtotal */}
      <div className="text-center md:text-right w-full sm:w-auto">
        <p className="text-xs text-gray-400 font-medium mb-1">Subtotal</p>
        <p className="text-base font-semibold text-gray-800">
          {formatCurrency(productCount * product.price)}
        </p>
      </div>
    </div>

  </div>
);

}
