import React from 'react';
import ImageProduct from '@/components/ImageProduct/page';
import Link from "next/link";
import { notFound } from 'next/navigation';

const mockImages = [
    {
      id: 1,
      attributes: {
        url: "https://brand.assets.adidas.com/image/upload/v1717008412/Training_SS_24_Strength_global_Launch_What_shoes_should_you_wear_to_the_gym_image_Rapidmove_fc98ca311b.jpg",
        name: "Adidas Rapidmove Trainer - Front"
      }
    },
    {
      id: 2,
      attributes: {
        url: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/bcf68f44-dcf3-49c9-b1e6-8885c984371e/air-max-plus-shoes-0qf5Z4.png",
        name: "Nike Air Max Plus - Side"
      }
    },
    {
      id: 3,
      attributes: {
        url: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1200",
        name: "Running Shoes - Top View"
      }
    }
  ];

  interface ProductData {
    id:string;
    name:string;
    category:string;
    price:number;
    images:Array<{
      attributes:{
        url:string;
        name?:string;
      }
    }>
  }



const Product = async ({params}:{params:{shoeId:string}} ) => {
  const { shoeId } = params;
  
  // Fetch product data
  let productData: ProductData | null = null;

  try {
    const response = await fetch(`https://localhost/products/${shoeId}`, {
      next: { revalidate: 3600 } // Revalidate every hour (optional)
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.status}`);
    }
    
    productData = await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    // You can handle the error, e.g., redirect to error page
    // or use not found for 404
    return notFound();
  }
  
  // If data is missing or empty, show not found
  if (!productData) {
    return notFound();
  }
 
  return (
    <div  className='flex flex-row justify-center'>
        <div className='ml-[15%] w-3/5 '>
            <ImageProduct images={mockImages} />
        </div>
        <div className='w-2/5 mt-[30px] mr-[80px] h-[80px] bg-amber-300'>
            <h1 className='text-2xl text-black'>{productData.name}</h1>
            <h1 className='text-2xl text-stone-200'>category </h1>
            <h1 className='text-2xl text-black'>$5000</h1>
        </div>
    </div>
  )
}

export default Product