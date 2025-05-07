// app/orders/page.tsx - Server Component
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import OrderHistoryClient from "./client";

// Define the order data types
export type OrderItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
};

export type Order = {
  id: string;
  date: Date;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  total: number;
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
};

// Mock orders - this will be replaced with actual DB fetching later
const mockOrders: Order[] = [
  {
    id: 'ORD123456',
    date: new Date('2024-10-01'),
    status: 'delivered',
    items: [
      {
        id: 'ITEM1',
        name: 'Wireless Headphones',
        quantity: 1,
        price: 99.99,
        image: '/placeholder-headphones.jpg'
      },
      {
        id: 'ITEM2',
        name: 'Phone Case',
        quantity: 2,
        price: 19.99,
        image: '/placeholder-case.jpg'
      }
    ],
    total: 139.97,
    shippingAddress: {
      fullName: 'Alex Johnson',
      address: '123 Tech Lane',
      city: 'San Francisco',
      postalCode: '94105',
      country: 'USA'
    },
    paymentMethod: 'PayPal'
  },
  {
    id: 'ORD789012',
    date: new Date('2024-10-10'),
    status: 'shipped',
    items: [
      {
        id: 'ITEM3',
        name: 'Smart Watch',
        quantity: 1,
        price: 249.99,
        image: '/placeholder-watch.jpg'
      }
    ],
    total: 249.99,
    shippingAddress: {
      fullName: 'Alex Johnson',
      address: '123 Tech Lane',
      city: 'San Francisco',
      postalCode: '94105', 
      country: 'USA'
    },
    paymentMethod: 'CashOnDelivery'
  }
];

export default async function OrderHistoryPage() {
  // Check if user is authenticated
  const user = await currentUser();
  
  // If no user is authenticated, redirect to home page
  if (!user) {
    redirect("/");
  }
  
  // In the future, fetch orders from your database here
  // Example: const orders = await db.orders.findMany({ where: { userId: user.id } });
  const orders = mockOrders;
  
  // Pass the orders to the client component
  return <OrderHistoryClient orders={orders} />;
}