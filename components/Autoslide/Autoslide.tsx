'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function Autoslides() {
  return (
    <div className="flex justify-center">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper w-[1700px] h-[800px] brightness-75 object-cover bg-amber-600" // ปรับขนาด Swiper
      >
        <SwiperSlide>
          <img src="/images/slide1.jpeg" alt="Slide 1" className="w-full h-full object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/slide1.jpeg" alt="Slide 2" className="w-full h-full object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/slide1.jpeg" alt="Slide 3" className="w-full h-full object-cover" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

