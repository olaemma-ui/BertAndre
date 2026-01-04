import { Client } from 'pg';
import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load .env.local manually since we're running a standalone script
const envConfig = dotenv.parse(fs.readFileSync(path.resolve(process.cwd(), '.env.local')));
for (const k in envConfig) {
    process.env[k] = envConfig[k];
}

async function migrate() {
    // Try to find a postgres connection string
    const connectionString =
        process.env.POSTGRES_URL ||
        process.env.DATABASE_URL ||
        process.env.SUPABASE_DB_URL; // common alternative names

    if (!connectionString) {
        console.error("❌ No POSTGRES_URL or DATABASE_URL found in .env.local");
        // Check if we have Supabase URL and Key, maybe we can't use pg directly but normally
        // Supabase provides a direct connection string in settings.
        // If the user has only REST URL, we can't run DDL via pg client easily without the connection string.
        // Let's print what we have to debug (masking secrets).
        console.log("Available Env Vars:", Object.keys(process.env).filter(k => !k.includes('KEY') && !k.includes('SECRET')));
        process.exit(1);
    }

    const client = new Client({
        connectionString: connectionString,
        ssl: { rejectUnauthorized: false } // Required for Supabase/Neon usually
    });

    try {
        await client.connect();
        console.log("✅ Connected to database.");

        const queries = [
            `ALTER TABLE projects ADD COLUMN IF NOT EXISTS icon_url TEXT;`,
            `ALTER TABLE projects ADD COLUMN IF NOT EXISTS seo_title TEXT;`,
            `ALTER TABLE projects ADD COLUMN IF NOT EXISTS seo_description TEXT;`,
            `ALTER TABLE blogs ADD COLUMN IF NOT EXISTS seo_title TEXT;`,
            `ALTER TABLE blogs ADD COLUMN IF NOT EXISTS seo_description TEXT;`,
            `CREATE TABLE IF NOT EXISTS contact_messages (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                service_type VARCHAR(255),
                message TEXT NOT NULL,
                status VARCHAR(50) DEFAULT 'unread',
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );`,
            `CREATE TABLE IF NOT EXISTS site_settings (
                id SERIAL PRIMARY KEY,
                key VARCHAR(255) UNIQUE NOT NULL,
                value TEXT,
                description TEXT,
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );`
        ];

        for (const query of queries) {
            console.log(`Executing: ${query}`);
            await client.query(query);
        }

        console.log("✅ Schema migration completed successfully.");
    } catch (err) {
        console.error("❌ Migration failed:", err);
    } finally {
        await client.end();
    }
}

migrate();
