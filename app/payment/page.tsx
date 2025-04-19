//app\payment\page.tsx
'use client';

import { useState } from 'react';
import { useCart } from '@/components/cartService/page';
import Image from 'next/image';

const inputClass =
  'border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-black transition';

  const OrderSummary = () => {
    const { items, getTotalPrice } = useCart();
  
    // ✅ Fix: Ensure subtotal is a number
    const subtotal = Number(getTotalPrice() || 0);
    const shippingFee = 0; // free shipping
    const total = subtotal + shippingFee;
  
    return (
      <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-6 space-y-4">
        <h2 className="text-xl font-bold">สรุปคำสั่งซื้อ</h2>
        <p className="text-sm text-gray-500">มาถึง ศ. 25 เม.ย. - อ. 29 เม.ย.</p>
  
        {/* Products Info */}
        {items.map((item) => (
          <div key={`${item.product.id}-${item.selectedSize}`} className="flex gap-4">
            <img
              src={item.product.mainImage}
              alt={item.product.name}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div className="flex-1 space-y-1">
              <p className="font-semibold">{item.product.name}</p>
              <p className="text-sm text-gray-600">จำนวน {item.quantity}</p>
              <p className="text-sm text-gray-600">ไซส์ {item.selectedSize}</p>
              <p className="font-semibold text-gray-800">
                ฿{(Number(item.product.price) * item.quantity).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
  
        <hr className="border-gray-200" />
  
        {/* Summary */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>ยอดรวมย่อย</span>
            <span>฿{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>การจัดส่ง/การส่งมอบ</span>
            <span className="text-green-600">ฟรี</span>
          </div>
          <p className="text-xs text-gray-500">คุณได้สิทธิ์จัดส่งสินค้าฟรี</p>
          <hr className="border-gray-200" />
          <div className="flex justify-between font-bold text-base">
            <span>ยอดรวม</span>
            <span>฿{total.toLocaleString()}</span>
          </div>
        </div>
      </div>
    );
  };
    
const CheckoutPage = () => {
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-1">
        <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
          <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8 space-y-10">
            <h1 className="text-2xl font-bold">การส่งมอบ</h1>

            {/* Delivery Method */}
            <div>
              <h2 className="font-semibold mb-2">คุณต้องการรับสินค้าอย่างไร</h2>
              <div className="flex gap-4">
                <button
                  onClick={() => setDeliveryMethod('delivery')}
                  className={`flex-1 p-4 rounded-lg border text-center ${
                    deliveryMethod === 'delivery' ? 'bg-black text-white' : 'bg-gray-100'
                  }`}
                >
                  🚚 จัดส่งที่บ้าน
                </button>
                <button
                  onClick={() => setDeliveryMethod('pickup')}
                  className={`flex-1 p-4 rounded-lg border text-center ${
                    deliveryMethod === 'pickup' ? 'bg-black text-white' : 'bg-gray-100'
                  }`}
                >
                  🏪 รับที่ร้าน
                </button>
              </div>
            </div>

            {/* Member/Login */}
            <div className="flex justify-between">
              <button className="text-blue-600 font-medium">สมัครเป็น Member</button>
              <button className="text-blue-600 font-medium">ล็อกอิน</button>
            </div>

            {/* Address Info */}
            <div>
              <h2 className="font-semibold mb-2">ป้อนชื่อและที่อยู่:</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="ชื่อ*" className={inputClass} />
                <input type="text" placeholder="นามสกุล*" className={inputClass} />
                <input type="text" placeholder="ที่อยู่บรรทัดที่ 1*" className={inputClass} />
                <input type="text" placeholder="ที่อยู่บรรทัดที่ 2 (ถ้ามี)" className={inputClass} />
                <input type="text" placeholder="เขต/อำเภอ*" className={inputClass} />
                <input type="text" placeholder="จังหวัด*" className={inputClass} />
                <input type="text" placeholder="รหัสไปรษณีย์*" className={inputClass} />
                <input type="text" placeholder="ไทย" disabled className={`${inputClass} bg-gray-100`} />
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="font-semibold mb-2">โปรดป้อนข้อมูลการติดต่อ</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="email" placeholder="อีเมล*" className={inputClass} />
                <input type="tel" placeholder="หมายเลขโทรศัพท์*" className={inputClass} />
              </div>
            </div>

            {/* Billing */}
            <div>
              <h2 className="font-semibold mb-2">การเรียกเก็บเงิน</h2>
              <input type="text" placeholder="ที่อยู่เพื่อเรียกเก็บเงิน*" className={inputClass} />
            </div>

            {/* Shipping Info */}
            <div>
              <h2 className="font-semibold mb-2">การจัดส่ง</h2>
              <div className="bg-gray-100 p-4 rounded-lg space-y-1">
                <p>จัดส่งสินค้าฟรี</p>
                <p className="text-sm text-gray-600">มาถึง ศ. 25 เม.ย. - อ. 29 เม.ย.</p>
                <p className="text-sm text-gray-500">
                  การจัดส่งนี้เป็นการจัดส่งข้ามประเทศที่จำเป็นต้องผ่านศุลกากร
                </p>
              </div>
            </div>

            {/* Promo Code */}
            <div>
              <h2 className="font-semibold mb-2">มีรหัสโปรโมชันไหม?</h2>
              <input type="text" placeholder="รหัสโปรโมชัน" className={inputClass} />
            </div>

            {/* Payment Info */}
            <div>
              <h2 className="font-semibold mb-2">คุณต้องการชำระเงินอย่างไร</h2>
              <label className="block mb-2">💳 บัตรเครดิตหรือเดบิต</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="หมายเลขบัตร" className={inputClass} />
                <input type="text" placeholder="ชื่อบนบัตร" className={inputClass} />
                <input type="text" placeholder="MM/YY" className={inputClass} />
                <input type="text" placeholder="CVC" className={inputClass} />
              </div>
            </div>

            {/* Terms and Submit */}
            <div className="text-sm text-gray-500">
              <p className="mb-4">
                การคลิก 'สั่งซื้อ' หมายความว่าคุณยอมรับ{' '}
                <a href="#" className="underline">
                  ข้อกำหนดและเงื่อนไขของ ESW
                </a>
              </p>
              <button className="w-full py-3 bg-black text-white rounded-lg text-lg hover:opacity-90 transition">
                🛍️ สั่งซื้อ
              </button>
            </div>
          </div>
        </div>
      </div>

      <OrderSummary />
    </div>
  );
};

export default CheckoutPage;
