'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";



import Link from "next/link";
import Image from 'next/image';
//import { redirect } from "next/navigation";
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
    const { items,} = useCart();
    
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
     
    

   // if (!userId) redirect('/');
  //  const user = await getUser(userId);
   // const userAddress = user.address as ShippingAddress;
   // if (!cart || cart.items.length === 0) redirect('/cart');
   // if (!userAddress) redirect('/shipping-address');
   // if (!user.paymentMethod) redirect('/payment-method');
   if (!user.paymentMethod) {
    redirect('/payment');
  }

    return (
        <>
        <div className="flex flex-col justify-between items-center">

            <Checkoutstep current={3} />
        </div>
        <div className="px-16">
            <h1 className="py-4 text-2xl font-bold">Place Order</h1>
            <div className="grid md:grid-cols-3 md:gap-5">
                {/* left  */}
                <div className="md:col-span-2 overflow-x-auto space-y-4">
                    <Card>
                        <CardContent className="p-4 gap-4">
                            <h2 className="text-xl pb-4">Shipping Address</h2>
                            <p>{userAddress.fullName}</p>
                            <p>
                                {userAddress.streetAddress}, {userAddress.city} {' '}
                                {userAddress.postalCode}, {userAddress.country} {' '}
                            </p>
                            <div className="mt-3">
                                <Link href='/shipping-address'>
                                    <Button variant='outline'>Edit</Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4 gap-4">
                            <h2 className="text-xl pb-4">Payment Method</h2>
                            <p>{user.paymentMethod}</p>
                            <div className="mt-3">
                                <Link href='/payment'>
                                    <Button variant='outline'>Edit</Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4 gap-4">
                            <h2 className="text-xl pb-4">Order Items</h2>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Item</TableHead>
                                        <TableHead className="text-center">Quantity</TableHead>
                                        <TableHead className="text-right">Price</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {items.map((item) => (
                                        <TableRow key={item.product.id}>
                                            <TableCell className="flex items-center">
                                                <Link href={`/product/${item.product.id}`} className="flex items-center">
                                                    <Image src={item.product.mainImage} alt={item.product.name} width={50} height={50} />
                                                    <span className="px-2">{item.product.name}</span>
                                                </Link>
                                            </TableCell>
                                            <TableCell className="text-center gap-2">
                                                <span className="px-2">{item.quantity}</span>
                                            </TableCell>
                                            <TableCell className="text-right">{(item.product.price)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
                </div>
                {/* right */}
               
            </div>
        </>
    );
}

export default PlaceOrderPage;