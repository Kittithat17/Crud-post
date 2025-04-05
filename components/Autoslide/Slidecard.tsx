"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const products = [
  {
    id: 1,
    name: "Air Max 90 LTR",
    image: "/images/ddddd.jpg",
    
  },
  {
    id: 2,
    name: "Air Max Plus",
    image: "/images/ddddd.jpg",
   
  },
  {
    id: 3,
    name: "Air Max 90",
    image: "/images/ddddd.jpg",
    
  },
  {
    id: 4,
    name: "Air Max Pulse",
    image: "/images/ddddd.jpg",
    
  },
  {
    id: 5,
    name: "Air Max 90",
    image: "/images/ddddd.jpg",
    
  },
  {
    id: 6,
    name: "Air Max 90",
    image: "/images/ddddd.jpg",
    
  },
];

export const Slidecard = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleProducts, setVisibleProducts] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth < 768) {
          setVisibleProducts(1);
        } else if (window.innerWidth < 1024) {
          setVisibleProducts(2);
        } else {
          setVisibleProducts(3);
        }
      }
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setStartIndex((prevIndex) =>
      (prevIndex + 1) % (products.length - visibleProducts + 1)
    );
  };

  const prevSlide = () => {
    setStartIndex((prevIndex) =>
      prevIndex === 0 ? products.length - visibleProducts : prevIndex - 1
    );
  };

  return (
    <section className="py-12 px-4 md:px-8">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Explore the Max Timeline</h2>
        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-100"
            aria-label="Previous products"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-100"
            aria-label="Next products"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${startIndex * (100 / visibleProducts)}%)` }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-2"
            >

                <div className="bg-[#f5f5f5] rounded-lg overflow-hidden mb-3">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="w-full h-auto object-contain transition transform hover:scale-105"
                  />
                </div>
                <h3 className="font-medium">{product.name}</h3>
                
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
