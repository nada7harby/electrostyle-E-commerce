export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  brand: string;
  description: string;
  specs: { [key: string]: string };
}

export const products: Product[] = [
  {
    id: "1",
    name: "Samsung 65\" QLED 4K Smart TV",
    category: "TVs",
    price: 1299.99,
    originalPrice: 1599.99,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80",
    rating: 4.5,
    reviews: 342,
    inStock: true,
    isFeatured: true,
    brand: "Samsung",
    description: "Experience stunning picture quality with Quantum Dot technology and 4K resolution.",
    specs: {
      "Screen Size": "65 inches",
      "Resolution": "4K UHD (3840 x 2160)",
      "HDR": "HDR10+",
      "Smart Platform": "Tizen OS",
    },
  },
  {
    id: "2",
    name: "LG French Door Refrigerator",
    category: "Refrigerators",
    price: 2499.99,
    image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&q=80",
    rating: 4.8,
    reviews: 189,
    inStock: true,
    isFeatured: true,
    isNew: true,
    brand: "LG",
    description: "Spacious French door refrigerator with InstaView Door-in-Door and smart cooling.",
    specs: {
      "Capacity": "28 cu. ft.",
      "Type": "French Door",
      "Ice Maker": "Dual Ice Maker",
      "Energy Star": "Yes",
    },
  },
  {
    id: "3",
    name: "Whirlpool Front Load Washer",
    category: "Washers",
    price: 899.99,
    originalPrice: 1099.99,
    image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&q=80",
    rating: 4.6,
    reviews: 267,
    inStock: true,
    brand: "Whirlpool",
    description: "High-efficiency front load washer with steam cleaning and Load & Go dispenser.",
    specs: {
      "Capacity": "5.0 cu. ft.",
      "Type": "Front Load",
      "Spin Speed": "1,200 RPM",
      "Steam Clean": "Yes",
    },
  },
  {
    id: "4",
    name: "Ninja Air Fryer Max XL",
    category: "Small Appliances",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&q=80",
    rating: 4.7,
    reviews: 892,
    inStock: true,
    isNew: true,
    brand: "Ninja",
    description: "Cook crispy, delicious meals with 75% less fat using Max Crisp Technology.",
    specs: {
      "Capacity": "5.5 Quarts",
      "Wattage": "1,750W",
      "Temperature Range": "105°F - 400°F",
      "Functions": "Air Fry, Roast, Reheat, Dehydrate",
    },
  },
  {
    id: "5",
    name: "Sony 55\" OLED 4K TV",
    category: "TVs",
    price: 1799.99,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80",
    rating: 4.9,
    reviews: 156,
    inStock: true,
    brand: "Sony",
    description: "Premium OLED display with perfect blacks and vibrant colors powered by Cognitive Processor XR.",
    specs: {
      "Screen Size": "55 inches",
      "Resolution": "4K UHD",
      "Panel Type": "OLED",
      "Refresh Rate": "120Hz",
    },
  },
  {
    id: "6",
    name: "KitchenAid Stand Mixer",
    category: "Small Appliances",
    price: 379.99,
    originalPrice: 449.99,
    image: "https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?w=800&q=80",
    rating: 4.9,
    reviews: 1245,
    inStock: true,
    isFeatured: true,
    brand: "KitchenAid",
    description: "Iconic stand mixer with 10 speeds and tilt-head design for easy bowl access.",
    specs: {
      "Capacity": "5 Quarts",
      "Speeds": "10",
      "Power": "325 Watts",
      "Attachments": "Flat Beater, Wire Whip, Dough Hook",
    },
  },
  {
    id: "7",
    name: "Bosch Dishwasher",
    category: "Dishwashers",
    price: 849.99,
    image: "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=800&q=80",
    rating: 4.5,
    reviews: 234,
    inStock: false,
    brand: "Bosch",
    description: "Quiet and efficient dishwasher with flexible rack system and AutoAir drying.",
    specs: {
      "Noise Level": "44 dBA",
      "Place Settings": "16",
      "Cycles": "6",
      "Energy Star": "Yes",
    },
  },
  {
    id: "8",
    name: "Dyson Vacuum Cleaner V15",
    category: "Small Appliances",
    price: 649.99,
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&q=80",
    rating: 4.8,
    reviews: 567,
    inStock: true,
    isNew: true,
    isFeatured: true,
    brand: "Dyson",
    description: "Powerful cordless vacuum with laser dust detection and intelligent suction.",
    specs: {
      "Type": "Cordless Stick",
      "Runtime": "Up to 60 minutes",
      "Suction Power": "230 AW",
      "Filtration": "HEPA",
    },
  },
];

export const categories = [
  { name: "TVs", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&q=80", count: 45 },
  { name: "Refrigerators", image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&q=80", count: 32 },
  { name: "Washers", image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400&q=80", count: 28 },
  { name: "Small Appliances", image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&q=80", count: 87 },
];
