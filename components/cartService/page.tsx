"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 

interface Product {
    id: string;
    name: string;
    subtitle: string;
    price: string;
    mainImage: string;
    colors: number;
    tagline: string;
    environmentalInfo: string;
    description: string;
    colorName: string;
    styleCode: string;
    madeIn: string;
    isNew: boolean;
    thumbnails: {
      id: string;
      img: string;
      alt: string;
    }[];
    sizes: {
      id: string;
      label: string;
    }[];
}

interface CartItem {
  product: Product;
  selectedSize: string;
  quantity: number;
}

// Extended CartContext to include navigation functions
export const CartContext = createContext<{
  items: CartItem[];
  addToCart: (product: Product, selectedSize: string, quantity: number, redirect?: boolean) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}>({
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  getTotalItems: () => 0,
  getTotalPrice: () => 0
});

const CartProvider = ({ children }: { children: ReactNode }) => {
  // Initialize state from localStorage if available
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });
  
  const router = useRouter();

  // Save to localStorage whenever cart changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }, [items]);

  // Modified addToCart to optionally redirect
  const addToCart = (product: Product, selectedSize: string, quantity: number, redirect = false) => {
    setItems(prevItems => {
      // Check if item already exists
      const existingItemIndex = prevItems.findIndex(
        item => item.product.id === product.id && item.selectedSize === selectedSize
      );

      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Add new item
        return [...prevItems, { product, selectedSize, quantity }];
      }
    });

    // Handle redirect if requested
    if (redirect) {
      router.push('/cart');
    }
  };

  const removeFromCart = (productId: string, size: string) => {
    setItems(prevItems => 
      prevItems.filter(item => 
        !(item.product.id === productId && item.selectedSize === size)
      )
    );
  };

  const updateQuantity = (productId: string, size: string, quantity: number) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId && item.selectedSize === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart');
    }
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      // Convert price string like "฿5,900" to number
      const priceNumber = parseFloat(item.product.price.replace(/[^\d.]/g, ''));
      return total + (priceNumber * item.quantity);
    }, 0);
  };

  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      getTotalItems,
      getTotalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export default CartProvider;