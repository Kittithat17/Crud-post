"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from './cartService/page';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const subtotal = getTotalPrice();
  const shippingFee = 150.00; // ค่าธรรมเนียมการจัดส่งและดำเนินการโดยประมาณ
  const total = subtotal + shippingFee;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <h1 className="text-2xl font-bold mb-8">ตะกร้า</h1>
        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <p>ไม่มีสินค้าในตะกร้า</p>
          <Button asChild className="mt-4 bg-black text-white hover:bg-gray-800">
            <Link href="/products">เลือกซื้อสินค้า</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left side - Cart items */}
        <div className="w-full lg:w-2/3">
          <h1 className="text-2xl font-bold mb-8">ตะกร้า</h1>
          
          <div className="space-y-6">
            {items.map((item) => (
              <div key={`${item.product.id}-${item.selectedSize}`} className="flex border-b pb-6">
                <div className="w-24 h-24 bg-gray-100 rounded relative mr-4">
                  <Image 
                    src={item.product.mainImage} 
                    alt={item.product.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-bold text-lg">{item.product.name}</h3>
                      <p className="text-gray-600">{item.product.subtitle}</p>
                      <p className="text-gray-600">{item.product.colorName}</p>
                      <p className="text-gray-600">ไซส์ {item.selectedSize}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">฿{parseFloat(item.product.price.replace(/[^\d.]/g, '')).toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center border rounded-md">
                      <button 
                        className="px-3 py-1"
                        onClick={() => updateQuantity(item.product.id, item.selectedSize, Math.max(1, item.quantity - 1))}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-3 py-1 border-x">{item.quantity}</span>
                      <button 
                        className="px-3 py-1"
                        onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Right side - Summary */}
        <div className="w-full lg:w-1/3">
          <h2 className="text-2xl font-bold mb-8">สรุป</h2>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <span>ยอดรวมย่อย</span>
              <div className="flex items-center">
                <span className="font-semibold">฿{subtotal.toLocaleString()}</span>
                <button className="ml-2 text-gray-500 hover:text-gray-800">
                  <span className="sr-only">ข้อมูลเพิ่มเติม</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4M12 8h.01" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="flex justify-between mb-6 pb-6 border-b">
              <span>ค่าธรรมเนียมการจัดส่งและดำเนินการโดยประมาณ</span>
              <span className="font-semibold">฿{shippingFee.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between font-bold mb-6">
              <span>ยอดรวม</span>
              <span>฿{total.toLocaleString()}</span>
            </div>
            
            <Button className="w-full py-6 bg-black text-white hover:bg-gray-800 rounded-none mb-4">
              บุคคลทั่วไปเข้าเอาท์
            </Button>
            
            <Button variant="outline" className="w-full py-6 border-black text-black hover:bg-gray-100 rounded-none mb-4">
              สมาชิกเข้าเอาท์
            </Button>
            
            <Button variant="outline" className="w-full py-4 border rounded-md">
              <div className="flex justify-center items-center">
                <Image 
                  src="/images/paypal.png" 
                  alt="PayPal" 
                  width={80} 
                  height={20} 
                />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;