export type ProductCategory = 
  | "all"
  | "flower-bouquets" 
  | "single-flowers" 
  | "keychains" 
  | "custom-gifts";

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  shortDescription: string;
  fullDescription: string;
  image: string;
  additionalImages?: string[];
  colors: ProductColor[];
  tags: string[];
  dimensions?: string;
  yarnMaterial?: string;
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
  isBestseller?: boolean;
}

export interface CartItem {
  id: string; // unique item cart instance id (productId + color)
  productId: string;
  name: string;
  price: number;
  image: string;
  selectedColor: ProductColor;
  quantity: number;
  customNote?: string;
  isCustomOrder?: boolean;
  customDetails?: {
    flowerTypes?: string[];
    stemCount?: number;
    ribbonColor?: string;
    deliveryDate?: string;
    recipientName?: string;
  };
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  productName: string;
  comment: string;
  verifiedBuyer: boolean;
}

export interface CustomOrderRequest {
  colorScheme: string;
  numberOfFlowers: number;
  flowerTypes: string[];
  ribbonColor: string;
  personalizedMessage: string;
  deliveryDate: string;
  additionalRequirements: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
}

export interface CheckoutFormData {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  giftNote: string;
  paymentMethod: "card" | "whatsapp" | "cod";
}
