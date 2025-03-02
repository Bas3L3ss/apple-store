export interface User {
  id: string;
  name: string;
  password: string;
  image?: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
// each productOption can only have one data like only one color or material not both, meaning material -> color
export interface ProductOption {
  id: string;
  productId: string; // Reference for a specific product

  // Selection attributes (optional based on product type)
  color?: string;
  material?: string;
  storage?: string;
  size?: string;
  processor?: string;
  accessories?: string;
  carrier?: string;

  // Pricing & Availability
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
  category: ProductCategory;
  stock: number;
  productSelectionStep: ProductSelectionTypes[];
  productOptions: ProductOption[];
  createdAt: Date;
  updatedAt: Date;
}

export enum ProductSelectionTypes {
  Color = "color",
  Material = "material",
  Storage = "storage",
  Size = "size",
  Processor = "processor", // M1, M2, M3
  Accessories = "accessories", // phone case, apple pencils, magic keyboard - optional
  Carrier = "carrier", // AT&T, Verizon, etc. (for iPhones)
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
  orderNotes: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  estimatedDelivery: Date;
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
export enum PaymentMethod {
  COD = "cod:cash-on-delivery",
  PP = "pp:paypal",
  CC = "CC:credit-card",
  AC = "ac:apple-card",
}
