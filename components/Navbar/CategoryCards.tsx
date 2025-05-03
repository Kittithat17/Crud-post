"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    id: 1,
    name: "New Arrivals",
    image: "/images/dddd.jpg",
    link: "/category"
  },
  {
    id: 2,
    name: "Best Sellers",
    image: "https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/h_522,c_limit/4c99778b-acd3-4b36-8e24-81037a6349eb/%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%AD%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B9%80%E0%B8%9B%E0%B9%87%E0%B8%99%E0%B8%97%E0%B8%B2%E0%B8%87%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%82%E0%B8%AD%E0%B8%87-nike.jpg",
    link: "/category"
  },
  {
    id: 3,
    name: "Sale",
    image: "/images/nike2.jpg",
    link: "/category"
  },
];

const CategoryCards = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 sm:px-8 md:px-12 lg:px-28 py-8"
    >
      {categories.map((category, index) => (
        <motion.div 
          key={category.id}
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-lg group"
        >
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
            priority={index === 0} // Only prioritize loading the first image
          />
          <div className="absolute inset-0  flex items-end p-6">
            <div className="w-full">
              <Link
                href={category.link}
                className="inline-block bg-white hover:bg-gray-100 text-black font-medium py-3 px-6 rounded-full text-sm transition-colors duration-300"
              >
                Shop {category.name}
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CategoryCards;