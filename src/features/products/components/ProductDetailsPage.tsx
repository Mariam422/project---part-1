"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import { ProductDetails } from "@/features/products/components/ProductDetails";
import { ProductImages } from "@/features/products/components/ProductImages";
import { ProductOptions } from "@/features/products/components/ProductOptions";
import { useProduct } from "@/features/products/hooks/useProduct";
import type { Product } from "@/features/products/types/product.types";

export type ProductDetailsActionsContext = {
  product: Product;
  selectedOptions: Record<string, string>;
};

type ProductDetailsPageProps = {
  productId: string;
  actions?: (context: ProductDetailsActionsContext) => ReactNode;
};

export function ProductDetailsPage({
  productId,
  actions,
}: ProductDetailsPageProps) {
  const productQuery = useProduct(productId);
  const product = productQuery.data;
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});
  const [quantity, setQuantity] = useState(1);

  const resolvedOptions = useMemo(() => {
    if (!product) {
      return selectedOptions;
    }

    return Object.fromEntries(
      product.options.map((option) => [
        option.id,
        selectedOptions[option.id] ?? option.values[0],
      ]),
    );
  }, [product, selectedOptions]);

  if (productQuery.isLoading) {
    return <p className="text-sm text-zinc-600">Loading product...</p>;
  }

  if (!product) {
    return <p className="text-sm text-zinc-600">Product not found.</p>;
  }

  return (
    <div className="bg-[#faf8f5]">
      <div className="flex items-center gap-2 px-4 py-5 text-[10px] text-[#605a54] sm:px-6 lg:px-20">
        <Link href="/">Home</Link><span>/</span><Link href="/products">Shop</Link><span>/</span><span>Fragrances</span><span>/</span><strong className="text-[#1a1a1a]">{product.name}</strong>
      </div>
      <section className="grid gap-10 px-4 pb-20 sm:px-6 md:px-10 lg:grid-cols-[minmax(0,1fr)_560px] lg:gap-16 lg:px-20">
        <ProductImages product={product} />
        <div className="space-y-8">
        <ProductDetails product={product} />
        <ProductOptions
          product={product}
          selectedOptions={resolvedOptions}
          onChange={(optionId, value) =>
            setSelectedOptions((current) => ({
              ...current,
              [optionId]: value,
            }))
          }
        />
          <div className="flex items-center justify-between gap-4 rounded-md bg-[#f4f0eb] p-5">
            <div><p className="text-xs font-semibold">Complimentary Signature Gift Wrapping</p><p className="mt-1 text-[10px] text-[#605a54]">Encased in linen paper box with custom wax seal stamp.</p></div>
            <span className="h-5 w-10 rounded-full bg-[#c5a880] p-0.5"><span className="ml-auto block h-4 w-4 rounded-full bg-white" /></span>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center gap-4 rounded border border-[#ebe6de] px-4 py-3 text-sm"><button type="button" aria-label="Decrease quantity" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button><span>{quantity}</span><button type="button" aria-label="Increase quantity" onClick={() => setQuantity(quantity + 1)}>+</button></div>
            <div className="flex-1 [&_button]:w-full [&_button]:rounded [&_button]:bg-[#1a1a1a] [&_button]:px-4 [&_button]:py-4 [&_button]:text-xs [&_button]:font-bold [&_button]:uppercase [&_button]:text-white">{actions?.({ product, selectedOptions: resolvedOptions })}</div>
          </div>
        </div>
      </section>
      <section className="bg-[#f4f0eb] px-4 py-20 sm:px-6 lg:px-20">
        <div className="mb-12 text-center"><h2 className="font-serif text-4xl">Olfactory Companions</h2><p className="mt-2 text-[10px] uppercase tracking-wide text-[#605a54]">Fragrances of synonymous sophistication</p></div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["fleur-de-lune", "Fleur de Lune", "$195", "/images/products/fleur-de-lune.png", "Floral / Jasmine & White Musk"],
            ["noir-cocoon", "Noir Cocoon", "$240", "/images/products/noir-cocoon.png", "Oriental / Tobacco & Amber"],
            ["sol-dor", "Sol d'Or", "$185", "/images/products/sol-dor.png", "Fresh / Bergamot & Sea Salt"],
            ["rose-absolute", "Rose Absolute", "$205", "/images/products/rose-absolute.png", "Floral / Damask Rose & Cedar"],
          ].map(([id, name, price, image, notes]) => (
            <Link key={id} href={`/products/${id}`} className="rounded-lg bg-white p-4"><div className="relative aspect-[0.9] overflow-hidden rounded bg-[#ebe6de]"><Image src={image} alt={name} fill className="object-cover" sizes="25vw" /></div><div className="mt-4 flex items-start justify-between gap-3"><div><h3 className="font-serif text-xl">{name}</h3><p className="mt-1 text-[9px] uppercase text-[#c5a880]">{notes}</p></div><span className="text-xs font-semibold">{price}</span></div><span className="mt-4 block rounded border border-[#ebe6de] py-3 text-center text-[9px] font-semibold uppercase">Add to cart +</span></Link>
          ))}
        </div>
      </section>
    </div>
  );
}
