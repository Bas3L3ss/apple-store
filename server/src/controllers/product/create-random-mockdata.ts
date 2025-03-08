import { RequestHandler } from "express";
import { ProductModel } from "../../models/Product";
import { ProductOptionModel } from "../../models/ProductOptions";
import { Types } from "mongoose";

// Product categories
const categories = [
  "iphone",
  "macbook",
  "apple_watch",
  "ipad",
  "airpods",
  "phonecase",
];

// Product selection steps by category
const productSteps = {
  iphone: ["color", "storage", "carrier", "accessories"],
  macbook: ["color", "processor", "storage", "size", "accessories"],
  apple_watch: ["color", "material", "size", "accessories"],
  ipad: ["color", "storage", "processor", "size", "accessories"],
  airpods: ["color", "accessories"],
  phonecase: ["color", "material"],
};

// Random product names based on category
const productNames = {
  iphone: [
    "iPhone 15",
    "iPhone 15 Plus",
    "iPhone 15 Pro",
    "iPhone 15 Pro Max",
    "iPhone 14",
    "iPhone 14 Plus",
    "iPhone 14 Pro",
    "iPhone 14 Pro Max",
    "iPhone 13",
    "iPhone 13 Mini",
    "iPhone 13 Pro",
    "iPhone 13 Pro Max",
    "iPhone SE (3rd Gen)",
    "iPhone SE (2nd Gen)",
    "iPhone 12",
    "iPhone 12 Mini",
    "iPhone 12 Pro",
    "iPhone 12 Pro Max",
  ],
  macbook: [
    "MacBook Air 13 (M3)",
    "MacBook Air 15 (M3)",
    "MacBook Air 13 (M2)",
    "MacBook Air 15 (M2)",
    "MacBook Air (M1)",
    "MacBook Pro 14 (M3 Pro)",
    "MacBook Pro 16 (M3 Max)",
    "MacBook Pro 14 (M2 Pro)",
    "MacBook Pro 16 (M2 Max)",
    "MacBook Pro 13 (M2)",
    "MacBook Pro 13 (M1)",
    "MacBook Pro 16 (M1 Max)",
    "MacBook Pro 14 (M1 Pro)",
  ],
  apple_watch: [
    "Apple Watch Series 9 (Aluminum)",
    "Apple Watch Series 9 (Stainless Steel)",
    "Apple Watch Ultra 2",
    "Apple Watch Ultra",
    "Apple Watch SE (2nd Gen)",
    "Apple Watch SE (1st Gen)",
    "Apple Watch Series 8",
    "Apple Watch Series 7",
    "Apple Watch Series 6",
    "Apple Watch Series 5",
    "Apple Watch Series 4",
    "Apple Watch Series 3",
  ],
  ipad: [
    "iPad Pro 12.9-inch (M4)",
    "iPad Pro 12.9-inch (M3)",
    "iPad Pro 12.9-inch (M2)",
    "iPad Pro 12.9-inch (M1)",
    "iPad Pro 11-inch (M4)",
    "iPad Pro 11-inch (M3)",
    "iPad Pro 11-inch (M2)",
    "iPad Pro 11-inch (M1)",
    "iPad Air 13-inch (M2)",
    "iPad Air 10.9-inch (M2)",
    "iPad Air 10.9-inch (M1)",
    "iPad Mini (6th Gen)",
    "iPad Mini (5th Gen)",
    "iPad (10th Gen)",
    "iPad (9th Gen)",
    "iPad (8th Gen)",
    "iPad (7th Gen)",
    "iPad (6th Gen)",
  ],
  airpods: [
    "AirPods Pro (2nd Gen, USB-C)",
    "AirPods Pro (2nd Gen, Lightning)",
    "AirPods Pro (1st Gen)",
    "AirPods (3rd Gen, MagSafe)",
    "AirPods (3rd Gen, Lightning)",
    "AirPods (2nd Gen)",
    "AirPods Max (Space Gray)",
    "AirPods Max (Silver)",
    "AirPods Max (Pink)",
    "AirPods Max (Green)",
    "AirPods Max (Sky Blue)",
    "Beats Fit Pro",
    "Beats Studio Buds",
    "Beats Powerbeats Pro",
  ],
  phonecase: [
    "iPhone 15 Silicone Case with MagSafe",
    "iPhone 15 Plus Silicone Case with MagSafe",
    "iPhone 15 Pro FineWoven Case with MagSafe",
    "iPhone 15 Pro Max FineWoven Case with MagSafe",
    "iPhone 14 Silicone Case with MagSafe",
    "iPhone 14 Plus Clear Case with MagSafe",
    "iPhone 14 Pro Max Leather Case with MagSafe",
    "iPhone 13 Mini Silicone Case",
    "iPhone 13 Pro Leather Case with MagSafe",
    "iPhone SE (3rd Gen) Clear Case",
    "iPhone 12 MagSafe Leather Wallet",
    "iPhone 12 Mini Silicone Case with MagSafe",
  ],
};

// Product images by category
const imageUrls = {
  iphone: [
    "https://res.cloudinary.com/dz1d1qgk2/image/upload/v1741417274/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo.jpg.og_c4bjvb.jpg",
    "https://res.cloudinary.com/dz1d1qgk2/image/upload/v1741417273/refurb-iphone-13-pro-max-graphite-2023_w6s8yf.jpg",
    "https://res.cloudinary.com/dz1d1qgk2/image/upload/v1741417273/iphone-card-40-iphone15hero-202309_FMT_WHH_m35rp3.jpg",
    "https://res.cloudinary.com/dz1d1qgk2/image/upload/v1741417273/iphone-16-finish-select-202409-6-1inch_GEO_US_FMT_WHH_obkpjz.jpg",
  ],
  macbook: [
    "https://res.cloudinary.com/dz1d1qgk2/image/upload/v1741418313/mba13-midnight-select-202402_zt5xln.jpg",
    "https://res.cloudinary.com/dz1d1qgk2/image/upload/v1741418313/71N_DK0pEaL_opf2ot.jpg",
    "https://res.cloudinary.com/dz1d1qgk2/image/upload/v1741418313/Apple_MacBook-Pro_14-16-inch_10182021_big.jpg.slideshow-xlarge_2x_b5vna3.jpg",
    "https://res.cloudinary.com/dz1d1qgk2/image/upload/v1741418314/Apple-MacBook-Air-13-3-inch-Laptop-Space-Gray-M1-Chip-Built-for-Apple-Intelligence-8GB-RAM-256GB-storage_af1d4133-6de9-4bdc-b1c6-1ca8bd0af7a0.c0eb74c31b2cb05df4ed11124d0e255b_ofzhlo.jpg",
  ],
  apple_watch: [
    "https://res.cloudinary.com/dz1d1qgk2/image/upload/v1741418327/Apple_watch-series7_lp_09142021.jpg.og_iqgxio.jpg",
    "https://res.cloudinary.com/dz1d1qgk2/image/upload/v1741418327/s10-case-unselect-gallery-1-202503_GEO_IN_FMT_WHH_ualk7i.jpg",
    "https://res.cloudinary.com/dz1d1qgk2/image/upload/v1741418326/ultra-case-unselect-gallery-1-202409_FMT_WHH_mges6n.jpg",
  ],
  ipad: [
    "https://res.cloudinary.com/dz1d1qgk2/image/upload/v1741418294/refurb-ipad-pro-12-wificell-spacegray-2021_x0d67m.jpg",
    "https://res.cloudinary.com/dz1d1qgk2/image/upload/v1741418293/61a6eELaq_L_yayjro.jpg",
    "https://res.cloudinary.com/dz1d1qgk2/image/upload/v1741418293/ipad-air-storage-select-202405-13inch-space-gray-wifi_FMT_WHH_eta5dr.jpg",
    "https://res.cloudinary.com/dz1d1qgk2/image/upload/v1741418293/apple_ipad-pro-spring21_hero_04202021_big.jpg.large_uqt2ah.jpg",
  ],
  airpods: [
    "https://res.cloudinary.com/dz1d1qgk2/image/upload/v1741418360/airpods-4-select-202409_FMT_WHH_tv6yyh.jpg",
    "https://res.cloudinary.com/dz1d1qgk2/image/upload/v1741418361/og-airpods-4-202409_dabzzl.jpg",
    "https://res.cloudinary.com/dz1d1qgk2/image/upload/v1741418355/airpods-pro-2-hero-select-202409_FMT_WHH_e6gh34.jpg",
  ],
  phonecase: [
    "https://res.cloudinary.com/dz1d1qgk2/image/upload/v1741418374/MT0Y3_AV3_b36vku.jpg",
    "https://res.cloudinary.com/dz1d1qgk2/image/upload/v1741418373/MT233_yljrgu.jpg",
    "https://res.cloudinary.com/dz1d1qgk2/image/upload/v1741418372/MHLM3_mkfsqf.jpg",
  ],
};

// Random product descriptions
const descriptions = [
  (name) =>
    `The new ${name} features our most advanced technology yet. Experience incredible performance and beautiful design.`,
  (name) =>
    `Redesigned from the ground up, the ${name} offers unprecedented power and versatility for all your needs.`,
  (name) =>
    `Introducing the ${name} - our thinnest, lightest, and most powerful device in this category to date.`,
  (name) =>
    `The ${name} combines elegant design with cutting-edge features that will transform how you work and play.`,
  (name) =>
    `Experience next-generation performance with the all-new ${name}. Engineered for professionals and enthusiasts alike.`,
  (name) =>
    `The ${name} sets a new standard with its revolutionary design and groundbreaking features.`,
  (name) =>
    `Meet the ${name} - where performance meets portability in our most advanced product yet.`,
  (name) =>
    `The ${name} redefines what's possible with industry-leading technology and all-day battery life.`,
];

// Option value pools
const optionValues = {
  color: {
    iphone: [
      "Midnight",
      "Starlight",
      "Blue",
      "Yellow",
      "Pink",
      "Green",
      "Product RED",
      "Space Black",
      "Gold",
      "Silver",
      "Titanium",
      "Natural Titanium",
      "White Titanium",
    ],
    macbook: ["Space Gray", "Silver", "Midnight", "Starlight", "Gold"],
    apple_watch: [
      "Midnight",
      "Starlight",
      "Silver",
      "Product RED",
      "Pink",
      "Purple",
      "Blue",
      "Gold",
      "Graphite",
      "Natural Titanium",
      "Orange",
      "Green",
    ],
    ipad: [
      "Space Gray",
      "Silver",
      "Starlight",
      "Pink",
      "Purple",
      "Blue",
      "Yellow",
    ],
    airpods: [
      "White",
      "Space Gray",
      "Silver",
      "Pink",
      "Green",
      "Sky Blue",
      "Black",
      "Red",
    ],
    phonecase: [
      "Midnight",
      "Starlight",
      "Deep Violet",
      "Blue",
      "Yellow",
      "Pink",
      "Green",
      "Orange",
      "Cyprus Green",
      "Product RED",
      "Black",
      "White",
    ],
  },
  storage: {
    iphone: ["128GB", "256GB", "512GB", "1TB"],
    macbook: ["256GB", "512GB", "1TB", "2TB", "4TB", "8TB"],
    ipad: ["64GB", "128GB", "256GB", "512GB", "1TB", "2TB"],
  },
  processor: {
    macbook: [
      "M1",
      "M1 Pro",
      "M1 Max",
      "M2",
      "M2 Pro",
      "M2 Max",
      "M3",
      "M3 Pro",
      "M3 Max",
    ],
    ipad: [
      "A14 Bionic",
      "A15 Bionic",
      "A16 Bionic",
      "A17 Pro",
      "M1",
      "M2",
      "M3",
      "M4",
    ],
  },
  size: {
    macbook: ["13-inch", "14-inch", "15-inch", "16-inch"],
    apple_watch: ["38mm", "40mm", "41mm", "42mm", "44mm", "45mm", "49mm"],
    ipad: [
      "8.3-inch",
      "10.2-inch",
      "10.9-inch",
      "11-inch",
      "12.9-inch",
      "13-inch",
    ],
  },
  material: {
    apple_watch: ["Aluminum", "Stainless Steel", "Titanium", "Ceramic"],
    phonecase: [
      "Silicone",
      "Leather",
      "FineWoven",
      "Clear Polycarbonate",
      "TPU",
      "Aluminum",
    ],
  },
  accessories: {
    iphone: [
      "None",
      "MagSafe Charger",
      "20W USB-C Power Adapter",
      "Leather Wallet with MagSafe",
      "MagSafe Battery Pack",
      "AirTag",
      "EarPods with Lightning Connector",
    ],
    macbook: [
      "None",
      "USB-C to Lightning Cable",
      "USB-C Digital AV Multiport Adapter",
      "USB-C to SD Card Reader",
      "LG UltraFine 5K Display",
      "Pro Display XDR",
      "Apple Polishing Cloth",
    ],
    apple_watch: [
      "None",
      "Solo Loop",
      "Braided Solo Loop",
      "Sport Band",
      "Sport Loop",
      "Milanese Loop",
      "Leather Link",
      "Modern Buckle",
      "Apple Watch Magnetic Charger",
    ],
    ipad: [
      "None",
      "Apple Pencil",
      "Smart Keyboard",
      "Smart Keyboard Folio",
      "Magic Keyboard",
      "Smart Cover",
      "Smart Folio",
      "USB-C to SD Card Reader",
    ],
    airpods: [
      "None",
      "Wireless Charging Case",
      "MagSafe Charging Case",
      "Lightning Charging Case",
      "AirPods Pro Ear Tips",
      "Beats Ear Tips",
      "Third-Party Silicone Case",
    ],
  },
  carrier: {
    iphone: [
      "Unlocked",
      "AT&T",
      "Verizon",
      "T-Mobile",
      "Sprint",
      "US Cellular",
      "Xfinity Mobile",
      "Visible",
      "Cricket",
      "Metro by T-Mobile",
    ],
  },
};

// Define price ranges for different product categories
const priceRanges = {
  iphone: { min: 699, max: 1599 },
  macbook: { min: 999, max: 3499 },
  apple_watch: { min: 199, max: 799 },
  ipad: { min: 329, max: 2399 },
  airpods: { min: 129, max: 549 },
  phonecase: { min: 39, max: 129 },
};

// Helper function to get a random element from an array
const getRandomElement = (array) =>
  array[Math.floor(Math.random() * array.length)];

// Helper function to get a random number of elements from an array
const getRandomElements = (array, min, max) => {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Helper function to get a random integer between min and max (inclusive)
const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Helper function to create a slug from product name
const createSlug = (name) =>
  name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

// Helper function to adjust price based on options
const adjustPrice = (basePrice, optionType, value, category) => {
  let modifier = 1.0;

  switch (optionType) {
    case "storage":
      if (value === "256GB") modifier = 1.15;
      else if (value === "512GB") modifier = 1.3;
      else if (value === "1TB") modifier = 1.5;
      else if (value === "2TB") modifier = 1.8;
      else if (value === "4TB") modifier = 2.2;
      else if (value === "8TB") modifier = 2.5;
      break;
    case "processor":
      if (value.includes("Pro")) modifier = 1.2;
      else if (value.includes("Max")) modifier = 1.4;
      else if (value.includes("M3")) modifier = 1.3;
      else if (value.includes("M4")) modifier = 1.5;
      break;
    case "material":
      if (value === "Stainless Steel") modifier = 1.3;
      else if (value === "Titanium") modifier = 1.5;
      else if (value === "Ceramic") modifier = 1.6;
      else if (value === "Leather") modifier = 1.2;
      break;
    case "size":
      if (
        value.includes("16-inch") ||
        value.includes("12.9-inch") ||
        value.includes("13-inch")
      )
        modifier = 1.2;
      break;
    case "accessories":
      if (value !== "None") modifier = 1.1;
      if (value.includes("XDR") || value.includes("5K")) modifier = 1.3;
      break;
  }

  return Math.round(basePrice * modifier);
};

// Generate a single product with its options
const generateProduct = () => {
  // Pick a random category
  const category = getRandomElement(categories);

  // Pick a random product name from the category
  const productArray = productNames[category];
  const name = getRandomElement(productArray);

  // Generate a slug from the name
  const slug = createSlug(name);

  // Get a random description
  const descriptionTemplate = getRandomElement(descriptions);
  const description = descriptionTemplate(name);

  // Get random images for the product
  const categoryImages = imageUrls[category];
  const productImages = getRandomElements(
    categoryImages,
    1,
    categoryImages.length
  );

  // Generate base price
  const { min, max } = priceRanges[category];
  const basePrice = getRandomInt(min, max);

  // Get product selection steps
  const productSelectionStep = productSteps[category];

  // Generate a random stock value
  const stock = getRandomInt(10, 1000);

  // Create productId for options
  const productId = new Types.ObjectId();

  // Generate product options
  const optionsCount = 20;
  const productOptions = [];

  for (let i = 0; i < optionsCount; i++) {
    // Randomly select an option type
    const optionType = getRandomElement(productSelectionStep);

    // Get the available values for this option type and category
    const values =
      optionValues[optionType][category] ||
      optionValues[optionType][Object.keys(optionValues[optionType])[0]];

    // Randomly select a value
    const value = getRandomElement(values);

    // Create a new option object
    const option = {
      _id: new Types.ObjectId(),
      productId: productId,
      price: adjustPrice(basePrice, optionType, value, category),
      stock: getRandomInt(0, 100),
    };

    // Set the option value
    option[optionType] = value;

    productOptions.push(option);
  }

  // Create the product
  const product = {
    _id: productId,
    name,
    description,
    productImages,
    slug,
    basePrice,
    category,
    stock,
    productSelectionStep,
    productOptions: productOptions.map((opt) => opt._id),
  };

  return { product, productOptions };
};

// Generate multiple products with their options
const generateProductsWithOptions = (count = 10) => {
  const products = [];
  const allProductOptions = [];
  const usedNames = new Set(); // To track names we've already used

  while (products.length < count) {
    const { product, productOptions } = generateProduct();

    // Check if this product name is unique in our current batch
    if (!usedNames.has(product.name)) {
      usedNames.add(product.name);
      products.push(product);
      allProductOptions.push(...productOptions);
    }
  }

  return { products, productOptions: allProductOptions };
};

export const CreateMockProduct: RequestHandler = async (
  req,
  res,
  next
): Promise<void> => {
  try {
    const { products, productOptions } = generateProductsWithOptions(70);

    // Before inserting new products

    // Only insert products with unique names
    await ProductModel.insertMany(products);

    // Then insert product options
    await ProductOptionModel.insertMany(productOptions);
    console.log(
      `${productOptions.length} product options generated and inserted!`
    );

    res.status(201).json({ success: true, data: { products, productOptions } });
    return;
  } catch (error) {
    next(error);
  }
};
