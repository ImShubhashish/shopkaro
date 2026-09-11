import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create Categories
  const electronics = await prisma.category.upsert({
    where: { slug: 'electronics' },
    update: {},
    create: { name: 'Electronics', slug: 'electronics' },
  });

  const fashion = await prisma.category.upsert({
    where: { slug: 'fashion' },
    update: {},
    create: { name: 'Fashion', slug: 'fashion' },
  });

  const home = await prisma.category.upsert({
    where: { slug: 'home' },
    update: {},
    create: { name: 'Home & Living', slug: 'home' },
  });

  const beauty = await prisma.category.upsert({
    where: { slug: 'beauty' },
    update: {},
    create: { name: 'Beauty & Personal Care', slug: 'beauty' },
  });

  // Seed Products
  const products = [
    {
      name: 'Sony WH-1000XM5 Wireless Noise-Canceling Headphones',
      description: 'Industry-leading noise canceling with two processors and eight microphones for unprecedented sound clarity.',
      price: 26990,
      stock: 12,
      rating: 4.8,
      numReviews: 245,
      images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'],
      categoryId: electronics.id,
    },
    {
      name: 'Apple Watch Series 9 GPS 45mm Midnight Aluminum',
      description: 'Advanced health sensors, Double Tap gesture control, and bright Always-On Retina display.',
      price: 41900,
      stock: 8,
      rating: 4.9,
      numReviews: 189,
      images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'],
      categoryId: electronics.id,
    },
    {
      name: 'Nike Air Max 270 React Running Shoes',
      description: 'Bold lifestyle shoe combining React foam cushioning with a large Max Air heel unit.',
      price: 11495,
      stock: 15,
      rating: 4.6,
      numReviews: 98,
      images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'],
      categoryId: fashion.id,
    },
    {
      name: 'DeLonghi Specialista Arte Espresso Coffee Machine',
      description: 'Compact bean-to-cup espresso machine with integrated grinder and manual steam wand.',
      price: 34990,
      stock: 5,
      rating: 4.7,
      numReviews: 76,
      images: ['https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80'],
      categoryId: home.id,
    },
    {
      name: 'Dyson Airwrap Multi-Styler Complete Long',
      description: 'Style your hair with Airwrap technology. Harnesses the Coanda effect to curl, shape, and hide flyaways without extreme heat.',
      price: 49900,
      stock: 6,
      rating: 4.9,
      numReviews: 312,
      images: ['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80'],
      categoryId: beauty.id,
    },
  ];

  for (const prod of products) {
    const existing = await prisma.product.findFirst({ where: { name: prod.name } });
    if (!existing) {
      await prisma.product.create({ data: prod });
    }
  }

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
