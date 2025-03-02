import { Product, ProductCategory, ProductSelectionTypes } from "@/src/@types";

export const products = [
  {
    id: "ipad-pro",
    name: "iPad Pro",
    description: "Mỏng không tưởng. Mạnh không ngờ.",
    status: "Theo dõi để biết khi có hàng",
    image: "/api/placeholder/1200/600",
    theme: "dark",
  },
  {
    id: "ipad-air",
    name: "iPad Air",
    description: "Hai kích cỡ. Chip nhanh hơn. Đa zi năng.",
    status: "Theo dõi để biết khi có hàng",
    image: "/api/placeholder/1200/600",
    theme: "light",
  },
];
export const images = [
  { src: "/card/1.png", alt: "Image 1" },
  { src: "/card/2.png", alt: "Image 2" },
  { src: "/card/3.png", alt: "Image 3" },
];

export const searchProducts: Product[] = [
  {
    id: "ipad-pro",
    name: "iPad Pro",
    description: "Mỏng không tưởng. Mạnh không ngờ.",
    productImages: ["/api/placeholder/1200/600"],
    slug: "ipad-pro",
    basePrice: 999,
    category: ProductCategory.Ipad,
    stock: 50,
    productSelectionStep: [ProductSelectionTypes.Color],
    productOptions: [
      {
        id: "option1",
        productId: "ipad-pro",
        color: "Silver",
        price: 999,
        stock: 20,
      },
      {
        id: "option2",
        productId: "ipad-pro",
        color: "Space Gray",
        price: 999,
        stock: 30,
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "ipad-air",
    name: "iPad Air",
    description: "Hai kích cỡ. Chip nhanh hơn. Đa zi năng.",
    productImages: ["/api/placeholder/1200/600"],
    slug: "ipad-air",
    basePrice: 599,
    category: ProductCategory.Ipad,
    stock: 40,
    productSelectionStep: [ProductSelectionTypes.Color],
    productOptions: [
      {
        id: "option1",
        productId: "ipad-air",
        color: "Rose Gold",
        price: 599,
        stock: 15,
      },
      {
        id: "option2",
        productId: "ipad-air",
        color: "Sky Blue",
        price: 599,
        stock: 25,
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
