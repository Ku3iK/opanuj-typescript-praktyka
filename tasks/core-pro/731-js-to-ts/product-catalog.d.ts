export interface Product {
  id: number;
  name: string;
  price: number;
  refurbished?: boolean;
}

export interface Catalog {
  products: Product[];
}

export function getProductCatalog(): Catalog;
