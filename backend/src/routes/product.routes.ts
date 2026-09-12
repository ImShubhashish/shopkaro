import express, { Request, Response } from 'express';
import prisma from '../config/prisma.js';
import { authenticateToken, requireAdmin, AuthRequest } from '../middleware/auth.js';

const router = express.Router();

const fallbackProducts = [
  {
    "id": "prod-1",
    "name": "Nike Air Max 270 React Sneakers",
    "description": "High-quality Nike Air Max 270 React Sneakers featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 47328,
    "stock": 5,
    "rating": 4.1,
    "numReviews": 29,
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "fashion",
    "category": {
      "id": "fashion",
      "name": "Fashion",
      "slug": "fashion"
    }
  },
  {
    "id": "prod-2",
    "name": "Levi's 511 Slim Fit Denim Jeans",
    "description": "High-quality Levi's 511 Slim Fit Denim Jeans featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 48685,
    "stock": 8,
    "rating": 4.2,
    "numReviews": 46,
    "images": [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "fashion",
    "category": {
      "id": "fashion",
      "name": "Fashion",
      "slug": "fashion"
    }
  },
  {
    "id": "prod-3",
    "name": "Adidas Ultraboost Light Running Shoes",
    "description": "High-quality Adidas Ultraboost Light Running Shoes featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 33321,
    "stock": 11,
    "rating": 4.3,
    "numReviews": 63,
    "images": [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "fashion",
    "category": {
      "id": "fashion",
      "name": "Fashion",
      "slug": "fashion"
    }
  },
  {
    "id": "prod-4",
    "name": "Puma Classic Suede Icon Sneakers",
    "description": "High-quality Puma Classic Suede Icon Sneakers featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 15363,
    "stock": 14,
    "rating": 4.4,
    "numReviews": 80,
    "images": [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "fashion",
    "category": {
      "id": "fashion",
      "name": "Fashion",
      "slug": "fashion"
    }
  },
  {
    "id": "prod-5",
    "name": "Ray-Ban Aviator Classic Sunglasses",
    "description": "High-quality Ray-Ban Aviator Classic Sunglasses featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 11321,
    "stock": 17,
    "rating": 4.5,
    "numReviews": 97,
    "images": [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "fashion",
    "category": {
      "id": "fashion",
      "name": "Fashion",
      "slug": "fashion"
    }
  },
  {
    "id": "prod-6",
    "name": "Zara Oversized Urban Cotton Hoodie",
    "description": "High-quality Zara Oversized Urban Cotton Hoodie featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 24911,
    "stock": 20,
    "rating": 4.6,
    "numReviews": 114,
    "images": [
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "fashion",
    "category": {
      "id": "fashion",
      "name": "Fashion",
      "slug": "fashion"
    }
  },
  {
    "id": "prod-7",
    "name": "Tommy Hilfiger Tailored Slim Fit Shirt",
    "description": "High-quality Tommy Hilfiger Tailored Slim Fit Shirt featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 43639,
    "stock": 23,
    "rating": 4.7,
    "numReviews": 131,
    "images": [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "fashion",
    "category": {
      "id": "fashion",
      "name": "Fashion",
      "slug": "fashion"
    }
  },
  {
    "id": "prod-8",
    "name": "Calvin Klein Monogram Bifold Wallet",
    "description": "High-quality Calvin Klein Monogram Bifold Wallet featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 50286,
    "stock": 26,
    "rating": 4.8,
    "numReviews": 148,
    "images": [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "fashion",
    "category": {
      "id": "fashion",
      "name": "Fashion",
      "slug": "fashion"
    }
  },
  {
    "id": "prod-9",
    "name": "Fossil Gen 6 Touchscreen Leather Watch",
    "description": "High-quality Fossil Gen 6 Touchscreen Leather Watch featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 38741,
    "stock": 4,
    "rating": 4.9,
    "numReviews": 165,
    "images": [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "fashion",
    "category": {
      "id": "fashion",
      "name": "Fashion",
      "slug": "fashion"
    }
  },
  {
    "id": "prod-10",
    "name": "Under Armour Tech 2.0 Short Sleeve Tee",
    "description": "High-quality Under Armour Tech 2.0 Short Sleeve Tee featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 19619,
    "stock": 7,
    "rating": 4,
    "numReviews": 182,
    "images": [
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "fashion",
    "category": {
      "id": "fashion",
      "name": "Fashion",
      "slug": "fashion"
    }
  },
  {
    "id": "prod-11",
    "name": "Woodland Leather Outdoor Hiking Boots",
    "description": "High-quality Woodland Leather Outdoor Hiking Boots featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 10499,
    "stock": 10,
    "rating": 4.1,
    "numReviews": 199,
    "images": [
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "fashion",
    "category": {
      "id": "fashion",
      "name": "Fashion",
      "slug": "fashion"
    }
  },
  {
    "id": "prod-12",
    "name": "FabIndia Handloom Silk Kurta Set",
    "description": "High-quality FabIndia Handloom Silk Kurta Set featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 19768,
    "stock": 13,
    "rating": 4.2,
    "numReviews": 216,
    "images": [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "fashion",
    "category": {
      "id": "fashion",
      "name": "Fashion",
      "slug": "fashion"
    }
  },
  {
    "id": "prod-13",
    "name": "Biba Embroidered Anarkali Suit",
    "description": "High-quality Biba Embroidered Anarkali Suit featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 38902,
    "stock": 16,
    "rating": 4.3,
    "numReviews": 233,
    "images": [
      "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "fashion",
    "category": {
      "id": "fashion",
      "name": "Fashion",
      "slug": "fashion"
    }
  },
  {
    "id": "prod-14",
    "name": "HRX Activewear Training Joggers",
    "description": "High-quality HRX Activewear Training Joggers featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 50311,
    "stock": 19,
    "rating": 4.4,
    "numReviews": 250,
    "images": [
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "fashion",
    "category": {
      "id": "fashion",
      "name": "Fashion",
      "slug": "fashion"
    }
  },
  {
    "id": "prod-15",
    "name": "Allen Solly Casual Cotton Blazer",
    "description": "High-quality Allen Solly Casual Cotton Blazer featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 43505,
    "stock": 22,
    "rating": 4.5,
    "numReviews": 267,
    "images": [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "fashion",
    "category": {
      "id": "fashion",
      "name": "Fashion",
      "slug": "fashion"
    }
  },
  {
    "id": "prod-16",
    "name": "Peter England Formal Dress Trousers",
    "description": "High-quality Peter England Formal Dress Trousers featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 24741,
    "stock": 25,
    "rating": 4.6,
    "numReviews": 284,
    "images": [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "fashion",
    "category": {
      "id": "fashion",
      "name": "Fashion",
      "slug": "fashion"
    }
  },
  {
    "id": "prod-17",
    "name": "Vans Old Skool Canvas Skate Shoes",
    "description": "High-quality Vans Old Skool Canvas Skate Shoes featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 11271,
    "stock": 3,
    "rating": 4.7,
    "numReviews": 301,
    "images": [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "fashion",
    "category": {
      "id": "fashion",
      "name": "Fashion",
      "slug": "fashion"
    }
  },
  {
    "id": "prod-18",
    "name": "Superdry Graphic Print Heavyweight Hoodie",
    "description": "High-quality Superdry Graphic Print Heavyweight Hoodie featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 15479,
    "stock": 6,
    "rating": 4.8,
    "numReviews": 318,
    "images": [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "fashion",
    "category": {
      "id": "fashion",
      "name": "Fashion",
      "slug": "fashion"
    }
  },
  {
    "id": "prod-19",
    "name": "Jack & Jones Slim Fit Chino Trousers",
    "description": "High-quality Jack & Jones Slim Fit Chino Trousers featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 33497,
    "stock": 9,
    "rating": 4.9,
    "numReviews": 335,
    "images": [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "fashion",
    "category": {
      "id": "fashion",
      "name": "Fashion",
      "slug": "fashion"
    }
  },
  {
    "id": "prod-20",
    "name": "Crocs Classic Comfort Clogs",
    "description": "High-quality Crocs Classic Comfort Clogs featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 48758,
    "stock": 12,
    "rating": 4,
    "numReviews": 352,
    "images": [
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "fashion",
    "category": {
      "id": "fashion",
      "name": "Fashion",
      "slug": "fashion"
    }
  },
  {
    "id": "prod-21",
    "name": "Samsung Galaxy S24 Ultra 5G (256GB)",
    "description": "High-quality Samsung Galaxy S24 Ultra 5G (256GB) featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 47232,
    "stock": 15,
    "rating": 4.1,
    "numReviews": 369,
    "images": [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "mobiles",
    "category": {
      "id": "mobiles",
      "name": "Mobiles",
      "slug": "mobiles"
    }
  },
  {
    "id": "prod-22",
    "name": "Apple iPhone 15 Pro Max (Natural Titanium)",
    "description": "High-quality Apple iPhone 15 Pro Max (Natural Titanium) featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 30322,
    "stock": 18,
    "rating": 4.2,
    "numReviews": 386,
    "images": [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "mobiles",
    "category": {
      "id": "mobiles",
      "name": "Mobiles",
      "slug": "mobiles"
    }
  },
  {
    "id": "prod-23",
    "name": "Google Pixel 8 Pro (Bay Blue)",
    "description": "High-quality Google Pixel 8 Pro (Bay Blue) featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 13575,
    "stock": 21,
    "rating": 4.3,
    "numReviews": 403,
    "images": [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "mobiles",
    "category": {
      "id": "mobiles",
      "name": "Mobiles",
      "slug": "mobiles"
    }
  },
  {
    "id": "prod-24",
    "name": "OnePlus 12 5G (Flowy Emerald)",
    "description": "High-quality OnePlus 12 5G (Flowy Emerald) featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 12387,
    "stock": 24,
    "rating": 4.4,
    "numReviews": 20,
    "images": [
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "mobiles",
    "category": {
      "id": "mobiles",
      "name": "Mobiles",
      "slug": "mobiles"
    }
  },
  {
    "id": "prod-25",
    "name": "Xiaomi 14 Ultra (Black Titanium)",
    "description": "High-quality Xiaomi 14 Ultra (Black Titanium) featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 27852,
    "stock": 2,
    "rating": 4.5,
    "numReviews": 37,
    "images": [
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "mobiles",
    "category": {
      "id": "mobiles",
      "name": "Mobiles",
      "slug": "mobiles"
    }
  },
  {
    "id": "prod-26",
    "name": "Vivo X100 Pro 5G (Asteroid Black)",
    "description": "High-quality Vivo X100 Pro 5G (Asteroid Black) featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 45750,
    "stock": 5,
    "rating": 4.6,
    "numReviews": 54,
    "images": [
      "https://images.unsplash.com/photo-1574944985070-8f30c4397220?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "mobiles",
    "category": {
      "id": "mobiles",
      "name": "Mobiles",
      "slug": "mobiles"
    }
  },
  {
    "id": "prod-27",
    "name": "Realme GT 5 Pro (Red Rock Edition)",
    "description": "High-quality Realme GT 5 Pro (Red Rock Edition) featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 49627,
    "stock": 8,
    "rating": 4.7,
    "numReviews": 71,
    "images": [
      "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "mobiles",
    "category": {
      "id": "mobiles",
      "name": "Mobiles",
      "slug": "mobiles"
    }
  },
  {
    "id": "prod-28",
    "name": "Nothing Phone (2) (Dark Grey)",
    "description": "High-quality Nothing Phone (2) (Dark Grey) featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 35917,
    "stock": 11,
    "rating": 4.8,
    "numReviews": 88,
    "images": [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "mobiles",
    "category": {
      "id": "mobiles",
      "name": "Mobiles",
      "slug": "mobiles"
    }
  },
  {
    "id": "prod-29",
    "name": "Motorola Edge 50 Ultra 5G",
    "description": "High-quality Motorola Edge 50 Ultra 5G featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 17226,
    "stock": 14,
    "rating": 4.9,
    "numReviews": 105,
    "images": [
      "https://images.unsplash.com/photo-1533228876829-65c94e7b5025?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "mobiles",
    "category": {
      "id": "mobiles",
      "name": "Mobiles",
      "slug": "mobiles"
    }
  },
  {
    "id": "prod-30",
    "name": "iQOO 12 5G (Legend White)",
    "description": "High-quality iQOO 12 5G (Legend White) featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 10738,
    "stock": 17,
    "rating": 4,
    "numReviews": 122,
    "images": [
      "https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "mobiles",
    "category": {
      "id": "mobiles",
      "name": "Mobiles",
      "slug": "mobiles"
    }
  },
  {
    "id": "prod-31",
    "name": "ASUS ROG Phone 8 Pro",
    "description": "High-quality ASUS ROG Phone 8 Pro featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 22418,
    "stock": 20,
    "rating": 4.1,
    "numReviews": 139,
    "images": [
      "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "mobiles",
    "category": {
      "id": "mobiles",
      "name": "Mobiles",
      "slug": "mobiles"
    }
  },
  {
    "id": "prod-32",
    "name": "POCO F6 Pro 5G",
    "description": "High-quality POCO F6 Pro 5G featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 41528,
    "stock": 23,
    "rating": 4.2,
    "numReviews": 156,
    "images": [
      "https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "mobiles",
    "category": {
      "id": "mobiles",
      "name": "Mobiles",
      "slug": "mobiles"
    }
  },
  {
    "id": "prod-33",
    "name": "Apple iPhone 14 Plus",
    "description": "High-quality Apple iPhone 14 Plus featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 50497,
    "stock": 26,
    "rating": 4.3,
    "numReviews": 173,
    "images": [
      "https://images.unsplash.com/photo-1573148195900-7845dcb9b127?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "mobiles",
    "category": {
      "id": "mobiles",
      "name": "Mobiles",
      "slug": "mobiles"
    }
  },
  {
    "id": "prod-34",
    "name": "Samsung Galaxy Z Fold 5 5G",
    "description": "High-quality Samsung Galaxy Z Fold 5 5G featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 41081,
    "stock": 4,
    "rating": 4.4,
    "numReviews": 190,
    "images": [
      "https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "mobiles",
    "category": {
      "id": "mobiles",
      "name": "Mobiles",
      "slug": "mobiles"
    }
  },
  {
    "id": "prod-35",
    "name": "Honor Magic 6 Pro 5G",
    "description": "High-quality Honor Magic 6 Pro 5G featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 21935,
    "stock": 7,
    "rating": 4.5,
    "numReviews": 207,
    "images": [
      "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "mobiles",
    "category": {
      "id": "mobiles",
      "name": "Mobiles",
      "slug": "mobiles"
    }
  },
  {
    "id": "prod-36",
    "name": "OPPO Find X7 Ultra",
    "description": "High-quality OPPO Find X7 Ultra featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 10663,
    "stock": 10,
    "rating": 4.6,
    "numReviews": 224,
    "images": [
      "https://images.unsplash.com/photo-1530319067432-f2a729c03db5?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "mobiles",
    "category": {
      "id": "mobiles",
      "name": "Mobiles",
      "slug": "mobiles"
    }
  },
  {
    "id": "prod-37",
    "name": "Tecno Phantom V Fold 5G",
    "description": "High-quality Tecno Phantom V Fold 5G featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 17628,
    "stock": 13,
    "rating": 4.7,
    "numReviews": 241,
    "images": [
      "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "mobiles",
    "category": {
      "id": "mobiles",
      "name": "Mobiles",
      "slug": "mobiles"
    }
  },
  {
    "id": "prod-38",
    "name": "Infinix Zero 30 5G",
    "description": "High-quality Infinix Zero 30 5G featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 36426,
    "stock": 16,
    "rating": 4.8,
    "numReviews": 258,
    "images": [
      "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "mobiles",
    "category": {
      "id": "mobiles",
      "name": "Mobiles",
      "slug": "mobiles"
    }
  },
  {
    "id": "prod-39",
    "name": "Lava Agni 2 5G",
    "description": "High-quality Lava Agni 2 5G featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 49775,
    "stock": 19,
    "rating": 4.9,
    "numReviews": 275,
    "images": [
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "mobiles",
    "category": {
      "id": "mobiles",
      "name": "Mobiles",
      "slug": "mobiles"
    }
  },
  {
    "id": "prod-40",
    "name": "Samsung Galaxy A55 5G",
    "description": "High-quality Samsung Galaxy A55 5G featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 45401,
    "stock": 22,
    "rating": 4,
    "numReviews": 292,
    "images": [
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "mobiles",
    "category": {
      "id": "mobiles",
      "name": "Mobiles",
      "slug": "mobiles"
    }
  },
  {
    "id": "prod-41",
    "name": "Sony WH-1000XM5 Wireless Headphones",
    "description": "High-quality Sony WH-1000XM5 Wireless Headphones featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 27327,
    "stock": 25,
    "rating": 4.1,
    "numReviews": 309,
    "images": [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "electronics",
    "category": {
      "id": "electronics",
      "name": "Electronics",
      "slug": "electronics"
    }
  },
  {
    "id": "prod-42",
    "name": "Apple Watch Series 9 GPS 45mm",
    "description": "High-quality Apple Watch Series 9 GPS 45mm featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 12169,
    "stock": 3,
    "rating": 4.2,
    "numReviews": 326,
    "images": [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "electronics",
    "category": {
      "id": "electronics",
      "name": "Electronics",
      "slug": "electronics"
    }
  },
  {
    "id": "prod-43",
    "name": "Bose QuietComfort Ultra Headphones",
    "description": "High-quality Bose QuietComfort Ultra Headphones featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 13864,
    "stock": 6,
    "rating": 4.3,
    "numReviews": 343,
    "images": [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "electronics",
    "category": {
      "id": "electronics",
      "name": "Electronics",
      "slug": "electronics"
    }
  },
  {
    "id": "prod-44",
    "name": "Apple AirPods Pro (2nd Generation)",
    "description": "High-quality Apple AirPods Pro (2nd Generation) featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 30853,
    "stock": 9,
    "rating": 4.4,
    "numReviews": 360,
    "images": [
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "electronics",
    "category": {
      "id": "electronics",
      "name": "Electronics",
      "slug": "electronics"
    }
  },
  {
    "id": "prod-45",
    "name": "Samsung Galaxy Tab S9 Ultra",
    "description": "High-quality Samsung Galaxy Tab S9 Ultra featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 47517,
    "stock": 12,
    "rating": 4.5,
    "numReviews": 377,
    "images": [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "electronics",
    "category": {
      "id": "electronics",
      "name": "Electronics",
      "slug": "electronics"
    }
  },
  {
    "id": "prod-46",
    "name": "Dell XPS 15 4K OLED Laptop",
    "description": "High-quality Dell XPS 15 4K OLED Laptop featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 48535,
    "stock": 15,
    "rating": 4.6,
    "numReviews": 394,
    "images": [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "electronics",
    "category": {
      "id": "electronics",
      "name": "Electronics",
      "slug": "electronics"
    }
  },
  {
    "id": "prod-47",
    "name": "Apple MacBook Pro 16-Inch (M3 Max)",
    "description": "High-quality Apple MacBook Pro 16-Inch (M3 Max) featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 32970,
    "stock": 18,
    "rating": 4.7,
    "numReviews": 411,
    "images": [
      "https://images.unsplash.com/photo-1511385348-a52b4a160dc2?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "electronics",
    "category": {
      "id": "electronics",
      "name": "Electronics",
      "slug": "electronics"
    }
  },
  {
    "id": "prod-48",
    "name": "Logitech MX Master 3S Wireless Mouse",
    "description": "High-quality Logitech MX Master 3S Wireless Mouse featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 15134,
    "stock": 21,
    "rating": 4.8,
    "numReviews": 28,
    "images": [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "electronics",
    "category": {
      "id": "electronics",
      "name": "Electronics",
      "slug": "electronics"
    }
  },
  {
    "id": "prod-49",
    "name": "ASUS ROG Strix Scar 18 Laptop",
    "description": "High-quality ASUS ROG Strix Scar 18 Laptop featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 11424,
    "stock": 24,
    "rating": 4.9,
    "numReviews": 45,
    "images": [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "electronics",
    "category": {
      "id": "electronics",
      "name": "Electronics",
      "slug": "electronics"
    }
  },
  {
    "id": "prod-50",
    "name": "iPad Air 5th Gen (M1 Chip)",
    "description": "High-quality iPad Air 5th Gen (M1 Chip) featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 25252,
    "stock": 2,
    "rating": 4,
    "numReviews": 62,
    "images": [
      "https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "electronics",
    "category": {
      "id": "electronics",
      "name": "Electronics",
      "slug": "electronics"
    }
  },
  {
    "id": "prod-51",
    "name": "Sony PlayStation 5 Slim Console",
    "description": "High-quality Sony PlayStation 5 Slim Console featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 43904,
    "stock": 5,
    "rating": 4.1,
    "numReviews": 79,
    "images": [
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "electronics",
    "category": {
      "id": "electronics",
      "name": "Electronics",
      "slug": "electronics"
    }
  },
  {
    "id": "prod-52",
    "name": "Xbox Series X 1TB Gaming Console",
    "description": "High-quality Xbox Series X 1TB Gaming Console featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 50232,
    "stock": 8,
    "rating": 4.2,
    "numReviews": 96,
    "images": [
      "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "electronics",
    "category": {
      "id": "electronics",
      "name": "Electronics",
      "slug": "electronics"
    }
  },
  {
    "id": "prod-53",
    "name": "Nintendo Switch OLED Model",
    "description": "High-quality Nintendo Switch OLED Model featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 38418,
    "stock": 11,
    "rating": 4.3,
    "numReviews": 113,
    "images": [
      "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "electronics",
    "category": {
      "id": "electronics",
      "name": "Electronics",
      "slug": "electronics"
    }
  },
  {
    "id": "prod-54",
    "name": "Marshall Stanmore III Bluetooth Speaker",
    "description": "High-quality Marshall Stanmore III Bluetooth Speaker featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 19323,
    "stock": 14,
    "rating": 4.4,
    "numReviews": 130,
    "images": [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "electronics",
    "category": {
      "id": "electronics",
      "name": "Electronics",
      "slug": "electronics"
    }
  },
  {
    "id": "prod-55",
    "name": "GoPro HERO12 Black Action Camera",
    "description": "High-quality GoPro HERO12 Black Action Camera featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 10504,
    "stock": 17,
    "rating": 4.5,
    "numReviews": 147,
    "images": [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "electronics",
    "category": {
      "id": "electronics",
      "name": "Electronics",
      "slug": "electronics"
    }
  },
  {
    "id": "prod-56",
    "name": "Canon EOS R6 Mark II Camera",
    "description": "High-quality Canon EOS R6 Mark II Camera featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 20068,
    "stock": 20,
    "rating": 4.6,
    "numReviews": 164,
    "images": [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "electronics",
    "category": {
      "id": "electronics",
      "name": "Electronics",
      "slug": "electronics"
    }
  },
  {
    "id": "prod-57",
    "name": "DJI Mini 4 Pro Drone Combo",
    "description": "High-quality DJI Mini 4 Pro Drone Combo featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 39222,
    "stock": 23,
    "rating": 4.7,
    "numReviews": 181,
    "images": [
      "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "electronics",
    "category": {
      "id": "electronics",
      "name": "Electronics",
      "slug": "electronics"
    }
  },
  {
    "id": "prod-58",
    "name": "Anker Prime 20,000mAh Power Bank",
    "description": "High-quality Anker Prime 20,000mAh Power Bank featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 50356,
    "stock": 26,
    "rating": 4.8,
    "numReviews": 198,
    "images": [
      "https://images.unsplash.com/photo-1609592424109-dd9892f1b177?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "electronics",
    "category": {
      "id": "electronics",
      "name": "Electronics",
      "slug": "electronics"
    }
  },
  {
    "id": "prod-59",
    "name": "Seagate One Touch 2TB External Hard Drive",
    "description": "High-quality Seagate One Touch 2TB External Hard Drive featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 43234,
    "stock": 4,
    "rating": 4.9,
    "numReviews": 215,
    "images": [
      "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "electronics",
    "category": {
      "id": "electronics",
      "name": "Electronics",
      "slug": "electronics"
    }
  },
  {
    "id": "prod-60",
    "name": "Samsung T7 Shield 1TB Portable SSD",
    "description": "High-quality Samsung T7 Shield 1TB Portable SSD featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 24403,
    "stock": 7,
    "rating": 4,
    "numReviews": 232,
    "images": [
      "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "electronics",
    "category": {
      "id": "electronics",
      "name": "Electronics",
      "slug": "electronics"
    }
  },
  {
    "id": "prod-61",
    "name": "Dyson Airwrap Multi-Styler Complete Long",
    "description": "High-quality Dyson Airwrap Multi-Styler Complete Long featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 11177,
    "stock": 10,
    "rating": 4.1,
    "numReviews": 249,
    "images": [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "beauty",
    "category": {
      "id": "beauty",
      "name": "Beauty & Personal Care",
      "slug": "beauty"
    }
  },
  {
    "id": "prod-62",
    "name": "Estée Lauder Advanced Night Repair Serum",
    "description": "High-quality Estée Lauder Advanced Night Repair Serum featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 15715,
    "stock": 13,
    "rating": 4.2,
    "numReviews": 266,
    "images": [
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "beauty",
    "category": {
      "id": "beauty",
      "name": "Beauty & Personal Care",
      "slug": "beauty"
    }
  },
  {
    "id": "prod-63",
    "name": "MAC Matte Lipstick (Ruby Woo)",
    "description": "High-quality MAC Matte Lipstick (Ruby Woo) featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 33846,
    "stock": 16,
    "rating": 4.3,
    "numReviews": 283,
    "images": [
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "beauty",
    "category": {
      "id": "beauty",
      "name": "Beauty & Personal Care",
      "slug": "beauty"
    }
  },
  {
    "id": "prod-64",
    "name": "Clinique Moisture Surge 100H Hydrator",
    "description": "High-quality Clinique Moisture Surge 100H Hydrator featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 48900,
    "stock": 19,
    "rating": 4.4,
    "numReviews": 300,
    "images": [
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "beauty",
    "category": {
      "id": "beauty",
      "name": "Beauty & Personal Care",
      "slug": "beauty"
    }
  },
  {
    "id": "prod-65",
    "name": "L'Oréal Paris Revitalift Hyaluronic Acid Serum",
    "description": "High-quality L'Oréal Paris Revitalift Hyaluronic Acid Serum featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 47036,
    "stock": 22,
    "rating": 4.5,
    "numReviews": 317,
    "images": [
      "https://images.unsplash.com/photo-1608248597349-4d6d6348c4cf?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "beauty",
    "category": {
      "id": "beauty",
      "name": "Beauty & Personal Care",
      "slug": "beauty"
    }
  },
  {
    "id": "prod-66",
    "name": "Maybelline Lash Sensational Mascara",
    "description": "High-quality Maybelline Lash Sensational Mascara featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 29968,
    "stock": 25,
    "rating": 4.6,
    "numReviews": 334,
    "images": [
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "beauty",
    "category": {
      "id": "beauty",
      "name": "Beauty & Personal Care",
      "slug": "beauty"
    }
  },
  {
    "id": "prod-67",
    "name": "The Ordinary Niacinamide 10% + Zinc 1%",
    "description": "High-quality The Ordinary Niacinamide 10% + Zinc 1% featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 13389,
    "stock": 3,
    "rating": 4.7,
    "numReviews": 351,
    "images": [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "beauty",
    "category": {
      "id": "beauty",
      "name": "Beauty & Personal Care",
      "slug": "beauty"
    }
  },
  {
    "id": "prod-68",
    "name": "Olaplex No. 3 Hair Perfector Treatment",
    "description": "High-quality Olaplex No. 3 Hair Perfector Treatment featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 12540,
    "stock": 6,
    "rating": 4.8,
    "numReviews": 368,
    "images": [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "beauty",
    "category": {
      "id": "beauty",
      "name": "Beauty & Personal Care",
      "slug": "beauty"
    }
  },
  {
    "id": "prod-69",
    "name": "CeraVe Hydrating Facial Cleanser",
    "description": "High-quality CeraVe Hydrating Facial Cleanser featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 28203,
    "stock": 9,
    "rating": 4.9,
    "numReviews": 385,
    "images": [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "beauty",
    "category": {
      "id": "beauty",
      "name": "Beauty & Personal Care",
      "slug": "beauty"
    }
  },
  {
    "id": "prod-70",
    "name": "Neutrogena Hydro Boost Water Gel",
    "description": "High-quality Neutrogena Hydro Boost Water Gel featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 45977,
    "stock": 12,
    "rating": 4,
    "numReviews": 402,
    "images": [
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "beauty",
    "category": {
      "id": "beauty",
      "name": "Beauty & Personal Care",
      "slug": "beauty"
    }
  },
  {
    "id": "prod-71",
    "name": "Kérastase Elixir Ultime Hair Oil",
    "description": "High-quality Kérastase Elixir Ultime Hair Oil featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 49520,
    "stock": 15,
    "rating": 4.1,
    "numReviews": 19,
    "images": [
      "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "beauty",
    "category": {
      "id": "beauty",
      "name": "Beauty & Personal Care",
      "slug": "beauty"
    }
  },
  {
    "id": "prod-72",
    "name": "Urban Decay Naked3 Eyeshadow Palette",
    "description": "High-quality Urban Decay Naked3 Eyeshadow Palette featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 35575,
    "stock": 18,
    "rating": 4.2,
    "numReviews": 36,
    "images": [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "beauty",
    "category": {
      "id": "beauty",
      "name": "Beauty & Personal Care",
      "slug": "beauty"
    }
  },
  {
    "id": "prod-73",
    "name": "Paula's Choice 2% BHA Liquid Exfoliant",
    "description": "High-quality Paula's Choice 2% BHA Liquid Exfoliant featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 16964,
    "stock": 21,
    "rating": 4.3,
    "numReviews": 53,
    "images": [
      "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "beauty",
    "category": {
      "id": "beauty",
      "name": "Beauty & Personal Care",
      "slug": "beauty"
    }
  },
  {
    "id": "prod-74",
    "name": "Laneige Lip Sleeping Mask (Berry)",
    "description": "High-quality Laneige Lip Sleeping Mask (Berry) featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 10796,
    "stock": 24,
    "rating": 4.4,
    "numReviews": 70,
    "images": [
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "beauty",
    "category": {
      "id": "beauty",
      "name": "Beauty & Personal Care",
      "slug": "beauty"
    }
  },
  {
    "id": "prod-75",
    "name": "Forest Essentials Soundarya Radiance Cream",
    "description": "High-quality Forest Essentials Soundarya Radiance Cream featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 22743,
    "stock": 2,
    "rating": 4.5,
    "numReviews": 87,
    "images": [
      "https://images.unsplash.com/photo-1614859265097-763478d53081?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "beauty",
    "category": {
      "id": "beauty",
      "name": "Beauty & Personal Care",
      "slug": "beauty"
    }
  },
  {
    "id": "prod-76",
    "name": "Minimalist 10% Vitamin C Face Serum",
    "description": "High-quality Minimalist 10% Vitamin C Face Serum featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 41821,
    "stock": 5,
    "rating": 4.6,
    "numReviews": 104,
    "images": [
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "beauty",
    "category": {
      "id": "beauty",
      "name": "Beauty & Personal Care",
      "slug": "beauty"
    }
  },
  {
    "id": "prod-77",
    "name": "Nykaa Matte to Last Liquid Lipstick",
    "description": "High-quality Nykaa Matte to Last Liquid Lipstick featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 50489,
    "stock": 8,
    "rating": 4.7,
    "numReviews": 121,
    "images": [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "beauty",
    "category": {
      "id": "beauty",
      "name": "Beauty & Personal Care",
      "slug": "beauty"
    }
  },
  {
    "id": "prod-78",
    "name": "Plum Green Tea Alcohol-Free Toner",
    "description": "High-quality Plum Green Tea Alcohol-Free Toner featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 40779,
    "stock": 11,
    "rating": 4.8,
    "numReviews": 138,
    "images": [
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "beauty",
    "category": {
      "id": "beauty",
      "name": "Beauty & Personal Care",
      "slug": "beauty"
    }
  },
  {
    "id": "prod-79",
    "name": "Cetaphil Gentle Skin Cleanser",
    "description": "High-quality Cetaphil Gentle Skin Cleanser featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 21617,
    "stock": 14,
    "rating": 4.9,
    "numReviews": 155,
    "images": [
      "https://images.unsplash.com/photo-1556228722-d119f018d96d?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "beauty",
    "category": {
      "id": "beauty",
      "name": "Beauty & Personal Care",
      "slug": "beauty"
    }
  },
  {
    "id": "prod-80",
    "name": "Chanel Coco Mademoiselle Eau de Parfum",
    "description": "High-quality Chanel Coco Mademoiselle Eau de Parfum featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 10621,
    "stock": 17,
    "rating": 4,
    "numReviews": 172,
    "images": [
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "beauty",
    "category": {
      "id": "beauty",
      "name": "Beauty & Personal Care",
      "slug": "beauty"
    }
  },
  {
    "id": "prod-81",
    "name": "DeLonghi Specialista Arte Espresso Machine",
    "description": "High-quality DeLonghi Specialista Arte Espresso Machine featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 17901,
    "stock": 20,
    "rating": 4.1,
    "numReviews": 189,
    "images": [
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "home",
    "category": {
      "id": "home",
      "name": "Home & Living",
      "slug": "home"
    }
  },
  {
    "id": "prod-82",
    "name": "Philips Air Fryer XXL 5000 Series",
    "description": "High-quality Philips Air Fryer XXL 5000 Series featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 36764,
    "stock": 23,
    "rating": 4.2,
    "numReviews": 206,
    "images": [
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "home",
    "category": {
      "id": "home",
      "name": "Home & Living",
      "slug": "home"
    }
  },
  {
    "id": "prod-83",
    "name": "Dyson V15 Detect Cordless Vacuum",
    "description": "High-quality Dyson V15 Detect Cordless Vacuum featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 49866,
    "stock": 26,
    "rating": 4.3,
    "numReviews": 223,
    "images": [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "home",
    "category": {
      "id": "home",
      "name": "Home & Living",
      "slug": "home"
    }
  },
  {
    "id": "prod-84",
    "name": "iRobot Roomba j7+ Robot Vacuum",
    "description": "High-quality iRobot Roomba j7+ Robot Vacuum featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 45163,
    "stock": 4,
    "rating": 4.4,
    "numReviews": 240,
    "images": [
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "home",
    "category": {
      "id": "home",
      "name": "Home & Living",
      "slug": "home"
    }
  },
  {
    "id": "prod-85",
    "name": "Instant Pot Duo 7-in-1 Pressure Cooker",
    "description": "High-quality Instant Pot Duo 7-in-1 Pressure Cooker featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 26977,
    "stock": 7,
    "rating": 4.5,
    "numReviews": 257,
    "images": [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "home",
    "category": {
      "id": "home",
      "name": "Home & Living",
      "slug": "home"
    }
  },
  {
    "id": "prod-86",
    "name": "Nespresso Vertuo Pop Coffee Maker",
    "description": "High-quality Nespresso Vertuo Pop Coffee Maker featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 12030,
    "stock": 10,
    "rating": 4.6,
    "numReviews": 274,
    "images": [
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "home",
    "category": {
      "id": "home",
      "name": "Home & Living",
      "slug": "home"
    }
  },
  {
    "id": "prod-87",
    "name": "NutriBullet Ultra 1200W Personal Blender",
    "description": "High-quality NutriBullet Ultra 1200W Personal Blender featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 14063,
    "stock": 13,
    "rating": 4.7,
    "numReviews": 291,
    "images": [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "home",
    "category": {
      "id": "home",
      "name": "Home & Living",
      "slug": "home"
    }
  },
  {
    "id": "prod-88",
    "name": "Morphy Richards Toaster 4-Slice",
    "description": "High-quality Morphy Richards Toaster 4-Slice featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 31207,
    "stock": 16,
    "rating": 4.8,
    "numReviews": 308,
    "images": [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "home",
    "category": {
      "id": "home",
      "name": "Home & Living",
      "slug": "home"
    }
  },
  {
    "id": "prod-89",
    "name": "Prestige Iris 750W Mixer Grinder",
    "description": "High-quality Prestige Iris 750W Mixer Grinder featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 47700,
    "stock": 19,
    "rating": 4.9,
    "numReviews": 325,
    "images": [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "home",
    "category": {
      "id": "home",
      "name": "Home & Living",
      "slug": "home"
    }
  },
  {
    "id": "prod-90",
    "name": "Wipro Smart LED Table Lamp",
    "description": "High-quality Wipro Smart LED Table Lamp featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 48379,
    "stock": 22,
    "rating": 4,
    "numReviews": 342,
    "images": [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "home",
    "category": {
      "id": "home",
      "name": "Home & Living",
      "slug": "home"
    }
  },
  {
    "id": "prod-91",
    "name": "Wonderchef Nutri-Blend Compact Blender",
    "description": "High-quality Wonderchef Nutri-Blend Compact Blender featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 32619,
    "stock": 25,
    "rating": 4.1,
    "numReviews": 359,
    "images": [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "home",
    "category": {
      "id": "home",
      "name": "Home & Living",
      "slug": "home"
    }
  },
  {
    "id": "prod-92",
    "name": "Borosil Glass Cookware Storage Set",
    "description": "High-quality Borosil Glass Cookware Storage Set featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 14910,
    "stock": 3,
    "rating": 4.2,
    "numReviews": 376,
    "images": [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "home",
    "category": {
      "id": "home",
      "name": "Home & Living",
      "slug": "home"
    }
  },
  {
    "id": "prod-93",
    "name": "Hawkins Stainless Steel Contura Cooker",
    "description": "High-quality Hawkins Stainless Steel Contura Cooker featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 11533,
    "stock": 6,
    "rating": 4.3,
    "numReviews": 393,
    "images": [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "home",
    "category": {
      "id": "home",
      "name": "Home & Living",
      "slug": "home"
    }
  },
  {
    "id": "prod-94",
    "name": "Kent Grand Plus Water Purifier",
    "description": "High-quality Kent Grand Plus Water Purifier featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 25594,
    "stock": 9,
    "rating": 4.4,
    "numReviews": 410,
    "images": [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "home",
    "category": {
      "id": "home",
      "name": "Home & Living",
      "slug": "home"
    }
  },
  {
    "id": "prod-95",
    "name": "Sleepwell Dual Comfort Memory Foam Pillow",
    "description": "High-quality Sleepwell Dual Comfort Memory Foam Pillow featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 44164,
    "stock": 12,
    "rating": 4.5,
    "numReviews": 27,
    "images": [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "home",
    "category": {
      "id": "home",
      "name": "Home & Living",
      "slug": "home"
    }
  },
  {
    "id": "prod-96",
    "name": "Spaces 100% Cotton 300 TC Bedsheet",
    "description": "High-quality Spaces 100% Cotton 300 TC Bedsheet featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 50171,
    "stock": 15,
    "rating": 4.6,
    "numReviews": 44,
    "images": [
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "home",
    "category": {
      "id": "home",
      "name": "Home & Living",
      "slug": "home"
    }
  },
  {
    "id": "prod-97",
    "name": "Solimo Stainless Steel Water Bottle Set",
    "description": "High-quality Solimo Stainless Steel Water Bottle Set featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 38091,
    "stock": 18,
    "rating": 4.7,
    "numReviews": 61,
    "images": [
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "home",
    "category": {
      "id": "home",
      "name": "Home & Living",
      "slug": "home"
    }
  },
  {
    "id": "prod-98",
    "name": "Milton Thermosteel Flip Lid Vacuum Flask",
    "description": "High-quality Milton Thermosteel Flip Lid Vacuum Flask featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 19031,
    "stock": 21,
    "rating": 4.8,
    "numReviews": 78,
    "images": [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "home",
    "category": {
      "id": "home",
      "name": "Home & Living",
      "slug": "home"
    }
  },
  {
    "id": "prod-99",
    "name": "Pigeon by Stovekraft Non-Stick Cookware Set",
    "description": "High-quality Pigeon by Stovekraft Non-Stick Cookware Set featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 10515,
    "stock": 24,
    "rating": 4.9,
    "numReviews": 95,
    "images": [
      "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "home",
    "category": {
      "id": "home",
      "name": "Home & Living",
      "slug": "home"
    }
  },
  {
    "id": "prod-100",
    "name": "Godrej Aer Smart Automatic Air Freshener",
    "description": "High-quality Godrej Aer Smart Automatic Air Freshener featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 20372,
    "stock": 2,
    "rating": 4,
    "numReviews": 112,
    "images": [
      "https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "home",
    "category": {
      "id": "home",
      "name": "Home & Living",
      "slug": "home"
    }
  },
  {
    "id": "prod-101",
    "name": "LG 55-Inch 4K Smart OLED TV (C3 Series)",
    "description": "High-quality LG 55-Inch 4K Smart OLED TV (C3 Series) featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 39540,
    "stock": 5,
    "rating": 4.1,
    "numReviews": 129,
    "images": [
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "appliances",
    "category": {
      "id": "appliances",
      "name": "Appliances",
      "slug": "appliances"
    }
  },
  {
    "id": "prod-102",
    "name": "Samsung 65-Inch Neo QLED 4K Smart TV",
    "description": "High-quality Samsung 65-Inch Neo QLED 4K Smart TV featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 50396,
    "stock": 8,
    "rating": 4.2,
    "numReviews": 146,
    "images": [
      "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "appliances",
    "category": {
      "id": "appliances",
      "name": "Appliances",
      "slug": "appliances"
    }
  },
  {
    "id": "prod-103",
    "name": "Sony Bravia 55-Inch XR Full Array LED TV",
    "description": "High-quality Sony Bravia 55-Inch XR Full Array LED TV featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 42959,
    "stock": 11,
    "rating": 4.3,
    "numReviews": 163,
    "images": [
      "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "appliances",
    "category": {
      "id": "appliances",
      "name": "Appliances",
      "slug": "appliances"
    }
  },
  {
    "id": "prod-104",
    "name": "Daikin 1.5 Ton 5 Star Inverter Split AC",
    "description": "High-quality Daikin 1.5 Ton 5 Star Inverter Split AC featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 24067,
    "stock": 14,
    "rating": 4.4,
    "numReviews": 180,
    "images": [
      "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "appliances",
    "category": {
      "id": "appliances",
      "name": "Appliances",
      "slug": "appliances"
    }
  },
  {
    "id": "prod-105",
    "name": "LG 322L 3 Star Frost Free Refrigerator",
    "description": "High-quality LG 322L 3 Star Frost Free Refrigerator featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 11088,
    "stock": 17,
    "rating": 4.5,
    "numReviews": 197,
    "images": [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "appliances",
    "category": {
      "id": "appliances",
      "name": "Appliances",
      "slug": "appliances"
    }
  },
  {
    "id": "prod-106",
    "name": "Samsung 8kg AI Front Load Washing Machine",
    "description": "High-quality Samsung 8kg AI Front Load Washing Machine featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 15956,
    "stock": 20,
    "rating": 4.6,
    "numReviews": 214,
    "images": [
      "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "appliances",
    "category": {
      "id": "appliances",
      "name": "Appliances",
      "slug": "appliances"
    }
  },
  {
    "id": "prod-107",
    "name": "Bosch 13 Place Settings Free Standing Dishwasher",
    "description": "High-quality Bosch 13 Place Settings Free Standing Dishwasher featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 34195,
    "stock": 23,
    "rating": 4.7,
    "numReviews": 231,
    "images": [
      "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "appliances",
    "category": {
      "id": "appliances",
      "name": "Appliances",
      "slug": "appliances"
    }
  },
  {
    "id": "prod-108",
    "name": "IFB 8.5kg Executive ZX Front Load Washer",
    "description": "High-quality IFB 8.5kg Executive ZX Front Load Washer featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 49035,
    "stock": 26,
    "rating": 4.8,
    "numReviews": 248,
    "images": [
      "https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "appliances",
    "category": {
      "id": "appliances",
      "name": "Appliances",
      "slug": "appliances"
    }
  },
  {
    "id": "prod-109",
    "name": "Haier 596L Side-by-Side Refrigerator",
    "description": "High-quality Haier 596L Side-by-Side Refrigerator featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 46834,
    "stock": 4,
    "rating": 4.9,
    "numReviews": 265,
    "images": [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "appliances",
    "category": {
      "id": "appliances",
      "name": "Appliances",
      "slug": "appliances"
    }
  },
  {
    "id": "prod-110",
    "name": "Voltas 1.5 Ton 3 Star Inverter Split AC",
    "description": "High-quality Voltas 1.5 Ton 3 Star Inverter Split AC featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 29614,
    "stock": 7,
    "rating": 4,
    "numReviews": 282,
    "images": [
      "https://images.unsplash.com/photo-1586208958839-06c17cacdf08?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "appliances",
    "category": {
      "id": "appliances",
      "name": "Appliances",
      "slug": "appliances"
    }
  },
  {
    "id": "prod-111",
    "name": "Whirlpool 265L 3 Star Double Door Refrigerator",
    "description": "High-quality Whirlpool 265L 3 Star Double Door Refrigerator featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 13208,
    "stock": 10,
    "rating": 4.1,
    "numReviews": 299,
    "images": [
      "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "appliances",
    "category": {
      "id": "appliances",
      "name": "Appliances",
      "slug": "appliances"
    }
  },
  {
    "id": "prod-112",
    "name": "Panasonic 1.5 Ton 5 Star Split AC",
    "description": "High-quality Panasonic 1.5 Ton 5 Star Split AC featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 12699,
    "stock": 13,
    "rating": 4.2,
    "numReviews": 316,
    "images": [
      "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "appliances",
    "category": {
      "id": "appliances",
      "name": "Appliances",
      "slug": "appliances"
    }
  },
  {
    "id": "prod-113",
    "name": "Godrej 190L 5 Star Direct Cool Refrigerator",
    "description": "High-quality Godrej 190L 5 Star Direct Cool Refrigerator featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 28555,
    "stock": 16,
    "rating": 4.3,
    "numReviews": 333,
    "images": [
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "appliances",
    "category": {
      "id": "appliances",
      "name": "Appliances",
      "slug": "appliances"
    }
  },
  {
    "id": "prod-114",
    "name": "Blue Star 1.5 Ton 3 Star Split AC",
    "description": "High-quality Blue Star 1.5 Ton 3 Star Split AC featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 46199,
    "stock": 19,
    "rating": 4.4,
    "numReviews": 350,
    "images": [
      "https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "appliances",
    "category": {
      "id": "appliances",
      "name": "Appliances",
      "slug": "appliances"
    }
  },
  {
    "id": "prod-115",
    "name": "Hindware Smart Appliances Chimney (90cm)",
    "description": "High-quality Hindware Smart Appliances Chimney (90cm) featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 49408,
    "stock": 22,
    "rating": 4.5,
    "numReviews": 367,
    "images": [
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "appliances",
    "category": {
      "id": "appliances",
      "name": "Appliances",
      "slug": "appliances"
    }
  },
  {
    "id": "prod-116",
    "name": "Faber 60cm 1200 m3/hr Auto-Clean Chimney",
    "description": "High-quality Faber 60cm 1200 m3/hr Auto-Clean Chimney featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 35232,
    "stock": 25,
    "rating": 4.6,
    "numReviews": 384,
    "images": [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "appliances",
    "category": {
      "id": "appliances",
      "name": "Appliances",
      "slug": "appliances"
    }
  },
  {
    "id": "prod-117",
    "name": "Beko 8kg Condenser Tumble Dryer",
    "description": "High-quality Beko 8kg Condenser Tumble Dryer featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 16705,
    "stock": 3,
    "rating": 4.7,
    "numReviews": 401,
    "images": [
      "https://images.unsplash.com/photo-1584269600519-112d071b35e6?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "appliances",
    "category": {
      "id": "appliances",
      "name": "Appliances",
      "slug": "appliances"
    }
  },
  {
    "id": "prod-118",
    "name": "Havells Monza EC 15L Water Heater",
    "description": "High-quality Havells Monza EC 15L Water Heater featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 10860,
    "stock": 6,
    "rating": 4.8,
    "numReviews": 18,
    "images": [
      "https://images.unsplash.com/photo-1585338061483-16a2491a4363?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "appliances",
    "category": {
      "id": "appliances",
      "name": "Appliances",
      "slug": "appliances"
    }
  },
  {
    "id": "prod-119",
    "name": "Bajaj New Shakti Neo 15L Vertical Water Geyser",
    "description": "High-quality Bajaj New Shakti Neo 15L Vertical Water Geyser featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 23071,
    "stock": 9,
    "rating": 4.9,
    "numReviews": 35,
    "images": [
      "https://images.unsplash.com/photo-1586208958839-06c17cacdf09?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "appliances",
    "category": {
      "id": "appliances",
      "name": "Appliances",
      "slug": "appliances"
    }
  },
  {
    "id": "prod-120",
    "name": "Crompton Ozone 75L Desert Air Cooler",
    "description": "High-quality Crompton Ozone 75L Desert Air Cooler featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 42111,
    "stock": 12,
    "rating": 4,
    "numReviews": 52,
    "images": [
      "https://images.unsplash.com/photo-1590794056226-77ef3a433752?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "appliances",
    "category": {
      "id": "appliances",
      "name": "Appliances",
      "slug": "appliances"
    }
  },
  {
    "id": "prod-121",
    "name": "LEGO Technic Bugatti Bolide Building Kit",
    "description": "High-quality LEGO Technic Bugatti Bolide Building Kit featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 50475,
    "stock": 15,
    "rating": 4.1,
    "numReviews": 69,
    "images": [
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "toys",
    "category": {
      "id": "toys",
      "name": "Toys & Kids",
      "slug": "toys"
    }
  },
  {
    "id": "prod-122",
    "name": "Hot Wheels 20-Car Gift Pack",
    "description": "High-quality Hot Wheels 20-Car Gift Pack featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 40473,
    "stock": 18,
    "rating": 4.2,
    "numReviews": 86,
    "images": [
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "toys",
    "category": {
      "id": "toys",
      "name": "Toys & Kids",
      "slug": "toys"
    }
  },
  {
    "id": "prod-123",
    "name": "Barbie Dreamhouse 3-Story Playset",
    "description": "High-quality Barbie Dreamhouse 3-Story Playset featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 21301,
    "stock": 21,
    "rating": 4.3,
    "numReviews": 103,
    "images": [
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "toys",
    "category": {
      "id": "toys",
      "name": "Toys & Kids",
      "slug": "toys"
    }
  },
  {
    "id": "prod-124",
    "name": "NERF Elite 2.0 Commander RD-6 Blaster",
    "description": "High-quality NERF Elite 2.0 Commander RD-6 Blaster featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 10585,
    "stock": 24,
    "rating": 4.4,
    "numReviews": 120,
    "images": [
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "toys",
    "category": {
      "id": "toys",
      "name": "Toys & Kids",
      "slug": "toys"
    }
  },
  {
    "id": "prod-125",
    "name": "Hasbro Gaming Monopoly Board Game",
    "description": "High-quality Hasbro Gaming Monopoly Board Game featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 18178,
    "stock": 2,
    "rating": 4.5,
    "numReviews": 137,
    "images": [
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "toys",
    "category": {
      "id": "toys",
      "name": "Toys & Kids",
      "slug": "toys"
    }
  },
  {
    "id": "prod-126",
    "name": "Fisher-Price Kick & Play Piano Gym",
    "description": "High-quality Fisher-Price Kick & Play Piano Gym featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 37099,
    "stock": 5,
    "rating": 4.6,
    "numReviews": 154,
    "images": [
      "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "toys",
    "category": {
      "id": "toys",
      "name": "Toys & Kids",
      "slug": "toys"
    }
  },
  {
    "id": "prod-127",
    "name": "Play-Doh Ultimate Color Collection",
    "description": "High-quality Play-Doh Ultimate Color Collection featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 49952,
    "stock": 8,
    "rating": 4.7,
    "numReviews": 171,
    "images": [
      "https://images.unsplash.com/photo-1558060370-d644479be6f7?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "toys",
    "category": {
      "id": "toys",
      "name": "Toys & Kids",
      "slug": "toys"
    }
  },
  {
    "id": "prod-128",
    "name": "Funskool Rubik's 3x3 Speed Cube",
    "description": "High-quality Funskool Rubik's 3x3 Speed Cube featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 44920,
    "stock": 11,
    "rating": 4.8,
    "numReviews": 188,
    "images": [
      "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "toys",
    "category": {
      "id": "toys",
      "name": "Toys & Kids",
      "slug": "toys"
    }
  },
  {
    "id": "prod-129",
    "name": "Maisto 1:18 Diecast Lamborghini Sian",
    "description": "High-quality Maisto 1:18 Diecast Lamborghini Sian featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 26630,
    "stock": 14,
    "rating": 4.9,
    "numReviews": 205,
    "images": [
      "https://images.unsplash.com/photo-1533236897111-3e94666b2edf?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "toys",
    "category": {
      "id": "toys",
      "name": "Toys & Kids",
      "slug": "toys"
    }
  },
  {
    "id": "prod-130",
    "name": "Beyblade Burst QuadStrike Battle Set",
    "description": "High-quality Beyblade Burst QuadStrike Battle Set featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 11897,
    "stock": 17,
    "rating": 4,
    "numReviews": 222,
    "images": [
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "toys",
    "category": {
      "id": "toys",
      "name": "Toys & Kids",
      "slug": "toys"
    }
  },
  {
    "id": "prod-131",
    "name": "VTech Touch and Learn Activity Desk",
    "description": "High-quality VTech Touch and Learn Activity Desk featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 14267,
    "stock": 20,
    "rating": 4.1,
    "numReviews": 239,
    "images": [
      "https://images.unsplash.com/photo-1599658880436-c61792e70672?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "toys",
    "category": {
      "id": "toys",
      "name": "Toys & Kids",
      "slug": "toys"
    }
  },
  {
    "id": "prod-132",
    "name": "PAW Patrol Mighty Pups Lookout Tower",
    "description": "High-quality PAW Patrol Mighty Pups Lookout Tower featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 31561,
    "stock": 23,
    "rating": 4.2,
    "numReviews": 256,
    "images": [
      "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "toys",
    "category": {
      "id": "toys",
      "name": "Toys & Kids",
      "slug": "toys"
    }
  },
  {
    "id": "prod-133",
    "name": "Transformers Studio Series Action Figure",
    "description": "High-quality Transformers Studio Series Action Figure featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 47878,
    "stock": 26,
    "rating": 4.3,
    "numReviews": 273,
    "images": [
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "toys",
    "category": {
      "id": "toys",
      "name": "Toys & Kids",
      "slug": "toys"
    }
  },
  {
    "id": "prod-134",
    "name": "UNO Card Game Tin Gift Box",
    "description": "High-quality UNO Card Game Tin Gift Box featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 48217,
    "stock": 4,
    "rating": 4.4,
    "numReviews": 290,
    "images": [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "toys",
    "category": {
      "id": "toys",
      "name": "Toys & Kids",
      "slug": "toys"
    }
  },
  {
    "id": "prod-135",
    "name": "Crayola Ultimate Light Board Tablet",
    "description": "High-quality Crayola Ultimate Light Board Tablet featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 32266,
    "stock": 7,
    "rating": 4.5,
    "numReviews": 307,
    "images": [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "toys",
    "category": {
      "id": "toys",
      "name": "Toys & Kids",
      "slug": "toys"
    }
  },
  {
    "id": "prod-136",
    "name": "Melissa & Doug Wooden Building Blocks",
    "description": "High-quality Melissa & Doug Wooden Building Blocks featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 14690,
    "stock": 10,
    "rating": 4.6,
    "numReviews": 324,
    "images": [
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "toys",
    "category": {
      "id": "toys",
      "name": "Toys & Kids",
      "slug": "toys"
    }
  },
  {
    "id": "prod-137",
    "name": "Shumee Wooden Activity Walker",
    "description": "High-quality Shumee Wooden Activity Walker featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 11649,
    "stock": 13,
    "rating": 4.7,
    "numReviews": 341,
    "images": [
      "https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "toys",
    "category": {
      "id": "toys",
      "name": "Toys & Kids",
      "slug": "toys"
    }
  },
  {
    "id": "prod-138",
    "name": "Sketchel Magnetic Drawing Board",
    "description": "High-quality Sketchel Magnetic Drawing Board featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 25938,
    "stock": 16,
    "rating": 4.8,
    "numReviews": 358,
    "images": [
      "https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "toys",
    "category": {
      "id": "toys",
      "name": "Toys & Kids",
      "slug": "toys"
    }
  },
  {
    "id": "prod-139",
    "name": "Smartivity DIY Hydraulic Crane STEM Toy",
    "description": "High-quality Smartivity DIY Hydraulic Crane STEM Toy featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 44421,
    "stock": 19,
    "rating": 4.9,
    "numReviews": 375,
    "images": [
      "https://images.unsplash.com/photo-1535572290543-960a8046f5af?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "toys",
    "category": {
      "id": "toys",
      "name": "Toys & Kids",
      "slug": "toys"
    }
  },
  {
    "id": "prod-140",
    "name": "Mechanix Educational Metal Construction Set",
    "description": "High-quality Mechanix Educational Metal Construction Set featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 50104,
    "stock": 22,
    "rating": 4,
    "numReviews": 392,
    "images": [
      "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "toys",
    "category": {
      "id": "toys",
      "name": "Toys & Kids",
      "slug": "toys"
    }
  },
  {
    "id": "prod-141",
    "name": "Omron Platinum Wireless Blood Pressure Monitor",
    "description": "High-quality Omron Platinum Wireless Blood Pressure Monitor featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 37762,
    "stock": 25,
    "rating": 4.1,
    "numReviews": 409,
    "images": [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "health",
    "category": {
      "id": "health",
      "name": "Health & Care",
      "slug": "health"
    }
  },
  {
    "id": "prod-142",
    "name": "Dr Trust USA Fully Automatic Digital BP Monitor",
    "description": "High-quality Dr Trust USA Fully Automatic Digital BP Monitor featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 18743,
    "stock": 3,
    "rating": 4.2,
    "numReviews": 26,
    "images": [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "health",
    "category": {
      "id": "health",
      "name": "Health & Care",
      "slug": "health"
    }
  },
  {
    "id": "prod-143",
    "name": "Accu-Chek Instant Blood Glucose Kit",
    "description": "High-quality Accu-Chek Instant Blood Glucose Kit featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 10532,
    "stock": 6,
    "rating": 4.3,
    "numReviews": 43,
    "images": [
      "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "health",
    "category": {
      "id": "health",
      "name": "Health & Care",
      "slug": "health"
    }
  },
  {
    "id": "prod-144",
    "name": "Philips Sonicare ProtectiveClean Toothbrush",
    "description": "High-quality Philips Sonicare ProtectiveClean Toothbrush featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 20679,
    "stock": 9,
    "rating": 4.4,
    "numReviews": 60,
    "images": [
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "health",
    "category": {
      "id": "health",
      "name": "Health & Care",
      "slug": "health"
    }
  },
  {
    "id": "prod-145",
    "name": "Oral-B Pro 3000 Rechargeable Toothbrush",
    "description": "High-quality Oral-B Pro 3000 Rechargeable Toothbrush featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 39854,
    "stock": 12,
    "rating": 4.5,
    "numReviews": 77,
    "images": [
      "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "health",
    "category": {
      "id": "health",
      "name": "Health & Care",
      "slug": "health"
    }
  },
  {
    "id": "prod-146",
    "name": "Kore PVC 20kg Combo Gym Set",
    "description": "High-quality Kore PVC 20kg Combo Gym Set featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 50428,
    "stock": 15,
    "rating": 4.6,
    "numReviews": 94,
    "images": [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "health",
    "category": {
      "id": "health",
      "name": "Health & Care",
      "slug": "health"
    }
  },
  {
    "id": "prod-147",
    "name": "Boldfit Heavy Duty Resistance Bands Set",
    "description": "High-quality Boldfit Heavy Duty Resistance Bands Set featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 42680,
    "stock": 18,
    "rating": 4.7,
    "numReviews": 111,
    "images": [
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "health",
    "category": {
      "id": "health",
      "name": "Health & Care",
      "slug": "health"
    }
  },
  {
    "id": "prod-148",
    "name": "Strauss Anti-Skid Yoga Mat 6mm",
    "description": "High-quality Strauss Anti-Skid Yoga Mat 6mm featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 23732,
    "stock": 21,
    "rating": 4.8,
    "numReviews": 128,
    "images": [
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "health",
    "category": {
      "id": "health",
      "name": "Health & Care",
      "slug": "health"
    }
  },
  {
    "id": "prod-149",
    "name": "BeatXP Thermo Pro Deep Tissue Massage Gun",
    "description": "High-quality BeatXP Thermo Pro Deep Tissue Massage Gun featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 11006,
    "stock": 24,
    "rating": 4.9,
    "numReviews": 145,
    "images": [
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "health",
    "category": {
      "id": "health",
      "name": "Health & Care",
      "slug": "health"
    }
  },
  {
    "id": "prod-150",
    "name": "Dr Physio Electric Full Body Massager",
    "description": "High-quality Dr Physio Electric Full Body Massager featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 16201,
    "stock": 2,
    "rating": 4,
    "numReviews": 162,
    "images": [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "health",
    "category": {
      "id": "health",
      "name": "Health & Care",
      "slug": "health"
    }
  },
  {
    "id": "prod-151",
    "name": "Sahayog Wellness Digital Infrared Thermometer",
    "description": "High-quality Sahayog Wellness Digital Infrared Thermometer featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 34542,
    "stock": 5,
    "rating": 4.1,
    "numReviews": 179,
    "images": [
      "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "health",
    "category": {
      "id": "health",
      "name": "Health & Care",
      "slug": "health"
    }
  },
  {
    "id": "prod-152",
    "name": "HealthSense Chef-Mate Digital Kitchen Scale",
    "description": "High-quality HealthSense Chef-Mate Digital Kitchen Scale featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 49165,
    "stock": 8,
    "rating": 4.2,
    "numReviews": 196,
    "images": [
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "health",
    "category": {
      "id": "health",
      "name": "Health & Care",
      "slug": "health"
    }
  },
  {
    "id": "prod-153",
    "name": "Beurer FT 90 Non-Contact Clinical Thermometer",
    "description": "High-quality Beurer FT 90 Non-Contact Clinical Thermometer featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 46627,
    "stock": 11,
    "rating": 4.3,
    "numReviews": 213,
    "images": [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "health",
    "category": {
      "id": "health",
      "name": "Health & Care",
      "slug": "health"
    }
  },
  {
    "id": "prod-154",
    "name": "Control D Pulse Oximeter Fingertip Monitor",
    "description": "High-quality Control D Pulse Oximeter Fingertip Monitor featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 29261,
    "stock": 14,
    "rating": 4.4,
    "numReviews": 230,
    "images": [
      "https://images.unsplash.com/photo-1550572017-edf70602686c?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "health",
    "category": {
      "id": "health",
      "name": "Health & Care",
      "slug": "health"
    }
  },
  {
    "id": "prod-155",
    "name": "Flexnest Flexibell Adjustable Dumbbell",
    "description": "High-quality Flexnest Flexibell Adjustable Dumbbell featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 13033,
    "stock": 17,
    "rating": 4.5,
    "numReviews": 247,
    "images": [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "health",
    "category": {
      "id": "health",
      "name": "Health & Care",
      "slug": "health"
    }
  },
  {
    "id": "prod-156",
    "name": "Proline Fitness Motorized Treadmill",
    "description": "High-quality Proline Fitness Motorized Treadmill featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 12863,
    "stock": 20,
    "rating": 4.6,
    "numReviews": 264,
    "images": [
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "health",
    "category": {
      "id": "health",
      "name": "Health & Care",
      "slug": "health"
    }
  },
  {
    "id": "prod-157",
    "name": "Reach Air Bike Exercise Fitness Cycle",
    "description": "High-quality Reach Air Bike Exercise Fitness Cycle featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 28908,
    "stock": 23,
    "rating": 4.7,
    "numReviews": 281,
    "images": [
      "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "health",
    "category": {
      "id": "health",
      "name": "Health & Care",
      "slug": "health"
    }
  },
  {
    "id": "prod-158",
    "name": "Fast&Up Charge Natural Vitamin C Tablets",
    "description": "High-quality Fast&Up Charge Natural Vitamin C Tablets featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 46415,
    "stock": 26,
    "rating": 4.8,
    "numReviews": 298,
    "images": [
      "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "health",
    "category": {
      "id": "health",
      "name": "Health & Care",
      "slug": "health"
    }
  },
  {
    "id": "prod-159",
    "name": "Optimum Nutrition ON Gold Standard Whey",
    "description": "High-quality Optimum Nutrition ON Gold Standard Whey featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 49289,
    "stock": 4,
    "rating": 4.9,
    "numReviews": 315,
    "images": [
      "https://images.unsplash.com/photo-1512290900673-700244211f1e?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "health",
    "category": {
      "id": "health",
      "name": "Health & Care",
      "slug": "health"
    }
  },
  {
    "id": "prod-160",
    "name": "MuscleBlaze Biozyme Performance Whey",
    "description": "High-quality MuscleBlaze Biozyme Performance Whey featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 34888,
    "stock": 7,
    "rating": 4,
    "numReviews": 332,
    "images": [
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "health",
    "category": {
      "id": "health",
      "name": "Health & Care",
      "slug": "health"
    }
  },
  {
    "id": "prod-161",
    "name": "Ergonomic Mesh High-Back Office Chair",
    "description": "High-quality Ergonomic Mesh High-Back Office Chair featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 16451,
    "stock": 10,
    "rating": 4.1,
    "numReviews": 349,
    "images": [
      "https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "furniture",
    "category": {
      "id": "furniture",
      "name": "Furniture",
      "slug": "furniture"
    }
  },
  {
    "id": "prod-162",
    "name": "Wakefit Orthopedic Memory Foam Queen Mattress",
    "description": "High-quality Wakefit Orthopedic Memory Foam Queen Mattress featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 10930,
    "stock": 13,
    "rating": 4.2,
    "numReviews": 366,
    "images": [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "furniture",
    "category": {
      "id": "furniture",
      "name": "Furniture",
      "slug": "furniture"
    }
  },
  {
    "id": "prod-163",
    "name": "RoyalOak Wooden Dining Table 6 Seater Set",
    "description": "High-quality RoyalOak Wooden Dining Table 6 Seater Set featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 23401,
    "stock": 16,
    "rating": 4.3,
    "numReviews": 383,
    "images": [
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "furniture",
    "category": {
      "id": "furniture",
      "name": "Furniture",
      "slug": "furniture"
    }
  },
  {
    "id": "prod-164",
    "name": "Green Soul Monster Ultimate Gaming Chair",
    "description": "High-quality Green Soul Monster Ultimate Gaming Chair featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 42398,
    "stock": 19,
    "rating": 4.4,
    "numReviews": 400,
    "images": [
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "furniture",
    "category": {
      "id": "furniture",
      "name": "Furniture",
      "slug": "furniture"
    }
  },
  {
    "id": "prod-165",
    "name": "Nilkamal Freedom Mini Medium Plastic Cabinet",
    "description": "High-quality Nilkamal Freedom Mini Medium Plastic Cabinet featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 50455,
    "stock": 22,
    "rating": 4.5,
    "numReviews": 17,
    "images": [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "furniture",
    "category": {
      "id": "furniture",
      "name": "Furniture",
      "slug": "furniture"
    }
  },
  {
    "id": "prod-166",
    "name": "Urban Ladder Solid Teak Wood King Bed",
    "description": "High-quality Urban Ladder Solid Teak Wood King Bed featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 40165,
    "stock": 25,
    "rating": 4.6,
    "numReviews": 34,
    "images": [
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "furniture",
    "category": {
      "id": "furniture",
      "name": "Furniture",
      "slug": "furniture"
    }
  },
  {
    "id": "prod-167",
    "name": "Pepperfry Modern 3 Seater Fabric Sofa",
    "description": "High-quality Pepperfry Modern 3 Seater Fabric Sofa featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 20988,
    "stock": 3,
    "rating": 4.7,
    "numReviews": 51,
    "images": [
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "furniture",
    "category": {
      "id": "furniture",
      "name": "Furniture",
      "slug": "furniture"
    }
  },
  {
    "id": "prod-168",
    "name": "Bluewud Express Wall Mount Study Table",
    "description": "High-quality Bluewud Express Wall Mount Study Table featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 10556,
    "stock": 6,
    "rating": 4.8,
    "numReviews": 68,
    "images": [
      "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "furniture",
    "category": {
      "id": "furniture",
      "name": "Furniture",
      "slug": "furniture"
    }
  },
  {
    "id": "prod-169",
    "name": "Durian Executive Leatherette Ergonomic Chair",
    "description": "High-quality Durian Executive Leatherette Ergonomic Chair featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 18459,
    "stock": 9,
    "rating": 4.9,
    "numReviews": 85,
    "images": [
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "furniture",
    "category": {
      "id": "furniture",
      "name": "Furniture",
      "slug": "furniture"
    }
  },
  {
    "id": "prod-170",
    "name": "Home Centre 4 Door Wardrobe with Mirror",
    "description": "High-quality Home Centre 4 Door Wardrobe with Mirror featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 37432,
    "stock": 12,
    "rating": 4,
    "numReviews": 102,
    "images": [
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "furniture",
    "category": {
      "id": "furniture",
      "name": "Furniture",
      "slug": "furniture"
    }
  },
  {
    "id": "prod-171",
    "name": "DecorNation Solid Wood Bedside Table",
    "description": "High-quality DecorNation Solid Wood Bedside Table featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 50031,
    "stock": 15,
    "rating": 4.1,
    "numReviews": 119,
    "images": [
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "furniture",
    "category": {
      "id": "furniture",
      "name": "Furniture",
      "slug": "furniture"
    }
  },
  {
    "id": "prod-172",
    "name": "Spacewood Winner Study Desk with Bookshelf",
    "description": "High-quality Spacewood Winner Study Desk with Bookshelf featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 44672,
    "stock": 18,
    "rating": 4.2,
    "numReviews": 136,
    "images": [
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "furniture",
    "category": {
      "id": "furniture",
      "name": "Furniture",
      "slug": "furniture"
    }
  },
  {
    "id": "prod-173",
    "name": "Supreme Cameo Plastic Chair (Set of 4)",
    "description": "High-quality Supreme Cameo Plastic Chair (Set of 4) featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 26283,
    "stock": 21,
    "rating": 4.3,
    "numReviews": 153,
    "images": [
      "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "furniture",
    "category": {
      "id": "furniture",
      "name": "Furniture",
      "slug": "furniture"
    }
  },
  {
    "id": "prod-174",
    "name": "Sleepwell Spinetech Air Luxury Mattress",
    "description": "High-quality Sleepwell Spinetech Air Luxury Mattress featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 11770,
    "stock": 24,
    "rating": 4.4,
    "numReviews": 170,
    "images": [
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "furniture",
    "category": {
      "id": "furniture",
      "name": "Furniture",
      "slug": "furniture"
    }
  },
  {
    "id": "prod-175",
    "name": "Solimo Sheesham Wood Coffee Center Table",
    "description": "High-quality Solimo Sheesham Wood Coffee Center Table featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 14476,
    "stock": 2,
    "rating": 4.5,
    "numReviews": 187,
    "images": [
      "https://images.unsplash.com/photo-1541558869434-2840d308329a?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "furniture",
    "category": {
      "id": "furniture",
      "name": "Furniture",
      "slug": "furniture"
    }
  },
  {
    "id": "prod-176",
    "name": "Story@Home Sheesham Wood Armchair",
    "description": "High-quality Story@Home Sheesham Wood Armchair featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 31914,
    "stock": 5,
    "rating": 4.6,
    "numReviews": 204,
    "images": [
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "furniture",
    "category": {
      "id": "furniture",
      "name": "Furniture",
      "slug": "furniture"
    }
  },
  {
    "id": "prod-177",
    "name": "Story@Home Folding Wooden Wall Desk",
    "description": "High-quality Story@Home Folding Wooden Wall Desk featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 48051,
    "stock": 8,
    "rating": 4.7,
    "numReviews": 221,
    "images": [
      "https://images.unsplash.com/photo-1506898667547-42e2b3a4fe52?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "furniture",
    "category": {
      "id": "furniture",
      "name": "Furniture",
      "slug": "furniture"
    }
  },
  {
    "id": "prod-178",
    "name": "Casastyle Leatherette L-Shape Sofa Set",
    "description": "High-quality Casastyle Leatherette L-Shape Sofa Set featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 48051,
    "stock": 11,
    "rating": 4.8,
    "numReviews": 238,
    "images": [
      "https://images.unsplash.com/photo-1520038410233-7141be7e6f97?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "furniture",
    "category": {
      "id": "furniture",
      "name": "Furniture",
      "slug": "furniture"
    }
  },
  {
    "id": "prod-179",
    "name": "Astrix Gaming Desk with LED Lights",
    "description": "High-quality Astrix Gaming Desk with LED Lights featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 31913,
    "stock": 14,
    "rating": 4.9,
    "numReviews": 255,
    "images": [
      "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "furniture",
    "category": {
      "id": "furniture",
      "name": "Furniture",
      "slug": "furniture"
    }
  },
  {
    "id": "prod-180",
    "name": "IKEA LINNMON Desk with ADILS Legs",
    "description": "High-quality IKEA LINNMON Desk with ADILS Legs featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 14476,
    "stock": 17,
    "rating": 4,
    "numReviews": 272,
    "images": [
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80&v=2"
    ],
    "categoryId": "furniture",
    "category": {
      "id": "furniture",
      "name": "Furniture",
      "slug": "furniture"
    }
  },
  {
    "id": "prod-181",
    "name": "Atomic Habits by James Clear (Hardcover)",
    "description": "High-quality Atomic Habits by James Clear (Hardcover) featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 11770,
    "stock": 20,
    "rating": 4.1,
    "numReviews": 289,
    "images": [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "books",
    "category": {
      "id": "books",
      "name": "Books",
      "slug": "books"
    }
  },
  {
    "id": "prod-182",
    "name": "The Psychology of Money by Morgan Housel",
    "description": "High-quality The Psychology of Money by Morgan Housel featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 26283,
    "stock": 23,
    "rating": 4.2,
    "numReviews": 306,
    "images": [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "books",
    "category": {
      "id": "books",
      "name": "Books",
      "slug": "books"
    }
  },
  {
    "id": "prod-183",
    "name": "Rich Dad Poor Dad by Robert T. Kiyosaki",
    "description": "High-quality Rich Dad Poor Dad by Robert T. Kiyosaki featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 44673,
    "stock": 26,
    "rating": 4.3,
    "numReviews": 323,
    "images": [
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "books",
    "category": {
      "id": "books",
      "name": "Books",
      "slug": "books"
    }
  },
  {
    "id": "prod-184",
    "name": "Ikigai: The Japanese Secret to a Long & Happy Life",
    "description": "High-quality Ikigai: The Japanese Secret to a Long & Happy Life featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 50031,
    "stock": 4,
    "rating": 4.4,
    "numReviews": 340,
    "images": [
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "books",
    "category": {
      "id": "books",
      "name": "Books",
      "slug": "books"
    }
  },
  {
    "id": "prod-185",
    "name": "Deep Work by Cal Newport",
    "description": "High-quality Deep Work by Cal Newport featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 37431,
    "stock": 7,
    "rating": 4.5,
    "numReviews": 357,
    "images": [
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "books",
    "category": {
      "id": "books",
      "name": "Books",
      "slug": "books"
    }
  },
  {
    "id": "prod-186",
    "name": "Thinking, Fast and Slow by Daniel Kahneman",
    "description": "High-quality Thinking, Fast and Slow by Daniel Kahneman featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 18459,
    "stock": 10,
    "rating": 4.6,
    "numReviews": 374,
    "images": [
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "books",
    "category": {
      "id": "books",
      "name": "Books",
      "slug": "books"
    }
  },
  {
    "id": "prod-187",
    "name": "The Subtle Art of Not Giving a F*ck by Mark Manson",
    "description": "High-quality The Subtle Art of Not Giving a F*ck by Mark Manson featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 10556,
    "stock": 13,
    "rating": 4.7,
    "numReviews": 391,
    "images": [
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "books",
    "category": {
      "id": "books",
      "name": "Books",
      "slug": "books"
    }
  },
  {
    "id": "prod-188",
    "name": "Do It Today by Darius Foroux",
    "description": "High-quality Do It Today by Darius Foroux featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 20989,
    "stock": 16,
    "rating": 4.8,
    "numReviews": 408,
    "images": [
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "books",
    "category": {
      "id": "books",
      "name": "Books",
      "slug": "books"
    }
  },
  {
    "id": "prod-189",
    "name": "Sapiens: A Brief History of Humankind",
    "description": "High-quality Sapiens: A Brief History of Humankind featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 40165,
    "stock": 19,
    "rating": 4.9,
    "numReviews": 25,
    "images": [
      "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "books",
    "category": {
      "id": "books",
      "name": "Books",
      "slug": "books"
    }
  },
  {
    "id": "prod-190",
    "name": "The Alchemist by Paulo Coelho",
    "description": "High-quality The Alchemist by Paulo Coelho featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 50455,
    "stock": 22,
    "rating": 4,
    "numReviews": 42,
    "images": [
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "books",
    "category": {
      "id": "books",
      "name": "Books",
      "slug": "books"
    }
  },
  {
    "id": "prod-191",
    "name": "Can't Hurt Me by David Goggins",
    "description": "High-quality Can't Hurt Me by David Goggins featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 42397,
    "stock": 25,
    "rating": 4.1,
    "numReviews": 59,
    "images": [
      "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "books",
    "category": {
      "id": "books",
      "name": "Books",
      "slug": "books"
    }
  },
  {
    "id": "prod-192",
    "name": "Zero to One by Peter Thiel",
    "description": "High-quality Zero to One by Peter Thiel featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 23400,
    "stock": 3,
    "rating": 4.2,
    "numReviews": 76,
    "images": [
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "books",
    "category": {
      "id": "books",
      "name": "Books",
      "slug": "books"
    }
  },
  {
    "id": "prod-193",
    "name": "The Intelligent Investor by Benjamin Graham",
    "description": "High-quality The Intelligent Investor by Benjamin Graham featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 10930,
    "stock": 6,
    "rating": 4.3,
    "numReviews": 93,
    "images": [
      "https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "books",
    "category": {
      "id": "books",
      "name": "Books",
      "slug": "books"
    }
  },
  {
    "id": "prod-194",
    "name": "Man's Search for Meaning by Viktor E. Frankl",
    "description": "High-quality Man's Search for Meaning by Viktor E. Frankl featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 16451,
    "stock": 9,
    "rating": 4.4,
    "numReviews": 110,
    "images": [
      "https://images.unsplash.com/photo-1510172951991-856a654063f9?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "books",
    "category": {
      "id": "books",
      "name": "Books",
      "slug": "books"
    }
  },
  {
    "id": "prod-195",
    "name": "Rework by Jason Fried & David Heinemeier",
    "description": "High-quality Rework by Jason Fried & David Heinemeier featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 34888,
    "stock": 12,
    "rating": 4.5,
    "numReviews": 127,
    "images": [
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "books",
    "category": {
      "id": "books",
      "name": "Books",
      "slug": "books"
    }
  },
  {
    "id": "prod-196",
    "name": "Clean Code by Robert C. Martin",
    "description": "High-quality Clean Code by Robert C. Martin featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 49290,
    "stock": 15,
    "rating": 4.6,
    "numReviews": 144,
    "images": [
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "books",
    "category": {
      "id": "books",
      "name": "Books",
      "slug": "books"
    }
  },
  {
    "id": "prod-197",
    "name": "Designing Data-Intensive Applications",
    "description": "High-quality Designing Data-Intensive Applications featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 46415,
    "stock": 18,
    "rating": 4.7,
    "numReviews": 161,
    "images": [
      "https://images.unsplash.com/photo-1509021436468-d5103009571f?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "books",
    "category": {
      "id": "books",
      "name": "Books",
      "slug": "books"
    }
  },
  {
    "id": "prod-198",
    "name": "The Pragmatic Programmer by Andrew Hunt",
    "description": "High-quality The Pragmatic Programmer by Andrew Hunt featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 28907,
    "stock": 21,
    "rating": 4.8,
    "numReviews": 178,
    "images": [
      "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "books",
    "category": {
      "id": "books",
      "name": "Books",
      "slug": "books"
    }
  },
  {
    "id": "prod-199",
    "name": "Python Crash Course by Eric Matthes",
    "description": "High-quality Python Crash Course by Eric Matthes featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 12863,
    "stock": 24,
    "rating": 4.9,
    "numReviews": 195,
    "images": [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "books",
    "category": {
      "id": "books",
      "name": "Books",
      "slug": "books"
    }
  },
  {
    "id": "prod-200",
    "name": "System Design Interview by Alex Xu",
    "description": "High-quality System Design Interview by Alex Xu featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 13033,
    "stock": 2,
    "rating": 4,
    "numReviews": 212,
    "images": [
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "books",
    "category": {
      "id": "books",
      "name": "Books",
      "slug": "books"
    }
  },
  {
    "id": "prod-201",
    "name": "Ather 450X Gen 3 Electric Scooter",
    "description": "High-quality Ather 450X Gen 3 Electric Scooter featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 29261,
    "stock": 5,
    "rating": 4.1,
    "numReviews": 229,
    "images": [
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "2wheelers",
    "category": {
      "id": "2wheelers",
      "name": "2 Wheelers",
      "slug": "2wheelers"
    }
  },
  {
    "id": "prod-202",
    "name": "Ola S1 Pro Gen 2 Electric Scooter",
    "description": "High-quality Ola S1 Pro Gen 2 Electric Scooter featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 46627,
    "stock": 8,
    "rating": 4.2,
    "numReviews": 246,
    "images": [
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "2wheelers",
    "category": {
      "id": "2wheelers",
      "name": "2 Wheelers",
      "slug": "2wheelers"
    }
  },
  {
    "id": "prod-203",
    "name": "TVS iQube Electric Scooter",
    "description": "High-quality TVS iQube Electric Scooter featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 49165,
    "stock": 11,
    "rating": 4.3,
    "numReviews": 263,
    "images": [
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "2wheelers",
    "category": {
      "id": "2wheelers",
      "name": "2 Wheelers",
      "slug": "2wheelers"
    }
  },
  {
    "id": "prod-204",
    "name": "Bajaj Chetak Premium Electric Scooter",
    "description": "High-quality Bajaj Chetak Premium Electric Scooter featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 34541,
    "stock": 14,
    "rating": 4.4,
    "numReviews": 280,
    "images": [
      "https://images.unsplash.com/photo-1558980664-769d59546b3d?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "2wheelers",
    "category": {
      "id": "2wheelers",
      "name": "2 Wheelers",
      "slug": "2wheelers"
    }
  },
  {
    "id": "prod-205",
    "name": "Hero Vida V1 Pro Electric Scooter",
    "description": "High-quality Hero Vida V1 Pro Electric Scooter featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 16201,
    "stock": 17,
    "rating": 4.5,
    "numReviews": 297,
    "images": [
      "https://images.unsplash.com/photo-1558981244-50854d909565?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "2wheelers",
    "category": {
      "id": "2wheelers",
      "name": "2 Wheelers",
      "slug": "2wheelers"
    }
  },
  {
    "id": "prod-206",
    "name": "Yamaha Aerox 155 Maxi Scooter",
    "description": "High-quality Yamaha Aerox 155 Maxi Scooter featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 11006,
    "stock": 20,
    "rating": 4.6,
    "numReviews": 314,
    "images": [
      "https://images.unsplash.com/photo-1558981806-189617711467?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "2wheelers",
    "category": {
      "id": "2wheelers",
      "name": "2 Wheelers",
      "slug": "2wheelers"
    }
  },
  {
    "id": "prod-207",
    "name": "TVS Jupiter 125 Disc Brake Scooter",
    "description": "High-quality TVS Jupiter 125 Disc Brake Scooter featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 23733,
    "stock": 23,
    "rating": 4.7,
    "numReviews": 331,
    "images": [
      "https://images.unsplash.com/photo-1558981359-219d6364c9c8?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "2wheelers",
    "category": {
      "id": "2wheelers",
      "name": "2 Wheelers",
      "slug": "2wheelers"
    }
  },
  {
    "id": "prod-208",
    "name": "Honda Activa 6G Premium Edition",
    "description": "High-quality Honda Activa 6G Premium Edition featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 42680,
    "stock": 26,
    "rating": 4.8,
    "numReviews": 348,
    "images": [
      "https://images.unsplash.com/photo-1558981001-5113fe0b088e?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "2wheelers",
    "category": {
      "id": "2wheelers",
      "name": "2 Wheelers",
      "slug": "2wheelers"
    }
  },
  {
    "id": "prod-209",
    "name": "Suzuki Access 125 Bluetooth Edition",
    "description": "High-quality Suzuki Access 125 Bluetooth Edition featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 50428,
    "stock": 4,
    "rating": 4.9,
    "numReviews": 365,
    "images": [
      "https://images.unsplash.com/photo-1558981000-0e12902e5a38?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "2wheelers",
    "category": {
      "id": "2wheelers",
      "name": "2 Wheelers",
      "slug": "2wheelers"
    }
  },
  {
    "id": "prod-210",
    "name": "Royal Enfield Hunter 350 (Dapper White)",
    "description": "High-quality Royal Enfield Hunter 350 (Dapper White) featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 39853,
    "stock": 7,
    "rating": 4,
    "numReviews": 382,
    "images": [
      "https://images.unsplash.com/photo-1558981408-db0ecd8a1ee4?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "2wheelers",
    "category": {
      "id": "2wheelers",
      "name": "2 Wheelers",
      "slug": "2wheelers"
    }
  },
  {
    "id": "prod-211",
    "name": "Royal Enfield Classic 350 (Chrome Red)",
    "description": "High-quality Royal Enfield Classic 350 (Chrome Red) featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 20678,
    "stock": 10,
    "rating": 4.1,
    "numReviews": 399,
    "images": [
      "https://images.unsplash.com/photo-1558981396-5fcf84bdf14d?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "2wheelers",
    "category": {
      "id": "2wheelers",
      "name": "2 Wheelers",
      "slug": "2wheelers"
    }
  },
  {
    "id": "prod-212",
    "name": "TVS Apache RTR 200 4V (Matte Blue)",
    "description": "High-quality TVS Apache RTR 200 4V (Matte Blue) featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 10532,
    "stock": 13,
    "rating": 4.2,
    "numReviews": 16,
    "images": [
      "https://images.unsplash.com/photo-1558981820-94a2b918a1a3?auto=format&fit=crop&w=800&q=80"
    ],
    "categoryId": "2wheelers",
    "category": {
      "id": "2wheelers",
      "name": "2 Wheelers",
      "slug": "2wheelers"
    }
  },
  {
    "id": "prod-213",
    "name": "Yamaha YZF R15 V4 (Racing Blue)",
    "description": "High-quality Yamaha YZF R15 V4 (Racing Blue) featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 18744,
    "stock": 16,
    "rating": 4.3,
    "numReviews": 33,
    "images": [
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80&item=13"
    ],
    "categoryId": "2wheelers",
    "category": {
      "id": "2wheelers",
      "name": "2 Wheelers",
      "slug": "2wheelers"
    }
  },
  {
    "id": "prod-214",
    "name": "KTM Duke 390 (Electronic Orange)",
    "description": "High-quality KTM Duke 390 (Electronic Orange) featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 37763,
    "stock": 19,
    "rating": 4.4,
    "numReviews": 50,
    "images": [
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80&item=14"
    ],
    "categoryId": "2wheelers",
    "category": {
      "id": "2wheelers",
      "name": "2 Wheelers",
      "slug": "2wheelers"
    }
  },
  {
    "id": "prod-215",
    "name": "BMW G 310 GS Adventure Motorcycle",
    "description": "High-quality BMW G 310 GS Adventure Motorcycle featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 50104,
    "stock": 22,
    "rating": 4.5,
    "numReviews": 67,
    "images": [
      "https://images.unsplash.com/photo-1558980664-769d59546b3d?auto=format&fit=crop&w=800&q=80&item=15"
    ],
    "categoryId": "2wheelers",
    "category": {
      "id": "2wheelers",
      "name": "2 Wheelers",
      "slug": "2wheelers"
    }
  },
  {
    "id": "prod-216",
    "name": "Kawasaki Ninja 300 (Lime Green)",
    "description": "High-quality Kawasaki Ninja 300 (Lime Green) featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 44420,
    "stock": 25,
    "rating": 4.6,
    "numReviews": 84,
    "images": [
      "https://images.unsplash.com/photo-1558981244-50854d909565?auto=format&fit=crop&w=800&q=80&item=16"
    ],
    "categoryId": "2wheelers",
    "category": {
      "id": "2wheelers",
      "name": "2 Wheelers",
      "slug": "2wheelers"
    }
  },
  {
    "id": "prod-217",
    "name": "RE Meteor 350 Supernova Custom",
    "description": "High-quality RE Meteor 350 Supernova Custom featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 25937,
    "stock": 3,
    "rating": 4.7,
    "numReviews": 101,
    "images": [
      "https://images.unsplash.com/photo-1558981806-189617711467?auto=format&fit=crop&w=800&q=80&item=17"
    ],
    "categoryId": "2wheelers",
    "category": {
      "id": "2wheelers",
      "name": "2 Wheelers",
      "slug": "2wheelers"
    }
  },
  {
    "id": "prod-218",
    "name": "Hero Splendor Plus XTEC",
    "description": "High-quality Hero Splendor Plus XTEC featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 11649,
    "stock": 6,
    "rating": 4.8,
    "numReviews": 118,
    "images": [
      "https://images.unsplash.com/photo-1558981359-219d6364c9c8?auto=format&fit=crop&w=800&q=80&item=18"
    ],
    "categoryId": "2wheelers",
    "category": {
      "id": "2wheelers",
      "name": "2 Wheelers",
      "slug": "2wheelers"
    }
  },
  {
    "id": "prod-219",
    "name": "Honda CB350 Highness (DLX Pro)",
    "description": "High-quality Honda CB350 Highness (DLX Pro) featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 14691,
    "stock": 9,
    "rating": 4.9,
    "numReviews": 135,
    "images": [
      "https://images.unsplash.com/photo-1558981001-5113fe0b088e?auto=format&fit=crop&w=800&q=80&item=19"
    ],
    "categoryId": "2wheelers",
    "category": {
      "id": "2wheelers",
      "name": "2 Wheelers",
      "slug": "2wheelers"
    }
  },
  {
    "id": "prod-220",
    "name": "Revolt RV400 Electric Motorcycle",
    "description": "High-quality Revolt RV400 Electric Motorcycle featuring top brand reliability, official warranty, and fast ShopKaro delivery.",
    "price": 32267,
    "stock": 12,
    "rating": 4,
    "numReviews": 152,
    "images": [
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80&item=20"
    ],
    "categoryId": "2wheelers",
    "category": {
      "id": "2wheelers",
      "name": "2 Wheelers",
      "slug": "2wheelers"
    }
  }
];

// GET /api/products - Get all products with optional category/search filter
router.get('/products', async (req: Request, res: Response) => {
  try {
    const { category, search, minPrice, maxPrice } = req.query;
    const where: any = {};

    if (category && category !== 'all') {
      where.categoryId = String(category);
    }
    if (search) {
      where.name = { contains: String(search), mode: 'insensitive' };
    }
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = Number(minPrice);
      if (maxPrice) where.price.lte = Number(maxPrice);
    }

    try {
      const products = await prisma.product.findMany({
        where,
        include: { category: true },
        orderBy: { createdAt: 'desc' },
      });
      res.status(200).json({ status: 'success', results: products.length, data: { products } });
    } catch {
      res.status(200).json({ status: 'success', results: fallbackProducts.length, data: { products: fallbackProducts } });
    }
  } catch (error: any) {
    res.status(200).json({ status: 'success', results: fallbackProducts.length, data: { products: fallbackProducts } });
  }
});


// GET /api/products/:id - Get single product by ID
router.get('/products/:id', async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true, reviews: { include: { user: { select: { name: true } } } } },
    });

    if (!product) {
      return res.status(404).json({ status: 'error', message: 'Product not found' });
    }

    res.status(200).json({ status: 'success', data: { product } });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message || 'Server error' });
  }
});

// POST /api/products - Create new product (Admin Only)
router.post('/products', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, price, stock, categoryId, images } = req.body;
    if (!name || !price || !categoryId) {
      return res.status(400).json({ status: 'error', message: 'Name, price, and categoryId are required' });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: Number(price),
        stock: Number(stock || 0),
        categoryId,
        images: images || [],
      },
    });

    res.status(201).json({ status: 'success', message: 'Product created successfully', data: { product } });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message || 'Server error' });
  }
});

// PUT /api/products/:id - Update product (Admin Only)
router.put('/products/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const id = String(req.params.id);
    const { name, description, price, stock, categoryId, images } = req.body;

    const updated = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price: price ? Number(price) : undefined,
        stock: stock !== undefined ? Number(stock) : undefined,
        categoryId,
        images,
      },
    });

    res.status(200).json({ status: 'success', message: 'Product updated successfully', data: { product: updated } });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message || 'Server error' });
  }
});

// DELETE /api/products/:id - Delete product (Admin Only)
router.delete('/products/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const id = String(req.params.id);
    await prisma.product.delete({ where: { id } });
    res.status(200).json({ status: 'success', message: 'Product deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message || 'Server error' });
  }
});

// POST /api/products/:id/reviews - Submit review (Protected User)
router.post('/products/:id/reviews', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const productId = String(req.params.id);
    const userId = req.user?.id;
    const { rating, comment } = req.body;

    if (!rating || !comment || !userId) {
      return res.status(400).json({ status: 'error', message: 'Rating and comment are required' });
    }

    const review = await prisma.review.create({
      data: {
        rating: Number(rating),
        comment,
        productId,
        userId,
      },
    });

    res.status(201).json({ status: 'success', message: 'Review submitted', data: { review } });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message || 'Server error' });
  }
});

export default router;

