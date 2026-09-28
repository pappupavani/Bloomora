import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, ProductColor, ProductCategory } from '../types';
import { siteConfig } from '../config/siteConfig';

interface CompletedOrderInfo {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  customerName: string;
  phone: string;
  address: string;
  paymentMethod: string;
  giftNote?: string;
  date: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (
    product: Product, 
    color?: ProductColor, 
    quantity?: number, 
    customNote?: string,
    customDetails?: CartItem['customDetails']
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  selectedProductForDetail: Product | null;
  setSelectedProductForDetail: (product: Product | null) => void;
  quickBuy: (product: Product, color?: ProductColor, quantity?: number, customNote?: string) => void;
  itemCount: number;
  subtotal: number;
  shippingFee: number;
  total: number;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  completedOrder: CompletedOrderInfo | null;
  setCompletedOrder: (order: CompletedOrderInfo | null) => void;
  activePage: 'home' | 'shop' | 'custom' | 'about' | 'contact';
  setActivePage: (page: 'home' | 'shop' | 'custom' | 'about' | 'contact') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: ProductCategory;
  setSelectedCategory: (category: ProductCategory) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'woolandbloom_cart_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [completedOrder, setCompletedOrder] = useState<CompletedOrderInfo | null>(null);
  const [activePage, setActivePage] = useState<'home' | 'shop' | 'custom' | 'about' | 'contact'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 2800);
  };

  const addToCart = (
    product: Product,
    color?: ProductColor,
    quantity: number = 1,
    customNote?: string,
    customDetails?: CartItem['customDetails']
  ) => {
    const chosenColor = color || product.colors[0];
    const cartItemId = `${product.id}-${chosenColor.name}-${customNote ? 'custom' : 'std'}`;

    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        if (customNote) {
          updated[existingIndex].customNote = customNote;
        }
        return updated;
      } else {
        return [
          ...prev,
          {
            id: cartItemId,
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            selectedColor: chosenColor,
            quantity,
            customNote,
            isCustomOrder: !!customDetails,
            customDetails,
          },
        ];
      }
    });

    showToast(`Added "${product.name}" (${chosenColor.name}) to cart!`);
  };

  const quickBuy = (
    product: Product,
    color?: ProductColor,
    quantity: number = 1,
    customNote?: string
  ) => {
    addToCart(product, color, quantity, customNote);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = subtotal === 0 || subtotal >= siteConfig.shippingThreshold ? 0 : siteConfig.shippingFee;
  const total = subtotal + shippingFee;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        selectedProductForDetail,
        setSelectedProductForDetail,
        quickBuy,
        itemCount,
        subtotal,
        shippingFee,
        total,
        toastMessage,
        showToast,
        completedOrder,
        setCompletedOrder,
        activePage,
        setActivePage,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
