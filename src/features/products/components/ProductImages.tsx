"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/features/products/types/product.types";

type ProductImagesProps = {
  product: Product;
};

/** US-04: product image gallery. */
export function ProductImages({ product }: ProductImagesProps) {
  const images = product.id === "santal-parchment"
    ? [
        "/images/products/figma-10.png",
        "/images/products/figma-4.png",
        "/images/products/figma-7.png",
      ]
    : product.images;
  const [selectedImage, setSelectedImage] = useState(images[0]);

  if (!selectedImage) {
    return (
      <div className="flex h-80 items-center justify-center rounded-lg bg-[#ebe6de] text-[#605a54]">
        No product images yet
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-[#ebe6de] lg:aspect-[1.02]">
        <Image src={selectedImage} alt={product.name} fill className="object-cover" sizes="(min-width: 1024px) 52vw, 100vw" priority />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {images.map((image, index) => (
          <button key={image} type="button" aria-label={`View image ${index + 1}`} onClick={() => setSelectedImage(image)} className={`relative aspect-[1.75] overflow-hidden rounded border-2 bg-[#ebe6de] ${selectedImage === image ? "border-[#c5a880]" : "border-transparent"}`}>
            <Image src={image} alt="" fill className="object-cover" sizes="(min-width: 1024px) 17vw, 30vw" />
          </button>
        ))}
      </div>
    </div>
  );
}
