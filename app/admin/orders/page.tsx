'use client';

import { useState, useEffect } from 'react';
import { toast } from "sonner";

interface OrderItem {
  id: string;
  product_id: string | null;
  name: string;
  price: number;
  quantity: number;
  size: string;
  image: string;
}

interface Order {
  order_id: string;
  user_id: string;
  full_name: string;
  email: string;
  address: string;
  city: string;
  postal_code: string;
  country: string;
  payment_method: string;
  total_amount: number;
  status: string;
  created_at: string;
  items: OrderItem[];
}

export default function OrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<Record<string, string>>({});
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error,] = useState<string | null>(null);
  const [saving, setSaving] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [processingAutoUpdates, setProcessingAutoUpdates] = useState<boolean>(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:1337/getOrders');
      
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      
      const data = await response.json() as Order[];
      
      // Initialize selectedStatuses with current statuses
      const initialStatuses: Record<string, string> = {};
      data.forEach((order: Order) => {
        initialStatuses[order.order_id] = order.status;
      });
      setSelectedStatuses(initialStatuses);
      setOrders(data);
      
      // Check for orders with null products and auto-update them
      const ordersWithNullProducts = data.filter((order: Order) => 
        order.items.some((item: OrderItem) => item.product_id === null) && order.status !== 'cancelled'
      );
      
      if (ordersWithNullProducts.length > 0) {
        await autoUpdateOrdersWithNullProducts(ordersWithNullProducts);
      }
      
    } catch (error) {
      toast.error("Failed to fetch orders");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const autoUpdateOrdersWithNullProducts = async (ordersToUpdate: Order[]): Promise<void> => {
    setProcessingAutoUpdates(true);
    
    const updates = ordersToUpdate.map((order: Order) => 
      updateOrderStatus(order.order_id, 'cancelled')
    );
    
    try {
      await Promise.all(updates);
      toast.success(`${ordersToUpdate.length} order(s) with unavailable products were automatically cancelled`);
    } catch (error) {
      toast.error("Failed to auto-update some orders");
      console.error("Auto-update error:", error);
    } finally {
      setProcessingAutoUpdates(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: string): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:1337/updateOrderStatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_id: orderId,
          status: status
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to update status for Order #${orderId}`);
      }
      
      // Update local order data
      setOrders(prevOrders => 
        prevOrders.map((o: Order) => o.order_id === orderId ? {...o, status} : o)
      );
      
      // Update selected statuses
      setSelectedStatuses(prev => ({
        ...prev,
        [orderId]: status
      }));
      
      return true;
    } catch (error) {
      console.error("Update order status error:", error);
      throw error;
    }
  };

  const handleStatusChange = (orderId: string, status: string): void => {
    setSelectedStatuses(prev => ({
      ...prev,
      [orderId]: status
    }));
  };

  const startEditing = (orderId: string): void => {
    setEditingOrderId(orderId);
  };
  
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const saveStatus = async (order: Order): Promise<void> => {
    setSaving(true);
    setSuccessMessage(null);
    
    try {
      await updateOrderStatus(order.order_id, selectedStatuses[order.order_id]);
      setSuccessMessage(`Status updated successfully for Order #${order.order_id}`);
      
      // Clear editing state
      setEditingOrderId(null);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      toast.error(`Failed to update order status: ${errorMessage}`);
    } finally {
      setSaving(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    }
  };

  if (loading) {
    return <div className="p-4">Loading orders...</div>;
  }

  if (processingAutoUpdates) {
    return <div className="p-4">Processing orders with unavailable products...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      {successMessage && (
        <div className="mb-4 p-2 bg-green-100 text-green-800 rounded">
          {successMessage}
        </div>
      )}
      <table className="w-full border-collapse border text-left">
        <thead>
          <tr className="border-b">
            <th className="p-2">ORDER ID</th>
            <th className="p-2">CUSTOMER</th>
            <th className="p-2">ITEMS</th>
            <th className="p-2">DATE</th>
            <th className="p-2">TOTAL</th>
            <th className="p-2">STATUS</th>
            <th className="p-2">ACTIONS</th>
          </tr>
        </thead>
   
        <tbody>
          {orders.map((order: Order) => {
            const hasNullProduct = order.items.some((item: OrderItem) => item.product_id === null);
            
            return (
              <tr key={order.order_id} className={'border-b '}>
                <td className="p-2">{order.order_id}</td>
                <td className="p-2">
                  <div className="font-medium">{order.full_name}</div>
                  <div className="text-sm text-gray-500">{order.email}</div>
                </td>
                <td className="p-2">
                  <div className="text-sm">
                    {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                    {hasNullProduct && (
                      <div className="mt-1">
                        <span className="px-2 py-0.5 bg-red-100 text-red-800 text-xs rounded-full">
                          Contains unavailable product
                        </span>
                      </div>
                    )}
                  </div>
                </td>
                <td className="p-2">{formatDate(order.created_at)}</td>
                <td className="p-2">฿ {Number(order.total_amount).toFixed(2)}</td>
                <td className="p-2">
                  {editingOrderId === order.order_id ? (
                    <div className="relative">
                      <select
                        value={selectedStatuses[order.order_id] || order.status}
                        onChange={(e) => handleStatusChange(order.order_id, e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  ) : (
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold
                        ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }
                      `}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      {hasNullProduct && order.status === 'cancelled' && (
                        <span className="ml-1 text-xs">(Product unavailable)</span>
                      )}
                    </span>
                  )}
                </td>
                <td className="p-2 space-x-2">
                  {editingOrderId === order.order_id ? (
                    <button 
                      onClick={() => saveStatus(order)} 
                      disabled={saving}
                      className="px-3 py-1 bg-green-500 text-white text-sm rounded"
                    >
                      {saving ? 'Saving...' : 'Save'}
                    </button>
                  ) : (
                    // Only show Edit button for orders that don't have null products
                    !hasNullProduct && (
                      <button 
                        onClick={() => startEditing(order.order_id)} 
                        className="px-3 py-1 bg-white border text-sm rounded"
                      >
                        Edit
                      </button>
                    )
                  )}
                  
                  {/* Show explanation instead of edit button for orders with null products */}
                  {hasNullProduct && !editingOrderId && (
                    <span className="text-xs text-red-600">
                      Auto-cancelled
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}