const { Client } = require('pg');
const dotenv = require('dotenv');
const path = require('path');

// Load Strapi env
dotenv.config({ path: path.join(__dirname, '../../../../strapi-cms/.env') });

async function checkDatabase() {
  const client = new Client({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
  });

  try {
    await client.connect();
    console.log(`Connected to database: ${process.env.DATABASE_NAME} on ${process.env.DATABASE_HOST}`);

    const tables = ['categories', 'authors', 'articles', 'comments', 'files'];
    
    for (const table of tables) {
      try {
        // Strapi 5 uses plural names for tables usually, but let's check
        const res = await client.query(`SELECT COUNT(*) FROM ${table}`);
        console.log(`Table "${table}": ${res.rows[0].count} rows`);
      } catch (e) {
        // Try with singular if plural fails
        try {
          const singularTable = table.slice(0, -1);
          const res = await client.query(`SELECT COUNT(*) FROM ${singularTable}`);
          console.log(`Table "${singularTable}": ${res.rows[0].count} rows`);
        } catch (e2) {
          console.log(`Table "${table}" or "${table.slice(0, -1)}" not found.`);
        }
      }
    }

    // Check for recent entries in authors
    try {
      const recentAuthors = await client.query('SELECT name, "original_id", "document_id" FROM authors ORDER BY id DESC LIMIT 5');
      console.log('\nRecent Authors:');
      console.table(recentAuthors.rows);
    } catch (e) {}

  } catch (err) {
    console.error('Database connection error:', err.stack);
  } finally {
    await client.end();
  }
}

checkDatabase();
