"use client"
import Autoslides from "@/components/Autoslide/Autoslide"
import CategoryCards from "@/components/Navbar/CategoryCards"
import { Slidecard } from "@/components/Autoslide/Slidecard"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const page = () => {
  return (
    <div className="flex flex-col">
      <Autoslides />
      
      {/* Hero Section with AIR MAX DN8 */}
      <div className="w-full py-12 px-4 text-center ">
        <h2 className="text-md font-black ">ULTRA-REALISTIC COATING TECHNOLOGY</h2>
        <h1 className="  font-black uppercase py-6" style={{ fontSize: "100px" }}>AIR MAX DN8</h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Discover the coating technology as demonstrated by Nico Williams
        </p>
        <Link href="/">
        <Button className=" px-6 py-8 rounded-full hover:bg-gray-800 transition uppercase font-black text-lg">
          shop now
        </Button>
        </Link>
      </div>

      <CategoryCards/>
      <div className="w-full py-10 px-4 text-center ">
        <h2 className="text-md font-semibold">JOIN THE SNEAKER<span style={{ color: "red" }}>X</span> COLLECTION</h2>
        <h1 className="  font-black uppercase py-6" style={{ fontSize: "70px" }}>Best sneaker collection</h1>
        <p className="text-center text-md font-stretch-semi-condensed mb-6">
      Experience the ultimate in comfort and style with our premium sneaker collection.
        <br/>
        Designed for performance and crafted for those who demand excellence.
      </p>
        <Link href="/">
        <Button className=" px-6 py-8 rounded-full hover:bg-gray-800 transition uppercase font-black text-lg">
          shop now
        </Button>
        </Link>
      </div>
      
      <Slidecard />
    </div>
  )
}

export default page

