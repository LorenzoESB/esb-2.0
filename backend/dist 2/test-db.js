"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const pg_1 = require("pg");
const dotenv = require("dotenv");
dotenv.config();
async function main() {
    const connectionString = process.env.DATABASE_URL;
    console.log('URL defined:', !!connectionString);
    const pool = new pg_1.Pool({ connectionString });
    const res = await pool.query('SHOW search_path');
    console.log('Search path:', res.rows[0]);
    const adapter = new adapter_pg_1.PrismaPg(pool);
    const prisma = new client_1.PrismaClient({ adapter });
    try {
        await prisma.$connect();
        console.log('Connected!');
    }
    catch (e) {
        console.error('Error:', e);
    }
    finally {
        await prisma.$disconnect();
        await pool.end();
    }
}
main();
//# sourceMappingURL=test-db.js.map