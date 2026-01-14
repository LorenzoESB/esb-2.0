import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

async function main() {
  const connectionString = process.env.DATABASE_URL;
  console.log('URL defined:', !!connectionString);
  const pool = new Pool({ connectionString });
  
  // Check search path
  const res = await pool.query('SHOW search_path');
  console.log('Search path:', res.rows[0]);

  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });
  
  try {
    await prisma.$connect();
    console.log('Connected!');
    // const users = await prisma.adminUser.findMany();
    // console.log('Users:', users);
  } catch (e) {
    console.error('Error:', e);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();
