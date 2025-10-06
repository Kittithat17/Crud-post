'use client';

import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { useRouter } from 'next/navigation'; 
import { useAuth } from '@clerk/nextjs';

const URL = "https://webdatabase-ib7z.onrender.com";

export default function ShippingForm() {
  const { userId } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const router = useRouter();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Add userId to the data sent to the server
      const dataWithUserId = {
        ...formData,
        userId: userId || 'guest' // Use 'guest' as fallback if not logged in
      };

      const res = await fetch(`${URL}/insertAddress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataWithUserId),
      });

      if (res.ok) {
        // Only encode the address part for the URL (no userId)
        const encodedData = encodeURIComponent(JSON.stringify(formData));
        toast.success("Address updated successfully!");
        router.push(`/payment?addressData=${encodedData}`);
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Something went wrong, please try again");
      }
    } catch (error) {
      console.error("Error submitting address:", error);
      toast.error("Connection error, please try again");
    }
  };

  return (
    <div className="flex justify-center items-center py-3">
      <div className="w-full max-w-md p-6">
        <h1 className="text-5xl font-semibold mb-4">Shipping Address</h1>
        <p className="text-lg mb-6">Please enter an address to ship to</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <Input 
              name="fullName" 
              value={formData.fullName} 
              onChange={handleChange} 
              type="text" 
              placeholder="Enter full name" 
              required
              className="mt-1 bg-transparent border-b border-gray-300 focus:border-gray-600 py-5" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Address</label>
            <Input 
              name="address" 
              value={formData.address} 
              onChange={handleChange} 
              type="text" 
              placeholder="Enter address" 
              required
              className="mt-1 bg-transparent border-b border-gray-300 focus:border-gray-600 py-5" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium">City</label>
            <Input 
              name="city" 
              value={formData.city} 
              onChange={handleChange} 
              type="text" 
              placeholder="Enter city" 
              required
              className="mt-1 bg-transparent border-b border-gray-300 focus:border-gray-600 py-5" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Postal Code</label>
            <Input 
              name="postalCode" 
              value={formData.postalCode} 
              onChange={handleChange} 
              type="text" 
              placeholder="Enter postal code" 
              required
              className="mt-1 bg-transparent border-b border-gray-300 focus:border-gray-600 py-5" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Country</label>
            <Input 
              name="country" 
              value={formData.country} 
              onChange={handleChange} 
              type="text" 
              placeholder="Enter country" 
              required
              className="mt-1 bg-transparent border-b border-gray-300 focus:border-gray-600 py-5" 
            />
          </div>

          <Button className="w-full mt-4 py-5">Confirm</Button>
        </form>
      </div>
    </div>
  );
}