'use client';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


export default function ShippingForm() {
  return (
    <div className="flex justify-center items-center py-3">
      <div className="w-full max-w-md p-6">
        <h1 className="text-5xl font-semibold  mb-4">Shipping Address</h1>
        <p className=" text-lg mb-6">Please enter an address to ship to</p>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium ">Full Name</label>
            <Input type="text" placeholder="Enter full name" className="mt-1 bg-transparent border-b border-gray-300 focus:border-gray-600 py-5" />
          </div>
          
          <div>
            <label className="block text-sm font-medium ">Address</label>
            <Input type="text" placeholder="Enter address" className="mt-1 bg-transparent border-b border-gray-300 focus:border-gray-600 py-5" />
          </div>
          
          <div>
            <label className="block text-sm font-medium ">City</label>
            <Input type="text" placeholder="Enter city" className="mt-1 bg-transparent border-b border-gray-300 focus:border-gray-600 py-5" />
          </div>
          
          <div>
            <label className="block text-sm font-medium ">Postal Code</label>
            <Input type="text" placeholder="Enter postal code" className="mt-1 bg-transparent border-b border-gray-300 focus:border-gray-600 py-5" />
          </div>
          
          <div>
            <label className="block text-sm font-medium ">Country</label>
            <Input type="text" placeholder="Enter country" className="mt-1 bg-transparent border-b border-gray-300 focus:border-gray-600 py-5" />
          </div>
          
          
          <Button className="w-full mt-4 py-5 ">Comfirm (move this page)</Button>
          
        </form>
      </div>
    </div>
  );
}
