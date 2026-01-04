# BertAndre Consulting Website

A high-performance, dynamic website built for BertAndre Consulting. This platform features a custom-built Admin Dashboard (CMS), a dynamic project portfolio, an automated booking system, and a comprehensive blog engine.

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) primitives
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Media Storage**: [Cloudinary](https://cloudinary.com/)
- **Email Service**: [Nodemailer](https://nodemailer.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Forms**: React Hook Form + Zod

## ✨ Key Features

- **Admin Dashboard**: Full-featured CMS for managing:
  - **Projects**: Create and edit dynamic project portfolios with galleries and modules.
  - **Blogs**: Complete blog engine with rich text editing (Tiptap).
  - **Services**: Manage service offerings and features.
  - **Site Settings**: Real-time updates for contact info, office addresses (Nigeria & US), and office hours.
  - **Inquiries**: Manage specialized appointment bookings and contact messages.
- **Dynamic Search**: High-speed project and blog search functionality.
- **Automated Notifications**: Instant email alerts for new consultation bookings and inquiries.
- **Responsive UI**: Premium, mobile-first design with smooth micro-interactions.
- **Data Safety**: Direct Supabase integration for secure data handling.

## 🛠️ Getting Started

### 1. Prerequisite
- Node.js 18+ 
- Supabase account
- Cloudinary account
- SMTP credentials (for emails)

### 2. Environment Variables
Create a `.env.local` file in the root directory and add the following:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email
EMAIL_HOST=your_smtp_host
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your_email_user
EMAIL_PASS=your_email_password
ADMIN_EMAIL=recipient_email@example.com
```

### 3. Installation
```bash
npm install
```

### 4. Database Setup
Run the SQL content from `scripts/schema.sql` in your Supabase SQL Editor to create the necessary tables. You can also run the initialization script for settings:
```bash
# To test the database connection
npx tsx scripts/test-db.ts
```

### 5. Run the Application
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📂 Project Structure

- `app/`: Next.js App Router (Pages & API Routes)
- `components/`: Reusable React components
- `components/ui/`: Low-level UI primitives (buttons, inputs, etc.)
- `lib/`: Utility functions, database logic, and type definitions
- `scripts/`: Database migrations and test scripts
- `public/`: Static assets (images, icons)

## 📦 Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Compiles the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint for code quality checks.

## 📄 License
TBA
