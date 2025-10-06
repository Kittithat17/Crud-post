'use client'
import { useUser } from '@clerk/nextjs';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useSearchParams, useRouter } from 'next/navigation';
import Link from "next/link";
import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Checkoutstep from "@/components/Shipping/Checkoutstep";

import { useCart } from "../../components/cartService/page";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// Define the address type
interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

// Define a proper type for Clerk user based on the actual structure
interface ClerkUserData {
  id: string;
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  primaryEmailAddressId: string | null;
  primaryEmailAddress: {
    id: string;
    emailAddress: string;
    verification: {
      status: string;
    };
  } | null;
  imageUrl: string;
}

const PlaceOrderPage = () => {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCart();
  const searchParams = useSearchParams();
  const paymentMethod = searchParams.get('paymentMethod');
  const encodedAddressData = searchParams.get('addressData');
  
  // Use only useUser for authentication - always call this hook
  const { user,  isSignedIn } = useUser();
  const typedUser = user as ClerkUserData | null;
  
  // State - always declare all states
  const [addressData, setAddressData] = useState<ShippingAddress | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  
  // Calculate these values outside of any conditions
  const subtotal = getTotalPrice();
  const shippingFee = 150.00;
  const total = subtotal + shippingFee;
  
  // Handle redirects in useEffect, not conditionally in the component body
  useEffect(() => {
    if (!isLoading) {
      if (!paymentMethod) {
        router.push('/payment');
      }
      
      if (!items.length) {
        router.push('/cart');
      }
    }
  }, [isLoading, paymentMethod, items, router]);
  
  // Parse the address data from URL - in a separate useEffect
  useEffect(() => {
    if (typedUser) {
      console.log("User email:", typedUser.primaryEmailAddress?.emailAddress);
    }
    
    if (encodedAddressData) {
      try {
        // Decode and parse the address data from URL
        const decodedData = JSON.parse(decodeURIComponent(encodedAddressData));
        setAddressData(decodedData);
      } catch (error) {
        console.error('Error parsing address data:', error);
        setError('Invalid address data format');
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      setError('No shipping address provided');
    }
  }, [encodedAddressData, typedUser]);
  
  const formatPrice = (price: number | string): string => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return numPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  // Handle place order submission
  const handlePlaceOrder = async () => {
    if (!addressData || !paymentMethod) {
      toast.error('Missing required information');
      return;
    }
    
    if (!isSignedIn || !user) {
      toast.error('You must be logged in to place an order');
      router.push('/sign-in');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Prepare order data with email from Clerk user
      const orderData = {
        userId: user.id,
        items: items.map(item => ({
          productId: item.product.id,
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
          image: item.product.mainImage
        })),
        email: typedUser?.primaryEmailAddress?.emailAddress || '',
        totalAmount: total,
        fullName: addressData.fullName,
        address: addressData.address,
        city: addressData.city,
        postalCode: addressData.postalCode,
        country: addressData.country,
        paymentMethod: paymentMethod,
      };
      
      console.log('Submitting order:', orderData);
      
      // Call your API to create the order
      const response = await fetch('http://localhost:1337/insertOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to place order');
      }
      
      const data = await response.json();
      console.log('Order placed successfully:', data);
      
      // Show success message
      toast.success(`Order #${data.orderId} placed successfully! Thank you for your purchase.`, {
        duration: 5000
      });
      
      // Clear the cart
      clearCart();
      
      // Instead of immediate redirect, set state and handle in useEffect
      router.push('/');
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || 'Failed to place your order. Please try again.');
      } else {
        toast.error('An unknown error occurred. Please try again.');
      }
      
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading indicator
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  
  // Error state
  if (error || !addressData) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-lg">
        <Card className="border-red-200">
          <CardContent className="pt-6 text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Shipping Information Missing</h1>
            <p className="mb-6">{error || 'Please provide shipping information to continue.'}</p>
            <Button onClick={() => router.push('/address')}>
              Go to Shipping Address
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Main render
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col items-center mb-8">
        <Checkoutstep current={3} />
      </div>
      
      <h1 className="text-3xl font-bold mb-8">Place Order</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3 space-y-6">
            {/* Shipping Address Card */}
            <Card>
              <CardHeader className="pb-4">
                <h2 className="text-xl font-semibold">Shipping Address</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium">{addressData.fullName}</p>
                  <p className="text-gray-600">
                    {addressData.address}, {addressData.city} {addressData.postalCode}, {addressData.country}
                  </p>
                  <div className="pt-2">
                    <Link href='/shipping-address'>
                      <Button variant='outline' size="sm">Edit</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method Card */}
            <Card>
              <CardHeader className="pb-4">
                <h2 className="text-xl font-semibold">Payment Method</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium">{paymentMethod}</p>
                  <div className="pt-2">
                    <Link href={`/payment?addressData=${encodedAddressData}`}>
                      <Button variant='outline' size="sm">Edit</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Items Card */}
            <Card>
              <CardHeader className="pb-4">
                <h2 className="text-xl font-semibold">Order Items</h2>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[60%]">Item</TableHead>
                      <TableHead className="text-center">Quantity</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((item) => (
                      <TableRow key={item.product.id}>
                        <TableCell>
                          <Link href={`/products/${item.product.id}`} className="flex items-center space-x-4">
                            <Image 
                              src={item.product.mainImage} 
                              alt={item.product.name} 
                              width={60} 
                              height={60}
                              className="rounded-md object-cover"
                            />
                            <span className="font-medium">{item.product.name}</span>
                          </Link>
                        </TableCell>
                        <TableCell className="text-center">
                          {item.quantity}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          ฿ {formatPrice(item.product.price)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        <div className="lg:w-1/3">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Order Summary</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">฿ {subtotal.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between border-b pb-4">
                <span className="text-gray-600">Shipping & Handling</span>
                <span className="font-medium">฿ {shippingFee.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between pt-2">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-lg">฿{total.toLocaleString()}</span>
              </div>
              
              <div className="space-y-3 pt-4">
                <Button 
                  className="w-full hover:bg-gray-800 h-12"
                  onClick={handlePlaceOrder}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    'Place Order'
                  )}
                </Button>
              </div>
              
              <p className="text-sm text-gray-500 text-center pt-2">
                By placing your order, you agree to our Terms of Service and Privacy Policy.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderPage;