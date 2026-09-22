import express, { Request, Response } from 'express';
import prisma from '../config/prisma.js';
import { authenticateToken, requireAdmin, AuthRequest } from '../middleware/auth.js';

const router = express.Router();

const fallbackProducts = [
  // -------------------------------------------------------------
  // ELECTRONICS (20 Products)
  // -------------------------------------------------------------
  {
    id: 'elec-1',
    name: 'Sony WH-1000XM5 Wireless Noise-Canceling Headphones',
    description: 'Industry-leading noise canceling with two processors and eight microphones for unprecedented sound clarity.',
    price: 26990,
    stock: 15,
    rating: 4.8,
    numReviews: 245,
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'electronics',
    category: { id: 'electronics', name: 'Electronics', slug: 'electronics' },
  },
  {
    id: 'elec-2',
    name: 'Apple Watch Series 9 GPS 45mm Midnight Aluminum',
    description: 'Advanced health sensors, Double Tap gesture control, and bright Always-On Retina display.',
    price: 41900,
    stock: 10,
    rating: 4.9,
    numReviews: 189,
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'electronics',
    category: { id: 'electronics', name: 'Electronics', slug: 'electronics' },
  },
  {
    id: 'elec-3',
    name: 'MacBook Pro 16-inch M3 Max (36GB RAM, 1TB SSD)',
    description: 'The ultimate pro laptop with Liquid Retina XDR display, hardware-accelerated ray tracing, and up to 22 hours battery life.',
    price: 349900,
    stock: 5,
    rating: 4.9,
    numReviews: 87,
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'electronics',
    category: { id: 'electronics', name: 'Electronics', slug: 'electronics' },
  },
  {
    id: 'elec-4',
    name: 'Samsung Galaxy S24 Ultra 5G (12GB, 512GB Titanium Gray)',
    description: 'Galaxy AI is here. Epic camera with 200MP resolution, built-in S Pen, and Snapdragon 8 Gen 3 for Galaxy.',
    price: 139999,
    stock: 12,
    rating: 4.7,
    numReviews: 310,
    images: ['https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'electronics',
    category: { id: 'electronics', name: 'Electronics', slug: 'electronics' },
  },
  {
    id: 'elec-5',
    name: 'Dell XPS 13 Touchscreen Laptop (Intel Core Ultra 7)',
    description: 'Iconic craft design with seamless touch function row, Corning Gorilla Glass 3, and InfinityEdge display.',
    price: 145990,
    stock: 8,
    rating: 4.6,
    numReviews: 112,
    images: ['https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'electronics',
    category: { id: 'electronics', name: 'Electronics', slug: 'electronics' },
  },
  {
    id: 'elec-6',
    name: 'Bose QuietComfort Ultra Earbuds Noise Cancelling',
    description: 'Breakthrough spatialized audio for immersive listening, custom-tuned noise cancellation, and soft umbrella-shaped tips.',
    price: 24900,
    stock: 20,
    rating: 4.7,
    numReviews: 156,
    images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'electronics',
    category: { id: 'electronics', name: 'Electronics', slug: 'electronics' },
  },
  {
    id: 'elec-7',
    name: 'Canon EOS R6 Mark II Mirrorless Camera (Body Only)',
    description: 'Full-frame 24.2 MP CMOS sensor, 40 fps continuous shooting, Dual Pixel CMOS AF II, and 4K 60p uncropped video.',
    price: 215995,
    stock: 4,
    rating: 4.9,
    numReviews: 64,
    images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'electronics',
    category: { id: 'electronics', name: 'Electronics', slug: 'electronics' },
  },
  {
    id: 'elec-8',
    name: 'Sony PlayStation 5 Slim Console (Disc Edition)',
    description: 'Ultra-high speed SSD, ray tracing, 4K-TV gaming, 3D Audio, and DualSense wireless controller haptic feedback.',
    price: 54990,
    stock: 14,
    rating: 4.9,
    numReviews: 890,
    images: ['https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'electronics',
    category: { id: 'electronics', name: 'Electronics', slug: 'electronics' },
  },
  {
    id: 'elec-9',
    name: 'LG C3 55-inch 4K Smart OLED evo TV',
    description: 'Self-lit OLED pixels for infinite contrast, Brightness Booster, α9 AI Processor Gen6, and 120Hz refresh rate.',
    price: 124990,
    stock: 6,
    rating: 4.8,
    numReviews: 175,
    images: ['https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'electronics',
    category: { id: 'electronics', name: 'Electronics', slug: 'electronics' },
  },
  {
    id: 'elec-10',
    name: 'Apple iPad Pro 13-inch M4 (Wi-Fi, 256GB Space Black)',
    description: 'Stunning Ultra Retina XDR display with Tandem OLED technology, M4 chip performance, and Apple Pencil Pro support.',
    price: 129900,
    stock: 9,
    rating: 4.9,
    numReviews: 142,
    images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'electronics',
    category: { id: 'electronics', name: 'Electronics', slug: 'electronics' },
  },
  {
    id: 'elec-11',
    name: 'Kindle Paperwhite (16 GB) 6.8-inch Display with Adjustable Warm Light',
    description: 'Now with a 6.8-inch display, thinner borders, adjustable warm light, up to 10 weeks battery life, and waterproof design.',
    price: 14999,
    stock: 25,
    rating: 4.7,
    numReviews: 530,
    images: ['https://images.unsplash.com/photo-1592496001020-d31bd830651f?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'electronics',
    category: { id: 'electronics', name: 'Electronics', slug: 'electronics' },
  },
  {
    id: 'elec-12',
    name: 'Logitech MX Master 3S Wireless Performance Mouse',
    description: '8K DPI any-surface tracking, quiet clicks, MagSpeed electromagnetic scrolling, and ergonomic design.',
    price: 9495,
    stock: 30,
    rating: 4.8,
    numReviews: 412,
    images: ['https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'electronics',
    category: { id: 'electronics', name: 'Electronics', slug: 'electronics' },
  },
  {
    id: 'elec-13',
    name: 'ASUS ROG Zephyrus G16 Gaming Laptop (RTX 4080)',
    description: 'Ultra-thin gaming laptop with OLED Nebula Display, Intel Core Ultra 9, and NVIDIA GeForce RTX 4080 GPU.',
    price: 249990,
    stock: 3,
    rating: 4.7,
    numReviews: 48,
    images: ['https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'electronics',
    category: { id: 'electronics', name: 'Electronics', slug: 'electronics' },
  },
  {
    id: 'elec-14',
    name: 'GoPro HERO12 Black Action Camera',
    description: 'Incredible HDR video in 5.3K & 4K, HyperSmooth 6.0 stabilization, waterproof to 33ft, and Bluetooth audio connectivity.',
    price: 37990,
    stock: 18,
    rating: 4.6,
    numReviews: 129,
    images: ['https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'electronics',
    category: { id: 'electronics', name: 'Electronics', slug: 'electronics' },
  },
  {
    id: 'elec-15',
    name: 'Anker Prime 20,000mAh Power Bank (200W Output)',
    description: 'Multi-device fast charging power bank with smart digital display and ultra-compact flight-approved design.',
    price: 12999,
    stock: 35,
    rating: 4.8,
    numReviews: 210,
    images: ['https://images.unsplash.com/photo-1609592424074-8b63e528a2a8?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'electronics',
    category: { id: 'electronics', name: 'Electronics', slug: 'electronics' },
  },
  {
    id: 'elec-16',
    name: 'Keychron Q1 Pro Wireless Custom Mechanical Keyboard',
    description: 'Full aluminum QMK/VIA wireless mechanical keyboard with double-gasket design and hot-swappable switches.',
    price: 18990,
    stock: 11,
    rating: 4.9,
    numReviews: 95,
    images: ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'electronics',
    category: { id: 'electronics', name: 'Electronics', slug: 'electronics' },
  },
  {
    id: 'elec-17',
    name: 'Marshall Stanmore III Bluetooth Home Speaker',
    description: 'Iconic vintage styling with re-engineered wider soundstage, Placement Compensation, and Bluetooth 5.2.',
    price: 31999,
    stock: 7,
    rating: 4.7,
    numReviews: 184,
    images: ['https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'electronics',
    category: { id: 'electronics', name: 'Electronics', slug: 'electronics' },
  },
  {
    id: 'elec-18',
    name: 'DJI Mini 4 Pro Fly More Combo Drone',
    description: 'Under 249g mini drone with 4K/60fps HDR true vertical shooting, omnidirectional obstacle sensing, and 20km transmission.',
    price: 94990,
    stock: 5,
    rating: 4.9,
    numReviews: 88,
    images: ['https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'electronics',
    category: { id: 'electronics', name: 'Electronics', slug: 'electronics' },
  },
  {
    id: 'elec-19',
    name: 'Sennheiser HD 660S2 Open-Back Audiophile Headphones',
    description: 'Warm precision acoustics, sub-bass extension, lightweight chassis, and plush velour ear cushions.',
    price: 44990,
    stock: 8,
    rating: 4.8,
    numReviews: 71,
    images: ['https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'electronics',
    category: { id: 'electronics', name: 'Electronics', slug: 'electronics' },
  },
  {
    id: 'elec-20',
    name: 'BenQ EW3280U 32-inch 4K Entertainment Monitor',
    description: '32-inch 4K IPS display with HDRi technology, integrated 2.1 channel treVolo speakers, and USB-C connectivity.',
    price: 42990,
    stock: 10,
    rating: 4.6,
    numReviews: 63,
    images: ['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'electronics',
    category: { id: 'electronics', name: 'Electronics', slug: 'electronics' },
  },

  // -------------------------------------------------------------
  // FASHION (20 Products)
  // -------------------------------------------------------------
  {
    id: 'fash-1',
    name: 'Nike Air Max 270 React Running Shoes',
    description: 'Bold lifestyle shoe combining React foam cushioning with a large Max Air heel unit for maximum comfort.',
    price: 11495,
    stock: 15,
    rating: 4.6,
    numReviews: 98,
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'fashion',
    category: { id: 'fashion', name: 'Fashion', slug: 'fashion' },
  },
  {
    id: 'fash-2',
    name: "Levi's 501 Original Fit Straight Leg Jeans",
    description: 'The archetype of vintage denim. Signature button fly, regular fit through thigh, and durable cotton weave.',
    price: 4299,
    stock: 40,
    rating: 4.7,
    numReviews: 540,
    images: ['https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'fashion',
    category: { id: 'fashion', name: 'Fashion', slug: 'fashion' },
  },
  {
    id: 'fash-3',
    name: 'Ray-Ban Wayfarer Classic Sunglasses (Black Frame)',
    description: 'Timeless design since 1956. High quality G-15 green glass lenses providing 100% UV protection.',
    price: 9290,
    stock: 22,
    rating: 4.8,
    numReviews: 320,
    images: ['https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'fashion',
    category: { id: 'fashion', name: 'Fashion', slug: 'fashion' },
  },
  {
    id: 'fash-4',
    name: 'Adidas Ultraboost Light Running Shoes',
    description: 'Lightest Ultraboost ever made with 30% lighter Light BOOST material and Primeknit+ textile upper.',
    price: 18999,
    stock: 18,
    rating: 4.8,
    numReviews: 164,
    images: ['https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'fashion',
    category: { id: 'fashion', name: 'Fashion', slug: 'fashion' },
  },
  {
    id: 'fash-5',
    name: 'Fossil Minimalist Stainless Steel Quartz Watch',
    description: 'Sleek satin dial with slim case profile, quartz movement, and interchangeable genuine brown leather strap.',
    price: 11995,
    stock: 25,
    rating: 4.5,
    numReviews: 215,
    images: ['https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'fashion',
    category: { id: 'fashion', name: 'Fashion', slug: 'fashion' },
  },
  {
    id: 'fash-6',
    name: 'The North Face Resolve 2 Waterproof Jacket',
    description: 'Windproof and breathable DryVent 2L shell with soft mesh lining and adjustable storable hood.',
    price: 8990,
    stock: 14,
    rating: 4.7,
    numReviews: 190,
    images: ['https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'fashion',
    category: { id: 'fashion', name: 'Fashion', slug: 'fashion' },
  },
  {
    id: 'fash-7',
    name: 'Puma Suede Classic XXI Sneakers',
    description: 'Iconic low-boot silhouette crafted from full suede upper with synthetic lining and rubber outsole.',
    price: 6999,
    stock: 28,
    rating: 4.6,
    numReviews: 310,
    images: ['https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'fashion',
    category: { id: 'fashion', name: 'Fashion', slug: 'fashion' },
  },
  {
    id: 'fash-8',
    name: 'Ralph Lauren Classic Fit Oxford Cotton Shirt',
    description: 'Crafted from breathable cotton oxford with signature embroidered Pony logo on the left chest.',
    price: 9990,
    stock: 16,
    rating: 4.8,
    numReviews: 145,
    images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'fashion',
    category: { id: 'fashion', name: 'Fashion', slug: 'fashion' },
  },
  {
    id: 'fash-9',
    name: 'Coach Leather Medium Flap Shoulder Bag',
    description: 'Supple polished pebble leather with detachable chain strap and iconic C turn-lock hardware closure.',
    price: 28500,
    stock: 7,
    rating: 4.9,
    numReviews: 88,
    images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'fashion',
    category: { id: 'fashion', name: 'Fashion', slug: 'fashion' },
  },
  {
    id: 'fash-10',
    name: 'Converse Chuck Taylor All Star High Top Sneakers',
    description: 'The legendary canvas sneaker featuring classic star ankle patch, vulcanized rubber sole, and contrast stitching.',
    price: 4999,
    stock: 50,
    rating: 4.7,
    numReviews: 720,
    images: ['https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'fashion',
    category: { id: 'fashion', name: 'Fashion', slug: 'fashion' },
  },
  {
    id: 'fash-11',
    name: 'Tommy Hilfiger Puffer Down Jacket with Hood',
    description: 'Warm synthetic down alternative fill, water resistant shell fabric, and tri-color flag logo at chest.',
    price: 13999,
    stock: 12,
    rating: 4.6,
    numReviews: 110,
    images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'fashion',
    category: { id: 'fashion', name: 'Fashion', slug: 'fashion' },
  },
  {
    id: 'fash-12',
    name: 'Calvin Klein Cotton Stretch Boxer Briefs (Pack of 3)',
    description: 'Soft breathable cotton with added stretch for retention and iconic repeating logo waistband.',
    price: 2999,
    stock: 45,
    rating: 4.8,
    numReviews: 610,
    images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'fashion',
    category: { id: 'fashion', name: 'Fashion', slug: 'fashion' },
  },
  {
    id: 'fash-13',
    name: 'Dr. Martens 1460 Smooth Leather 8-Eye Boots',
    description: 'Original 8-eye boot with grooved sides, yellow welt stitching, and comfortable air-cushioned sole.',
    price: 16990,
    stock: 10,
    rating: 4.7,
    numReviews: 240,
    images: ['https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'fashion',
    category: { id: 'fashion', name: 'Fashion', slug: 'fashion' },
  },
  {
    id: 'fash-14',
    name: 'Herschel Little America Classic Backpack 25L',
    description: 'Mountaineering-inspired backpack with padded 15-inch laptop sleeve and magnetic strap closures.',
    price: 7990,
    stock: 30,
    rating: 4.6,
    numReviews: 380,
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'fashion',
    category: { id: 'fashion', name: 'Fashion', slug: 'fashion' },
  },
  {
    id: 'fash-15',
    name: 'Zara Oversized Heavyweight Cotton Hoodie',
    description: 'Relaxed drop-shoulder silhouette cut from 450 GSM brushed cotton fleece with pouch pocket.',
    price: 3590,
    stock: 35,
    rating: 4.5,
    numReviews: 175,
    images: ['https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'fashion',
    category: { id: 'fashion', name: 'Fashion', slug: 'fashion' },
  },
  {
    id: 'fash-16',
    name: 'Timberland 6-Inch Premium Waterproof Boots',
    description: 'The original yellow boot crafted from premium full-grain leather with PrimaLoft insulation.',
    price: 17990,
    stock: 9,
    rating: 4.8,
    numReviews: 420,
    images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'fashion',
    category: { id: 'fashion', name: 'Fashion', slug: 'fashion' },
  },
  {
    id: 'fash-17',
    name: 'Casio G-Shock GA-2100 "CasiOak" Octagonal Watch',
    description: 'Ultra-durable carbon core guard structure with octagonal bezel and analog-digital display.',
    price: 8995,
    stock: 20,
    rating: 4.9,
    numReviews: 530,
    images: ['https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'fashion',
    category: { id: 'fashion', name: 'Fashion', slug: 'fashion' },
  },
  {
    id: 'fash-18',
    name: 'Vans Old Skool Canvas & Suede Skate Shoes',
    description: 'Classic side-stripe skate shoe featuring durable suede & canvas upper and waffle rubber outsole.',
    price: 5499,
    stock: 40,
    rating: 4.7,
    numReviews: 690,
    images: ['https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'fashion',
    category: { id: 'fashion', name: 'Fashion', slug: 'fashion' },
  },
  {
    id: 'fash-19',
    name: 'Samsonite Omni PC Hardside Expandable Spinner Luggage',
    description: 'Micro-diamond polycarbonate texture scratch-resistant case with 360-degree dual spinner wheels.',
    price: 14990,
    stock: 15,
    rating: 4.7,
    numReviews: 280,
    images: ['https://images.unsplash.com/photo-1565026057447-b88d3829d020?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'fashion',
    category: { id: 'fashion', name: 'Fashion', slug: 'fashion' },
  },
  {
    id: 'fash-20',
    name: 'Oakley Holbrook Square Sunglasses (Matte Black)',
    description: 'Classic American frame design accented by metal rivets, Plutonite lenses filtering 100% UV rays.',
    price: 9490,
    stock: 16,
    rating: 4.6,
    numReviews: 195,
    images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'fashion',
    category: { id: 'fashion', name: 'Fashion', slug: 'fashion' },
  },

  // -------------------------------------------------------------
  // HOME & LIVING (20 Products)
  // -------------------------------------------------------------
  {
    id: 'home-1',
    name: 'DeLonghi Specialista Arte Espresso Coffee Machine',
    description: 'Compact bean-to-cup espresso machine with integrated grinder and manual steam wand for latte art.',
    price: 34990,
    stock: 5,
    rating: 4.7,
    numReviews: 76,
    images: ['https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'home',
    category: { id: 'home', name: 'Home & Living', slug: 'home' },
  },
  {
    id: 'home-2',
    name: 'Dyson V15 Detect Cordless Vacuum Cleaner',
    description: 'Intelligent cordless vacuum with laser illumination that reveals invisible dust on hard floors.',
    price: 62900,
    stock: 8,
    rating: 4.8,
    numReviews: 310,
    images: ['https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'home',
    category: { id: 'home', name: 'Home & Living', slug: 'home' },
  },
  {
    id: 'home-3',
    name: 'Philips XXL Airfryer Smart Sensing Technology',
    description: 'Maximum taste, minimum fat. Cook meals 1.5x faster than conventional ovens with Smart Sensing tech.',
    price: 21995,
    stock: 14,
    rating: 4.7,
    numReviews: 450,
    images: ['https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'home',
    category: { id: 'home', name: 'Home & Living', slug: 'home' },
  },
  {
    id: 'home-4',
    name: 'Nespresso VertuoPop Coffee and Espresso Machine',
    description: 'Compact single-serve coffee maker reading barcode technology to brew 5 cup sizes at one touch.',
    price: 13990,
    stock: 20,
    rating: 4.6,
    numReviews: 290,
    images: ['https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'home',
    category: { id: 'home', name: 'Home & Living', slug: 'home' },
  },
  {
    id: 'home-5',
    name: 'Le Creuset Enameled Cast Iron Signature Dutch Oven 5.5 Qt',
    description: 'Iconic French oven delivering superior heat distribution and retention for slow-cooking and searing.',
    price: 32990,
    stock: 6,
    rating: 4.9,
    numReviews: 180,
    images: ['https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'home',
    category: { id: 'home', name: 'Home & Living', slug: 'home' },
  },
  {
    id: 'home-6',
    name: 'iRobot Roomba j7+ Self-Emptying Robot Vacuum',
    description: 'Avoids pet waste and cords. Empties itself for up to 60 days into Clean Base Automatic Dirt Disposal.',
    price: 59900,
    stock: 7,
    rating: 4.6,
    numReviews: 210,
    images: ['https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'home',
    category: { id: 'home', name: 'Home & Living', slug: 'home' },
  },
  {
    id: 'home-7',
    name: 'KitchenAid Artisan Series 5-Quart Tilt-Head Stand Mixer',
    description: 'Legendary planetary mixing action with 10 speeds and power hub for over 10 optional attachments.',
    price: 44990,
    stock: 9,
    rating: 4.9,
    numReviews: 620,
    images: ['https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'home',
    category: { id: 'home', name: 'Home & Living', slug: 'home' },
  },
  {
    id: 'home-8',
    name: 'Instant Pot Duo 7-in-1 Electric Pressure Cooker 6 Qt',
    description: 'Combines 7 kitchen appliances in 1: pressure cooker, slow cooker, rice cooker, steamer, and yogurt maker.',
    price: 8990,
    stock: 25,
    rating: 4.8,
    numReviews: 1100,
    images: ['https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'home',
    category: { id: 'home', name: 'Home & Living', slug: 'home' },
  },
  {
    id: 'home-9',
    name: 'BriskLiving Ergonomic Mesh High-Back Office Chair',
    description: 'Adjustable lumbar support, 3D armrests, breathable mesh back, and heavy-duty synchronized tilt mechanism.',
    price: 15990,
    stock: 12,
    rating: 4.5,
    numReviews: 340,
    images: ['https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'home',
    category: { id: 'home', name: 'Home & Living', slug: 'home' },
  },
  {
    id: 'home-10',
    name: 'Philips Hue White & Color Ambiance Starter Kit (4 Bulbs)',
    description: 'Transform your home lighting with 16 million colors and smart control via Hue Bridge and voice assistants.',
    price: 16999,
    stock: 15,
    rating: 4.7,
    numReviews: 260,
    images: ['https://images.unsplash.com/photo-1550985616-10810253b84d?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'home',
    category: { id: 'home', name: 'Home & Living', slug: 'home' },
  },
  {
    id: 'home-11',
    name: 'Breville Smart Oven Air Fryer Pro',
    description: 'Versatile countertop oven with Element iQ system for precision roasting, baking, dehydrating, and air frying.',
    price: 36990,
    stock: 6,
    rating: 4.8,
    numReviews: 195,
    images: ['https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'home',
    category: { id: 'home', name: 'Home & Living', slug: 'home' },
  },
  {
    id: 'home-12',
    name: 'Vitamix E310 Explorian Blender (48 oz Container)',
    description: 'Professional-grade high-performance blender with variable speed control and laser-cut hardened stainless blades.',
    price: 39990,
    stock: 8,
    rating: 4.9,
    numReviews: 380,
    images: ['https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'home',
    category: { id: 'home', name: 'Home & Living', slug: 'home' },
  },
  {
    id: 'home-13',
    name: 'Dyson Purifier Cool Gen1 Air Purifier & Fan',
    description: 'HEPA H13 filter captures 99.97% of particles as small as 0.3 microns. Purifies room air while cooling you down.',
    price: 32900,
    stock: 11,
    rating: 4.7,
    numReviews: 140,
    images: ['https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'home',
    category: { id: 'home', name: 'Home & Living', slug: 'home' },
  },
  {
    id: 'home-14',
    name: 'Staub Cast Iron Round Cocotte 4 Quart (Cherry)',
    description: 'Heavy lid retains moisture with spikes continuous basting food evenly for rich flavorful braises.',
    price: 24990,
    stock: 5,
    rating: 4.9,
    numReviews: 92,
    images: ['https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'home',
    category: { id: 'home', name: 'Home & Living', slug: 'home' },
  },
  {
    id: 'home-15',
    name: 'Sonos Era 100 Smart Wireless Speaker (Black)',
    description: 'Next-gen compact acoustic speaker with stereo sound, rich bass, Wi-Fi 6, Bluetooth, and Trueplay tuning.',
    price: 24990,
    stock: 16,
    rating: 4.8,
    numReviews: 170,
    images: ['https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'home',
    category: { id: 'home', name: 'Home & Living', slug: 'home' },
  },
  {
    id: 'home-16',
    name: 'BALMUDA The Toaster Steam Oven',
    description: 'Japanese engineered toaster utilizing steam technology and digital temperature control for bakery fresh bread.',
    price: 29990,
    stock: 4,
    rating: 4.8,
    numReviews: 65,
    images: ['https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'home',
    category: { id: 'home', name: 'Home & Living', slug: 'home' },
  },
  {
    id: 'home-17',
    name: 'SodaStream Art Sparkling Water Maker',
    description: 'Retro design with mechanical carbonating lever, quick connect CO2 cylinder, and dishwasher safe bottles.',
    price: 11990,
    stock: 18,
    rating: 4.6,
    numReviews: 230,
    images: ['https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'home',
    category: { id: 'home', name: 'Home & Living', slug: 'home' },
  },
  {
    id: 'home-18',
    name: 'Cosori Custom Dual Blaze 6.8-Quart Air Fryer',
    description: 'Dual heating elements top & bottom elimination preheating or shaking required for crisp even cooking.',
    price: 14990,
    stock: 22,
    rating: 4.7,
    numReviews: 310,
    images: ['https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'home',
    category: { id: 'home', name: 'Home & Living', slug: 'home' },
  },
  {
    id: 'home-19',
    name: 'Anker Eufy Security Video Doorbell Dual Camera',
    description: 'Dual camera technology eliminates blind spots with 2K HD resolution and local storage no monthly fee.',
    price: 17990,
    stock: 13,
    rating: 4.6,
    numReviews: 145,
    images: ['https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'home',
    category: { id: 'home', name: 'Home & Living', slug: 'home' },
  },
  {
    id: 'home-20',
    name: 'Fellow Stagg EKG Electric Gooseneck Kettle 0.9L',
    description: 'Variable temperature control, precision pour spout, built-in stopwatch, and minimalist stainless steel body.',
    price: 16990,
    stock: 15,
    rating: 4.9,
    numReviews: 285,
    images: ['https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'home',
    category: { id: 'home', name: 'Home & Living', slug: 'home' },
  },

  // -------------------------------------------------------------
  // BEAUTY & PERSONAL CARE (20 Products)
  // -------------------------------------------------------------
  {
    id: 'bt-1',
    name: 'Dyson Airwrap Multi-Styler Complete Long',
    description: 'Style your hair with Airwrap technology. Harnesses the Coanda effect to curl, shape, and hide flyaways without extreme heat.',
    price: 49900,
    stock: 6,
    rating: 4.9,
    numReviews: 312,
    images: ['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'beauty',
    category: { id: 'beauty', name: 'Beauty & Personal Care', slug: 'beauty' },
  },
  {
    id: 'bt-2',
    name: 'Estée Lauder Advanced Night Repair Serum 50ml',
    description: 'Patented Chronolux Power Signal Technology reduces the appearance of multiple signs of aging caused by environmental stress.',
    price: 9500,
    stock: 25,
    rating: 4.8,
    numReviews: 640,
    images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'beauty',
    category: { id: 'beauty', name: 'Beauty & Personal Care', slug: 'beauty' },
  },
  {
    id: 'bt-3',
    name: 'La Mer Crème de la Mer Moisturizing Cream 60ml',
    description: 'Legendary cell-renewing Miracle Broth infuses skin with deep moisture for a soothing radiant glow.',
    price: 34500,
    stock: 4,
    rating: 4.9,
    numReviews: 185,
    images: ['https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'beauty',
    category: { id: 'beauty', name: 'Beauty & Personal Care', slug: 'beauty' },
  },
  {
    id: 'bt-4',
    name: 'Channel Bleu de Chanel Eau de Parfum Spray 100ml',
    description: 'A aromatic-woody fragrance with amber and musky notes. A tribute to masculine freedom.',
    price: 14800,
    stock: 14,
    rating: 4.9,
    numReviews: 890,
    images: ['https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'beauty',
    category: { id: 'beauty', name: 'Beauty & Personal Care', slug: 'beauty' },
  },
  {
    id: 'bt-5',
    name: 'Olaplex No. 3 Hair Perfector Repairing Treatment 100ml',
    description: 'At-home bond-building treatment proven to reduce breakage and visibly strengthen all hair types.',
    price: 2950,
    stock: 40,
    rating: 4.7,
    numReviews: 1250,
    images: ['https://images.unsplash.com/photo-1608248597260-657d0543a512?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'beauty',
    category: { id: 'beauty', name: 'Beauty & Personal Care', slug: 'beauty' },
  },
  {
    id: 'bt-6',
    name: 'Dior Sauvage Eau de Parfum Spray 100ml',
    description: 'Notes of Calabrian bergamot and Papua New Guinean vanilla absolute unleash a powerful woody trail.',
    price: 13500,
    stock: 18,
    rating: 4.8,
    numReviews: 1100,
    images: ['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'beauty',
    category: { id: 'beauty', name: 'Beauty & Personal Care', slug: 'beauty' },
  },
  {
    id: 'bt-7',
    name: 'SK-II Facial Treatment Essence (Pitera Essence) 230ml',
    description: 'Iconic essence formulation composed of 90% Pitera to transform skin tone, texture, and clarity.',
    price: 18900,
    stock: 8,
    rating: 4.8,
    numReviews: 410,
    images: ['https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'beauty',
    category: { id: 'beauty', name: 'Beauty & Personal Care', slug: 'beauty' },
  },
  {
    id: 'bt-8',
    name: 'Waterpik Aquarius Professional Water Flosser',
    description: 'Advanced water flossing technology removing up to 99.9% of plaque from treated areas with 10 pressure settings.',
    price: 7990,
    stock: 22,
    rating: 4.7,
    numReviews: 780,
    images: ['https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'beauty',
    category: { id: 'beauty', name: 'Beauty & Personal Care', slug: 'beauty' },
  },
  {
    id: 'bt-9',
    name: 'Oral-B iO Series 9 Electric Toothbrush with Rose Quartz Case',
    description: 'Revolutionary magnetic iO technology combining micro-vibrating bristles with 3D teeth tracking AI.',
    price: 24990,
    stock: 10,
    rating: 4.8,
    numReviews: 290,
    images: ['https://images.unsplash.com/photo-1553775282-20af80779df7?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'beauty',
    category: { id: 'beauty', name: 'Beauty & Personal Care', slug: 'beauty' },
  },
  {
    id: 'bt-10',
    name: 'CeraVe Hydrating Facial Cleanser 473ml',
    description: 'Non-foaming lotion cleanser with 3 essential ceramides and hyaluronic acid for normal to dry skin.',
    price: 1650,
    stock: 60,
    rating: 4.8,
    numReviews: 2300,
    images: ['https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'beauty',
    category: { id: 'beauty', name: 'Beauty & Personal Care', slug: 'beauty' },
  },
  {
    id: 'bt-11',
    name: 'Dyson Supersonic Hair Dryer (Iron/Fuchsia)',
    description: 'Fast drying with intelligent heat control to protect hair natural shine and shield against extreme heat damage.',
    price: 34900,
    stock: 9,
    rating: 4.9,
    numReviews: 480,
    images: ['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'beauty',
    category: { id: 'beauty', name: 'Beauty & Personal Care', slug: 'beauty' },
  },
  {
    id: 'bt-12',
    name: 'Maison Francis Kurkdjian Baccarat Rouge 540 EDP 70ml',
    description: 'A poetic alchemy of breezy jasmine, radiant saffron, and ambergris mineral facets.',
    price: 29500,
    stock: 5,
    rating: 4.9,
    numReviews: 520,
    images: ['https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'beauty',
    category: { id: 'beauty', name: 'Beauty & Personal Care', slug: 'beauty' },
  },
  {
    id: 'bt-13',
    name: "Kiehl's Ultra Facial Cream 125ml",
    description: '24-hour lightweight hydrating moisturizer enriched with Squalane and Glacial Glycoprotein.',
    price: 5200,
    stock: 30,
    rating: 4.7,
    numReviews: 690,
    images: ['https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'beauty',
    category: { id: 'beauty', name: 'Beauty & Personal Care', slug: 'beauty' },
  },
  {
    id: 'bt-14',
    name: 'Sol de Janeiro Brazilian Bum Bum Cream 240ml',
    description: 'Fast-absorbing body cream infused with caffeine-rich Guaraná extract to visibly tighten skin appearance.',
    price: 4500,
    stock: 35,
    rating: 4.8,
    numReviews: 940,
    images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'beauty',
    category: { id: 'beauty', name: 'Beauty & Personal Care', slug: 'beauty' },
  },
  {
    id: 'bt-15',
    name: 'Philips Norelco Shaver 9000 Prestige Wet & Dry',
    description: 'Ultimate closeness and comfort with NanoTech precision blades and Hydro SkinGlide coating.',
    price: 22990,
    stock: 12,
    rating: 4.7,
    numReviews: 180,
    images: ['https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'beauty',
    category: { id: 'beauty', name: 'Beauty & Personal Care', slug: 'beauty' },
  },
  {
    id: 'bt-16',
    name: 'Laneige Lip Sleeping Mask Berry 20g',
    description: 'Nourishing leave-on lip mask enriched with Berry Mix Complex and Vitamin C for smooth supple lips.',
    price: 1750,
    stock: 50,
    rating: 4.8,
    numReviews: 1850,
    images: ['https://images.unsplash.com/photo-1608248597260-657d0543a512?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'beauty',
    category: { id: 'beauty', name: 'Beauty & Personal Care', slug: 'beauty' },
  },
  {
    id: 'bt-17',
    name: 'The Ordinary Niacinamide 10% + Zinc 1% High-Strength Serum 60ml',
    description: 'Water-based serum that boosts skin radiance, improves smoothness, and reinforces skin barrier.',
    price: 1100,
    stock: 80,
    rating: 4.6,
    numReviews: 3400,
    images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'beauty',
    category: { id: 'beauty', name: 'Beauty & Personal Care', slug: 'beauty' },
  },
  {
    id: 'bt-18',
    name: 'FOREO LUNA 4 Smart Facial Cleansing & Firming Massager',
    description: 'Ultra-hygienic soft silicone T-Sonic facial brush delivering deep cleansing and targeted anti-aging massage.',
    price: 21900,
    stock: 7,
    rating: 4.7,
    numReviews: 135,
    images: ['https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'beauty',
    category: { id: 'beauty', name: 'Beauty & Personal Care', slug: 'beauty' },
  },
  {
    id: 'bt-19',
    name: 'Charlotte Tilbury Magic Cream Moisturizer 50ml',
    description: 'Award-winning instant turnaround moisturizer infused with Bionymph Peptide and Hyaluronic Acid.',
    price: 8900,
    stock: 16,
    rating: 4.8,
    numReviews: 470,
    images: ['https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'beauty',
    category: { id: 'beauty', name: 'Beauty & Personal Care', slug: 'beauty' },
  },
  {
    id: 'bt-20',
    name: 'Tom Ford Oud Wood Eau de Parfum 50ml',
    description: 'Rare exotic Oud wood combined with rosewood, cardamom, and amber for a warm smoky fragrance.',
    price: 22500,
    stock: 9,
    rating: 4.9,
    numReviews: 360,
    images: ['https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80'],
    categoryId: 'beauty',
    category: { id: 'beauty', name: 'Beauty & Personal Care', slug: 'beauty' },
  },
];

const getFilteredFallbackProducts = (req: Request) => {
  const { category, search, minPrice, maxPrice } = req.query;
  return fallbackProducts.filter((p) => {
    if (category && category !== 'all' && p.categoryId !== String(category)) return false;
    if (search && !p.name.toLowerCase().includes(String(search).toLowerCase())) return false;
    if (minPrice && p.price < Number(minPrice)) return false;
    if (maxPrice && p.price > Number(maxPrice)) return false;
    return true;
  });
};

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
      const list = getFilteredFallbackProducts(req);
      res.status(200).json({ status: 'success', results: list.length, data: { products: list } });
    }
  } catch (error: any) {
    const list = getFilteredFallbackProducts(req);
    res.status(200).json({ status: 'success', results: list.length, data: { products: list } });
  }
});


// GET /api/products/:id - Get single product by ID
router.get('/products/:id', async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    try {
      const product = await prisma.product.findUnique({
        where: { id },
        include: { category: true, reviews: { include: { user: { select: { name: true } } } } },
      });

      if (product) {
        return res.status(200).json({ status: 'success', data: { product } });
      }
    } catch {
      // Fallback
    }

    const fallbackProduct = fallbackProducts.find((p) => p.id === id);
    if (fallbackProduct) {
      return res.status(200).json({ status: 'success', data: { product: { ...fallbackProduct, reviews: [] } } });
    }

    res.status(404).json({ status: 'error', message: 'Product not found' });
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

