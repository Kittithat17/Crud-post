import { redirect } from "next/navigation";
import OrderHistoryClient from "./client";
import { currentUser } from "@clerk/nextjs/server";

// Define the order data types
export type OrderItem = {
  id: string;
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  image: string;
};

export type Order = {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  payment_method: string;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  created_at: Date;
  items: OrderItem[];
};

// This is a Server Component
export default async function OrdersPage() {
  // Get the current user from Clerk
  const user = await currentUser();
  
  // If no user, redirect to sign-in
  if (!user) {
    redirect("/sign-in");
  }
  
  // Fetch orders server-side using the user's ID
  const orders = await fetchOrders(user.id);
  
  // Pass orders to client component
  return <OrderHistoryClient orders={orders} />;
}

// Server-side function to fetch orders
async function fetchOrders(userId: string) {
  try {
    // Using absolute URL for production compatibility
    const apiUrl = 'http://localhost:1337';
    const response = await fetch(`${apiUrl}/getUserOrders`, {
      headers: {
        'userId': userId,
        'Content-Type': 'application/json'
      },
      next: { revalidate: 0 }, // Equivalent to cache: 'no-store' in newer Next.js
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }
    
    const data = await response.json();
    
    if (!data || data.length === 0) {
      return []; // Return empty array if no orders found
    }
    
    // Transform the data to match the Order type
    return data.map((order: any) => ({
      ...order,
      id: order.order_id, // Ensure id is set
      created_at: new Date(order.created_at),
      total: Number(order.total_amount), // Set total from total_amount
      postalCode: order.postal_code // Set postalCode from postal_code
    }));
  } catch (error) {
    console.error('Error fetching orders:', error);
    return []; // Return empty array on error
  }
}