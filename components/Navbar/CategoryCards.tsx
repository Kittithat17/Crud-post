"use client";

import Image from "next/image";
import Link from "next/link";

const categories = [
    {
      id: 1,
      name: "Now",
      image: "/images/dddd.jpg",
      link: "/catagory"
    },
    {
      id: 2,
      name: "Now",
      image: "https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/h_522,c_limit/4c99778b-acd3-4b36-8e24-81037a6349eb/%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%AD%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B9%80%E0%B8%9B%E0%B9%87%E0%B8%99%E0%B8%97%E0%B8%B2%E0%B8%87%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%82%E0%B8%AD%E0%B8%87-nike.jpg",
      link: "/catagory"
    },
    {
      id: 3,
      name: "Now",
      image: "/images/nike2.jpg",
      link: "/catagory"
    },
    
  ];

const CategoryCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-28 py-8">
      {categories.map((category) => (
        <div key={category.id} className="relative h-[500] overflow-hidden group ">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="w-24  transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-end p-6">
            <div className="w-full">
              <Link
                href={category.link}
                className="block w-max bg-white hover:bg-gray-100 text-black font-medium py-2 px-4 rounded-full text-sm"
              >
                Shop {category.name}
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryCards;
