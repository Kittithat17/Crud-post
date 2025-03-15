import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const Addcartbut = () => {
  return (
    <div>
      <Button
        className={cn(
          "w-full bg-transparent border-2 text-black shadow-none border-black/30 font-semibold hover:bg-neutral-700 hover:text-white hover:border-neutral-700/50"
        )}
      >
        Add to cart
      </Button>
    </div>
  );
};
export default Addcartbut;
