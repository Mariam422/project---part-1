import type { Product } from "@/features/products/types/product.types";
import { formatPrice } from "@/features/products/utils/product.utils";

type ProductDetailsProps = {
  product: Product;
};

/** US-04: product information. */
export function ProductDetails({ product }: ProductDetailsProps) {
  const notes = product.id === "santal-parchment"
    ? [
        ["Top notes", "Sicilian Bergamot, Pink Pepper"],
        ["Heart notes", "Egyptian Jasmine Sambac, Papyrus"],
        ["Base notes", "West Indian Sandalwood, Cardamom, Amber"],
      ]
    : [["Notes", product.notes]];

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-[#f2ede4] px-2.5 py-1 text-[10px] font-semibold uppercase">Scent family: {product.scentFamily}</span>
          <span className="rounded-full bg-[#f4f0eb] px-2.5 py-1 text-[10px] font-semibold uppercase text-[#605a54]">Occasion: Evening</span>
        </div>
        <h1 className="font-serif text-4xl leading-none lg:text-5xl">{product.name}</h1>
        <div className="flex items-center justify-between gap-4">
          <p className="text-xl font-semibold">{formatPrice(product.price)}</p>
          <p className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-500"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Available in Atelier</p>
        </div>
      </div>
      <div className="h-px bg-[#ebe6de]" />
      <div className="space-y-5">
        <h2 className="font-serif text-3xl">Scent Anatomy</h2>
        <p className="text-sm leading-6 text-[#605a54]">{product.description} It opens with bright top notes, shifting to clean papyrus and warm, rich sandalwood that dry down into dry cardamom and amber.</p>
        <div className="space-y-1 text-xs">
          {notes.map(([label, value]) => <div key={label} className="flex items-start justify-between gap-4 border-b border-[#ebe6de] py-2"><span className="shrink-0 text-[10px] font-bold uppercase">{label}</span><span className="text-right text-[#605a54]">{value}</span></div>)}
        </div>
      </div>
    </div>
  );
}
