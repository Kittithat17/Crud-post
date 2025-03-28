import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useState } from "react";
import { Minus, Plus } from "lucide-react"; // Import icons from lucide-react

const Addcartbut = () => {
  const [quantity, setQuantity] = useState(0);
  const itemPrice = 34; 

  const handleAddToCart = () => {
    setQuantity(prev => prev + 1);
  };

  const increment = () => {
    setQuantity(prev => prev + 1);
  };

  const decrement = () => {
    setQuantity(prev => (prev > 0 ? prev - 1 : 0));
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Quantity and Subtotal header - only shows when quantity > 0 */}
      {quantity > 0 && (
        <div className="flex justify-between text-sm">
          <span>Quantity</span>
          <span>Subtotal</span>
        </div>
      )}

      {/* Quantity controls and subtotal - only shows when quantity > 0 */}
      {quantity > 0 ? (
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={decrement}
              className="h-8 w-8 p-0"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-6 text-center">{quantity}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={increment}
              className="h-8 w-8 p-0"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <span className="font-medium">${(quantity * itemPrice).toFixed(2)}</span>
        </div>
      ) : (
        <Button
          onClick={handleAddToCart}
          className={cn(
            "w-full bg-transparent border-1 text-black shadow-none border-black/30 font-semibold hover:bg-neutral-700 hover:text-white hover:border-neutral-700/50"
          )}
        >
          Add to cart
        </Button>
      )}
    </div>
  );
};

export default Addcartbut;