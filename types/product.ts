export type ProductBadge = "BEST SELLER" | "NEW" | "SALE";
export type ProductGender = "her" | "him" | "unisex";
export type ProductCategory =
  | "fragrances"
  | "gift-sets"
  | "collections"
  | "new-arrivals";

export interface Product {
  slug: string;
  name: string;
  type: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  category: ProductCategory;
  gender: ProductGender;
  badge?: ProductBadge;
  rating: number;
  reviewCount: number;
  description: string;
  notes: string[];
  stock: number;
  featured: boolean;
}

export interface CartItem {
  slug: string;
  quantity: number;
}
