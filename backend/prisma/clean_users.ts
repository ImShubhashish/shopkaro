import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cleanUsers() {
  console.log('🧹 Clearing all users, wishlists, orders, and reviews...');
  try {
    await prisma.wishlist.deleteMany({});
    await prisma.orderItem.deleteMany({});
    await prisma.order.deleteMany({});
    await prisma.review.deleteMany({});
    await prisma.user.deleteMany({});
    console.log('✨ All user credential records and wishlist data deleted successfully!');
  } catch (error) {
    console.error('Error clearing users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

cleanUsers();
