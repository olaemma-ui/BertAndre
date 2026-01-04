export interface Service {
  title: string;
  slug: string;
  icon?: any; // SVG component or string
  description: string;
  detailedDescription: string;
  features: string[];
  image: string;
}

// Export empty array - data now comes from database via lib/db.ts
// This file is kept for interface compatibility only
export const services: Service[] = [];
