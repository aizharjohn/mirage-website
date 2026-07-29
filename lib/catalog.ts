import { connectDB, isMongoConfigured } from "@/lib/mongodb";
import { SEED_PRODUCTS, filterProducts } from "@/lib/products";
import { ProductModel } from "@/models/Product";
import type { Product } from "@/types/product";

function toProduct(doc: Record<string, unknown>): Product {
  return {
    slug: String(doc.slug),
    name: String(doc.name),
    type: String(doc.type),
    price: Number(doc.price),
    compareAtPrice: doc.compareAtPrice
      ? Number(doc.compareAtPrice)
      : undefined,
    image: String(doc.image),
    category: doc.category as Product["category"],
    gender: doc.gender as Product["gender"],
    badge: doc.badge as Product["badge"] | undefined,
    rating: Number(doc.rating ?? 5),
    reviewCount: Number(doc.reviewCount ?? 0),
    description: String(doc.description),
    notes: Array.isArray(doc.notes) ? (doc.notes as string[]) : [],
    stock: Number(doc.stock ?? 0),
    featured: Boolean(doc.featured),
  };
}

export async function getProducts(params: {
  category?: string;
  gender?: string;
  badge?: string;
  featured?: boolean;
} = {}): Promise<Product[]> {
  if (!isMongoConfigured()) {
    return filterProducts(SEED_PRODUCTS, params);
  }

  try {
    await connectDB();
    const query: Record<string, unknown> = {};
    if (params.featured) query.featured = true;
    if (params.category) query.category = params.category;
    if (params.gender) {
      query.gender = { $in: [params.gender, "unisex"] };
    }
    if (params.badge) query.badge = params.badge;

    const docs = await ProductModel.find(query).lean();
    if (!docs.length) {
      return filterProducts(SEED_PRODUCTS, params);
    }
    return docs.map((d) => toProduct(d as Record<string, unknown>));
  } catch {
    return filterProducts(SEED_PRODUCTS, params);
  }
}

export async function getProductBySlug(
  slug: string,
): Promise<Product | null> {
  if (!isMongoConfigured()) {
    return SEED_PRODUCTS.find((p) => p.slug === slug) ?? null;
  }

  try {
    await connectDB();
    const doc = await ProductModel.findOne({ slug }).lean();
    if (!doc) {
      return SEED_PRODUCTS.find((p) => p.slug === slug) ?? null;
    }
    return toProduct(doc as Record<string, unknown>);
  } catch {
    return SEED_PRODUCTS.find((p) => p.slug === slug) ?? null;
  }
}

export async function seedProducts() {
  if (!isMongoConfigured()) {
    return { seeded: false, count: SEED_PRODUCTS.length, mode: "memory" as const };
  }

  await connectDB();
  for (const product of SEED_PRODUCTS) {
    await ProductModel.findOneAndUpdate(
      { slug: product.slug },
      product,
      { upsert: true, new: true },
    );
  }

  return {
    seeded: true,
    count: SEED_PRODUCTS.length,
    mode: "mongodb" as const,
  };
}
