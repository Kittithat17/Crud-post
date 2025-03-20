"use client"
import Autoslides from "@/components/Autoslide/Autoslide"
import Cardd from "../components/card"
import { useEffect, useState } from "react"

// const [product, setProduct] = useState([]);

const page = () => {
  const product = [
    {title:"addidas"},
    {title:"vans"},
    {title:"nike"},
    {title:"converse"},
    {title:"converse"},
    {title:"converse"},
    {title:"converse"},
    {title:"converse"},
    {title:"converse"},

  ]
  return (
    <div>
      <Autoslides />
      <div className="flex justify-center gap-4 mt-8">
        {product?.map((item)=> (
          <button className="border border-black rounded-full hover:bg-black hover:text-white h-[50px] w-[120px] " key={item?.title}>
            {item?.title}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 center">
        <Cardd/>
        <Cardd/>
        <Cardd/>
        <Cardd/>
      </div>
    </div>
  )
}

export default page