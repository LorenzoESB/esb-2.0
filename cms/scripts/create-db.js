const { Client } = require('pg');

const config = {
  user: 'admin_educando',
  password: 'Educando@2025',
  host: '136.248.90.42',
  port: 5432,
  database: 'strapi', // Connect to existing DB to create new one? Or connect to 'postgres'?
  // Usually 'postgres' is the default maintenance DB. But I might not have access.
  // Let's try connecting to 'strapi' first, and see if we can CREATE DATABASE.
  ssl: false, // Assuming no SSL based on URL, or maybe allow it.
};

async function createDb() {
  const client = new Client(config);
  try {
    await client.connect();
    console.log('Connected to strapi');
    
    // Check if 'strapi' db exists
    const res = await client.query("SELECT 1 FROM pg_database WHERE datname = 'strapi'");
    if (res.rowCount === 0) {
        console.log('Creating database strapi...');
        // CREATE DATABASE cannot run in a transaction block, so we might need to be careful if pg uses one by default (it doesn't usually).
        await client.query('CREATE DATABASE strapi');
        console.log('Database strapi created.');
    } else {
        console.log('Database strapi already exists.');
    }
  } catch (err) {
    console.error('Error creating database:', err);
    // If we can't connect to prod_esb, maybe try postgres?
    // But let's see the error first.
  } finally {
    await client.end();
  }
}

createDb();
