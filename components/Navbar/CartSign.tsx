"use client"

import { ListOrdered, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"
import { SignedIn } from "@clerk/nextjs"
//import { useContext } from "react"
import { useCart } from '../cartService/page';


const CartSign = () => {
  const { getTotalItems } = useCart();
  const itemCount = getTotalItems();
  

  return (
    <div className="flex items-center gap-3">
      <Button asChild variant={"ghost"} size={'lg'}>
        <Link href="/cart" className="relative flex items-center">
          <ShoppingBag className="size-7" />
          <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {itemCount}
          </span> 
        </Link>
      </Button>
    

    <SignedIn>
    <Button asChild variant={"ghost"} size={'lg'}>
        <Link href="/orderhistory" className="relative flex items-center">
          <ListOrdered className="size-7" />
        </Link>
      </Button>
    </SignedIn>
    </div>
  )
}
export default CartSign
