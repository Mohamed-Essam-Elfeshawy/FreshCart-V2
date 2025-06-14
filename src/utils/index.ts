/* import { categorizedBrands } from "@/data";
 */ import { /* Brand, */ IProduct } from "@/interface";

/* export function filterBrand(data: Brand[], category: string | null) {
  const brandCatgory =
    categorizedBrands[category as keyof typeof categorizedBrands];
  if (!brandCatgory) return data;
  return data.filter((el) => brandCatgory.includes(el.name));
} */
export function filterBrand(data: IProduct[], category: string | null) {
  return data.filter((el) => el.category.slug === category);
}
