"use client";

import { Select } from "@/components/ui/Select";
import type { Product } from "@/features/products/types/product.types";

type ProductOptionsProps = {
  product: Product;
  selectedOptions: Record<string, string>;
  onChange: (optionId: string, value: string) => void;
};

/** US-04: selectable product options. */
export function ProductOptions({
  product,
  selectedOptions,
  onChange,
}: ProductOptionsProps) {
  if (product.options.length === 0 && product.id !== "santal-parchment") {
    return null;
  }

  return (
    <div className="space-y-3">
      {product.options.map((option) => (
        <label key={option.id} className="block">
          <span className="mb-1 block text-sm font-medium">{option.name}</span>
          <Select
            value={selectedOptions[option.id] ?? option.values[0]}
            onChange={(event) => onChange(option.id, event.target.value)}
          >
            {option.values.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </Select>
        </label>
      ))}
      {product.id === "santal-parchment" && (
        <div className="space-y-3">
          <p className="text-[10px] font-bold uppercase">Select volume</p>
          <div className="grid grid-cols-3 gap-3">
            {[["30 ml", "$140"], ["50 ml", "$180"], ["100 ml", "$220"]].map(([volume, price], index) => (
              <button key={volume} type="button" className={`rounded border p-3 text-center ${index === 2 ? "border-2 border-[#1a1a1a] bg-white" : "border-[#ebe6de]"}`}>
                <span className="block text-xs font-medium">{volume}</span><span className="mt-1 block text-[10px] text-[#605a54]">{price}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
