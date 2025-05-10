"use client"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Autoslides from "@/components/Autoslide/Autoslide"
import CategoryCards from "@/components/Navbar/CategoryCards"
import { Slidecard } from "@/components/Autoslide/Slidecard"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Marquee from "@/components/Marquee"
import { ScrollAreaHorizontalDemo } from "@/components/Autoslide/scrollslide"


const Page = () => {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  // Create refs for each section
  const heroRef = useRef(null)
  const collectionRef = useRef(null)
  const communityRef = useRef(null)
  
  const isHeroInView = useInView(heroRef, { once: true, margin: "-100px" })
  const isCollectionInView = useInView(collectionRef, { once: true, margin: "-100px" })
  const isCommunityInView = useInView(communityRef, { once: true, margin: "-100px" })

  return (
    <div className="flex flex-col">
      <Marquee/>
      <Autoslides />
      
      {/* Hero Section with AIR MAX DN8 */}
      <motion.div 
        ref={heroRef}
        initial="hidden"
        animate={isHeroInView ? "show" : "hidden"}
        variants={container}
        className="w-full py-12 px-4 text-center"
      >
        <motion.h2 variants={item} className="text-xl font-black">ULTRA-REALISTIC COATING TECHNOLOGY</motion.h2>
        <motion.h1 
          variants={item}
          className="font-black uppercase py-4" 
          style={{ fontSize: "100px" }}
        >
          AIR MA<span className="text-red-500">X</span> DN8
        </motion.h1>
        <motion.p variants={item} className="max-w-2xl mx-auto mb-6 text-lg">
          Discover the coating technology as demonstrated by Nico Williams
        </motion.p>
        <motion.div variants={item}>
          <Link href="/catagory">
            <Button className="px-6 py-8 rounded-full hover:bg-gray-800 transition uppercase font-black text-lg">
              shop now
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      <CategoryCards/>
      
      <motion.div 
        ref={collectionRef}
        initial="hidden"
        animate={isCollectionInView ? "show" : "hidden"}
        variants={container}
        className="w-full py-10 px-4 text-center"
      >
        <motion.h2 variants={item} className="text-xl font-black">JOIN THE SNEAKER<span style={{ color: "red" }}>X</span> COLLECTION</motion.h2>
        <motion.h1 
          variants={item}
          className="font-black uppercase py-4" 
          style={{ fontSize: "70px" }}
        >
          Best sneaker collection
        </motion.h1>
        <motion.p variants={item} className="text-center text-lg font-stretch-semi-condensed mb-6 ">
          Experience the ultimate in comfort and style with our premium sneaker collection.
          <br/>
          Designed for performance and crafted for those who demand excellence.
        </motion.p>
        <motion.div variants={item}>
          <Link href="/catagory">
            <Button className="px-6 py-8 rounded-full hover:bg-gray-800 transition uppercase font-black text-lg">
              shop now
            </Button>
          </Link>
        </motion.div>
      </motion.div>
      
      <Slidecard />

      <motion.div 
        ref={communityRef}
        initial="hidden"
        animate={isCommunityInView ? "show" : "hidden"}
        variants={container}
        className="w-full py-12 px-4 text-center"
      >
        <motion.h2 variants={item} className="text-xl font-black uppercase">From Our Community</motion.h2>
        <motion.h1 
          variants={item}
          className="font-black uppercase py-4" 
          style={{ fontSize: "100px" }}
        >
          Never miss a beat
        </motion.h1>
        <motion.p variants={item} className="max-w-2xl mx-auto mb-6 text-lg">
          Sign up with us today and be part of
          Converse mailing list. Get the latest update, news and exclusive
          drop - sent straight to your inbox.
        </motion.p>
        <motion.div variants={item}>
          <Link href="/catagory">
            <Button className="px-6 py-8 rounded-full hover:bg-gray-800 transition uppercase font-black text-lg">
              shop now
            </Button>
          </Link>
        </motion.div>
      </motion.div>
      <div>
       <ScrollAreaHorizontalDemo />
      </div>
    </div>
  )
}

export default Page