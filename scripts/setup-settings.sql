-- RUN THIS IN YOUR SUPABASE SQL EDITOR --

-- Create the site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
    id SERIAL PRIMARY KEY,
    key VARCHAR(255) UNIQUE NOT NULL,
    value TEXT,
    description TEXT,
    updated_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Seed with initial contact information
INSERT INTO
    site_settings (key, value, description)
VALUES (
        'contact_email',
        'info@bertandreconsulting.com',
        'Primary contact email address'
    ),
    (
        'contact_phone',
        '0201 330 0667',
        'Primary contact phone number'
    ),
    (
        'contact_address_ng',
        '20 Awudu epheka, Lekki Phase 1, Lagos, Nigeria',
        'Nigeria office physical address'
    ),
    (
        'contact_address_us',
        'US: 8 The Green Suite 4000 Dover, DE 19901',
        'US office physical address'
    ),
    (
        'office_hours',
        'Mon–Fri | 8AM – 4PM (WAT)',
        'Standard operating hours'
    ) ON CONFLICT (key) DO NOTHING;