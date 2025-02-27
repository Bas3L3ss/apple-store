export interface User {
  id: string;
  name: string;
  password: string;
  image?: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductOption {
  id: string;
  // reference for a specific product
  productId: string;
  color?: string;
  material?: string;
  //i can add more specification in the future
  price: number;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  productImages: string[];
  slug?: string;
  basePrice: number;
  material: string[];
  color: string[];
  category: ProductCategory;
  createdAt: Date;
  stock: number;
  updatedAt: Date;
  productOptions: ProductOption[];
}

export enum ProductCategory {
  Iphone = "iphone",
  Macbook = "macbook",
  AppleWatch = "apple_watch",
  Ipad = "ipad",
  AirPod = "airpods",
  PhoneCase = "phonecase",
}

export interface CartItem {
  id: string;
  productId: string;
  selectedOptions: string[];
  userId: string;
  quantity: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  userId: string;
  calculatedTotal: number; // this is the price calculated using all totalPrice of each CartItem
  items: OrderItem[];
  shippingAddress?: string;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}
export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  selectedOptions: string[];
  quantity: number;
  finalPrice: number;
}

export enum OrderStatus {
  PREPARING = "preparing",
  DELIVERING = "delivering",
  FINISHED = "finished",
}
