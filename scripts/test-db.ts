#!/usr/bin/env tsx
/**
 * Database connection test script for Supabase
 * Run with: npx tsx scripts/test-db.ts
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
    console.log('🔍 Testing Supabase connection...\n');

    try {
        // Test basic query
        const { data, error } = await supabase
            .from('projects')
            .select('count')
            .limit(1);

        if (error && error.code !== 'PGRST116') {
            // PGRST116 means table exists but is empty, which is fine
            throw error;
        }

        console.log('✅ Supabase connection successful!\n');

        // Check for tables
        console.log('🔍 Checking tables...\n');

        const tables = ['projects', 'services', 'blogs', 'admin_users'];
        const results: Array<{ table: string; exists: boolean; count?: number }> = [];

        for (const table of tables) {
            const { data, error, count } = await supabase
                .from(table)
                .select('*', { count: 'exact', head: true });

            if (error) {
                results.push({ table, exists: false });
            } else {
                results.push({ table, exists: true, count: count || 0 });
            }
        }

        console.log('📋 Table Status:');
        results.forEach(({ table, exists, count }) => {
            const status = exists ? `✅ ${table} (${count} rows)` : `❌ ${table} (not found)`;
            console.log(`   ${status}`);
        });

        const missingTables = results.filter(r => !r.exists);
        if (missingTables.length > 0) {
            console.log('\n⚠️  Some tables are missing. Run the schema.sql in Supabase SQL Editor.');
        } else {
            console.log('\n✅ All tables exist!');
        }

        console.log('\n✅ Connection test completed successfully!');
    } catch (error: any) {
        console.error('\n❌ Supabase connection failed!');
        console.error('Error:', error.message);
        console.error('\nPlease check:');
        console.error('  1. NEXT_PUBLIC_SUPABASE_URL is correctly set in .env.local');
        console.error('  2. NEXT_PUBLIC_SUPABASE_ANON_KEY is correctly set in .env.local');
        console.error('  3. Your Supabase project is active');
        console.error('  4. Schema has been migrated\n');
        process.exit(1);
    }
}

testConnection();
