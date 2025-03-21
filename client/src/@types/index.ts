export interface User {
  _id: string;
  username: string;
  password: string;
  role: "user" | "admin";
  email: string;
  avatar?: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Account {
  username: string;
  password: string;
  role: "user" | "admin";
  email: string;
  avatar?: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// each productOption can only have one data like only one color or material not both, meaning material -> color
export interface ProductOption {
  _id: string;
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
  _id: string;
  name: string;
  description: string;
  productImages: string[];
  slug?: string;
  basePrice: number;
  isFeatured?: boolean;
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
  _id: string;
  productId: string;
  selectedOptions: string[];
  userId?: string;
  quantity: number;
  totalPrice: number;
}

export interface Order {
  _id: string;
  userId: string;
  calculatedTotal: number; // this is the price calculated using all totalPrice of each CartItem
  items: OrderItem[];
  shippingAddress?: string;
  orderNotes: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  estimatedDelivery: string;
  createdAt: string;
  updatedAt: string;
}
export interface OrderItem {
  _id: string;
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

export interface FetchProductsResponse {
  success: boolean;
  data: Product[];
  pagination: {
    total: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
}

export interface ShippingAddress {
  fullAddress: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  coordinates: AddressCoordinates;
}

export interface LocationSuggestion {
  lat: string;
  lon: string;
  display_name: string;
  address: {
    road?: string;
    house_number?: string;
    city?: string;
    town?: string;
    county?: string;
    state?: string;
    postcode?: string;
    country?: string;
  };
}

// Define types based on your data structure
export interface SelectedOption {
  _id: string;
  productId: string;
  [key: string]: any; // For dynamic option keys like storage, color, etc.
  price: number;
  stock: number;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItemWithProducts {
  _id: string;
  orderId: string;
  productId: Product;
  quantity: number;
  finalPrice: number;
  selectedOptions: SelectedOption[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface AddressCoordinates {
  lat: number;
  lng: number;
}
