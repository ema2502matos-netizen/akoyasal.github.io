export type ProductCategory = 'all' | 'launch' | 'retail' | 'gourmet' | 'industrial';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  weight: string;
  category: 'launch' | 'retail' | 'gourmet' | 'industrial';
  categoryLabel: string;
  badge?: string;
  isLaunch: boolean;
  launchPriceAOA?: number;
  launchPriceUSD?: number;
  priceNote?: string;
  shortCopy: string;
  fullCopy: string;
  granulometry: string;
  iodineContent: string;
  recommendedUse: string;
  angolanDishPairing: {
    dishName: string;
    description: string;
    chefTip: string;
  };
  packaging: string;
  features: string[];
  image: string;
  backImage?: string;
}

export interface B2BQuoteRequest {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  province: string;
  businessType: 'distributor' | 'supermarket' | 'restaurant_hotel' | 'food_industry' | 'other';
  selectedProduct: string;
  estimatedVolumeKg: number;
  deliveryFrequency: 'one_time' | 'weekly' | 'biweekly' | 'monthly';
  notes?: string;
}

export interface Recipe {
  id: string;
  title: string;
  subtitle: string;
  prepTime: string;
  difficulty: 'Fácil' | 'Médio' | 'Elaborado';
  recommendedSalt: string;
  saltProductId: string;
  story: string;
  ingredients: string[];
  instructions: string[];
  chefTip: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  location: string;
  quote: string;
  metrics?: string;
  avatarInitials: string;
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  keyBenefit: string;
  image: string;
  technicalSpec?: string;
  location?: string;
}

export interface FacilityHotspot {
  x: number;
  y: number;
  title: string;
  detail: string;
}

export interface FacilityPhoto {
  id: string;
  title: string;
  subtitle: string;
  category: 'salinas' | 'fabrica' | 'pureza';
  categoryLabel: string;
  image: string;
  description: string;
  badge: string;
  hotspots?: FacilityHotspot[];
  technicalMetrics: { label: string; value: string }[];
}
