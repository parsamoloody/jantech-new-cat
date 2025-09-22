import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

type ProductTranslation = {
  name: string;
  description: string;
  category: string;
  price: string;
  score: string;
  image: string;
  features: { id: string; key: string; value: string }[];
  detailContent: string;
};

type Product = {
  _id: string;
  ar: ProductTranslation;
  en: ProductTranslation;
  ru: ProductTranslation;
  tr: ProductTranslation;
  fa: ProductTranslation;
} | null;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lang = searchParams.get("lang") || "en";
  const category = searchParams.get("category");
  const id = searchParams.get("id");
  // Load products.json
  const filePath = path.join(process.cwd(), "src", "app", "__db__", "products.json");
  const fileData = fs.readFileSync(filePath, "utf-8");
  const products: Product[] = JSON.parse(fileData);

  let filteredProducts = products;
  if (category) {
    filteredProducts = filteredProducts.filter(
      (p) => (p as any)[lang]?.category === category
    );
  }

  if (id) {
    filteredProducts = filteredProducts.filter((p) => (p as any)._id === id);
  }

  if (!id && category) {
    filteredProducts = filteredProducts.filter((p) => (p as any)[lang]?.category === category);
  } if (id && category) {
    filteredProducts = filteredProducts.filter((p) => (p as any)[lang]?.category === category).filter((p) => (p as any)._id === id);
  }

  const result = filteredProducts.map((p) => ({
    _id: p?._id,
    ...(p as any)[lang],
  }));

  return NextResponse.json(result);
}
