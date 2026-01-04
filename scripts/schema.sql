-- Tables for Bertram Consulting

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    category VARCHAR(255) NOT NULL,
    image TEXT NOT NULL,
    description TEXT NOT NULL,
    detailed_description TEXT NOT NULL,
    external_link TEXT,
    ios_link TEXT,
    android_link TEXT,
    icon_url TEXT,
    seo_title TEXT,
    seo_description TEXT,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Project Modules Table
CREATE TABLE IF NOT EXISTS project_modules (
    id SERIAL PRIMARY KEY,
    project_slug VARCHAR(255) REFERENCES projects (slug) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    display_order INTEGER DEFAULT 0
);

-- Project Gallery Table
CREATE TABLE IF NOT EXISTS project_gallery (
    id SERIAL PRIMARY KEY,
    project_slug VARCHAR(255) REFERENCES projects (slug) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- 'image' or 'video'
    url TEXT NOT NULL,
    caption TEXT,
    display_order INTEGER DEFAULT 0
);

-- Services Table
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    icon TEXT, -- Component name or SVG string
    description TEXT NOT NULL,
    detailed_description TEXT NOT NULL,
    image TEXT NOT NULL,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Service Features Table
CREATE TABLE IF NOT EXISTS service_features (
    id SERIAL PRIMARY KEY,
    service_slug VARCHAR(255) REFERENCES services (slug) ON DELETE CASCADE,
    feature TEXT NOT NULL,
    display_order INTEGER DEFAULT 0
);

-- Blog Categories Table
CREATE TABLE IF NOT EXISTS blog_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Blogs Table
CREATE TABLE IF NOT EXISTS blogs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    seo_title TEXT,
    seo_description TEXT,
    author VARCHAR(255) NOT NULL,
    category VARCHAR(255),
    published_date TIMESTAMP
    WITH
        TIME ZONE,
        created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Admin Users Table for Authentication
CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP
    WITH
        TIME ZONE
);

-- Appointments Table
CREATE TABLE IF NOT EXISTS appointments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    service_type VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    preferred_timing VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (
        status IN (
            'pending',
            'confirmed',
            'completed',
            'cancelled'
        )
    ) NOT NULL,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects (slug);

CREATE INDEX IF NOT EXISTS idx_projects_category ON projects (category);

CREATE INDEX IF NOT EXISTS idx_services_slug ON services (slug);

CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs (slug);

CREATE INDEX IF NOT EXISTS idx_blogs_category ON blogs (category);

CREATE INDEX IF NOT EXISTS idx_blog_categories_slug ON blog_categories (slug);

CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users (email);

CREATE INDEX IF NOT EXISTS idx_appointments_email ON appointments (email);

CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments (status);

```