'use client'

import  React, {useState} from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'react-responsive-carousel/lib/styles/carousel.min.css';



interface ImageType {
  id: number | string;
  attributes: {
    url: string;
    name?: string; 
  };
}


const ImageProduct = ({ images }: {images:ImageType[]}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const nextImage = () => {
    if (images && images.length > 0) {
      setActiveImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (images && images.length > 0) {
      setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  if (!images || images.length === 0) {
    return <div>No images available</div>;
  }

  return (
    <div className="text-white text-[20px] w-3/3 max-w-[1360px]  sticky top-[50px]">
      {/* Main image display with navigation arrows */}
      <div className="w-full h-[500px] bg-white relative">
        <img
          src={images[activeImageIndex].attributes.url}
          alt={images[activeImageIndex].attributes?.name || "Product image"}
          className="w-full h-full object-contain"
        />
        
        {/* Navigation arrows */}
        <button 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/80 rounded-full p-2"
          onClick={prevImage}
        >
          ←
        </button>
        <button 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/80 rounded-full p-2"
          onClick={nextImage}
        >
          →
        </button>
      </div>

      {/* Thumbnail navigation */}
      <div className="flex flex-row gap-2 justify-center mb-100">
        {images.map((img, index) => (
            
          <div 
            key={img.id}
            className={`w-[80px] h-[80px] cursor-pointer ${index === activeImageIndex ? 'border-2 border-blue-500' : ''}`}
            onClick={() => setActiveImageIndex(index)}
          >
            <img
              src={img.attributes.url}
              alt={img.attributes?.name || `Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageProduct;