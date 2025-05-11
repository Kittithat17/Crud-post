'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChevronDown, ChevronUp, PackageOpen, Truck } from 'lucide-react';
import { Order } from './page';

// Function to get appropriate status badge color
const getStatusColor = (status: Order['status']) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-200 text-yellow-800';
    case 'processing':
      return 'bg-blue-200 text-blue-800';
    case 'shipped':
      return 'bg-indigo-200 text-indigo-800';
    case 'delivered':
      return 'bg-green-200 text-green-800';
    case 'cancelled':
      return 'bg-red-200 text-red-800';
    default:
      return 'bg-gray-200 text-gray-800';
  }
};

// Function to format date
const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Order card component
const OrderCard = ({ order }: { order: Order }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <Card className="mb-6 shadow-md">
      <CardHeader className="flex flex-row justify-between items-center pb-2">
        <div>
          <h3 className="text-lg font-semibold">Order #{order.id}</h3>
          <p className="text-sm text-gray-500">{formatDate(order.created_at)}</p>
        </div>
        <Badge className={getStatusColor(order.status)}>
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </Badge>
      </CardHeader>
      
      <CardContent className="py-2">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">{order.items.length} {order.items.length === 1 ? 'item' : 'items'}</p>
            <p className="text-lg font-bold">${order.total.toFixed(2)}</p>
          </div>
          <div className="flex items-center">
            {order.status === 'shipped' && <Truck className="w-5 h-5 mr-1" />}
            {order.status === 'delivered' && <PackageOpen className="w-5 h-5 mr-1" />}
            <Button variant="ghost" onClick={() => setExpanded(!expanded)}>
              {expanded ? <ChevronUp /> : <ChevronDown />}
            </Button>
          </div>
        </div>
        
        {expanded && (
          <div className="mt-4 space-y-4">
            <div>
              <h4 className="font-medium mb-2">Items</h4>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center pb-2 border-b">
                    <div className="w-12 h-12 bg-gray-200 rounded relative mr-3">
                      {/* Placeholder for product image */}
                      <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                        <span className="text-xs">Image</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity} × ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${(item.quantity * item.price).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-6">
              <div>
                <h4 className="font-medium mb-2">Shipping Address</h4>
                <div className="text-sm">
                  <p>{order.full_name}</p>
                  <p>{order.address}</p>
                  <p>
                    {order.city}, {order.postalCode}
                  </p>
                  <p>{order.country}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Payment Method</h4>
                <p className="text-sm">{order.payment_method}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Client component for Order History
export default function OrderHistoryClient({ orders }: { orders: Order[] }) {
  return (
    <div className="flex justify-center items-center py-3">
      <div className="w-full max-w-3xl p-6">
        <h1 className="text-5xl font-semibold mb-4">Order History</h1>
        <p className="text-lg mb-6">View and manage your orders</p>
        
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium mb-2">No orders found</h2>
            <p className="text-gray-500 mb-6">You haven&apos;t placed any orders yet.</p>
            <Button asChild>
              <Link href="/products">
                Start Shopping
              </Link>
            </Button>
          </div>
        ) : (
          <div>
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}