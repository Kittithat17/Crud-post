
import { ShoppingCart} from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"


const CartSign= () => {
  return (
    <div className="flex items-center gap-3">
        <Button asChild variant={"ghost"}>
          <Link href="/cart">
            <ShoppingCart />
            Cart
          </Link>
        </Button>
    </div>
  )
}
export default CartSign