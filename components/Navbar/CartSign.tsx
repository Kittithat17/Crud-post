"use client"

import { ListOrdered, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"
import { SignedIn } from "@clerk/nextjs"
import { useCart } from '../cartService/page';
import { useEffect, useState } from "react";

const CartSign = () => {
  const { getTotalItems } = useCart();
  const [itemCount, setItemCount] = useState(0); // Initialize with 0 to match server

  useEffect(() => {
    // Update the count after component mounts (client-side only)
    setItemCount(getTotalItems());
  }, [getTotalItems]);

  return (
    <div className="flex items-center gap-3">
      <Button asChild variant={"ghost"} size={'lg'}>
        <Link href="/cart" className="relative flex items-center">
          <ShoppingBag className="size-7" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {itemCount}
            </span>
          )}
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