import { Button } from "@heroui/react";
import { formatCurrency } from "../../helpers/formatCurrencyHelper";
import { useEffect, useState } from "react";

export default function CartProduct({ product, removeSpecificCartItem, updateProductCount }) {
  const [isLoadingRemove, setIsLoadingRemove] = useState(false);
  const [productCount, setProductCount] = useState(product.count);

  useEffect(() => {
    setProductCount(product.count);
  }, [product.count]);

  const handleIncrement = () => {
    const newCount = productCount + 1;
    setProductCount(newCount);
    updateProductCount(product.product._id, newCount);
  };

  const handleDecrement = () => {
    if (productCount > 1) {
      const newCount = productCount - 1;
      setProductCount(newCount);
      updateProductCount(product.product._id, newCount);
    }
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
    <div className="group relative bg-white rounded-3xl p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row gap-6 items-center">
      {/* 🖼️ Product Image */}
      <div className="relative w-full sm:w-32 h-32 shrink-0 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
        <img 
          src={product.product.imageCover} 
          alt={product.product.title} 
          className="w-full h-full object-contain p-2 transform group-hover:scale-110 transition-transform duration-500" 
        />
      </div>

      {/* 📝 Product Info */}
      <div className="flex-grow space-y-2 text-center sm:text-left">
        <h3 className="font-bold text-gray-800 text-lg line-clamp-1 max-w-sm">
          {product.product.title.split(' ').slice(0, 4).join(' ')}
        </h3>
        <span className="inline-block px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-bold">
          {product.product.category?.name || "Grocery"}
        </span>
        <p className="text-gray-400 text-sm font-medium">Unit Price: {formatCurrency(product.price)}</p>
      </div>

      {/* 🔢 Controls */}
      <div className="flex flex-col sm:items-end justify-between h-full gap-4 w-full sm:w-auto">
        <div className="flex items-center justify-center sm:justify-end gap-3">
          <div className="flex items-center bg-gray-50 border border-gray-100 p-1 rounded-2xl">
            <Button 
              isIconOnly
              size="sm"
              variant="light"
              isDisabled={productCount <= 1}
              onPress={handleDecrement}
              className="min-w-0 w-8 h-8 rounded-xl text-gray-600 hover:bg-white hover:shadow-sm"
              aria-label="Decrease quantity"
            >
              <i className="fas fa-minus text-xs"></i>
            </Button>
            <input 
              type="text" 
              className="w-10 bg-transparent text-center font-bold text-gray-800 text-sm outline-none"
              value={productCount}
              onChange={(e) => setProductCount(e.target.value)}
              onBlur={handleBlur}
            />
            <Button 
              isIconOnly
              size="sm"
              variant="light"
              onPress={handleIncrement}
              className="min-w-0 w-8 h-8 rounded-xl text-gray-600 hover:bg-white hover:shadow-sm"
              aria-label="Increase quantity"
            >
              <i className="fas fa-plus text-xs"></i>
            </Button>
          </div>
          
          <Button
            isIconOnly
            isLoading={isLoadingRemove}
            onPress={() => removeSpecificCartItem(product.product._id, setIsLoadingRemove)}
            variant="flat"
            color="danger"
            className="w-10 h-10 rounded-2xl bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
            aria-label="Remove item"
          >
            <i className="far fa-trash-alt"></i>
          </Button>
        </div>

        <div className="text-right">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-widest mb-1">Subtotal</p>
          <p className="text-xl font-semibold text-gray-800 tracking-tight">
            {formatCurrency(productCount * product.price)}
          </p>
        </div>
      </div>
    </div>
  );
}
