import { Product, ProductCategory, ProductSelectionTypes } from "@/src/@types";

export const gridProducts = [
  {
    id: "iphone-15-pink",
    name: "iPhone 15",
    description: "A fresh design, a powerful camera, and colors that pop.",
    image: "iPhone-16-pink_3_x1wukn",
    theme: "light",
    slug: "iphone-12-pro-max",
  },
  {
    id: "iphone-15-green",
    name: "iPhone 15",
    description: "Capture every moment with precision and style.",
    image: "iPhone-16-green_3_ntcwyy",
    theme: "light",
    slug: "iphone-14-pro",
  },
  {
    id: "iphone-15-black",
    name: "iPhone 15",
    description: "Sleek, powerful, and built to impress.",
    image: "iPhone-16-e-black_3_ncjeon",
    theme: "light",
    slug: "iphone-se-2nd-gen",
  },
  {
    id: "iphone-15-white",
    name: "iPhone 15",
    description: "Elegance meets innovation in every detail.",
    image: "iPhone-16-white_3_xw18iw",
    theme: "light",
    slug: "iphone-12-pro",
  },
  {
    id: "iphone-15-blue",
    name: "iPhone 15",
    description:
      "Brilliant display, powerful performance, and stunning colors.",
    image: "iPhone-16-blue_3_k4b2xx",
    theme: "light",
    slug: "iphone-15-pro-max",
  },
  {
    id: "iphone-15-pro-gold",
    name: "iPhone 15 Pro",
    description:
      "Titanium build, pro-grade camera, and next-level performance.",
    image: "iPhone-16-pro-titan-gold_3_z6be8w",
    theme: "light",
    slug: "iphone-15-pro",
  },
];

export const products = [
  {
    _id: "Mac Air",
    name: "Mac Air",
    description: "Double capacity. Expeditious chip. Flexible.",

    image: "mac-air_1_kgmsgt",
    slug: "macbook-air-15-m2",
  },
  {
    _id: "ipad-pro",
    name: "iPhone 15",
    description: "Titanium. So strong. So light. So Pro.",
    slug: "iphone-15",
    image: "iphone-16-finish-select-202409-6-1inch_GEO_US_FMT_WHH_obkpjz",
  },
];
export const images1 = [
  {
    src: "s10-case-unselect-gallery-1-202503_GEO_IN_FMT_WHH_ualk7i",
    alt: "Image 1",
  },
  {
    src: "61a6eELaq_L_yayjro",
    alt: "Image 6",
  },
  { src: "airpods-4-select-202409_FMT_WHH_tv6yyh", alt: "Image 2" },
  {
    src: "mba13-midnight-select-202402_zt5xln",
    alt: "Image 3",
  },
];
export const images2 = [
  { src: "hero__gb4d3fd8jnu6_large_vs7v6i", alt: "Image 4" },
  { src: "airpods-4-select-202409_FMT_WHH_tv6yyh", alt: "Image 2" },
  { src: "portrait_base_us__fucaqiry5e2q_large_luvtno", alt: "Image 5" },
];

export const searchProducts: Product[] = [
  {
    _id: "ipad-pro",
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
        _id: "option1",
        productId: "ipad-pro",
        color: "Silver",
        price: 999,
        stock: 20,
      },
      {
        _id: "option2",
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
    _id: "ipad-air",
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
        _id: "option1",
        productId: "ipad-air",
        color: "Rose Gold",
        price: 599,
        stock: 15,
      },
      {
        _id: "option2",
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

export const homePage: string[] = [
  "66c4c6e30b1668a5a937076d_blog-banner-98_bxr95w",
  "mac-air_1_kgmsgt",
  "mac-air_2_zh83gt",
  "hero__gb4d3fd8jnu6_large_vs7v6i",
  "apple_ipad-pro-spring21_hero_04202021_big.jpg.large_uqt2ah",
  "apple_intelligence_endframe__ksa4clua0duu_xlarge_alnt3a",
  "Apple_watch-series7_lp_09142021.jpg.og_iqgxio",
  "AirPods-pro_6_p4dg4z",
  "hq720_qxqexw",
  "iPhone-16-e_2_idbzwx",
  "mac-pro-space-black_2_wq8mrx",
];
