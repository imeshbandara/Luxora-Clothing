"use client";

import useCartStore from "@/stores/cartStore";
import { ProductType } from "@/types";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const ProductInteraction = ({
  product,
  selectedSize,
  selectedColor,
}: {
  product: ProductType;
  selectedSize: string;
  selectedColor: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCartStore();

  const handleTypeChange = (type: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(type, value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleQuantityChange = (type: "increment" | "decrement") => {
    if (type === "increment") {
      setQuantity((prev) => prev + 1);
    } else {
      if (quantity > 1) {
        setQuantity((prev) => prev - 1);
      }
    }
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
      selectedColor,
      selectedSize,
    });
    toast.success("Product added to cart")
  };
  return (
    <div className="flex flex-col gap-4 mt-4">
      {/* SIZE */}
      <div className="flex flex-col gap-2 text-xs">
        <span className="text-gray-500">Size</span>
        <div className="flex items-center gap-2">
          {product.sizes.map((size) => (
            <div
              className={`cursor-pointer border-1 p-[2px] ${
                selectedSize === size ? "border-zinc-900 dark:border-slate-100" : "border-gray-300 dark:border-[#1f2d5a]"
              }`}
              key={size}
              onClick={() => handleTypeChange("size", size)}
            >
              <div
                className={`w-6 h-6 text-center flex items-center justify-center ${
                  selectedSize === size
                    ? "bg-black text-white dark:bg-slate-100 dark:text-[#0a1128]"
                    : "bg-white text-black dark:bg-[#1c2541] dark:text-slate-100"
                }`}
              >
                {size.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* COLOR */}
      <div className="flex flex-col gap-2 text-sm">
        <span className="text-gray-500">Color</span>
        <div className="flex items-center gap-2">
          {product.colors.map((color) => (
            <div
              className={`cursor-pointer border-1 p-[2px] ${
                selectedColor === color ? "border-gray-300 dark:border-slate-400" : "border-white dark:border-[#0a1128]"
              }`}
              key={color}
              onClick={() => handleTypeChange("color", color)}
            >
              <div className={`w-6 h-6`} style={{ backgroundColor: color }} />
            </div>
          ))}
        </div>
      </div>
      {/* QUANTITY */}
      <div className="flex flex-col gap-2 text-sm">
        <span className="text-gray-500">Quantity</span>
        <div className="flex items-center gap-2">
          <button
            className="cursor-pointer border-1 border-gray-300 dark:border-[#1f2d5a] p-1"
            onClick={() => handleQuantityChange("decrement")}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span>{quantity}</span>
          <button
            className="cursor-pointer border-1 border-gray-300 dark:border-[#1f2d5a] p-1"
            onClick={() => handleQuantityChange("increment")}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
      {/* BUTTONS */}
      <button
        onClick={handleAddToCart}
        className="bg-gray-800 dark:bg-slate-100 text-white dark:text-[#0a1128] hover:bg-black dark:hover:bg-slate-50 px-4 py-2 rounded-md shadow-lg flex items-center justify-center gap-2 cursor-pointer text-sm font-medium transition-all duration-200"
      >
        <Plus className="w-4 h-4" />
        Add to Cart
      </button>
      <button className="ring-1 ring-gray-400 dark:ring-[#1f2d5a] shadow-lg text-gray-800 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-[#131a30] px-4 py-2 rounded-md flex items-center justify-center cursor-pointer gap-2 text-sm font-medium transition-all duration-200">
        <ShoppingCart className="w-4 h-4" />
        Buy this Item
      </button>
    </div>
  );
};

export default ProductInteraction;
