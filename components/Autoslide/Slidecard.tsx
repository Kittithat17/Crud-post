"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Gazelle Originals",
    subtitle: "Designed for a life in motion.",
    image: "/images/ddddd.jpg",
  },
  {
    id: 2,
    name: "Spezial Originals",
    subtitle: "A favourite for style tribes globally.",
    image:
      "https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/if_w_gt_800,w_800/03_originals_ss25_the_original_introduce_catlp_tc_spezial_d_cea77b9cc0.jpg",
  },
  {
    id: 3,
    name: "Samba Originals",
    subtitle: "Inspriring individuality in everystep.",
    image:
      "https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/if_w_gt_600,w_600/02_originals_ss25_the_original_introduce_catlp_tc_samba_m_2a75966b55.jpg",
  },
  {
    id: 4,
    name: "Forum Originals",
    subtitle: "The 80s basketball icon lives on.",
    image:
      "https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/if_w_gt_800,w_800/08_originals_ss25_the_original_introduce_catlp_tc_forum_d_15a5c6de5e.jpg",
  },
  {
    id: 5,
    name: "Samba Originals",
    subtitle: "From the court to the street.",
    image:
      "https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/if_w_gt_800,w_800/04_originals_ss25_the_original_introduce_catlp_tc_superstar_d_0cdbe78cd0.jpg",
  },
  {
    id: 6,
    name: "Taekwondo Originals",
    subtitle: "Inspriring individuality in everystep.",
    image:
      "https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/if_w_gt_800,w_800/06_originals_ss25_the_original_introduce_catlp_tc_taekwondo_d_c6b8d2f4d4.jpg",
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
          setVisibleProducts(4);
        }
      }
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setStartIndex(
      (prevIndex) => (prevIndex + 1) % (products.length - visibleProducts + 1)
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
        <h2 className="text-2xl font-bold ml-4">Explore the Max Timeline</h2>
        <div className="flex gap-4 mr-8 ">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-100"
            aria-label="Previous products"
          >
            <ChevronLeft className="h-9 w-9" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-100"
            aria-label="Next products"
          >
            <ChevronRight className="h-9 w-9" />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${startIndex * (100 / visibleProducts)}%)`,
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="w-full sm:w-1/2 lg:w-1/4 flex-shrink-0 px-2"
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
              <div className="flex flex-col gap-3">
                <h1 className="font-bold font- text-xl">{product.name}</h1>
                <p className="text-xl">{product.subtitle}</p>
              </div>

              <div className="mt-3">


              <Link
                href="/"
                className="text-xl font-bold hover:bg-gray-100 underline decoration-from-font underline-offset-4 "
                >
                Shop now
              </Link>
                </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
