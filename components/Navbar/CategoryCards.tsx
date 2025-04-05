"use client";

import Image from "next/image";
import Link from "next/link";

const categories = [
    {
      id: 1,
      name: "Running",
      image: "/images/dddd.jpg",
      link: "#"
    },
    {
      id: 2,
      name: "Basketball",
      image: "/images/ddddd.jpg",
      link: "#"
    },
    {
      id: 3,
      name: "Basketball",
      image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png",
      link: "#"
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
            className="w-24 object-cover transition-transform duration-500 group-hover:scale-105"
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
