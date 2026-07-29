import mongoose, { Schema, models, model } from "mongoose";
import type { ProductBadge, ProductCategory, ProductGender } from "@/types/product";

export interface IProduct {
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

const ProductSchema = new Schema<IProduct>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    compareAtPrice: Number,
    image: { type: String, required: true },
    category: {
      type: String,
      enum: ["fragrances", "gift-sets", "collections", "new-arrivals"],
      required: true,
    },
    gender: {
      type: String,
      enum: ["her", "him", "unisex"],
      required: true,
    },
    badge: {
      type: String,
      enum: ["BEST SELLER", "NEW", "SALE"],
    },
    rating: { type: Number, default: 5 },
    reviewCount: { type: Number, default: 0 },
    description: { type: String, required: true },
    notes: [{ type: String }],
    stock: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const ProductModel =
  models.Product || model<IProduct>("Product", ProductSchema);
