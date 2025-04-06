"use client"

import { Button } from "@/components/ui/button"


import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { AlignJustify } from "lucide-react"

import { InsideL } from "./InsideL"


export function Sideleft() {
  return (
    <div className="flex items-center">
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={'outline'}>
        <AlignJustify />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader className="flex flex-col items-center">
          <SheetTitle>Catagory</SheetTitle>
          <SheetDescription>
            
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center gap-4">
            <InsideL />
          </div>
          
        </div>
        
      </SheetContent>
    </Sheet>
    </div>
  )
}
