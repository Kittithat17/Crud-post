"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../components/cartService/page";
import { Trash2, Plus, Minus } from 'lucide-react';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const subtotal = getTotalPrice();
  const shippingFee = 150.00; // ค่าธรรมเนียมการจัดส่งและดำเนินการโดยประมาณ
  const total = subtotal + shippingFee;

  // If cart is empty, show empty cart message
  if (items.length === 0) {
    return (
      <div className="flex justify-center items-center mt-20">
        <div className="w-full max-w-md border-2 rounded-lg shadow-sm p-6 md:p-8 ">
          {/* Empty cart content */}
          <div className="flex flex-col items-center">
            {/* Empty cart Image */}
            <Image
              src="/images/empty-cart.jpg"
              alt="Empty Cart"
              width={300}
              height={300}
              className="w-[200px] md:w-[300px] mb-6"
              priority={false}
            />

            {/* Empty cart Message */}
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold mb-2 ">Your cart is empty</h2>
              <p >
                You have not added anything in your cart.
                <br />
                Go ahead and explore categories.
              </p>
            </div>

            {/* Link to homepage */}
            <Link
              href="/"
              className="w-full py-3 px-6 rounded-md text-lg font-medium text-center transition-transform active:scale-95 hover:opacity-75"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // If cart has items, show cart with items
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left side - Cart items */}
        <div className="w-full lg:w-2/3">
          <h1 className="text-2xl font-bold mb-8">ตะกร้า</h1>
          
          <div className="space-y-6">
            {items.map((item) => (
              <div key={`${item.product.id}-${item.selectedSize}`} className="flex border-b pb-6">
                <div className="w-24 h-24 rounded relative mr-4">
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
                      <p >{item.product.subtitle}</p>
                      <p >{item.product.colorName}</p>
                      <p >ไซส์ {item.selectedSize}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{item.product.price}</p>
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
                      className=" hover:text-red-500"
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
          
          <div className="p-6 rounded-lg shadow-sm border">
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
            
            <button className="w-full py-3 px-6 mb-4 text-lg font-medium rounded-md hover:opacity-90 transition-all">
              บุคคลทั่วไปเข้าเอาท์
            </button>
            
            <button className="w-full py-3 px-6 mb-4 border text-lg font-medium rounded-md transition-all">
              สมาชิกเข้าเอาท์
            </button>
            
            <button className="w-full py-3 px-6 border rounded-md flex justify-center items-center">
              <Image 
                src="/images/paypal.png" 
                alt="PayPal" 
                width={80} 
                height={20} 
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;