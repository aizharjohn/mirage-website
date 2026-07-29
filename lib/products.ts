import type { Product } from "@/types/product";

export const SEED_PRODUCTS: Product[] = [
  {
    slug: "noir-oud",
    name: "Noir Oud",
    type: "Eau de Parfum",
    price: 89,
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80",
    category: "fragrances",
    gender: "unisex",
    badge: "BEST SELLER",
    rating: 5,
    reviewCount: 128,
    description:
      "A deep, smoky oud wrapped in warm amber and dark woods. Bold enough for night, refined enough for every day.",
    notes: ["Oud", "Amber", "Sandalwood", "Black Pepper"],
    stock: 42,
    featured: true,
  },
  {
    slug: "rose-lumiere",
    name: "Rose Lumière",
    type: "Eau de Parfum",
    price: 79,
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80",
    category: "fragrances",
    gender: "her",
    badge: "NEW",
    rating: 5,
    reviewCount: 64,
    description:
      "Luminous rose petals meet soft musk and a whisper of citrus — luminous, romantic, unforgettable.",
    notes: ["Damask Rose", "Bergamot", "White Musk", "Peony"],
    stock: 55,
    featured: true,
  },
  {
    slug: "santal-blanc",
    name: "Santal Blanc",
    type: "Eau de Parfum",
    price: 85,
    image:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80",
    category: "fragrances",
    gender: "unisex",
    badge: "BEST SELLER",
    rating: 5,
    reviewCount: 96,
    description:
      "Creamy sandalwood softened by vanilla and iris. A modern classic with quiet confidence.",
    notes: ["Sandalwood", "Vanilla", "Iris", "Cedar"],
    stock: 38,
    featured: true,
  },
  {
    slug: "bleu-intense",
    name: "Bleu Intense",
    type: "Eau de Parfum",
    price: 88,
    image:
      "https://images.unsplash.com/photo-1588405748880-12d1d2a52d75?w=800&q=80",
    category: "fragrances",
    gender: "him",
    badge: "BEST SELLER",
    rating: 4,
    reviewCount: 112,
    description:
      "Fresh aquatic notes grounded by vetiver and incense. Clean, sharp, and endlessly wearable.",
    notes: ["Bergamot", "Sea Accords", "Vetiver", "Incense"],
    stock: 47,
    featured: true,
  },
  {
    slug: "ambre-royale",
    name: "Ambre Royale",
    type: "Eau de Parfum",
    price: 90,
    image:
      "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=800&q=80",
    category: "fragrances",
    gender: "unisex",
    badge: "NEW",
    rating: 5,
    reviewCount: 41,
    description:
      "Resinous amber layered with honey and labdanum. Opulent warmth that lingers for hours.",
    notes: ["Amber", "Honey", "Labdanum", "Benzoin"],
    stock: 29,
    featured: true,
  },
  {
    slug: "velvet-orchid",
    name: "Velvet Orchid",
    type: "Eau de Parfum",
    price: 82,
    image:
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=800&q=80",
    category: "fragrances",
    gender: "her",
    rating: 5,
    reviewCount: 73,
    description:
      "Exotic orchid and plum over a soft suede base. Sensual without being loud.",
    notes: ["Orchid", "Plum", "Suede", "Tonka"],
    stock: 33,
    featured: false,
  },
  {
    slug: "cedar-noir",
    name: "Cedar Noir",
    type: "Eau de Toilette",
    price: 72,
    image:
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&q=80",
    category: "fragrances",
    gender: "him",
    rating: 4,
    reviewCount: 58,
    description:
      "Smoked cedar and leather with a cool mint opening. Understated and masculine.",
    notes: ["Mint", "Cedar", "Leather", "Tobacco"],
    stock: 40,
    featured: false,
  },
  {
    slug: "citrus-soleil",
    name: "Citrus Soleil",
    type: "Eau de Toilette",
    price: 68,
    image:
      "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800&q=80",
    category: "new-arrivals",
    gender: "unisex",
    badge: "NEW",
    rating: 5,
    reviewCount: 22,
    description:
      "Sun-bright citrus and green tea. The scent of a late-afternoon terrace.",
    notes: ["Lemon", "Neroli", "Green Tea", "White Woods"],
    stock: 60,
    featured: false,
  },
  {
    slug: "mirage-trio",
    name: "Mirage Trio Gift Set",
    type: "Gift Set",
    price: 149,
    compareAtPrice: 175,
    image:
      "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800&q=80",
    category: "gift-sets",
    gender: "unisex",
    badge: "SALE",
    rating: 5,
    reviewCount: 35,
    description:
      "Three 30ml favorites — Noir Oud, Rose Lumière, and Santal Blanc — curated for gifting.",
    notes: ["Oud", "Rose", "Sandalwood"],
    stock: 25,
    featured: false,
  },
  {
    slug: "her-collection",
    name: "For Her Collection",
    type: "Gift Set",
    price: 165,
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80",
    category: "gift-sets",
    gender: "her",
    rating: 5,
    reviewCount: 19,
    description:
      "A trio of feminine signatures: Rose Lumière, Velvet Orchid, and a travel atomizer.",
    notes: ["Rose", "Orchid", "Musk"],
    stock: 18,
    featured: false,
  },
  {
    slug: "him-collection",
    name: "For Him Collection",
    type: "Gift Set",
    price: 165,
    image:
      "https://images.unsplash.com/photo-1588405748880-12d1d2a52d75?w=800&q=80",
    category: "gift-sets",
    gender: "him",
    rating: 5,
    reviewCount: 17,
    description:
      "Bleu Intense, Cedar Noir, and a leather travel case — ready to gift.",
    notes: ["Vetiver", "Cedar", "Leather"],
    stock: 16,
    featured: false,
  },
  {
    slug: "atelier-exclusive",
    name: "Atelier Exclusive",
    type: "Extrait de Parfum",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80",
    category: "collections",
    gender: "unisex",
    badge: "NEW",
    rating: 5,
    reviewCount: 12,
    description:
      "Our limited atelier extract — concentrated, intimate, and made in small batches.",
    notes: ["Saffron", "Oud", "Rose Absolute", "Mysore Sandalwood"],
    stock: 10,
    featured: false,
  },
];

export function filterProducts(
  products: Product[],
  params: {
    category?: string;
    gender?: string;
    badge?: string;
    featured?: boolean;
  },
) {
  return products.filter((p) => {
    if (params.featured && !p.featured) return false;
    if (params.category && p.category !== params.category) return false;
    if (params.gender && p.gender !== params.gender && p.gender !== "unisex")
      return false;
    if (params.badge && p.badge !== params.badge) return false;
    return true;
  });
}

export function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}
