'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChevronDown, ChevronUp, PackageOpen, Truck, CircleX, Clock, HardHat } from 'lucide-react';
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
  
  // Check if any item has a null product_id (product was deleted)
  const hasDeletedProduct = order.items.some(item => item.product_id === null);
  
  // If a product was deleted, show as cancelled visually (doesn't change actual status in DB)
  const displayStatus = hasDeletedProduct ? 'cancelled' : order.status;
  
  return (
    <Card className="mb-6 shadow-md">
      <CardHeader className="flex flex-row justify-between items-center pb-2">
        <div>
          <h3 className="text-lg font-semibold">Order #{order.id}</h3>
          <p className="text-sm text-gray-500">{formatDate(order.created_at)}</p>
        </div>
        <div className="flex flex-col items-end">
          <Badge className={getStatusColor(displayStatus)}>
            {displayStatus.charAt(0).toUpperCase() + displayStatus.slice(1)}
          </Badge>
          {hasDeletedProduct && order.status !== 'cancelled' && (
            <span className="text-xs text-red-600 mt-1">
              (Product unavailable)
            </span>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="py-2">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">{order.items.length} {order.items.length === 1 ? 'item' : 'items'}</p>
            {/* <p className="text-lg font-bold">฿ {order.total_amount.toFixed(2)}</p> */}
          </div>
          <div className="flex items-center">
            {displayStatus === 'shipped' && <Truck className="w-5 h-5 mr-1" strokeWidth={2.25}/>}
            {displayStatus === 'delivered' && <PackageOpen className="w-5 h-5 mr-1" strokeWidth={2.25} />}
            {displayStatus === 'cancelled' && <CircleX className="w-5 h-5 mr-1" color="#000000" strokeWidth={2.25} />}
            {displayStatus === 'pending' && <Clock className="w-5 h-5 mr-1" color="#000000" strokeWidth={2.25} />}
            {displayStatus === 'processing' && <HardHat color="#000000" strokeWidth={2.25} />}
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
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                          <span className="text-xs">No Image</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <p className="font-medium">{item.name}</p>
                        {item.product_id === null && (
                          <Badge variant="outline" className="ml-2 text-xs bg-red-50 text-red-700 border-red-200">
                            Unavailable
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity} × ฿ {item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">฿ {(item.quantity * item.price).toFixed(2)}</p>
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
            
            {hasDeletedProduct && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-700">
                  <strong>Note:</strong> One or more products in this order are no longer available.
                  {order.status !== 'cancelled' && " This order has been marked as cancelled."}
                </p>
              </div>
            )}
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