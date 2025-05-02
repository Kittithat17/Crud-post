'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
import { redirect } from "next/navigation";
import { useCart } from "../../components/cartService/page";

const PlaceOrderPage = () => {
  const { items, getTotalPrice } = useCart();
  
  const userAddress = {
    fullName: "John Doe",
    streetAddress: "123 Main Street",
    city: "Bangkok",
    postalCode: "10110",
    country: "Thailand"
  };
  
  const user = {
    paymentMethod: "Paypal",
  };
  
  const subtotal = getTotalPrice();
  const shippingFee = 150.00;
  const total = subtotal + shippingFee;

  if (!user.paymentMethod) {
    redirect('/payment');
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col items-center mb-8">
        <Checkoutstep current={3} />
      </div>
      
      <h1 className="text-3xl font-bold mb-8">Place Order</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left column - Order details */}
        <div className="lg:w-2/3 space-y-6">
          {/* Shipping Address Card */}
          <Card>
            <CardHeader className="pb-4">
              <h2 className="text-xl font-semibold">Shipping Address</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-medium">{userAddress.fullName}</p>
                <p className="text-gray-600">
                  {userAddress.streetAddress}, {userAddress.city} {userAddress.postalCode}, {userAddress.country}
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
                <p className="font-medium">{user.paymentMethod}</p>
                <div className="pt-2">
                  <Link href='/payment'>
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
                        <Link href={`/product/${item.product.id}`} className="flex items-center space-x-4">
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
                        {item.product.price.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Right column - Order Summary */}
        <div className="lg:w-1/3">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Order Summary</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">฿{subtotal.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between border-b pb-4">
                <span className="text-gray-600">Shipping & Handling</span>
                <span className="font-medium">฿{shippingFee.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between pt-2">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-lg">฿{total.toLocaleString()}</span>
              </div>
              
              <div className="space-y-3 pt-4">
                <Button className="w-full bg-black hover:bg-gray-800 h-12">
                  Place Order
                </Button>
                
                <Button variant="outline" className="w-full h-12 flex items-center justify-center space-x-2">
                  <Image 
                    src="/images/paypal.png" 
                    alt="PayPal" 
                    width={80} 
                    height={20}
                  />
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